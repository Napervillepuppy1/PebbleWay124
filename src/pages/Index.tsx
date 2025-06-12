
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="phone-frame w-full max-w-sm mx-auto bg-background rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 relative">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-50"></div>
        
        {/* Phone screen */}
        <div className="h-screen max-h-[800px] overflow-hidden relative">
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="pt-8 pb-20">
              {renderContent()}
            </div>
          </div>

          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewGoal={handleNewGoal}
          />
        </div>

        <GoalModal
          isOpen={isGoalModalOpen}
          onClose={() => setIsGoalModalOpen(false)}
          onSave={handleSaveGoal}
          goal={editingGoal}
        />
      </div>
    </div>
  );
};

export default Index;
