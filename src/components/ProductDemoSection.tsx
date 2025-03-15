import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';
import ImageGallery from '@/components/ImageGallery';
import ResultDisplay from '@/components/ResultDisplay';
import CategorySelector from '@/components/CategorySelector';
import { ProcessedImage } from '@/types/image';

interface ProductDemoSectionProps {
  images: ProcessedImage[];
  selectedImageIndex: number | null;
  isProcessing: boolean;
  setSelectedImageIndex: (index: number) => void;
  handleImagesSelected: (files: File[]) => void;
  downloadAllAsZip: () => void;
  downloadRenamedImage: (index: number) => void;
  setImageCategory: (index: number, category: string) => void;
  addCategory: (category: string) => void;
  categories: string[];
  predefinedCategories: string[];
}

const ProductDemoSection: React.FC<ProductDemoSectionProps> = ({
  images,
  selectedImageIndex,
  isProcessing,
  setSelectedImageIndex,
  handleImagesSelected,
  downloadAllAsZip,
  downloadRenamedImage,
  setImageCategory,
  addCategory,
  categories,
  predefinedCategories
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  const handleImageUploadClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPopupOpen(false);
    // You can use formData here if needed
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="upload-section" className="w-full max-w-7xl mx-auto px-4 py-16 mb-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Try our image processing tool right now
        </p>
      </div>

      <div className="relative w-full my-8 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <ImageUploader 
            onImageSelected={handleImagesSelected} 
            isProcessing={isProcessing}
            onUploadClick={handleImageUploadClick}
          />
        </div>

        {/* Popup Form with Mailchimp Integration */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Upload Image Details</h3>
              <form onSubmit={handlePopupSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter image title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter image description"
                    rows={3}
                  
                </div>
                
                {/* Mailchimp Subscription Form */}
                                  <h2 className="text-base font-semibold mb-2">Subscribe to Updates</h2>
                  <form 
                    action="https://gregorydelacruz.us13.list-manage.com/subscribe/post?u=dc0338a6720ee1b0490b9e2eb&id=c9ba2a17ee&f_id=00847ce9f0" 
                    method="post" 
                    id="mc-embedded-subscribe-form" 
                    name="mc-embedded-subscribe-form" 
                    className="validate"
                  >
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL" className="block text-sm font-medium mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="EMAIL" 
                        className="required email w-full p-2 border rounded" 
                        id="mce-EMAIL" 
                        required 
                      />
                    </div>
                    <div hidden><input type="hidden" name="tags" value="6863173" /></div>
                    <div id="mce-responses" className="clear">
                      <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                      <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                    </div>
                    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                      <input type="text" name="b_dc0338a6720ee1b0490b9e2eb_c9ba2a17ee" tabIndex={-1} />
                    </div>
                  </form>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPopupOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={cn(
          "w-full transition-opacity duration-500",
          images.length > 0 ? "opacity-100" : "opacity-0"
        )}>
          {images.length > 0 && (
            <div className="mt-8 flex justify-center animate-fade-in">
              <DownloadButton
                isZip={true}
                onDownload={downloadAllAsZip}
              />
            </div>
          )}
        </div>

        {images.length > 0 && (
          <div className="w-full mt-10 glass p-6 rounded-xl shadow-sm animate-slide-up">
            <ImageGallery
              images={images}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />
          </div>
        )}

        {currentImage && (
          <div className="w-full mt-8 flex flex-col md:flex-row gap-6 animate-fade-in">
            <div className="w-full md:w-1/2 glass p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Image Category</h3>
              </div>
              <CategorySelector
                categories={categories}
                currentCategory={currentImage.category}
                onChange={(category) => setImageCategory(selectedImageIndex!, category)}
                onAddCategory={addCategory}
                disabled={isProcessing}
                predefinedCategories={predefinedCategories}
              />
            </div>

            <div className="w-full md:w-1/2">
              <ResultDisplay 
                isVisible={currentImage.isCompleted} 
                isLoading={currentImage.isProcessing} 
                results={currentImage.results} 
              />
              
              {currentImage.renamedFile && currentImage.isCompleted && (
                <div className="mt-4 flex justify-center">
                  <DownloadButton
                    fileName={currentImage.renamedFile.name}
                    onDownload={() => downloadRenamedImage(selectedImageIndex!)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDemoSection;

