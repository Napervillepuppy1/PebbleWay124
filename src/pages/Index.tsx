import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import CalendarView from '@/components/CalendarView';
import Journal from '@/components/Journal';
import Settings from '@/components/Settings';
import Library from '@/components/Library';
import GoalModal from '@/components/GoalModal';
import Navigation from '@/components/Navigation';
import AuthScreen from '@/components/AuthScreen';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

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
  const { user, loading, signOut } = useSupabaseAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    // Load goals from localStorage (will be migrated to Supabase later)
    const savedGoals = localStorage.getItem('kawaii-goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    // Load theme
    const savedTheme = localStorage.getItem('kawaii-theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLogin = (userData: { email: string; username: string }) => {
    // User data is now managed by Supabase auth
    console.log('User logged in:', userData);
  };

  const handleLogout = async () => {
    await signOut();
    setActiveTab('dashboard');
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('kawaii-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
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
      case 'library':
        return <Library onBack={() => setActiveTab('dashboard')} />;
      case 'settings':
        return <Settings onBack={() => setActiveTab('dashboard')} onLogout={handleLogout} onThemeChange={handleThemeChange} currentTheme={theme} />;
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

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="phone-frame w-[375px] h-[750px] mx-auto bg-background rounded-[45px] shadow-2xl overflow-hidden border-4 border-gray-900 relative flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center mx-auto mb-4 animate-spin">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
            </div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="phone-frame w-[375px] h-[750px] mx-auto bg-background rounded-[45px] shadow-2xl overflow-hidden border-4 border-gray-900 relative">
        {/* iPhone 11 Pro notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-gray-900 rounded-b-2xl z-50"></div>
        
        {/* Phone screen */}
        <div className="h-full overflow-hidden relative flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="pt-6 pb-20">
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
