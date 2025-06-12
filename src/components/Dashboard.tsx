
import { useState } from 'react';
import GoalCard from './GoalCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: string;
  completed: boolean;
}

interface DashboardProps {
  goals: Goal[];
  onToggleComplete: (id: string) => void;
  onEditGoal: (goal: Goal) => void;
}

const Dashboard = ({ goals, onToggleComplete, onEditGoal }: DashboardProps) => {
  const completedGoals = goals.filter(goal => goal.completed);
  const activeGoals = goals.filter(goal => !goal.completed);
  const averageProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0;

  return (
    <div className="px-4 space-y-4">
      <div className="text-center space-y-2 animate-slide-in-up">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to PebbleWay! 🥌
        </h1>
        <p className="text-muted-foreground text-sm">Let's make today amazing together!</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground text-center">Goals</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-primary animate-bounce-gentle text-center">{goals.length}</div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground text-center">Done</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-green-600 animate-bounce-gentle text-center">{completedGoals.length}</div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground text-center">Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold text-blue-600 animate-bounce-gentle text-center">{averageProgress}%</div>
          </CardContent>
        </Card>
      </div>

      {activeGoals.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 animate-slide-in-right">
            <span className="animate-sparkle">🎯</span>
            Active Goals
          </h2>
          <div className="space-y-3">
            {activeGoals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggleComplete={onToggleComplete}
                onEdit={onEditGoal}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 animate-slide-in-right">
            <span className="animate-sparkle">🎉</span>
            Completed Goals
          </h2>
          <div className="space-y-3">
            {completedGoals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggleComplete={onToggleComplete}
                onEdit={onEditGoal}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {goals.length === 0 && (
        <div className="text-center py-12 animate-float">
          <div className="text-5xl mb-4">🥌</div>
          <h3 className="text-lg font-semibold mb-2">No goals yet!</h3>
          <p className="text-muted-foreground text-sm px-4">Tap the + button below to create your first goal and start your journey.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
