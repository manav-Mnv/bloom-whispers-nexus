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
  CloudRain
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
  ]);
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mood Selection */}
            <Card className="p-8 glass">
              <h3 className="text-xl font-semibold mb-6 text-center">
                {t('selectMood')}
              </h3>
              
              {!todayMoodSubmitted ? (
                <>
                  <div className="grid grid-cols-5 gap-4 mb-8">
                    {moodEmojis.map((mood) => {
                      const Icon = mood.icon;
                      return (
                        <button
                          key={mood.value}
                          onClick={() => setSelectedMood(mood.value)}
                          className={`group relative p-4 rounded-xl transition-all duration-300 hover:scale-110 ${
                            selectedMood === mood.value
                              ? `bg-gradient-to-br ${mood.color} shadow-glow scale-110`
                              : 'glass hover:shadow-soft'
                          }`}
                        >
                          <div className="text-4xl mb-2">{mood.emoji}</div>
                          <Icon className={`w-5 h-5 mx-auto ${
                            selectedMood === mood.value ? 'text-white' : 'text-muted-foreground'
                          }`} />
                          <div className={`text-xs mt-1 ${
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
                      <div className={`inline-flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br ${selectedMoodData?.color} text-white shadow-glow mb-4`}>
                        <span className="text-3xl">{selectedMoodData?.emoji}</span>
                        <div className="text-left">
                          <div className="font-semibold">
                            {language === 'hi' ? selectedMoodData?.labelHi : selectedMoodData?.label}
                          </div>
                          <div className="text-sm opacity-90">
                            Selected for today
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleMoodSubmit}
                        className="bg-gradient-wellness shadow-glow hover:shadow-strong"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t('trackMood')}
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

            {/* Mood Stats */}
            <div className="space-y-6">
              {/* Streak Card */}
              <Card className="p-6 glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t('moodStreak')}</h3>
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-primary">
                    {moodStreak}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {t('days')} of positive mood
                    </div>
                    <div className="text-xs font-devanagari text-primary">
                      सकारात्मक मूड के दिन
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-wellness h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((moodStreak / 30) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Goal: 30 days
                </div>
              </Card>

              {/* Average Mood */}
              <Card className="p-6 glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Average Mood</h3>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">
                    {moodEmojis.find(m => Math.round(averageMood) === m.value)?.emoji}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {averageMood.toFixed(1)}/5
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last 7 days
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Moods */}
              <Card className="p-6 glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Check-ins</h3>
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                
                <div className="space-y-3">
                  {moodEntries.slice(-5).reverse().map((entry, index) => {
                    const moodData = moodEmojis.find(m => m.value === entry.mood);
                    return (
                      <div key={entry.date} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{moodData?.emoji}</span>
                          <div>
                            <div className="text-sm font-medium">
                              {new Date(entry.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {moodData?.label}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {entry.mood}/5
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MoodCheck;