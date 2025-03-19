import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full pt-6 pb-4 px-4 md:px-6 flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-amber-500" />
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Vision - Free to All During Pre-Release 
        </h1>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <button className="text-sm">Features</button>
        <button className="text-sm">Examples</button>
        <button className="text-sm">Help</button>
      </div>
    </header>
  );
};

export default Header;
