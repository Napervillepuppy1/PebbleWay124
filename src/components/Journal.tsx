
import { useState, useEffect } from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
  tags: string[];
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    content: '',
    mood: 'happy',
    tags: [] as string[]
  });

  useEffect(() => {
    const savedEntries = localStorage.getItem('journal-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntries = (updatedEntries: JournalEntry[]) => {
    setEntries(updatedEntries);
    localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
  };

  const handleSaveEntry = () => {
    if (newEntry.content.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        content: newEntry.content,
        mood: newEntry.mood,
        tags: newEntry.tags
      };
      
      const updatedEntries = [entry, ...entries];
      saveEntries(updatedEntries);
      
      setNewEntry({ content: '', mood: 'happy', tags: [] });
      setIsModalOpen(false);
    }
  };

  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    calm: '😌',
    motivated: '💪',
    thoughtful: '🤔',
    grateful: '🙏'
  };

  const moodColors = {
    happy: 'bg-yellow-100 text-yellow-800',
    excited: 'bg-orange-100 text-orange-800',
    calm: 'bg-blue-100 text-blue-800',
    motivated: 'bg-green-100 text-green-800',
    thoughtful: 'bg-purple-100 text-purple-800',
    grateful: 'bg-pink-100 text-pink-800'
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2 animate-slide-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Goal Journal 📖
        </h1>
        <p className="text-muted-foreground">Reflect on your journey and track your thoughts</p>
      </div>

      <div className="flex justify-center animate-slide-in-right">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-sunset hover:shadow-kawaii animate-pulse-soft"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card 
            key={entry.id} 
            className="glass shadow-kawaii hover:shadow-kawaii-lg transition-all duration-300 animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </CardTitle>
                <Badge 
                  className={`${moodColors[entry.mood as keyof typeof moodColors]} animate-bounce-gentle`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {moodEmojis[entry.mood as keyof typeof moodEmojis]} {entry.mood}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap mb-3">{entry.content}</p>
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline"
                      className="animate-sparkle"
                      style={{ animationDelay: `${tagIndex * 0.1}s` }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 animate-float">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Start your journal!</h3>
          <p className="text-muted-foreground">Write your first entry to begin tracking your thoughts and progress.</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass shadow-kawaii-lg animate-slide-in-up">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 animate-bounce-gentle" />
              New Journal Entry
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind today? How are your goals progressing?"
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              className="min-h-32 border-2 focus:border-primary transition-colors"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">How are you feeling?</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(moodEmojis).map(([mood, emoji]) => (
                  <Button
                    key={mood}
                    variant={newEntry.mood === mood ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    {emoji} {mood}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveEntry}
                className="flex-1 bg-gradient-sunset hover:shadow-kawaii"
                disabled={!newEntry.content.trim()}
              >
                Save Entry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Journal;
