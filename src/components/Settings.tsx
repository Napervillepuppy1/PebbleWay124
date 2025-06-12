
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Bell, User, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsData {
  theme: string;
  notifications: boolean;
  username: string;
  goalReminders: boolean;
  animationsEnabled: boolean;
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsData>({
    theme: 'kawaii',
    notifications: true,
    username: 'Goal Achiever',
    goalReminders: true,
    animationsEnabled: true
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('pebbleway-settings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      applyTheme(parsedSettings.theme);
    }
  }, []);

  const applyTheme = (themeName: string) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeName);
  };

  const saveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    localStorage.setItem('pebbleway-settings', JSON.stringify(newSettings));
    applyTheme(newSettings.theme);
  };

  const handleSettingChange = (key: keyof SettingsData, value: any) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const themes = [
    { id: 'kawaii', name: 'Kawaii Pink', emoji: '🌸', gradient: 'from-pink-200 to-purple-200' },
    { id: 'ocean', name: 'Ocean Blue', emoji: '🌊', gradient: 'from-blue-200 to-cyan-200' },
    { id: 'sunset', name: 'Sunset Orange', emoji: '🌅', gradient: 'from-orange-200 to-yellow-200' },
    { id: 'forest', name: 'Forest Green', emoji: '🌲', gradient: 'from-green-200 to-emerald-200' },
    { id: 'purple', name: 'Purple Dream', emoji: '💜', gradient: 'from-purple-200 to-indigo-200' },
    { id: 'rose', name: 'Rose Gold', emoji: '🌹', gradient: 'from-rose-200 to-pink-200' }
  ];

  return (
    <div className="space-y-4 pb-24 px-4 safe-area-top">
      <div className="text-center space-y-2 animate-slide-in-up pt-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          PebbleWay Settings ⚙️
        </h1>
        <p className="text-muted-foreground text-sm">Customize your goal tracking experience</p>
      </div>

      <div className="space-y-4">
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 animate-bounce-gentle" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm">Display Name</Label>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) => handleSettingChange('username', e.target.value)}
                className="border-2 focus:border-primary transition-colors touch-target"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="w-5 h-5 animate-sparkle" />
              Themes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm">Choose Your Theme</Label>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <Button
                    key={theme.id}
                    variant={settings.theme === theme.id ? "default" : "outline"}
                    onClick={() => handleSettingChange('theme', theme.id)}
                    className={`h-auto p-3 flex flex-col items-center gap-2 transition-all duration-300 touch-target ${
                      settings.theme === theme.id 
                        ? 'ring-2 ring-primary animate-pulse-soft' 
                        : 'hover:shadow-kawaii'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.gradient} flex items-center justify-center text-lg animate-bounce-gentle`}>
                      {theme.emoji}
                    </div>
                    <span className="text-xs font-medium">{theme.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Animations</Label>
                <p className="text-xs text-muted-foreground">Enable smooth animations</p>
              </div>
              <Switch
                checked={settings.animationsEnabled}
                onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
                className="touch-target"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="w-5 h-5 animate-pulse-soft" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Get notified about app updates</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                className="touch-target"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Goal Reminders</Label>
                <p className="text-xs text-muted-foreground">Daily reminders for your goals</p>
              </div>
              <Switch
                checked={settings.goalReminders}
                onCheckedChange={(checked) => handleSettingChange('goalReminders', checked)}
                className="touch-target"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="w-5 h-5 animate-bounce-gentle" />
              Mobile App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3">
              <div className="text-4xl animate-float">🥌</div>
              <h3 className="font-semibold">PebbleWay</h3>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground">
                Your cute companion for achieving goals! Designed specifically for mobile. ✨
              </p>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="touch-target text-xs"
                  onClick={() => window.open('https://docs.lovable.dev/', '_blank')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
