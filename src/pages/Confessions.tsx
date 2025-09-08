import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroBackground } from '@/components/HeroBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/store/hooks';
import { 
  MessageCircle,
  Shield,
  Users,
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Filter,
  Clock,
  ThumbsUp,
  Share2,
  Flag,
  Send
} from 'lucide-react';

interface Confession {
  id: string;
  content: string;
  timestamp: string;
  isVoice?: boolean;
  duration?: string;
  responses: {
    type: 'community' | 'ai';
    content: string;
    author?: string;
    supportCount?: number;
  }[];
  supportCount: number;
  tags: string[];
}

const Confessions = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [newConfession, setNewConfession] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const [confessions] = useState<Confession[]>([
    {
      id: '1',
      content: "I've been struggling with imposter syndrome in my computer science program. Every time I'm in class or...",
      timestamp: '2 hours ago',
      isVoice: true,
      duration: '0:45',
      responses: [
        {
          type: 'community',
          content: "What you're experiencing is incredibly common among high-achieving students, especially in competitive fields like computer science...",
          author: 'Community Support',
          supportCount: 15
        }
      ],
      supportCount: 25,
      tags: ['academic', 'stress', 'support']
    },
    {
      id: '2',
      content: "I've been having panic attacks during exams, and it's affecting my performance. I know the material, but...",
      timestamp: '6 hours ago',
      responses: [
        {
          type: 'community',
          content: "Test anxiety is a real and treatable condition that affects many capable students. The fact that you know the material but struggle during exams is actually very common...",
          author: 'Community Support',
          supportCount: 19
        }
      ],
      supportCount: 34,
      tags: ['anxiety', 'exams', 'mental-health']
    },
    {
      id: '3',
      content: "Today I realized that I've been so focused on grades and achievements that I've forgotten what actually makes...",
      timestamp: '1 day ago',
      responses: [
        {
          type: 'community',
          content: "This realization, while difficult, is actually a gift. Many people go through their entire lives without questioning whether they're living authentically...",
          author: 'Community Support',
          supportCount: 34
        }
      ],
      supportCount: 42,
      tags: ['self-discovery', 'authenticity', 'growth']
    },
    {
      id: '4',
      content: "I'm struggling with my identity and sense of belonging in my new college environment. Everything feels...",
      timestamp: '12 hours ago',
      responses: [
        {
          type: 'ai',
          content: "Your feelings are completely valid and more common than you might think. Starting college is a major life transition...",
          supportCount: 15
        }
      ],
      supportCount: 28,
      tags: ['identity', 'belonging', 'college']
    },
    {
      id: '5',
      content: "I'm dealing with family pressure about my career choices and it's causing me a lot of stress...",
      timestamp: '1 day ago',
      responses: [
        {
          type: 'community',
          content: "Family expectations can be one of the heaviest burdens we carry, especially when they conflict with our own dreams and values...",
          author: 'Community Support',
          supportCount: 22
        }
      ],
      supportCount: 38,
      tags: ['family', 'pressure', 'career']
    }
  ]);

  const handleShare = () => {
    if (!newConfession.trim()) return;
    
    // Here you would typically send to backend
    console.log('Sharing confession:', newConfession);
    setNewConfession('');
    setIsShareOpen(false);
  };

  return (
    <>
      <HeroBackground />
      <Navigation />
      
      <main className="relative pt-20 min-h-screen bg-gradient-to-b from-slate-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 glass bg-purple-500/20 border-purple-500/30" variant="secondary">
              <MessageCircle className="w-4 h-4 mr-2" />
              Anonymous Confessions
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Safe Space to Share</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A safe space to share your thoughts and receive support from our caring community.
              Your privacy is completely protected.
            </p>
          </div>

          {/* Share Button & Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-glow hover:shadow-strong">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Anonymously
                </Button>
              </DialogTrigger>
              
              <DialogContent className="glass bg-slate-900/90 border-purple-500/30 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Share Your Thoughts</DialogTitle>
                  <div className="text-sm text-muted-foreground">
                    Your privacy is our priority. All confessions are completely anonymous.
                  </div>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-green-400">
                    <Shield className="w-4 h-4" />
                    <span>Anonymous • Encrypted • No tracking</span>
                  </div>
                  
                  <Textarea
                    value={newConfession}
                    onChange={(e) => setNewConfession(e.target.value)}
                    placeholder="Share what's on your mind. You're safe here..."
                    rows={6}
                    className="glass bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-400 resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`glass ${isVoiceMode ? 'bg-purple-500/20 border-purple-500' : ''}`}
                        onClick={() => setIsVoiceMode(!isVoiceMode)}
                      >
                        {isVoiceMode ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {newConfession.length}/1000 characters
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsShareOpen(false)}
                        className="glass"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleShare}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>5 confessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>All anonymous</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex bg-slate-800/50 rounded-lg p-1 glass">
              {[
                { id: 'all', label: 'All Confessions', count: '247' },
                { id: 'recent', label: 'Recent', count: '49' },
                { id: 'supported', label: 'Most Supported', count: '89' },
                { id: 'voice', label: 'Voice Messages', count: '35' }
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={filter === item.id ? "default" : "ghost"}
                  className={`text-sm ${filter === item.id ? 'bg-purple-500 text-white' : 'text-muted-foreground hover:text-white'}`}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                  <Badge variant="secondary" className="ml-2 text-xs bg-slate-700">
                    {item.count}
                  </Badge>
                </Button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="glass">
              <Filter className="w-4 h-4 mr-2" />
              Newest First
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                Voice Only
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                All anonymous
              </Button>
            </div>
          </div>

          {/* Confessions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {confessions.map((confession) => (
              <Card key={confession.id} className="p-6 glass bg-slate-800/30 border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">A</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Anonymous</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {confession.timestamp}
                      </div>
                    </div>
                  </div>
                  {confession.isVoice && (
                    <div className="flex items-center space-x-2 bg-purple-500/20 px-2 py-1 rounded-full">
                      <Volume2 className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-purple-400">{confession.duration}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-300 mb-4 line-clamp-3">
                  {confession.content}
                </p>

                {confession.isVoice && (
                  <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                        <Play className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 h-1 bg-slate-600 rounded-full">
                        <div className="w-1/3 h-full bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">0:00 / {confession.duration}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  {confession.responses.map((response, idx) => (
                    <div key={idx} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                          <Heart className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-teal-400">
                          {response.type === 'community' ? 'Community Support' : 'AI Support'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {response.content}
                      </p>
                      {response.supportCount && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Button size="sm" variant="ghost" className="text-xs text-muted-foreground hover:text-teal-400">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {response.supportCount} found this helpful
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-teal-400">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {confession.supportCount}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-white">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Support
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-red-400">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Confessions;