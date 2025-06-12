
import { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: string;
  completed: boolean;
}

interface GoalCardProps {
  goal: Goal;
  onToggleComplete: (id: string) => void;
  onEdit: (goal: Goal) => void;
  index: number;
}

const GoalCard = ({ goal, onToggleComplete, onEdit, index }: GoalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    health: 'bg-gradient-to-r from-green-200 to-green-300',
    career: 'bg-gradient-to-r from-blue-200 to-blue-300',
    personal: 'bg-gradient-to-r from-purple-200 to-purple-300',
    hobby: 'bg-gradient-to-r from-pink-200 to-pink-300',
    default: 'bg-gradient-to-r from-gray-200 to-gray-300'
  };

  const categoryEmojis = {
    health: '🌱',
    career: '💼',
    personal: '✨',
    hobby: '🎨',
    default: '⭐'
  };

  return (
    <Card
      className={`glass shadow-kawaii hover:shadow-kawaii-lg transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-slide-in-up ${
        goal.completed ? 'opacity-75' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit(goal)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${categoryColors[goal.category as keyof typeof categoryColors] || categoryColors.default} flex items-center justify-center text-sm animate-bounce-gentle`}>
              {categoryEmojis[goal.category as keyof typeof categoryEmojis] || categoryEmojis.default}
            </div>
            <CardTitle className={`text-lg ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
              {goal.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(goal.id);
            }}
            className={`rounded-full p-2 transition-all duration-300 ${
              goal.completed 
                ? 'bg-green-100 text-green-600 animate-sparkle' 
                : 'hover:bg-accent/50'
            }`}
          >
            <Check className={`w-4 h-4 ${goal.completed ? 'animate-bounce-gentle' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">{goal.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{goal.progress}%</span>
          </div>
          <Progress 
            value={goal.progress} 
            className="h-2 animate-slide-in-right"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
