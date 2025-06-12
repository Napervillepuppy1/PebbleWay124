
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
    <div className="absolute bottom-0 left-0 right-0 z-50 p-4">
      <div className="glass rounded-3xl px-4 py-3 shadow-kawaii-lg backdrop-blur-lg border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className={`rounded-2xl p-3 transition-all duration-300 touch-target ${
                  activeTab === item.id 
                    ? 'bg-primary text-primary-foreground animate-bounce-gentle shadow-kawaii scale-110' 
                    : 'hover:bg-accent/50 hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="w-5 h-5" />
              </Button>
            ))}
          </div>
          
          <Button
            onClick={onNewGoal}
            className="rounded-2xl p-3 bg-gradient-to-r from-primary to-accent hover:shadow-kawaii animate-pulse-soft touch-target hover:scale-110 transition-all duration-300"
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
