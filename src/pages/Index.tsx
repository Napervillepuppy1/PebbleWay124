import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import CalendarView from '@/components/CalendarView';
import Journal from '@/components/Journal';
import Settings from '@/components/Settings';
import GoalModal from '@/components/GoalModal';
import Navigation from '@/components/Navigation';
import AuthScreen from '@/components/AuthScreen';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    // Check if user was previously logged in
    const wasLoggedIn = localStorage.getItem('kawaii-auth');
    if (wasLoggedIn) {
      setIsAuthenticated(true);
    }

    const savedGoals = localStorage.getItem('kawaii-goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('kawaii-auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kawaii-auth');
    setActiveTab('dashboard');
  };

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
            onNewGoal={handleNewGoal}
          />
        );
      case 'calendar':
        return <CalendarView goals={goals} onBack={() => setActiveTab('dashboard')} />;
      case 'journal':
        return <Journal onBack={() => setActiveTab('dashboard')} />;
      case 'settings':
        return <Settings onBack={() => setActiveTab('dashboard')} onLogout={handleLogout} />;
      default:
        return (
          <Dashboard
            goals={goals}
            onToggleComplete={handleToggleComplete}
            onEditGoal={handleEditGoal}
            onNewGoal={handleNewGoal}
          />
        );
    }
  };

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="phone-frame w-[390px] h-[844px] mx-auto bg-background rounded-[60px] shadow-2xl overflow-hidden border-8 border-gray-900 relative">
        {/* iPhone 12 Pro notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-2xl z-50"></div>
        
        {/* Phone screen */}
        <div className="h-full overflow-hidden relative flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="pt-10 pb-20">
              {renderContent()}
            </div>
          </div>
          
          {/* Bottom Navigation */}
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
