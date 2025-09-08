import { useState, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroBackground } from '@/components/HeroBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/store/hooks';
import { 
  MessageSquare, 
  Users, 
  Briefcase, 
  Heart, 
  UserPlus,
  Mic,
  MicOff,
  Send,
  Bot,
  User
} from 'lucide-react';

const environments = [
  { id: 'family', icon: Users, color: 'from-green-500 to-teal-400' },
  { id: 'work', icon: Briefcase, color: 'from-blue-500 to-indigo-400' },
  { id: 'personal', icon: Heart, color: 'from-purple-500 to-pink-400' },
  { id: 'friends', icon: MessageSquare, color: 'from-orange-500 to-red-400' },
];

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isVoice?: boolean;
}

const Environments = () => {
  const { t } = useLanguage();
  const [selectedEnv, setSelectedEnv] = useState('family');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're sharing something about your ${selectedEnv} environment. I'm here to listen and support you. How can I help you process these feelings?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.start();
        setIsRecording(true);

        mediaRecorder.ondataavailable = (event) => {
          // Handle voice recording data here
          const voiceMessage: Message = {
            id: Date.now().toString(),
            content: 'Voice message recorded',
            sender: 'user',
            timestamp: new Date(),
            isVoice: true
          };
          setMessages(prev => [...prev, voiceMessage]);
        };
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const selectedEnvironment = environments.find(env => env.id === selectedEnv);

  return (
    <>
      <HeroBackground />
      <Navigation />
      
      <main className="relative pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t('environments')}
            </h1>
            <p className="text-lg text-muted-foreground font-devanagari">
              वातावरण चुनें और AI के साथ बातचीत करें
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Environment Selection */}
            <div className="lg:col-span-1">
              <Card className="p-6 glass sticky top-24">
                <h3 className="text-lg font-semibold mb-4">{t('selectEnvironment')}</h3>
                <div className="space-y-3">
                  {environments.map((env) => {
                    const Icon = env.icon;
                    return (
                      <Button
                        key={env.id}
                        variant={selectedEnv === env.id ? 'default' : 'outline'}
                        className={`w-full justify-start h-12 ${
                          selectedEnv === env.id 
                            ? `bg-gradient-to-r ${env.color} text-white shadow-glow` 
                            : 'glass'
                        }`}
                        onClick={() => setSelectedEnv(env.id)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {t(env.id)}
                      </Button>
                    );
                  })}
                  
                  <Button variant="outline" className="w-full justify-start h-12 glass border-dashed">
                    <UserPlus className="w-5 h-5 mr-3" />
                    {t('createNew')}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="glass overflow-hidden h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedEnvironment?.color} shadow-glow`}>
                      {selectedEnvironment && (
                        <selectedEnvironment.icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold capitalize">{t(selectedEnv)}</h3>
                      <Badge variant="secondary" className="text-xs">
                        AI Companion Active
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation in your {t(selectedEnv)} space</p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        message.sender === 'user' 
                          ? 'bg-primary' 
                          : 'bg-gradient-wellness'
                      } shadow-glow`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'glass border'
                      }`}>
                        {message.isVoice ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-wellness rounded-full flex items-center justify-center">
                              <Mic className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm">Voice message</span>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-gradient-wellness shadow-glow">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="glass border p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant={isRecording ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={toggleRecording}
                      className={isRecording ? 'animate-pulse' : ''}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={t('typeMessage')}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 glass"
                    />
                    
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-wellness shadow-glow hover:shadow-strong"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Environments;