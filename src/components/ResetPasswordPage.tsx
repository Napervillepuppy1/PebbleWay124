
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword, session } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no session
    if (!session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const { error } = await updatePassword(newPassword);
    
    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      // Redirect to main app after successful password update
      navigate('/');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="phone-frame w-[375px] h-[750px] mx-auto bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 rounded-[45px] shadow-2xl overflow-hidden border-4 border-gray-900 relative">
        {/* iPhone 11 Pro notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-gray-900 rounded-b-2xl z-50"></div>
        
        <div className="h-full flex flex-col justify-center p-6 pt-12">
          {/* Logo/Branding */}
          <div className="text-center space-y-4 mb-6">
            <div className="flex justify-center items-center space-x-2 animate-bounce-gentle">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="w-8 h-8 text-pink-400 animate-sparkle" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                PebbleWay
              </h1>
              <p className="text-gray-600 text-base mt-2">Set New Password</p>
            </div>
          </div>

          {/* Reset Password Card */}
          <Card className="glass border-0 shadow-kawaii-lg backdrop-blur-lg mx-2">
            <CardHeader className="text-center space-y-2 pb-4">
              <CardTitle className="text-xl font-bold text-gray-800">
                Update Password
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Choose a new secure password 🔐
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400 text-sm pr-10"
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400 text-sm"
                    required
                    minLength={6}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-medium py-2 transition-all duration-300 hover:scale-105 shadow-kawaii text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Updating...' : 'Update Password ✨'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
