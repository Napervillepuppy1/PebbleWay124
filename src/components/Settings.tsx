
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Bell, User } from 'lucide-react';
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
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    localStorage.setItem('app-settings', JSON.stringify(newSettings));
  };

  const handleSettingChange = (key: keyof SettingsData, value: any) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const themes = [
    { id: 'kawaii', name: 'Kawaii Pink', emoji: '🌸' },
    { id: 'ocean', name: 'Ocean Blue', emoji: '🌊' },
    { id: 'sunset', name: 'Sunset Orange', emoji: '🌅' },
    { id: 'forest', name: 'Forest Green', emoji: '🌲' }
  ];

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2 animate-slide-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Settings ⚙️
        </h1>
        <p className="text-muted-foreground">Customize your goal tracking experience</p>
      </div>

      <div className="space-y-4">
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 animate-bounce-gentle" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Display Name</Label>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) => handleSettingChange('username', e.target.value)}
                className="border-2 focus:border-primary transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 animate-sparkle" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.emoji} {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animations</Label>
                <p className="text-sm text-muted-foreground">Enable smooth animations</p>
              </div>
              <Switch
                checked={settings.animationsEnabled}
                onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 animate-pulse-soft" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about app updates</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Goal Reminders</Label>
                <p className="text-sm text-muted-foreground">Daily reminders for your goals</p>
              </div>
              <Switch
                checked={settings.goalReminders}
                onCheckedChange={(checked) => handleSettingChange('goalReminders', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 animate-bounce-gentle" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl animate-float">🌸</div>
              <h3 className="font-semibold">Kawaii Goals</h3>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-sm text-muted-foreground">
                A cute and delightful way to track your goals and dreams! ✨
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
