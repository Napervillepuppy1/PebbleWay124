
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: string;
  completed: boolean;
}

interface CalendarViewProps {
  goals: Goal[];
}

const CalendarView = ({ goals }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getGoalsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return goals.filter(goal => goal.targetDate === dateString);
  };

  const selectedGoals = selectedDate ? getGoalsForDate(selectedDate) : [];

  const categoryColors = {
    health: 'bg-green-100 text-green-800',
    career: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    hobby: 'bg-pink-100 text-pink-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="px-4 space-y-4">
      <div className="text-center space-y-2 animate-slide-in-up">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Goal Calendar 📅
        </h1>
        <p className="text-muted-foreground text-sm">Track your goals by date</p>
      </div>

      <Card className="glass shadow-kawaii animate-slide-in-up">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="animate-sparkle">🗓️</span>
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-0 w-full"
            modifiers={{
              hasGoals: (date) => getGoalsForDate(date).length > 0
            }}
            modifiersStyles={{
              hasGoals: {
                backgroundColor: 'rgb(236 72 153 / 0.2)',
                color: 'rgb(236 72 153)',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="glass shadow-kawaii animate-slide-in-right">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="animate-bounce-gentle">📋</span>
            {selectedDate ? 
              `Goals for ${selectedDate.toLocaleDateString()}` : 
              'Select a date'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedGoals.length > 0 ? (
            <div className="space-y-3">
              {selectedGoals.map((goal, index) => (
                <div 
                  key={goal.id} 
                  className="p-3 rounded-lg bg-gradient-to-r from-white/50 to-white/30 border border-white/20 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-medium text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {goal.title}
                    </h3>
                    <Badge 
                      className={`${categoryColors[goal.category as keyof typeof categoryColors] || categoryColors.default} animate-pulse-soft text-xs`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {goal.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{goal.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">Progress: {goal.progress}%</span>
                    {goal.completed && (
                      <span className="text-green-600 animate-bounce-gentle text-xs">✅ Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 animate-float">
              <div className="text-4xl mb-2">🌸</div>
              <p className="text-muted-foreground text-sm">No goals scheduled for this date</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
