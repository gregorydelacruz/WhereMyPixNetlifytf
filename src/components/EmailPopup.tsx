import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EmailPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: () => void; // No email parameter needed
};

const EmailPopup: React.FC<EmailPopupProps> = ({ isOpen, onClose, onEmailSubmit }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("🚀 Email popup closed. Opening file upload...");
    onClose(); // Close the popup
    onEmailSubmit(); // Trigger image upload (defined in parent component)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-2">Stay Updated!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Enter your email to continue (this won't be saved).
        </p>

        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <div className="flex justify-between mt-4">
          <Button onClick={onClose} variant="ghost" className="text-gray-500">
            Close
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
