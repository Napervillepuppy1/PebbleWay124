
import { useState, useEffect } from 'react';
import { ArrowLeft, User, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ProfileProps {
  onBack: () => void;
}

const Profile = ({ onBack }: ProfileProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('kawaii-user-data');
    if (userData) {
      const data = JSON.parse(userData);
      setUsername(data.username || '');
      setEmail(data.email || '');
    }
  }, []);

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New passwords don't match!",
        variant: "destructive"
      });
      return;
    }

    // Save user data to localStorage
    const userData = {
      username,
      email,
      ...(newPassword && { password: newPassword })
    };
    localStorage.setItem('kawaii-user-data', JSON.stringify(userData));

    toast({
      title: "Profile updated! ✨",
      description: "Your changes have been saved successfully!",
    });

    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-full p-2 hover:bg-accent/50 transition-colors touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Profile
        </h1>
      </div>

      {/* Profile Form */}
      <div className="space-y-4 animate-slide-in-up">
        <div className="glass rounded-3xl p-6 shadow-kawaii">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-kawaii">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="rounded-2xl border-2 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-2xl border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="glass rounded-3xl p-6 shadow-kawaii">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Change Password</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="rounded-2xl border-2 focus:border-primary transition-colors pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                >
                  {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="rounded-2xl border-2 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type={showPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="rounded-2xl border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full rounded-2xl p-3 bg-gradient-to-r from-primary to-accent hover:shadow-kawaii transition-all duration-300 touch-target"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;
