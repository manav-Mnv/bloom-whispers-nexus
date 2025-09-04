import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Brain, 
  Globe, 
  Monitor, 
  Users, 
  MessageSquare,
  Sparkles,
  Zap
} from 'lucide-react';

const upcomingFeatures = [
  {
    icon: Smartphone,
    title: "IoT & Wearable Integration",
    titleHindi: "IoT और पहनने योग्य डिवाइस",
    description: "Seamlessly connect with your smartwatch, fitness trackers, and IoT devices for real-time health monitoring and personalized wellness insights.",
    descriptionHindi: "वास्तविक समय के स्वास्थ्य निगरानी के लिए स्मार्टवॉच से जुड़ें",
    gradient: "from-blue-500 to-cyan-400",
    delay: 0
  },
  {
    icon: Brain,
    title: "Study Buddy AI Companion",
    titleHindi: "अध्ययन साथी AI सहायक",
    description: "Your intelligent study partner that adapts to your learning style, provides personalized study schedules, and offers mental health support during academic stress.",
    descriptionHindi: "आपका बुद्धिमान अध्ययन साथी जो आपकी सीखने की शैली के अनुकूल है",
    gradient: "from-purple-500 to-pink-400",
    delay: 200
  },
  {
    icon: Globe,
    title: "Language Flexibility & Multilingual Support",
    titleHindi: "भाषा लचीलापन और बहुभाषी समर्थन",
    description: "Express yourself in any language. Our AI understands context across 50+ languages with cultural sensitivity and regional wellness practices.",
    descriptionHindi: "50+ भाषाओं में सांस्कृतिक संवेदनशीलता के साथ व्यक्त करें",
    gradient: "from-green-500 to-teal-400",
    delay: 400
  },
  {
    icon: Monitor,
    title: "Progressive Web App (PWA)",
    titleHindi: "प्रोग्रेसिव वेब ऐप (PWA)",
    description: "Access BLOOM anywhere, anytime. Offline functionality, push notifications, and app-like experience across all your devices.",
    descriptionHindi: "कहीं भी, कभी भी BLOOM का उपयोग करें। ऑफ़लाइन कार्यक्षमता",
    gradient: "from-orange-500 to-red-400",
    delay: 600
  },
  {
    icon: Users,
    title: "Adaptive Environment System",
    titleHindi: "अनुकूली वातावरण प्रणाली",
    description: "Dynamic chat environments that evolve based on your social circles, relationships, and life contexts for more meaningful interactions.",
    descriptionHindi: "आपके सामाजिक मंडल के आधार पर विकसित होने वाले वातावरण",
    gradient: "from-indigo-500 to-purple-400",
    delay: 800
  },
  {
    icon: MessageSquare,
    title: "Predefined Relationship & Career AI Advisors",
    titleHindi: "संबंध और करियर AI सलाहकार",
    description: "Specialized AI advisors trained in relationship dynamics, career guidance, and life coaching tailored to your cultural background.",
    descriptionHindi: "रिश्ते की गतिशीलता और करियर मार्गदर्शन में प्रशिक्षित विशेषज्ञ AI",
    gradient: "from-pink-500 to-rose-400",
    delay: 1000
  }
];

export function FeatureLadder() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 glass" variant="secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            Coming Soon
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Future of{' '}
            <span className="bg-gradient-wellness bg-clip-text text-transparent">
              Wellness
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-devanagari">
            आने वाली सुविधाएं जो आपके मानसिक स्वास्थ्य की यात्रा को और भी बेहतर बनाएंगी
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-wellness opacity-30 rounded-full hidden lg:block" />
          
          {upcomingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`relative flex items-center mb-16 lg:mb-24 animate-fade-in-up`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                {/* Desktop Layout */}
                <div className={`hidden lg:flex items-center w-full ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'pr-12' : 'pl-12'}`}>
                    <Card className={`p-8 glass hover:shadow-strong transition-all duration-500 hover:scale-105 group ${
                      isEven ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`flex items-center mb-4 ${
                        isEven ? 'justify-end' : 'justify-start'
                      }`}>
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-glow group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-lg font-devanagari text-primary mb-4 font-medium">
                        {feature.titleHindi}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {feature.description}
                      </p>
                      <p className="text-sm font-devanagari text-muted-foreground">
                        {feature.descriptionHindi}
                      </p>
                    </Card>
                  </div>

                  {/* Center Icon */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-16 h-16 bg-background border-4 border-primary rounded-full flex items-center justify-center shadow-glow relative z-10">
                      <Zap className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12" />
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden w-full">
                  <Card className="p-6 glass hover:shadow-strong transition-all duration-500 group">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-glow group-hover:scale-110 transition-transform mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-sm font-devanagari text-primary font-medium">
                          {feature.titleHindi}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <p className="text-sm font-devanagari text-muted-foreground">
                      {feature.descriptionHindi}
                    </p>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}