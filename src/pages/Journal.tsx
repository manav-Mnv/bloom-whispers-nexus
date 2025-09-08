import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroBackground } from '@/components/HeroBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/store/hooks';
import { 
  BookOpen,
  Plus,
  Search,
  Shield,
  Lock,
  Calendar,
  ChevronDown,
  Upload,
  Download,
  Edit3,
  Tag
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  wordCount: number;
  tags: string[];
  mood?: number;
}

const Journal = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'First Day of College',
      content: 'Today marks the beginning of a new chapter in my life. Walking through the campus gates felt surreal...',
      date: '1/2/2024',
      wordCount: 156,
      tags: ['college', 'new-beginnings', 'excitement']
    },
    {
      id: '2',
      title: 'Midterm Stress',
      content: 'The pressure is real. Three midterms next week and I feel like I\'m drowning in textbooks and lectures...',
      date: '1/2/2024',
      wordCount: 134,
      tags: ['stress', 'midterms', 'study']
    },
    {
      id: '3',
      title: 'Weekend Reflections',
      content: 'Finally, a moment to breathe. This weekend has been exactly what I needed - no deadlines, no...',
      date: '12/2/2024',
      wordCount: 142,
      tags: ['reflection', 'family', 'self-care']
    },
    {
      id: '4',
      title: 'Draft - Thoughts on Friendship',
      content: 'Making friends in college is different than I expected. It\'s not like high school where you\'re...',
      date: '12/3/2024',
      wordCount: 78,
      tags: ['friendship', 'college-life', 'relationships']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const handleNewEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toLocaleDateString(),
      wordCount: newEntry.content.split(' ').length,
      tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    setEntries(prev => [entry, ...prev]);
    setNewEntry({ title: '', content: '', tags: '' });
    setIsNewEntryOpen(false);
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <HeroBackground />
      <Navigation />
      
      <main className="relative pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">Encrypted & Secure</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">Journal Entries</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="glass">
                <Upload className="w-4 h-4 mr-2" />
                Backup & Import
              </Button>
              <Button variant="outline" size="sm" className="glass">
                <Download className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Journal Entries List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="wordCount">Word Count</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="glass">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {filteredEntries.map((entry, index) => (
                  <Card key={entry.id} className="p-4 glass hover:shadow-soft transition-all duration-200 cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg flex items-center">
                        {entry.title}
                        {entry.title.includes('Draft') && (
                          <Badge variant="secondary" className="ml-2 text-xs">Draft</Badge>
                        )}
                      </h3>
                      <div className="text-sm text-muted-foreground">{entry.date}</div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {entry.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{entry.wordCount} words</span>
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {entry.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{entry.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Your Private Journal */}
            <div className="lg:col-span-2">
              <Card className="p-8 glass text-center mb-6">
                <div className="w-16 h-16 bg-gradient-wellness rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Your Private Journal</h2>
                <p className="text-muted-foreground mb-6">
                  A secure space for your thoughts, reflections, and personal growth. 
                  All entries are encrypted and stored locally for maximum privacy.
                </p>
                
                <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-wellness shadow-glow hover:shadow-strong">
                      <Plus className="w-4 h-4 mr-2" />
                      Start Writing
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="glass max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>New Journal Entry</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          value={newEntry.title}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="What's on your mind today?"
                          className="glass"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Content</label>
                        <Textarea
                          value={newEntry.content}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Write your thoughts here..."
                          rows={8}
                          className="glass resize-none"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                        <Input
                          value={newEntry.tags}
                          onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                          placeholder="e.g., reflection, gratitude, goals"
                          className="glass"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Lock className="w-4 h-4" />
                          <span>End-to-end encrypted</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setIsNewEntryOpen(false)}
                            className="glass"
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleNewEntry} className="bg-gradient-wellness">
                            Save Entry
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 glass text-center">
                  <div className="text-2xl font-bold text-primary">{entries.length}</div>
                  <div className="text-sm text-muted-foreground">Total Entries</div>
                </Card>
                <Card className="p-4 glass text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(entries.reduce((sum, entry) => sum + entry.wordCount, 0) / entries.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Words</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Journal;