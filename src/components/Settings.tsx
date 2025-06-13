
import { ArrowLeft, User, Bell, Palette, Info, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Profile from './Profile';
import About from './About';
import Notifications from './Notifications';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
  onThemeChange: (theme: string) => void;
  currentTheme: string;
}

const Settings = ({ onBack, onLogout, onThemeChange, currentTheme }: SettingsProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (activeSection === 'profile') {
    return <Profile onBack={() => setActiveSection(null)} />;
  }

  if (activeSection === 'notifications') {
    return <Notifications onBack={() => setActiveSection(null)} />;
  }

  if (activeSection === 'about') {
    return <About onBack={() => setActiveSection(null)} />;
  }

  const themes = [
    { id: 'default', name: 'Kawaii Pink', color: 'from-pink-400 to-purple-400' },
    { id: 'ocean', name: 'Ocean Blue', color: 'from-blue-400 to-cyan-400' },
    { id: 'sunset', name: 'Sunset Orange', color: 'from-orange-400 to-yellow-400' },
    { id: 'forest', name: 'Forest Green', color: 'from-green-400 to-emerald-400' },
    { id: 'purple', name: 'Purple Dream', color: 'from-purple-400 to-violet-400' },
    { id: 'rose', name: 'Rose Gold', color: 'from-rose-400 to-pink-400' },
  ];

  const settingsItems = [
    { 
      icon: User, 
      label: 'Profile', 
      description: 'Manage your account',
      onClick: () => setActiveSection('profile')
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      description: 'Goal reminders & updates',
      onClick: () => setActiveSection('notifications')
    },
    { 
      icon: Info, 
      label: 'About', 
      description: 'Version & support info',
      onClick: () => setActiveSection('about')
    },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-full p-2 hover:bg-accent/50 transition-colors touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Settings
        </h1>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((theme, index) => (
            <Button
              key={theme.id}
              variant={currentTheme === theme.id ? "default" : "ghost"}
              onClick={() => onThemeChange(theme.id)}
              className={`rounded-xl p-3 h-auto flex flex-col space-y-2 transition-all duration-300 animate-slide-in-up ${
                currentTheme === theme.id 
                  ? 'shadow-kawaii scale-105' 
                  : 'hover:bg-accent/30 hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.color}`} />
              <span className="text-xs font-medium">{theme.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        {settingsItems.map((item, index) => (
          <div
            key={item.label}
            onClick={item.onClick}
            className="glass rounded-2xl p-3 hover:shadow-kawaii transition-all duration-300 cursor-pointer animate-slide-in-up touch-target"
            style={{ animationDelay: `${(index + 6) * 0.1}s` }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logout Section */}
      <div className="pt-4 border-t border-border/50">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full rounded-2xl p-3 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300 touch-target"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* App Info */}
      <div className="text-center text-xs text-muted-foreground pt-2">
        <p>PebbleWay v1.0.0</p>
        <p>Made with 💖 for your kawaii goals</p>
      </div>
    </div>
  );
};

export default Settings;
