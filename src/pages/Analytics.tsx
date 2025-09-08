import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroBackground } from '@/components/HeroBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/store/hooks';
import { 
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Heart,
  Zap,
  Target,
  Users,
  Clock,
  Brain,
  Activity,
  Lightbulb,
  RefreshCw
} from 'lucide-react';

const Analytics = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('7d');
  const [viewType, setViewType] = useState('weekly');

  // Mock data for analytics
  const stats = {
    averageMood: 4.2,
    totalEntries: 12,
    goodDays: 68,
    streakDays: 3
  };

  const moodTrendData = [
    { day: 'Mon', mood: 4, stress: 3, sleep: 5 },
    { day: 'Tue', mood: 3, stress: 4, sleep: 4 },
    { day: 'Wed', mood: 5, stress: 2, sleep: 5 },
    { day: 'Thu', mood: 4, stress: 3, sleep: 4 },
    { day: 'Fri', mood: 5, stress: 2, sleep: 3 },
    { day: 'Sat', mood: 4, stress: 1, sleep: 5 },
    { day: 'Sun', mood: 3, stress: 2, sleep: 4 }
  ];

  const reminderStats = [
    { category: 'Mood Tracking', completed: 52.21, total: 814, rate: '86% avg' },
    { category: 'Meditation', completed: 38.56, total: 614, rate: '72% avg' },
    { category: 'Exercise', completed: 25.82, total: 414, rate: '65% avg' },
    { category: 'Journaling', completed: 22.47, total: 347, rate: '58% avg' }
  ];

  const streakData = [
    { activity: 'Mood Tracking', current: 12, longest: 30, target: 30 },
    { activity: 'Meditation', current: 7, longest: 15, target: 21 },
    { activity: 'Exercise', current: 5, longest: 12, target: 14 },
    { activity: 'Journaling', current: 3, longest: 8, target: 10 }
  ];

  const patternInsights = [
    {
      id: 1,
      title: 'Sleep & Mood Connection',
      description: 'Your mood improves by 23% on days you get 7+ hours of sleep',
      confidence: '87%',
      trend: 'positive'
    },
    {
      id: 2,
      title: 'Exercise Boosts Energy',
      description: 'Energy levels are 34% higher on days with exercise',
      confidence: '92%',
      trend: 'positive'
    },
    {
      id: 3,
      title: 'Social Interaction Boost',
      description: 'Mood increases by 19% on days with social activities',
      confidence: '76%',
      trend: 'positive'
    },
    {
      id: 4,
      title: 'Weekend Mood Pattern',
      description: 'Mood consistently dips on Sunday evenings by 15%',
      confidence: '84%',
      trend: 'negative'
    }
  ];

  return (
    <>
      <HeroBackground />
      <Navigation />
      
      <main className="relative pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Discover patterns and insights in your wellness journey
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">3 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="glass">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="glass">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 glass text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">{stats.averageMood}</span>
              </div>
              <div className="text-sm text-muted-foreground">Average Mood</div>
              <div className="text-xs text-green-500 mt-1">+2.1%</div>
            </Card>
            
            <Card className="p-4 glass text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">{stats.totalEntries}</span>
              </div>
              <div className="text-sm text-muted-foreground">Total Entries</div>
              <div className="text-xs text-green-500 mt-1">+1.5%</div>
            </Card>
            
            <Card className="p-4 glass text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">{stats.goodDays}</span>
              </div>
              <div className="text-sm text-muted-foreground">Good Days</div>
              <div className="text-xs text-green-500 mt-1">+4.2%</div>
            </Card>
            
            <Card className="p-4 glass text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">{stats.streakDays}</span>
              </div>
              <div className="text-sm text-muted-foreground">Streak Days</div>
              <div className="text-xs text-muted-foreground mt-1">86% Getting Started</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mood Trends Chart */}
            <Card className="lg:col-span-2 p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Mood Trends</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="glass">
                    <Filter className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                Track your emotional patterns over the past week
              </div>
              
              {/* Mock Chart Area */}
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
                  {moodTrendData.map((data, index) => (
                    <div key={data.day} className="flex flex-col items-center space-y-2">
                      <div className="flex flex-col space-y-1">
                        <div 
                          className="w-6 bg-blue-500 rounded-t-sm"
                          style={{ height: `${data.mood * 20}px` }}
                        />
                        <div 
                          className="w-6 bg-green-500 rounded-t-sm"
                          style={{ height: `${data.sleep * 15}px` }}
                        />
                        <div 
                          className="w-6 bg-orange-500 rounded-t-sm"
                          style={{ height: `${data.stress * 12}px` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Mood</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Sleep</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Stress</span>
                </div>
              </div>
            </Card>

            {/* Reminder Completion */}
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Reminder Completion</h3>
                <Badge className="text-xs">88% avg</Badge>
              </div>
              
              <div className="space-y-4">
                {reminderStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{stat.category}</span>
                      <span className="text-sm text-muted-foreground">{stat.rate}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-wellness h-2 rounded-full transition-all duration-500"
                        style={{ width: `${stat.completed}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{stat.completed.toFixed(2)}</span>
                      <span>{stat.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Streak Progress */}
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Streak Progress</h3>
                <Button variant="outline" size="sm" className="glass">
                  <Target className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                Build your consistency across wellness activities
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {streakData.map((streak, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(streak.current / streak.target) * 200} 200`}
                          className="text-primary"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{streak.current}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{streak.activity}</div>
                    <div className="text-xs text-muted-foreground">
                      Goal: {streak.target} • Best: {streak.longest}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Mood Calendar */}
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Mood Calendar</h3>
                <div className="text-sm text-muted-foreground">September 2025</div>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                Visual overview of your daily emotional data
              </div>
              
              {/* Mock Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-muted-foreground font-medium">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6; // Start from -6 to show previous month days
                  const isCurrentMonth = day > 0 && day <= 30;
                  const moodColors = [
                    'bg-gray-200', 'bg-red-200', 'bg-orange-200', 
                    'bg-yellow-200', 'bg-green-200', 'bg-blue-200'
                  ];
                  const randomMood = Math.floor(Math.random() * 6);
                  
                  return (
                    <div 
                      key={i} 
                      className={`p-2 rounded text-xs ${
                        isCurrentMonth 
                          ? `${moodColors[randomMood]} cursor-pointer hover:scale-110 transition-transform`
                          : 'text-muted-foreground'
                      }`}
                    >
                      {isCurrentMonth ? day : ''}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between text-xs mt-4">
                <span className="text-muted-foreground">Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <div className="w-3 h-3 bg-green-200 rounded"></div>
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <div className="w-3 h-3 bg-green-800 rounded"></div>
                </div>
                <span className="text-muted-foreground">More</span>
              </div>
            </Card>
          </div>

          {/* Pattern Insights */}
          <Card className="p-6 glass mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Pattern Insights</h3>
              <Button variant="outline" size="sm" className="glass">
                <Lightbulb className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground mb-6">
              AI-generated patterns in your wellness data
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {patternInsights.map((insight) => (
                <div key={insight.id} className="p-4 border border-muted rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Brain className={`w-4 h-4 ${insight.trend === 'positive' ? 'text-green-500' : 'text-orange-500'}`} />
                      <h4 className="font-medium">{insight.title}</h4>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${insight.trend === 'positive' ? 'border-green-500 text-green-500' : 'border-orange-500 text-orange-500'}`}
                    >
                      {insight.confidence}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Analytics;