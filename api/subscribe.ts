import type { NextApiRequest, NextApiResponse } from "next";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH || "emails.txt";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Step 1: Get the existing file from GitHub
    const fileUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
    const fileResponse = await fetch(fileUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    let existingContent = "";
    let sha = "";

    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      existingContent = Buffer.from(fileData.content, "base64").toString("utf-8");
      sha = fileData.sha; // Get SHA to update the file
    }

    // Step 2: Append new email
    const updatedContent = existingContent + `\n${email}`;

    // Step 3: Commit the updated file to GitHub
    const commitResponse = await fetch(fileUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `Added new email: ${email}`,
        content: Buffer.from(updatedContent).toString("base64"),
        sha, // Required to update an existing file
        branch: GITHUB_BRANCH,
      }),
    });

    if (!commitResponse.ok) {
      throw new Error("Failed to update file in GitHub.");
    }

    return res.status(200).json({ message: "Email saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
