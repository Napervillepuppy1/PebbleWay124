
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: string;
  completed: boolean;
}

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id'>) => void;
  goal?: Goal | null;
}

const GoalModal = ({ isOpen, onClose, onSave, goal }: GoalModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: '',
    progress: [0],
    category: 'personal',
    completed: false
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        description: goal.description,
        targetDate: goal.targetDate,
        progress: [goal.progress],
        category: goal.category,
        completed: goal.completed
      });
    } else {
      setFormData({
        title: '',
        description: '',
        targetDate: '',
        progress: [0],
        category: 'personal',
        completed: false
      });
    }
  }, [goal, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      description: formData.description,
      targetDate: formData.targetDate,
      progress: formData.progress[0],
      category: formData.category,
      completed: formData.completed
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[320px] max-h-[85vh] overflow-y-auto glass shadow-kawaii-lg animate-slide-in-up rounded-3xl border-2 border-white/20 bg-gradient-to-br from-background/95 to-accent/10 backdrop-blur-xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center justify-center gap-2 text-lg">
            <span className="animate-sparkle text-2xl">✨</span>
            {goal ? 'Edit Goal' : 'Create New Goal'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter your amazing goal..."
              required
              className="rounded-2xl border-2 focus:border-primary transition-colors bg-background/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your goal..."
              className="rounded-2xl border-2 focus:border-primary transition-colors min-h-16 bg-background/80 backdrop-blur-sm resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="rounded-2xl bg-background/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl bg-background/95 backdrop-blur-xl border-2 border-white/20">
                  <SelectItem value="health">🌱 Health</SelectItem>
                  <SelectItem value="career">💼 Career</SelectItem>
                  <SelectItem value="personal">✨ Personal</SelectItem>
                  <SelectItem value="hobby">🎨 Hobby</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetDate" className="text-sm font-medium">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                required
                className="rounded-2xl border-2 focus:border-primary transition-colors bg-background/80 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Progress: {formData.progress[0]}%</Label>
            <Slider
              value={formData.progress}
              onValueChange={(value) => setFormData({ ...formData, progress: value })}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 rounded-2xl bg-background/50 backdrop-blur-sm border-2 hover:bg-background/70"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-kawaii transition-all duration-300"
            >
              {goal ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalModal;
