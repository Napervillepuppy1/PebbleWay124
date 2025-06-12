
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
  onBack: () => void;
}

const CalendarView = ({ goals, onBack }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getGoalsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return goals.filter(goal => goal.targetDate === dateStr);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 w-12"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayGoals = getGoalsForDate(day);
      const hasGoals = dayGoals.length > 0;
      const hasCompletedGoals = dayGoals.some(goal => goal.completed);

      days.push(
        <div
          key={day}
          className={`h-12 w-12 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
            hasGoals
              ? hasCompletedGoals
                ? 'bg-green-100 text-green-700 shadow-kawaii animate-bounce-gentle'
                : 'bg-primary/20 text-primary shadow-kawaii hover:scale-105'
              : 'hover:bg-accent/30 hover:scale-105'
          }`}
        >
          {day}
          {hasGoals && (
            <div className="absolute mt-8 w-2 h-2 rounded-full bg-primary animate-pulse-soft"></div>
          )}
        </div>
      );
    }

    return days;
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
          Calendar 📅
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Calendar Card */}
      <Card className="glass shadow-kawaii-lg animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        <CardContent className="p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="rounded-xl p-2 hover:bg-accent/50 touch-target"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <h2 className="text-lg font-semibold text-primary">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="rounded-xl p-2 hover:bg-accent/50 touch-target"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 relative">
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>

      {/* Goals Summary */}
      <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3 text-primary flex items-center gap-2">
            <span className="animate-sparkle">🎯</span>
            This Month's Goals
          </h3>
          {goals.length > 0 ? (
            <div className="space-y-2">
              {goals.slice(0, 3).map((goal, index) => (
                <div
                  key={goal.id}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    goal.completed 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-primary/10 border border-primary/20'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      goal.completed ? 'text-green-700 line-through' : 'text-primary'
                    }`}>
                      {goal.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              {goals.length > 3 && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  +{goals.length - 3} more goals this month
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-3xl mb-2 animate-float">🌸</div>
              <p className="text-sm text-muted-foreground">No goals scheduled yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
