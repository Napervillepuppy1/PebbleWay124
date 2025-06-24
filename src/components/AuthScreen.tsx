
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onLogin: (userData: { email: string; username: string }) => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { toast } = useToast();
  const { signUp, signIn, resetPassword } = useSupabaseAuth();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate password
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate confirm password for signup
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate username for signup
    if (!isLogin && username.trim().length < 2) {
      toast({
        title: "Username too short",
        description: "Username must be at least 2 characters long",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { user, error } = await signIn(email, password);
        
        if (error) {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive"
          });
        } else if (user) {
          onLogin({ email: user.email!, username: user.user_metadata?.username || user.email!.split('@')[0] });
        }
      } else {
        const { user, error } = await signUp(email, password, username);
        
        if (error) {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive"
          });
        }
        // Note: For sign up, user will need to confirm email before they can login
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const { error } = await resetPassword(email);
    
    if (error) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive"
      });
    }

    setIsLoading(false);
    setShowResetPassword(false);
  };

  if (showResetPassword) {
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
                <p className="text-gray-600 text-base mt-2">Reset Password</p>
              </div>
            </div>

            {/* Reset Password Card */}
            <Card className="glass border-0 shadow-kawaii-lg backdrop-blur-lg mx-2">
              <CardHeader className="text-center space-y-2 pb-4">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResetPassword(false)}
                    className="p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Reset Password
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-sm">
                  Enter your email to receive a reset link 📧
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400 text-sm"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-medium py-2 transition-all duration-300 hover:scale-105 shadow-kawaii text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link 📧'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
              <p className="text-gray-600 text-base mt-2">Your Kawaii Goals 🌸</p>
            </div>
          </div>

          {/* Auth Card */}
          <Card className="glass border-0 shadow-kawaii-lg backdrop-blur-lg mx-2 max-h-[500px] overflow-y-auto">
            <CardHeader className="text-center space-y-2 pb-4">
              <CardTitle className="text-xl font-bold text-gray-800">
                {isLogin ? 'Welcome Back!' : 'Join PebbleWay'}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                {isLogin 
                  ? 'Continue your kawaii journey ✨' 
                  : 'Start your cute goal adventure 🎯'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <Input
                      type="text"
                      placeholder="Your cute username ✨"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400 text-sm"
                      required={!isLogin}
                      minLength={2}
                    />
                  </div>
                )}
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400 text-sm"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400 text-sm"
                      required={!isLogin}
                      minLength={6}
                    />
                  </div>
                )}

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-medium py-2 transition-all duration-300 hover:scale-105 shadow-kawaii text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Please wait...' : (isLogin ? 'Sign In 💖' : 'Create Account 🌟')}
                </Button>
              </form>

              {/* Forgot Password Link */}
              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(true)}
                    className="text-pink-500 hover:text-pink-600 font-medium transition-colors text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              {/* Toggle between login/signup */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-gray-500 text-xs mt-4">
            Made with 💖 for achieving your dreams
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
