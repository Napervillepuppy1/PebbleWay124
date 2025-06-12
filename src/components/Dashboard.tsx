
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
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2 animate-slide-in-up">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Welcome Back! ✨
        </h1>
        <p className="text-muted-foreground">Let's make today amazing together!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary animate-bounce-gentle">{goals.length}</div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 animate-bounce-gentle">{completedGoals.length}</div>
          </CardContent>
        </Card>

        <Card className="glass shadow-kawaii animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 animate-bounce-gentle">{averageProgress}%</div>
          </CardContent>
        </Card>
      </div>

      {activeGoals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 animate-slide-in-right">
            <span className="animate-sparkle">🎯</span>
            Active Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 animate-slide-in-right">
            <span className="animate-sparkle">🎉</span>
            Completed Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="text-xl font-semibold mb-2">No goals yet!</h3>
          <p className="text-muted-foreground">Create your first goal to get started on your journey.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
