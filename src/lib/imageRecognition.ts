// This file handles the integration with the OpenAI Vision API and categorizes images
import { categoryMapping } from './categoryMapper';
import CryptoJS from 'crypto-js';

// Encryption secret (a constant string used for encryption/decryption)
const ENCRYPTION_KEY = 'find-my-pix-secure-key';

// Convert image to base64
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      console.error("imageToBase64: file is undefined");
      reject(new Error("File is undefined"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1]; // Remove prefix
        resolve(base64);
      } else {
        reject(new Error("Failed to convert image to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

// API key management functions with encryption
export const getApiKey = (): string => {
  // Check for environment variable first (for development)
  const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (envApiKey) {
    return envApiKey;
  }
  
  // Otherwise check localStorage
  const encryptedKey = localStorage.getItem("openai_api_key");
  if (!encryptedKey) return "";
  
  try {
    // Decrypt the key
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedKey, ENCRYPTION_KEY);
    const decryptedKey = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedKey;
  } catch (error) {
    console.error("Error decrypting API key:", error);
    return "";
  }
};

export const isApiKeySet = (): boolean => {
  const apiKey = getApiKey();
  return !!apiKey && validateApiKey(apiKey);
};

export const saveApiKey = (apiKey: string): void => {
  // Encrypt the API key before storing
  const encryptedKey = CryptoJS.AES.encrypt(apiKey, ENCRYPTION_KEY).toString();
  localStorage.setItem("openai_api_key", encryptedKey);
};

export const clearApiKey = (): void => {
  localStorage.removeItem("openai_api_key");
};

// Validate OpenAI API key
const validateApiKey = (apiKey: string): boolean => {
  return (
    (apiKey.startsWith("sk-") && apiKey.length > 20) ||
    (apiKey.startsWith("sk-proj-") && apiKey.length > 25)
  );
};

// Recognize and categorize image
export const recognizeImage = async (imageFile: File): Promise<any[]> => {
  if (!imageFile) {
    console.error("recognizeImage: imageFile is undefined");
    throw new Error("No image file provided");
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API key not set");
  }
  if (!validateApiKey(apiKey)) {
    throw new Error("Invalid API key format");
  }

  try {
    console.log("Processing file:", imageFile.name);

    const base64Image = await imageToBase64(imageFile);
    console.log("Encoded Image (preview):", base64Image.substring(0, 40) + "...");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an AI that describes images in simple, plain English. Always provide a single concise sentence and do not start with 'A ', 'An ', or 'The image shows a'.",
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${base64Image}` },
              },
            ],
          },
        ],
        max_tokens: 250,
        temperature: 0.5,
      }),
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("OpenAI API Error:", errorData);
      throw new Error(errorData?.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("OpenAI API Response:", data);

    if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error("Invalid API response format:", data);
      throw new Error("Unexpected response format from OpenAI API");
    }

    if (!data.choices[0].message || typeof data.choices[0].message.content !== "string") {
      console.error("API response is missing expected content:", data);
      throw new Error("Invalid message content in OpenAI API response");
    }

    let description = data.choices[0].message.content.trim();
    console.log("Raw Description:", description);

    // Remove unwanted words
    description = description.replace(/^The image shows a\s*/i, "");
    description = description.replace(/^A\s+/i, "");
    description = description.replace(/^An\s+/i, "");

    // Extract only the first sentence and limit to first 40 characters
    let shortDescription = description.split(". ")[0].substring(0, 40).trim();
    console.log("Processed Description:", shortDescription);

    // Assign a category
    let category = "Unsorted";
    Object.keys(categoryMapping).forEach((keyword) => {
      if (description.toLowerCase().includes(keyword)) {
        category = categoryMapping[keyword];
      }
    });

    console.log("Assigned Category:", category);

    // Return the results
    return [{
      label: shortDescription,
      confidence: 1.0
    }];
  } catch (error) {
    console.error("Error in image recognition:", error);
    throw error;
  }
};

// Function to add image to ZIP archive (we'll keep this for compatibility)
export function addToZip(file: File, description: string, category: string, zip: any): void {
  if (!file) {
    console.error("addToZip: file is undefined");
    return;
  }

  const reader = new FileReader();
  
  reader.onload = function (event) {
    if (!event.target || !event.target.result) {
      console.error("addToZip: Unable to read file data");
      return;
    }

    const imageData = event.target.result.toString().split(",")[1]; // Extract base64 data

    if (!imageData) {
      console.error("addToZip: Failed to extract base64 data from image");
      return;
    }

    let sanitizedFilename = description.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_").trim();
    const fileExtension = file.name.split(".").pop();
    const filename = `${category}/${sanitizedFilename}.${fileExtension}`;

    console.log("Saving File:", filename);
    zip.file(filename, imageData, { base64: true });
  };

  reader.readAsDataURL(file);
}
