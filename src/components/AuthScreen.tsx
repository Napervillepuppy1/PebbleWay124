
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just proceed to the app
    // In a real app, you'd validate credentials here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2 animate-bounce-gentle">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <Sparkles className="w-8 h-8 text-pink-400 animate-sparkle" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              PebbleWay
            </h1>
            <p className="text-gray-600 text-lg mt-2">Your Kawaii Goals 🌸</p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="glass border-0 shadow-kawaii-lg backdrop-blur-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back!' : 'Join PebbleWay'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isLogin 
                ? 'Continue your kawaii journey ✨' 
                : 'Start your cute goal adventure 🎯'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <Input
                    type="text"
                    placeholder="Your cute name ✨"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-medium py-3 transition-all duration-300 hover:scale-105 shadow-kawaii"
              >
                {isLogin ? 'Sign In 💖' : 'Create Account 🌟'}
              </Button>
            </form>

            {/* Toggle between login/signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
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

            {/* Demo login hint */}
            <div className="mt-4 p-3 bg-pink-50 rounded-xl border border-pink-200">
              <p className="text-xs text-pink-700 text-center">
                💡 This is a demo - any email/password will work!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          Made with 💖 for achieving your dreams
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
