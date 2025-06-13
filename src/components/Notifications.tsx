
import { useState, useEffect } from 'react';
import { ArrowLeft, Bell, BellOff, Clock, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface NotificationsProps {
  onBack: () => void;
}

const Notifications = ({ onBack }: NotificationsProps) => {
  const [notifications, setNotifications] = useState({
    goalReminders: true,
    journalReminders: true,
    achievements: true,
    dailyMotivation: false
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load notification settings from localStorage
    const savedSettings = localStorage.getItem('kawaii-notifications');
    if (savedSettings) {
      setNotifications(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (key: keyof typeof notifications) => {
    const newSettings = {
      ...notifications,
      [key]: !notifications[key]
    };
    setNotifications(newSettings);
    localStorage.setItem('kawaii-notifications', JSON.stringify(newSettings));
    
    toast({
      title: "Settings updated! ✨",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${newSettings[key] ? 'enabled' : 'disabled'}`,
    });
  };

  const notificationItems = [
    {
      key: 'goalReminders' as const,
      icon: Target,
      title: 'Goal Reminders',
      description: 'Get reminded about your active goals',
      enabled: notifications.goalReminders
    },
    {
      key: 'journalReminders' as const,
      icon: BookOpen,
      title: 'Journal Reminders',
      description: 'Daily reminders to write in your journal',
      enabled: notifications.journalReminders
    },
    {
      key: 'achievements' as const,
      icon: Bell,
      title: 'Achievements',
      description: 'Celebrate when you complete goals',
      enabled: notifications.achievements
    },
    {
      key: 'dailyMotivation' as const,
      icon: Clock,
      title: 'Daily Motivation',
      description: 'Inspirational messages to keep you going',
      enabled: notifications.dailyMotivation
    }
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
          Notifications
        </h1>
      </div>

      <div className="space-y-4 animate-slide-in-up">
        {/* Notification Settings */}
        {notificationItems.map((item, index) => (
          <div
            key={item.key}
            className="glass rounded-2xl p-4 shadow-kawaii animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Label htmlFor={item.key} className="font-semibold text-foreground text-sm cursor-pointer">
                    {item.title}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
              <Switch
                id={item.key}
                checked={item.enabled}
                onCheckedChange={() => handleToggle(item.key)}
                className="ml-4"
              />
            </div>
          </div>
        ))}

        {/* Info Section */}
        <div className="glass rounded-2xl p-4 shadow-kawaii mt-6">
          <div className="flex items-center gap-2 mb-2">
            <BellOff className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">About Notifications</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Notifications help you stay on track with your goals and maintain healthy habits. 
            You can always adjust these settings to match your preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
