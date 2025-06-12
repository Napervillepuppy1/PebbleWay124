
import { useState } from 'react';
import { Home, Calendar, BookOpen, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewGoal: () => void;
}

const Navigation = ({ activeTab, setActiveTab, onNewGoal }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'journal', icon: BookOpen, label: 'Journal' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 safe-area-bottom">
      <div className="glass rounded-2xl px-3 py-2 shadow-kawaii-lg">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          {navItems.map((item, index) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(item.id)}
              className={`rounded-xl p-3 transition-all duration-300 touch-target ${
                activeTab === item.id 
                  ? 'bg-primary text-primary-foreground animate-bounce-gentle shadow-kawaii' 
                  : 'hover:bg-accent/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
          
          <Button
            onClick={onNewGoal}
            className="rounded-xl p-3 bg-gradient-to-r from-primary to-accent hover:shadow-kawaii animate-pulse-soft touch-target"
            size="sm"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
