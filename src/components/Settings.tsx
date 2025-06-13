
import { ArrowLeft, User, Bell, Palette, Info, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

const Settings = ({ onBack, onLogout }: SettingsProps) => {
  const settingsItems = [
    { icon: User, label: 'Profile', description: 'Manage your account' },
    { icon: Bell, label: 'Notifications', description: 'Goal reminders & updates' },
    { icon: Palette, label: 'Theme', description: 'Customize your kawaii experience' },
    { icon: Info, label: 'About', description: 'Version & support info' },
  ];

  return (
    <div className="p-6 space-y-6">
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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Settings
        </h1>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {settingsItems.map((item, index) => (
          <div
            key={item.label}
            className="glass rounded-2xl p-4 hover:shadow-kawaii transition-all duration-300 cursor-pointer animate-slide-in-up touch-target"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logout Section */}
      <div className="pt-6 border-t border-border/50">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full rounded-2xl p-4 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300 touch-target"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground pt-4">
        <p>PebbleWay v1.0.0</p>
        <p>Made with 💖 for your kawaii goals</p>
      </div>
    </div>
  );
};

export default Settings;
