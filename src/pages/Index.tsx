
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import CalendarView from '@/components/CalendarView';
import Journal from '@/components/Journal';
import Settings from '@/components/Settings';
import GoalModal from '@/components/GoalModal';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: string;
  completed: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const savedGoals = localStorage.getItem('kawaii-goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem('kawaii-goals', JSON.stringify(updatedGoals));
  };

  const handleNewGoal = () => {
    setEditingGoal(null);
    setIsGoalModalOpen(true);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsGoalModalOpen(true);
  };

  const handleSaveGoal = (goalData: Omit<Goal, 'id'>) => {
    if (editingGoal) {
      const updatedGoals = goals.map(goal =>
        goal.id === editingGoal.id
          ? { ...goalData, id: editingGoal.id }
          : goal
      );
      saveGoals(updatedGoals);
    } else {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString()
      };
      saveGoals([...goals, newGoal]);
    }
  };

  const handleToggleComplete = (id: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id
        ? { ...goal, completed: !goal.completed, progress: goal.completed ? goal.progress : 100 }
        : goal
    );
    saveGoals(updatedGoals);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            goals={goals}
            onToggleComplete={handleToggleComplete}
            onEditGoal={handleEditGoal}
          />
        );
      case 'calendar':
        return <CalendarView goals={goals} />;
      case 'journal':
        return <Journal />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard
            goals={goals}
            onToggleComplete={handleToggleComplete}
            onEditGoal={handleEditGoal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewGoal={handleNewGoal}
      />

      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSave={handleSaveGoal}
        goal={editingGoal}
      />
    </div>
  );
};

export default Index;
