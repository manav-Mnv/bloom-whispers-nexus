import { useState, useEffect } from 'react';

const quotes = [
  {
    sanskrit: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः",
    transliteration: "Sarve bhavantu sukhinah sarve santu niramayah",
    meaning: "May all beings be happy, may all beings be free from disease",
    hindi: "सभी प्राणी सुखी हों, सभी निरोगी हों"
  },
  {
    sanskrit: "आत्मानो मोक्षार्थं जगद्धिताय च",
    transliteration: "Atmano mokshartham jagaddhitaya cha",
    meaning: "For one's own liberation and for the welfare of the world",
    hindi: "अपनी मुक्ति और जगत के कल्याण के लिए"
  },
  {
    sanskrit: "यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः",
    transliteration: "Yatra naryastu pujyante ramante tatra devatah",
    meaning: "Where women are honored, divinity blossoms there",
    hindi: "जहाँ नारी की पूजा होती है, वहाँ देवता निवास करते हैं"
  },
  {
    sanskrit: "सत्यं वद धर्मं चर",
    transliteration: "Satyam vada dharmam chara",
    meaning: "Speak the truth, walk the righteous path",
    hindi: "सत्य बोलो, धर्म का आचरण करो"
  },
  {
    sanskrit: "वसुधैव कुटुम्बकम्",
    transliteration: "Vasudhaiva kutumbakam",
    meaning: "The world is one family",
    hindi: "सारा संसार एक परिवार है"
  },
  {
    sanskrit: "श्रद्धावान् लभते ज्ञानं",
    transliteration: "Shraddhavan labhate gyanam",
    meaning: "The faithful attains wisdom",
    hindi: "श्रद्धावान व्यक्ति ज्ञान प्राप्त करता है"
  }
];

export function QuoteRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto text-center py-12">
      <div 
        className={`transition-all duration-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}
      >
        {/* Sanskrit Quote */}
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-devanagari font-medium text-primary mb-4 leading-relaxed">
          "{currentQuote.sanskrit}"
        </blockquote>

        {/* Transliteration */}
        <p className="text-lg md:text-xl text-muted-foreground italic mb-3 font-light">
          {currentQuote.transliteration}
        </p>

        {/* Hindi Translation */}
        <p className="text-lg md:text-xl font-devanagari text-secondary mb-4 font-medium">
          {currentQuote.hindi}
        </p>

        {/* English Meaning */}
        <p className="text-base md:text-lg text-foreground/80 font-light max-w-2xl mx-auto">
          {currentQuote.meaning}
        </p>
      </div>

      {/* Quote Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary shadow-glow scale-125'
                : 'bg-muted hover:bg-muted-foreground/30'
            }`}
            aria-label={`View quote ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -left-4 text-6xl text-primary/10 font-serif select-none">
        "
      </div>
      <div className="absolute -bottom-4 -right-4 text-6xl text-primary/10 font-serif select-none rotate-180">
        "
      </div>
    </div>
  );
}