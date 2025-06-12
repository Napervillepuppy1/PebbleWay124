
import { useState } from 'react';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface JournalProps {
  onBack: () => void;
}

const Journal = ({ onBack }: JournalProps) => {
  const [todayEntry, setTodayEntry] = useState('');
  const [mood, setMood] = useState<string>('');

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🔥', label: 'Motivated', value: 'motivated' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
  ];

  const handleSaveEntry = () => {
    if (todayEntry.trim() || mood) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        content: todayEntry,
        mood: mood,
        timestamp: new Date().toISOString()
      };
      
      const existingEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
      const updatedEntries = [entry, ...existingEntries];
      localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
      
      setTodayEntry('');
      setMood('');
    }
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
          Journal 📝
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Today's Entry */}
      <Card className="glass shadow-kawaii-lg animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <span className="animate-sparkle">✨</span>
            How was your day?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write about your day, your thoughts, your wins... ✍️"
            value={todayEntry}
            onChange={(e) => setTodayEntry(e.target.value)}
            className="min-h-32 rounded-xl border-primary/20 focus:border-primary/50 glass"
          />
          
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">How are you feeling?</p>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((moodOption) => (
                <Button
                  key={moodOption.value}
                  variant={mood === moodOption.value ? "default" : "ghost"}
                  onClick={() => setMood(mood === moodOption.value ? '' : moodOption.value)}
                  className={`rounded-xl p-3 h-auto flex flex-col space-y-1 transition-all duration-200 ${
                    mood === moodOption.value 
                      ? 'shadow-kawaii scale-105 animate-bounce-gentle' 
                      : 'hover:bg-accent/30 hover:scale-105'
                  }`}
                >
                  <span className="text-xl">{moodOption.emoji}</span>
                  <span className="text-xs">{moodOption.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSaveEntry}
            disabled={!todayEntry.trim() && !mood}
            className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-kawaii transition-all duration-300 disabled:opacity-50"
          >
            Save Entry <Heart className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Inspiration Quote */}
      <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
        <CardContent className="p-4 text-center">
          <Star className="w-6 h-6 text-primary mx-auto mb-2 animate-sparkle" />
          <p className="text-sm italic text-muted-foreground mb-2">
            "Every small step you take today brings you closer to your dreams."
          </p>
          <p className="text-xs text-primary font-medium">— Daily Inspiration</p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary animate-bounce-gentle">7</div>
            <div className="text-xs text-muted-foreground">Days Journaled</div>
          </CardContent>
        </Card>
        
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent animate-bounce-gentle">✨</div>
            <div className="text-xs text-muted-foreground">Keep Going!</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Journal;
