import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    environments: 'Environments',
    moodCheck: 'Mood Check',
    reminders: 'Reminders',
    journal: 'Journal',
    analytics: 'Analytics',
    confessions: 'Confessions',
    login: 'Login',
    signUp: 'Sign Up',
    
    // Home page
    mentalWellnessReimagined: 'Mental Wellness Reimagined',
    welcomeTo: 'Welcome to',
    mentalWellnessNewBeginning: 'A new beginning of mental wellness',
    experienceHolistic: 'Experience holistic mental wellness through AI-powered conversations, mood tracking, and personalized environments designed for your unique journey.',
    startYourJourney: 'Start Your Journey',
    watchDemo: 'Watch Demo',
    yourMentalWellness: 'Your Mental Wellness',
    ecosystem: 'Ecosystem',
    ourVision: 'Our Vision',
    visionQuote: 'To create a world where mental wellness is accessible, understood, and celebrated. Where every individual has the tools and support to flourish in their unique journey towards emotional balance and psychological growth.',
    readyToBloom: 'Ready to BLOOM?',
    joinThousands: 'Join thousands who have already started their journey towards better mental health and emotional wellness with BLOOM\'s AI-powered platform.',
    getStartedFree: 'Get Started Free',
    signIn: 'Sign In',
    futureOfWellness: 'Future of Wellness',
    futureDesc: 'Discover what\'s coming next in mental health technology',
    
    // Core Features
    mindSpaces: 'Mind Spaces',
    mindSpacesDesc: 'Create personalized environments for different aspects of your life - family, work, personal growth.',
    moodGardens: 'Mood Gardens',
    moodGardensDesc: 'Track your emotional journey with beautiful visualizations and gentle check-ins.',
    sacredVault: 'Sacred Vault',
    sacredVaultDesc: 'Your private, encrypted space for deepest thoughts and anonymous confessions.',
    wellnessCircle: 'Wellness Circle',
    wellnessCircleDesc: 'Connect with AI companions and real support networks tailored to your needs.',
    
    // Environments
    selectEnvironment: 'Select Environment',
    createNew: 'Create New',
    family: 'Family',
    work: 'Work',
    personal: 'Personal',
    friends: 'Friends',
    typeMessage: 'Type your message...',
    send: 'Send',
    
    // Mood Check
    howAreYouFeeling: 'How are you feeling today?',
    selectMood: 'Select your current mood',
    moodStreak: 'Mood Streak',
    days: 'days',
    trackMood: 'Track Mood',
    
    // Reminders
    yourReminders: 'Your Reminders',
    addReminder: 'Add Reminder',
    meditation: 'Meditation',
    exercise: 'Exercise',
    hydration: 'Hydration',
    sleep: 'Sleep',
    studyBreak: 'Study Break'
  },
  hi: {
    // Navigation
    home: 'होम',
    environments: 'वातावरण',
    moodCheck: 'मूड चेक',
    reminders: 'रिमाइंडर',
    journal: 'डायरी',
    analytics: 'विश्लेषण',
    confessions: 'गुप्त बातें',
    login: 'लॉगिन',
    signUp: 'साइन अप',
    
    // Home page
    mentalWellnessReimagined: 'मानसिक कल्याण की नई शुरुआत',
    welcomeTo: 'आपका स्वागत है',
    mentalWellnessNewBeginning: 'मानसिक कल्याण की नई शुरुआत',
    experienceHolistic: 'AI-संचालित बातचीत, मूड ट्रैकिंग और व्यक्तिगत वातावरण के माध्यम से समग्र मानसिक कल्याण का अनुभव करें।',
    startYourJourney: 'अपनी यात्रा शुरू करें',
    watchDemo: 'डेमो देखें',
    yourMentalWellness: 'आपका मानसिक कल्याण',
    ecosystem: 'इकोसिस्टम',
    ourVision: 'हमारा दृष्टिकोण',
    visionQuote: 'एक ऐसी दुनिया बनाना जहाँ मानसिक कल्याण सुलभ, समझा जाने योग्य और मनाने योग्य हो। जहाँ हर व्यक्ति के पास भावनात्मक संतुलन की दिशा में फलने-फूलने के लिए उपकरण हों।',
    readyToBloom: 'BLOOM के लिए तैयार हैं?',
    joinThousands: 'हजारों लोगों के साथ जुड़ें जो पहले से ही BLOOM के AI-संचालित प्लेटफॉर्म के साथ बेहतर मानसिक स्वास्थ्य की यात्रा शुरू कर चुके हैं।',
    getStartedFree: 'निःशुल्क शुरू करें',
    signIn: 'साइन इन',
    futureOfWellness: 'कल्याण का भविष्य',
    futureDesc: 'मानसिक स्वास्थ्य प्रौद्योगिकी में आगे क्या आ रहा है, जानिए',
    
    // Core Features
    mindSpaces: 'मन के स्थान',
    mindSpacesDesc: 'जीवन के विभिन्न पहलुओं के लिए व्यक्तिगत वातावरण बनाएं - परिवार, काम, व्यक्तिगत विकास।',
    moodGardens: 'मूड गार्डन',
    moodGardensDesc: 'सुंदर दृश्यों और कोमल जांच के साथ अपनी भावनात्मक यात्रा को ट्रैक करें।',
    sacredVault: 'पवित्र तिजोरी',
    sacredVaultDesc: 'सबसे गहरे विचारों और गुमनाम स्वीकारोक्ति के लिए आपका निजी, एन्क्रिप्टेड स्थान।',
    wellnessCircle: 'कल्याण मंडल',
    wellnessCircleDesc: 'आपकी जरूरतों के अनुकूल AI साथी और वास्तविक सहायता नेटवर्क से जुड़ें।',
    
    // Environments
    selectEnvironment: 'वातावरण चुनें',
    createNew: 'नया बनाएं',
    family: 'परिवार',
    work: 'काम',
    personal: 'व्यक्तिगत',
    friends: 'मित्र',
    typeMessage: 'अपना संदेश टाइप करें...',
    send: 'भेजें',
    
    // Mood Check
    howAreYouFeeling: 'आज आप कैसा महसूस कर रहे हैं?',
    selectMood: 'अपना वर्तमान मूड चुनें',
    moodStreak: 'मूड स्ट्रीक',
    days: 'दिन',
    trackMood: 'मूड ट्रैक करें',
    
    // Reminders
    yourReminders: 'आपके रिमाइंडर',
    addReminder: 'रिमाइंडर जोड़ें',
    meditation: 'ध्यान',
    exercise: 'व्यायाम',
    hydration: 'जलयोजन',
    sleep: 'नींद',
    studyBreak: 'अध्ययन विराम'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}