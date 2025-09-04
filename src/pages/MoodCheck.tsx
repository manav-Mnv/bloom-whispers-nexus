import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroBackground } from '@/components/HeroBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Heart,
  Sparkles,
  Calendar,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  Zap,
  Sun,
  Cloud,
  CloudRain,
  Target,
  Award,
  BarChart3,
  Download
} from 'lucide-react';

const moodEmojis = [
  { value: 1, emoji: '😔', label: 'Very Sad', labelHi: 'बहुत दुखी', color: 'from-red-500 to-red-600', icon: CloudRain },
  { value: 2, emoji: '😕', label: 'Sad', labelHi: 'उदास', color: 'from-orange-500 to-orange-600', icon: Cloud },
  { value: 3, emoji: '😐', label: 'Neutral', labelHi: 'सामान्य', color: 'from-gray-500 to-gray-600', icon: Meh },
  { value: 4, emoji: '😊', label: 'Happy', labelHi: 'खुश', color: 'from-green-500 to-green-600', icon: Smile },
  { value: 5, emoji: '😄', label: 'Very Happy', labelHi: 'बहुत खुश', color: 'from-blue-500 to-purple-600', icon: Sun },
];

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

const MoodCheck = () => {
  const { t, language } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodStreak, setMoodStreak] = useState(7);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { date: '2024-01-01', mood: 4 },
    { date: '2024-01-02', mood: 5 },
    { date: '2024-01-03', mood: 3 },
    { date: '2024-01-04', mood: 4 },
    { date: '2024-01-05', mood: 5 },
    { date: '2024-01-06', mood: 4 },
    { date: '2024-01-07', mood: 3 },
  ]);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(12);
  const [totalEntries, setTotalEntries] = useState(157);
  const [todayMoodSubmitted, setTodayMoodSubmitted] = useState(false);

  const handleMoodSubmit = () => {
    if (selectedMood === null) return;

    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = {
      date: today,
      mood: selectedMood
    };

    setMoodEntries(prev => [...prev, newEntry]);
    setTodayMoodSubmitted(true);
    
    // Update streak if mood is positive (4 or 5)
    if (selectedMood >= 4) {
      setMoodStreak(prev => prev + 1);
    }
  };

  const averageMood = moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length;
  const selectedMoodData = moodEmojis.find(mood => mood.value === selectedMood);

  return (
    <>
      <HeroBackground />
      <Navigation />
      
      <main className="relative pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 glass" variant="secondary">
              <Heart className="w-4 h-4 mr-2" />
              Daily Check-in
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t('howAreYouFeeling')}
            </h1>
            <p className="text-lg text-muted-foreground font-devanagari">
              अपना मूड चुनें और अपनी भावनात्मक यात्रा को ट्रैक करें
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 glass text-center">
              <div className="text-2xl font-bold text-primary">{totalEntries}</div>
              <div className="text-sm text-muted-foreground">Total Entries</div>
            </Card>
            <Card className="p-4 glass text-center">
              <div className="text-2xl font-bold text-primary">{averageMood.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Average Mood</div>
            </Card>
            <Card className="p-4 glass text-center">
              <div className="text-2xl font-bold text-primary">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </Card>
            <Card className="p-4 glass text-center">
              <div className="text-2xl font-bold text-primary">
                {todayMoodSubmitted ? "✓" : "○"}
              </div>
              <div className="text-sm text-muted-foreground">Today's Entry</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Daily Mood Check */}
            <Card className="lg:col-span-2 p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">How are you feeling today?</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="glass">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="glass">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                Track your daily emotional state
              </p>

              {!todayMoodSubmitted ? (
                <>
                  <div className="text-sm font-medium mb-4">Select your mood (1-5 scale)</div>
                  <div className="grid grid-cols-5 gap-3 mb-8">
                    {moodEmojis.map((mood) => {
                      const Icon = mood.icon;
                      return (
                        <button
                          key={mood.value}
                          onClick={() => setSelectedMood(mood.value)}
                          className={`group relative p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                            selectedMood === mood.value
                              ? `bg-gradient-to-br ${mood.color} shadow-glow scale-105 text-white`
                              : 'glass hover:shadow-soft'
                          }`}
                        >
                          <div className="text-4xl mb-2">{mood.emoji}</div>
                          <div className={`text-xs font-medium ${
                            selectedMood === mood.value ? 'text-white' : 'text-muted-foreground'
                          }`}>
                            {language === 'hi' ? mood.labelHi : mood.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedMood && (
                    <div className="text-center">
                      <Button 
                        onClick={handleMoodSubmit}
                        className="bg-gradient-wellness shadow-glow hover:shadow-strong px-8"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Save Mood
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-wellness rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mood Recorded!</h3>
                  <p className="text-muted-foreground">
                    Thank you for checking in today. Come back tomorrow!
                  </p>
                </div>
              )}
            </Card>

            {/* Mood Tracking Streaks */}
            <div className="space-y-4">
              <Card className="p-4 glass">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Days Current Streak</h4>
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{currentStreak}</div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-wellness h-2 rounded-full"
                    style={{ width: `${Math.min((currentStreak / 30) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">0% Getting Started</div>
              </Card>

              <Card className="p-4 glass">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Longest Streak</h4>
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{longestStreak}</div>
                <div className="text-sm text-muted-foreground">Best wellness journey</div>
              </Card>

              <Card className="p-4 glass">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Total Entries</h4>
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{totalEntries}</div>
                <div className="text-sm text-muted-foreground">Days tracked</div>
              </Card>
            </div>
          </div>

          {/* Milestones & Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold mb-4">Milestones</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium">Getting Started</div>
                    <div className="text-sm text-muted-foreground">First mood shared</div>
                  </div>
                  <div className="text-sm text-green-500">3 days to go</div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-muted-foreground">One Week Strong</div>
                    <div className="text-sm text-muted-foreground">Building your streak</div>
                  </div>
                  <div className="text-sm text-muted-foreground">4 days</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start glass">
                  <Calendar className="w-4 h-4 mr-2" />
                  Set Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start glass">
                  <Heart className="w-4 h-4 mr-2" />
                  Write in Journal
                </Button>
                <Button variant="outline" className="w-full justify-start glass">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Share Anonymously
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="font-medium text-red-600 mb-1">Need Support?</div>
                <div className="text-sm text-muted-foreground mb-3">
                  If you're struggling, remember that help is always available.
                </div>
                <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                  Crisis Resources
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default MoodCheck;