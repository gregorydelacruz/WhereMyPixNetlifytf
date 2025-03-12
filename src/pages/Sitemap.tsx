
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Sitemap: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <Header className="w-full max-w-7xl mx-auto" />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
          <ul className="space-y-2 ml-4">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">Home</Link>
              <p className="text-sm text-muted-foreground ml-4 mt-1">Main landing page with hero section, features, and product information</p>
            </li>
            {/* Add more pages as they are created */}
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Resources</h2>
          <ul className="space-y-2 ml-4">
            <li>
              <a href="/sitemap.xml" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                XML Sitemap
              </a>
              <p className="text-sm text-muted-foreground ml-4 mt-1">XML sitemap for search engines</p>
            </li>
          </ul>
        </div>
      </main>
      
      <Footer className="mt-10" />
    </div>
  );
};

export default Sitemap;
