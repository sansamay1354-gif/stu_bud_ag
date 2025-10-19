import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'peers', label: 'Find Peers' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'resources', label: 'Resources' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#2BBBAD] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <h1 className="text-xl font-bold text-[#1E3A5F]">StudyBuddy Agent</h1>
          </div>
          
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 ${
                  activeTab === tab.id 
                    ? 'bg-[#1E3A5F] text-white hover:bg-[#1E3A5F]/90' 
                    : 'text-[#3E4C59] hover:text-[#1E3A5F] hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/api/placeholder/32/32" />
            <AvatarFallback className="bg-[#2BBBAD] text-white text-sm">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}