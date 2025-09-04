import { HeroBackground } from "@/components/HeroBackground";
import { Navigation } from "@/components/Navigation";
import { QuoteRotator } from "@/components/QuoteRotator";
import { FeatureLadder } from "@/components/FeatureLadder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Heart, 
  Shield, 
  Users, 
  Sparkles, 
  ArrowRight,
  Play,
  Star
} from "lucide-react";

const coreFeatures = [
  {
    icon: Brain,
    name: "Mind Spaces",
    nameHindi: "मन के स्थान",
    description: "Create personalized environments for different aspects of your life - family, work, personal growth.",
    descriptionHindi: "जीवन के विभिन्न पहलुओं के लिए व्यक्तिगत वातावरण बनाएं"
  },
  {
    icon: Heart,
    name: "Mood Gardens",
    nameHindi: "मूड गार्डन",
    description: "Track your emotional journey with beautiful visualizations and gentle check-ins.",
    descriptionHindi: "सुंदर दृश्यों और कोमल जांच के साथ अपनी भावनात्मक यात्रा को ट्रैक करें"
  },
  {
    icon: Shield,
    name: "Sacred Vault",
    nameHindi: "पवित्र तिजोरी",
    description: "Your private, encrypted space for deepest thoughts and anonymous confessions.",
    descriptionHindi: "सबसे गहरे विचारों और गुमनाम स्वीकारोक्ति के लिए आपका निजी स्थान"
  },
  {
    icon: Users,
    name: "Wellness Circle",
    nameHindi: "कल्याण मंडल",
    description: "Connect with AI companions and real support networks tailored to your needs.",
    descriptionHindi: "आपकी जरूरतों के अनुकूल AI साथी और वास्तविक सहायता नेटवर्क से जुड़ें"
  }
];

const Index = () => {
  return (
    <>
      <HeroBackground />
      <Navigation />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="container mx-auto text-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 glass text-lg px-6 py-2" variant="secondary">
                <Sparkles className="w-5 h-5 mr-2" />
                Mental Wellness Reimagined
              </Badge>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-wellness bg-clip-text text-transparent animate-gradient-shift bg-300%">
                  BLOOM
                </span>
              </h1>
              
              <p className="text-2xl lg:text-3xl font-devanagari text-primary mb-8 font-medium">
                मानसिक कल्याण की नई शुरुआत
              </p>
              
              <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
                Experience holistic mental wellness through AI-powered conversations, 
                mood tracking, and personalized environments designed for your unique journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-wellness shadow-glow hover:shadow-strong text-lg px-8 py-6 group">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="glass text-lg px-8 py-6 group">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <QuoteRotator />
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Your Mental Wellness{' '}
                <span className="bg-gradient-wellness bg-clip-text text-transparent">
                  Ecosystem
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-devanagari">
                एक संपूर्ण मानसिक स्वास्थ्य प्लेटफॉर्म जो आपकी हर जरूरत को समझता है
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-8 text-center glass hover:shadow-strong transition-all duration-500 hover:scale-105 group cursor-pointer"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-16 h-16 bg-gradient-wellness rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{feature.name}</h3>
                    <p className="text-lg font-devanagari text-primary mb-4 font-medium">
                      {feature.nameHindi}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <p className="text-sm font-devanagari text-muted-foreground">
                      {feature.descriptionHindi}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 px-4 bg-gradient-wellness text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Our Vision</h2>
              <p className="text-2xl font-devanagari mb-8 opacity-90">
                हमारा दृष्टिकोण
              </p>
              <blockquote className="text-xl lg:text-2xl leading-relaxed font-light italic">
                "To create a world where mental wellness is accessible, understood, and celebrated. 
                Where every individual has the tools and support to flourish in their unique journey 
                towards emotional balance and psychological growth."
              </blockquote>
              <p className="text-lg font-devanagari mt-6 opacity-90">
                "एक ऐसी दुनिया बनाना जहाँ मानसिक कल्याण सुलभ, समझा जाने योग्य और मनाने योग्य हो।"
              </p>
              
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-3 text-lg">Trusted by thousands</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Features */}
        <FeatureLadder />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to{' '}
                <span className="bg-gradient-wellness bg-clip-text text-transparent">
                  BLOOM?
                </span>
              </h2>
              <p className="text-xl font-devanagari text-primary mb-8">
                अपनी मानसिक स्वास्थ्य यात्रा शुरू करें
              </p>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join thousands who have already started their journey towards better mental health 
                and emotional wellness with BLOOM's AI-powered platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-wellness shadow-glow hover:shadow-strong text-lg px-8 py-6">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="glass text-lg px-8 py-6">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
