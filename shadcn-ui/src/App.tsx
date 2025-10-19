import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Dashboard from '@/pages/Dashboard';
import PeerFinder from '@/pages/PeerFinder';
import Sessions from '@/pages/Sessions';
import Resources from '@/pages/Resources';
import Profile from '@/pages/Profile';

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'peers':
        return <PeerFinder />;
      case 'sessions':
        return <Sessions />;
      case 'resources':
        return <Resources />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-[#F5F7FA]">
          <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="max-w-7xl mx-auto px-6 py-8">
            {renderContent()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;