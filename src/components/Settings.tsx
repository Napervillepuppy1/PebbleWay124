
import { useState, useEffect } from 'react';
import { ArrowLeft, Palette, Bell, User, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const [currentTheme, setCurrentTheme] = useState('kawaii');
  const [notifications, setNotifications] = useState(true);

  const themes = [
    { id: 'kawaii', name: 'Kawaii Pink', emoji: '🌸', preview: 'from-pink-200 to-purple-200' },
    { id: 'ocean', name: 'Ocean Blue', emoji: '🌊', preview: 'from-blue-200 to-cyan-200' },
    { id: 'sunset', name: 'Sunset Orange', emoji: '🌅', preview: 'from-orange-200 to-yellow-200' },
    { id: 'forest', name: 'Forest Green', emoji: '🌲', preview: 'from-green-200 to-emerald-200' },
    { id: 'purple', name: 'Purple Dream', emoji: '💜', preview: 'from-purple-200 to-violet-200' },
    { id: 'rose', name: 'Rose Gold', emoji: '🌹', preview: 'from-rose-200 to-pink-200' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'kawaii';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('app-theme', themeId);
  };

  return (
    <div className="px-4 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between animate-slide-in-up">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-2xl p-2 hover:bg-accent/50 touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Settings ⚙️
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Theme Selection */}
      <Card className="glass shadow-kawaii-lg animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Palette className="w-5 h-5 animate-sparkle" />
            Choose Your Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="gri d-cols-1 space-y-3">
            {themes.map((theme, index) => (
              <Button
                key={theme.id}
                variant={currentTheme === theme.id ? "default" : "ghost"}
                onClick={() => handleThemeChange(theme.id)}
                className={`w-full justify-start rounded-xl p-4 h-auto transition-all duration-300 ${
                  currentTheme === theme.id 
                    ? 'shadow-kawaii scale-105 animate-bounce-gentle' 
                    : 'hover:bg-accent/30 hover:scale-102'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 w-full">
                  <span className="text-2xl">{theme.emoji}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{theme.name}</div>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.preview} border-2 border-white shadow-sm`}></div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Bell className="w-5 h-5 animate-sparkle" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/20 transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🔔</span>
              <div>
                <div className="font-medium">Notifications</div>
                <div className="text-xs text-muted-foreground">Get reminded about your goals</div>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/20 transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🌙</span>
              <div>
                <div className="font-medium">Night Mode</div>
                <div className="text-xs text-muted-foreground">Easier on your eyes</div>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <User className="w-5 h-5 animate-sparkle" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-3 flex items-center justify-center animate-bounce-gentle">
              <span className="text-2xl">🥌</span>
            </div>
            <h3 className="font-semibold text-primary">Goal Achiever</h3>
            <p className="text-xs text-muted-foreground">Keep rolling towards your dreams!</p>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
        <CardContent className="p-4 text-center">
          <Info className="w-5 h-5 text-primary mx-auto mb-2 animate-sparkle" />
          <p className="text-sm text-muted-foreground mb-1">PebbleWay v1.0</p>
          <p className="text-xs text-muted-foreground">
            Made with 💖 for your goal journey
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
