
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
      <DialogContent className="glass shadow-kawaii-lg animate-slide-in-up">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="animate-sparkle">✨</span>
            {goal ? 'Edit Goal' : 'Create New Goal'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter your amazing goal..."
              required
              className="border-2 focus:border-primary transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your goal in detail..."
              className="border-2 focus:border-primary transition-colors min-h-20"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">🌱 Health</SelectItem>
                  <SelectItem value="career">💼 Career</SelectItem>
                  <SelectItem value="personal">✨ Personal</SelectItem>
                  <SelectItem value="hobby">🎨 Hobby</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                required
                className="border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Progress: {formData.progress[0]}%</Label>
            <Slider
              value={formData.progress}
              onValueChange={(value) => setFormData({ ...formData, progress: value })}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-sunset hover:shadow-kawaii">
              {goal ? 'Update Goal' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalModal;
