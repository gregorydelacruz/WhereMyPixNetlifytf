import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ImageUploader from "@/components/ImageUploader";
import EmailPopup from "@/components/EmailPopup"; // Import popup component
import { ProcessedImage } from "@/types/image";

interface ProductDemoSectionProps {
  images: ProcessedImage[];
  isProcessing: boolean;
  handleImagesSelected: (files: File[]) => void;
}

const ProductDemoSection: React.FC<ProductDemoSectionProps> = ({ images, isProcessing, handleImagesSelected }) => {
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  // Step 1: When "Select Images" is clicked, show popup first
  const handleBeforeSelectImages = () => {
    console.log("🚀 Opening Email Popup for Image Upload");
    setIsEmailPopupOpen(true);
  };

  // Step 2: After "Subscribe" is clicked, open file input
  const triggerFileUpload = () => {
    setIsEmailPopupOpen(false);
    console.log("📂 Opening file selection...");
    document.getElementById("hidden-file-input")?.click();
  };

  return (
    <section id="upload-section" className="w-full max-w-7xl mx-auto px-4 py-16 mb-8">
      <EmailPopup 
        isOpen={isEmailPopupOpen} 
        onClose={() => setIsEmailPopupOpen(false)} 
        onEmailSubmit={triggerFileUpload} 
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Try our image processing tool right now</p>
      </div>

      <div className="relative w-full my-8 flex flex-col items-center">
        <button
          onClick={handleBeforeSelectImages}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-lg font-semibold"
        >
          Select Images
        </button>

        {/* Hidden File Input (Triggered After Email Submission) */}
        <input
          id="hidden-file-input"
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files) {
              console.log("📸 Images Selected:", e.target.files);
              handleImagesSelected(Array.from(e.target.files));
            }
          }}
        />
      </div>
    </section>
  );
};

export default ProductDemoSection;
