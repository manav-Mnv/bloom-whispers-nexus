import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { 
  Home, 
  MessageSquare, 
  Heart, 
  Bell, 
  BookOpen, 
  BarChart3, 
  Lock,
  Menu,
  X
} from 'lucide-react';

const getNavigationItems = (t: (key: string) => string) => [
  { name: t('home'), href: '/', icon: Home },
  { name: t('environments'), href: '/environments', icon: MessageSquare },
  { name: t('moodCheck'), href: '/mood-check', icon: Heart },
  { name: t('reminders'), href: '/reminders', icon: Bell },
  { name: t('journal'), href: '/journal', icon: BookOpen },
  { name: t('analytics'), href: '/analytics', icon: BarChart3 },
  { name: t('confessions'), href: '/confessions', icon: Lock },
];

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigationItems = getNavigationItems(t);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass shadow-soft backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-wellness rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
                  BLOOM
                </h1>
                <p className="text-xs text-muted-foreground font-devanagari">
                  मानसिक कल्याण
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group relative px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-glow' 
                        : 'hover:glass hover:shadow-soft'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Language Toggle & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageToggle />
              
              <Link to="/login">
                <Button variant="outline" size="sm" className="glass">
                  {t('login')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-wellness shadow-glow hover:shadow-strong">
                  {t('signUp')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 glass p-6 shadow-strong">
            <div className="flex flex-col space-y-4 mt-16">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-glow' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-center">
                  <LanguageToggle />
                </div>
                
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full glass">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-wellness shadow-glow">
                    {t('signUp')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}