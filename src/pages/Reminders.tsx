import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroBackground } from '@/components/HeroBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/store/hooks';
import { 
  Bell,
  Plus,
  Clock,
  Zap,
  Heart,
  Droplets,
  Moon,
  BookOpen,
  Dumbbell,
  Check,
  X,
  Settings
} from 'lucide-react';

interface Reminder {
  id: string;
  type: string;
  title: string;
  time: string;
  frequency: string;
  enabled: boolean;
  icon: any;
  color: string;
  completedToday?: boolean;
}

const reminderTypes = [
  { id: 'meditation', icon: Zap, color: 'from-purple-500 to-indigo-500' },
  { id: 'exercise', icon: Dumbbell, color: 'from-green-500 to-teal-500' },
  { id: 'hydration', icon: Droplets, color: 'from-blue-500 to-cyan-500' },
  { id: 'sleep', icon: Moon, color: 'from-indigo-500 to-purple-500' },
  { id: 'studyBreak', icon: BookOpen, color: 'from-orange-500 to-red-500' },
];

const Reminders = () => {
  const { t } = useLanguage();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'meditation',
      title: 'Morning Meditation',
      time: '08:00',
      frequency: 'daily',
      enabled: true,
      icon: Zap,
      color: 'from-purple-500 to-indigo-500',
      completedToday: false
    },
    {
      id: '2',
      type: 'hydration',
      title: 'Drink Water',
      time: '10:00',
      frequency: 'every-2-hours',
      enabled: true,
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      completedToday: true
    },
    {
      id: '3',
      type: 'exercise',
      title: 'Evening Workout',
      time: '18:00',
      frequency: 'daily',
      enabled: false,
      icon: Dumbbell,
      color: 'from-green-500 to-teal-500',
      completedToday: false
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: '',
    title: '',
    time: '',
    frequency: 'daily'
  });

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, enabled: !reminder.enabled }
        : reminder
    ));
  };

  const completeReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completedToday: !reminder.completedToday }
        : reminder
    ));
  };

  const addReminder = () => {
    if (!newReminder.type || !newReminder.title || !newReminder.time) return;

    const reminderType = reminderTypes.find(type => type.id === newReminder.type);
    if (!reminderType) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      type: newReminder.type,
      title: newReminder.title,
      time: newReminder.time,
      frequency: newReminder.frequency,
      enabled: true,
      icon: reminderType.icon,
      color: reminderType.color,
      completedToday: false
    };

    setReminders(prev => [...prev, reminder]);
    setNewReminder({ type: '', title: '', time: '', frequency: 'daily' });
    setIsAddDialogOpen(false);
  };

  const completedCount = reminders.filter(r => r.completedToday && r.enabled).length;
  const totalActiveReminders = reminders.filter(r => r.enabled).length;

  return (
    <>
      <HeroBackground />
      <Navigation />
      
      <main className="relative pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <Badge className="mb-4 glass" variant="secondary">
              <Bell className="w-4 h-4 mr-2" />
              Wellness Reminders
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t('yourReminders')}
            </h1>
            <p className="text-lg text-muted-foreground font-devanagari">
              अपनी स्वास्थ्य दिनचर्या को ट्रैक करें और स्वस्थ आदतें बनाएं
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Daily Progress */}
            <div className="lg:col-span-3 mb-6">
              <Card className="p-6 glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Today's Progress</h3>
                  <Badge variant="secondary" className="text-sm">
                    {completedCount}/{totalActiveReminders} completed
                  </Badge>
                </div>
                
                <div className="w-full bg-muted rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-wellness h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: totalActiveReminders > 0 
                        ? `${(completedCount / totalActiveReminders) * 100}%` 
                        : '0%' 
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Keep going! 💪</span>
                  <span>{totalActiveReminders > 0 ? Math.round((completedCount / totalActiveReminders) * 100) : 0}%</span>
                </div>
              </Card>
            </div>

            {/* Add New Reminder */}
            <Card className="p-6 glass">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-wellness rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{t('addReminder')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a new wellness reminder
                </p>
                
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-wellness shadow-glow hover:shadow-strong">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="glass">
                    <DialogHeader>
                      <DialogTitle>Create New Reminder</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Type</label>
                        <Select value={newReminder.type} onValueChange={(value) => 
                          setNewReminder(prev => ({ ...prev, type: value }))
                        }>
                          <SelectTrigger className="glass">
                            <SelectValue placeholder="Select reminder type" />
                          </SelectTrigger>
                          <SelectContent>
                            {reminderTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                <div className="flex items-center space-x-2">
                                  <type.icon className="w-4 h-4" />
                                  <span className="capitalize">{t(type.id)}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          value={newReminder.title}
                          onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Morning Meditation"
                          className="glass"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Time</label>
                        <Input
                          type="time"
                          value={newReminder.time}
                          onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                          className="glass"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Frequency</label>
                        <Select value={newReminder.frequency} onValueChange={(value) => 
                          setNewReminder(prev => ({ ...prev, frequency: value }))
                        }>
                          <SelectTrigger className="glass">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="every-2-hours">Every 2 Hours</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button onClick={addReminder} className="w-full bg-gradient-wellness">
                        Create Reminder
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* Active Reminders */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Active Reminders</h3>
              
              {reminders.map((reminder) => {
                const Icon = reminder.icon;
                return (
                  <Card key={reminder.id} className="p-4 glass">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${reminder.color} shadow-glow`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold">{reminder.title}</h4>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{reminder.time}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {reminder.frequency}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {reminder.enabled && (
                          <Button
                            variant={reminder.completedToday ? "default" : "outline"}
                            size="sm"
                            onClick={() => completeReminder(reminder.id)}
                            className={reminder.completedToday 
                              ? "bg-gradient-wellness shadow-glow" 
                              : "glass"
                            }
                          >
                            {reminder.completedToday ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                        
                        <Switch
                          checked={reminder.enabled}
                          onCheckedChange={() => toggleReminder(reminder.id)}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Reminders;