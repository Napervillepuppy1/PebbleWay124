
import { useState, useEffect } from 'react';
import { ArrowLeft, Search, BookOpen, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface LibraryProps {
  onBack: () => void;
}

interface JournalEntry {
  date: string;
  content: string;
  mood: string;
  timestamp: string;
}

const Library = ({ onBack }: LibraryProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
    setEntries(savedEntries);
    setFilteredEntries(savedEntries);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter(entry =>
        entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.mood.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.date.includes(searchTerm)
      );
      setFilteredEntries(filtered);
    }
  }, [searchTerm, entries]);

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      happy: '😊',
      calm: '😌',
      thoughtful: '🤔',
      tired: '😴',
      motivated: '🔥',
      sad: '😔'
    };
    return moodMap[mood] || '✨';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="px-4 space-y-4">
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
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Library 📚
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Search Bar */}
      <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search your entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-primary/20 focus:border-primary/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-3 text-center">
            <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold text-primary">{entries.length}</div>
            <div className="text-xs text-muted-foreground">Entries</div>
          </CardContent>
        </Card>
        
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-3 text-center">
            <Calendar className="w-5 h-5 text-accent mx-auto mb-1" />
            <div className="text-lg font-bold text-accent">{new Set(entries.map(e => e.date)).size}</div>
            <div className="text-xs text-muted-foreground">Days</div>
          </CardContent>
        </Card>
        
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-3 text-center">
            <Heart className="w-5 h-5 text-pink-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-pink-500">{filteredEntries.length}</div>
            <div className="text-xs text-muted-foreground">Found</div>
          </CardContent>
        </Card>
      </div>

      {/* Entries List */}
      <div className="space-y-3 pb-4">
        {filteredEntries.length === 0 ? (
          <Card className="glass shadow-kawaii animate-slide-in-up">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                {entries.length === 0 ? "No journal entries yet!" : "No entries match your search."}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {entries.length === 0 ? "Start writing in your journal to see entries here ✨" : "Try a different search term 🔍"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry, index) => (
            <Card 
              key={entry.timestamp} 
              className="glass shadow-kawaii hover:shadow-kawaii-lg transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: `${(index + 5) * 0.1}s` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                    <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                    {formatDate(entry.date)}
                  </CardTitle>
                  <div className="text-xs text-muted-foreground capitalize bg-accent/20 px-2 py-1 rounded-full">
                    {entry.mood || 'peaceful'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-foreground leading-relaxed">
                  {entry.content.length > 150 
                    ? `${entry.content.substring(0, 150)}...` 
                    : entry.content
                  }
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Library;
