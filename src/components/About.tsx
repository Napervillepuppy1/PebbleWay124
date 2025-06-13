
import { ArrowLeft, Heart, Star, Coffee, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutProps {
  onBack: () => void;
}

const About = ({ onBack }: AboutProps) => {
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
          About PebbleWay
        </h1>
      </div>

      <div className="space-y-4 animate-slide-in-up">
        {/* App Info */}
        <div className="glass rounded-3xl p-6 shadow-kawaii text-center">
          <div className="text-6xl mb-4 animate-sparkle">🌸</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            PebbleWay
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Version 1.0.0</p>
          <p className="text-foreground leading-relaxed">
            Transform your dreams into reality with the cutest goal-tracking app ever! 
            PebbleWay brings Japanese kawaii culture to your daily productivity.
          </p>
        </div>

        {/* Features */}
        <div className="glass rounded-3xl p-6 shadow-kawaii">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Features
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-foreground">Beautiful kawaii design</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-foreground">Goal tracking & progress</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-foreground">Journal entries</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-foreground">Multiple themes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm text-foreground">Offline functionality</span>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="glass rounded-3xl p-6 shadow-kawaii">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Made with Love
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Crafted with care to make your goal journey as delightful as possible.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="ghost" size="sm" className="rounded-2xl">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm" className="rounded-2xl">
              <Mail className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </div>

        {/* Love Message */}
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Coffee className="w-4 h-4 text-primary" /> and lots of <Heart className="w-4 h-4 text-red-500" />
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Keep dreaming, keep achieving! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
