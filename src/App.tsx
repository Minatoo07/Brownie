/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles, Flower2, Cloud, HeartCrack } from 'lucide-react';

const FloatingObject = ({ children, delay = 0, duration = 6, className = "", style = {} }: { children: React.ReactNode, delay?: number, duration?: number, className?: string, style?: React.CSSProperties }) => (
  <motion.div
    initial={{ y: 0, rotate: 0 }}
    animate={{ 
      y: [-10, 10, -10],
      rotate: [-5, 5, -5]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className={`absolute pointer-events-none ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

const BackgroundHearts = ({ count = 40 }: { count?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(count)].map((_, i) => (
      <FloatingObject 
        key={i}
        style={{ 
          top: `${Math.random() * 100}%`, 
          left: `${Math.random() * 100}%`,
          color: '#FF7B7B',
          opacity: 0.3
        }}
        delay={Math.random() * 5}
        duration={4 + Math.random() * 8}
      >
        <Heart size={Math.random() * 20 + 10} fill="currentColor" />
      </FloatingObject>
    ))}
  </div>
);

const messages = ["I love Youuuu ", "Hehehehe", "I will never get tired of You"];

const slides = [
  {
    text: "Kavi remember, Apr 2 , thats the day we got commited , We have gone through a lot of happiness and sadness . But after we broke up all i see is the Happiness we had . Late night talks , giving kisses each other a 100 times , Watching Naruto and Hinata Marriage and Blush, You and me Konjifying when one is not in online , talking about our personal life etc... All the things we have done to make each other happy before the fight we had is all I think ",
    image: "/First slide .jpg",
    layout: "horizontal-left",
    aspect: "portrait"
  },
  {
    text: "I understood what was wrong on my part. I promised you that I i'll love you as you are but not even tried to understand you.I promise you that i will not bring anything that will make you feel uncomfortable hereafter. On my soul, I promise you. Hereafter i will ask for your opinion, if you wanna do - do it otherwie don't , I will always br your side Chla kutyyy.",
    image: "/me2.jpg",
    layout: "horizontal-right",
    aspect: "landscape"
  },
  {
    text: "Every second feels like loosing you. Actually,it is so childih to let you go. How can i let you go when I know that we are made for each other , Our pairr make friends Jealous and Blush. OMG !, You are so Perfect. Am sorry for all the things , But i cant lose you in a million days . We fight, learn , Forgive and do everyhing to stay on. All i ask is forgiveness. You dont have to trust me , You dont have to text me or react to my messges. Just build a relationship , i built Trust for you. I know you are hurt and dont wanna see me, But i cant lose you,  I love youu alottt, like YOU even asked me why am i loving you this much?? I dont know , I Love you. After the trust got built , you can talk , until then its your wish to talk with me or not but i will always ready to hear you sad, happy, anger, and whatnot everythinggg",
    image: "/me1.jpg",
    layout: "horizontal-right",
    aspect: "portrait"
  },
  {
    text: "You believed me when No One does, I dont wanna lose You. We can be silly and happy like before. You know how much i love you na, Am crazy about you, and am not scared to change for you. i need time to realize that. A lifetime with you is all I ask for. I don't even want you to convert, Just be as you are, Please.I know it's crazy that I still don't leave you for you, But I think about our future all the time. I just want you to come with as how you came at first but this time we rewrite the past in future. I will never ever bring up the past, I have changed just for you is all I can say. I still have Hope that you will understand. Am sorry Like 1000000 Times Chla kutty.",
    image: "/silly.jpg",
    layout: "horizontal-left",
    aspect: "portrait"
  },
  {
    text: "You're not just my love; you're my best friend. I can tell you anything, and I know you'll always understand.I'm so grateful for your patience and your kindness. You make me want to be a better person every single day.Am never gonna get tired of you. Am never even gonna explain abut the problem unless you ask me. You dont have to suffer alone.Rememeber school days , I always Protect you my girl",
    image: "/You and me.jpg",
    layout: "horizontal-left",
    aspect: "portrait"
  },
  {
    text: "YOU COMPLETE ME. \n All i ask is just see my Efforts for you. Hereafter, I will do sacrifices for you chla kutty and i never feel lost about that, I mean it ",
    image: "/Demon slayer.jpg",
    layout: "horizontal-right",
    aspect: "landscape"
  },
  {
    text: "Please ignore your guilt ,Anger and Ego. Am not focing you , Am requesting you again and again. Its okay to get patch up, Fight, Break and Forgive , Built and fall for the single person again and again.You said i dont have basic trust right? How can i not trust the world where i live , play, and die in. You are my world and i said I trust you , Its not a verbal thing, From the bottom of my heart i said it. I dont force you as i changed ,  i ask you to take time to give me second change by built a relationship without trust as building trust is what i should do and see for yourself, Butt please please dont leave me. I will not get tired of this. My body and loyalty only meant for you. SO PLEASEEE, Do something for us in  a way that we can built our future as US. Take this as a last chance for us and come with me , i will def try my best not to regret for the decision you make.",
    image: "/Request.jpg",
    layout: "horizontal-left",
    aspect: "landscape"
  },
 {
    text: "I WILL ALWAYS LOVE YOU.",
    image: "/rose.jpg",
    layout: "horizontal-left",
    aspect: "landscape"
  }
];

export default function App() {
  const [loveTexts, setLoveTexts] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const [hasClicked, setHasClicked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'lp' | 'slides' | 'final'>('main');
  const [animationState, setAnimationState] = useState<'none' | 'zooming'>('none');
  const [rpPosition, setRpPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!hasClicked && currentPage === 'main') {
      const timer = setTimeout(() => setShowHint(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasClicked, currentPage]);

  const handleHeartClick = () => {
    if (animationState !== 'none') return;
    setHasClicked(true);
    setShowHint(false);
    const randomText = messages[Math.floor(Math.random() * messages.length)];
    const newText = { 
      id: Date.now(), 
      x: Math.random() * 70 + 5,  // 5% to 75% width to avoid right-side cutoff
      y: Math.random() * 70 + 15, // 15% to 85% height
      text: randomText
    };
    setLoveTexts(prev => [...prev, newText]);
  };

  const removeLoveText = (id: number) => {
    setLoveTexts(prev => prev.filter(t => t.id !== id));
  };

  const [rpClickCount, setRpClickCount] = useState(0);

  const navigateToLP = () => {
    setAnimationState('zooming');
    setTimeout(() => {
      setCurrentPage('lp');
      setAnimationState('none');
      setRpClickCount(0); // Reset count when navigating away
    }, 1000);
  };

  const navigateToRP = () => {
    if (animationState !== 'none') return;

    if (rpClickCount < 4) {
      setRpClickCount(prev => prev + 1);
      // Move to random position
      setRpPosition({
        x: Math.random() * 80 + 10, // 10% to 90%
        y: Math.random() * 80 + 10  // 10% to 90%
      });
    } else {
      setRpClickCount(5);
      // It will vanish via scale animation
    }
  };

  if (currentPage === 'slides') {
    const slide = slides[currentSlide];
    const isHorizontal = slide.layout.startsWith('horizontal');
    const isVertical = slide.layout.startsWith('vertical');
    const isPhotoFirst = slide.layout.endsWith('left') || slide.layout.endsWith('top');

    return (
      <div className="min-h-screen bg-[#FDF8F5] relative flex flex-col items-center justify-center overflow-hidden touch-none">
        {/* Background Elements */}
        <BackgroundHearts count={60} />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF7B7B]/5 to-[#FF7B7B]/10 opacity-50" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-40 animate-pulse" />
        </div>

        <div className="relative z-10 w-full h-screen flex flex-col">
          <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-8">
            <AnimatePresence mode="wait" custom={currentSlide}>
              <motion.div
                key={currentSlide}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y < -100 && currentSlide < slides.length - 1) {
                    setCurrentSlide(prev => prev + 1);
                  } else if (info.offset.y > 100 && currentSlide > 0) {
                    setCurrentSlide(prev => prev - 1);
                  }
                }}
                initial={{ y: 500, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -500, opacity: 0, scale: 1.05 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 25,
                  duration: 0.8
                }}
                className="w-full max-w-5xl h-full max-h-[85vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className={`w-full h-full flex bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/30 shadow-2xl overflow-hidden ${
                  isHorizontal ? 'flex-col md:flex-row' : 'flex-col'
                }`}>
                  
                  {/* Photo Section */}
                  <div className={`relative overflow-hidden group flex items-center justify-center transition-all duration-700 ${
                    isHorizontal 
                      ? 'w-full md:w-[40%] h-1/2 md:h-full' 
                      : 'w-full h-[40%]'
                  } ${!isPhotoFirst && isHorizontal ? 'md:order-2' : ''} ${!isPhotoFirst && isVertical ? 'order-2' : ''}`}>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide.image}
                        initial={{ opacity: 0, filter: 'grayscale(100%)' }}
                        animate={{ opacity: 1, filter: 'grayscale(0%)' }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center p-6"
                      >
                        <div className={`relative shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ${
                          slide.aspect === 'portrait' ? 'aspect-[5/7] h-[98%]' : 'aspect-[7/5] w-[98%]'
                        }`}>
                          <img
                            src={slide.image}
                            alt="Feeling"
                            className="w-full h-full object-cover rounded-2xl border-[12px] border-white shadow-2xl"
                            style={slide.layout === 'vertical-bottom' ? { objectPosition: 'center 30%' } : {}}
                            referrerPolicy="no-referrer"
                          />
                          {/* Trendy Frame Overlay */}
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Text Section */}
                  <div className={`flex flex-col justify-center p-10 md:p-16 transition-all duration-700 ${
                    isHorizontal 
                      ? 'w-full md:w-[60%] h-1/2 md:h-full' 
                      : 'w-full h-[50%]'
                  } ${!isPhotoFirst && isHorizontal ? 'md:order-1' : ''} ${!isPhotoFirst && isVertical ? 'order-1' : ''}`}>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-8"
                    >
                      <div className="w-16 h-1.5 bg-[#FF7B7B]/40 rounded-full" />
                      <p className="text-lg md:text-xl font-vintage text-[#4A3728] leading-relaxed tracking-tight drop-shadow-sm">
                        "{slide.text}"
                      </p>
                      <div className="flex items-center gap-3 text-[#FF7B7B]/60">
                        <Heart size={20} fill="currentColor" />
                        <span className="text-xs uppercase tracking-[0.4em] font-black">
                          {currentSlide === slides.length - 1 ? 'End of explanation' : 'Next'}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Controls */}
          <div className="relative z-20 flex justify-center items-center pb-8 px-4 gap-4">
            <button
              onClick={() => setCurrentPage('lp')}
              className="px-8 py-3 bg-white/40 backdrop-blur-md hover:bg-white/60 text-[#4A3728] rounded-full transition-all text-sm font-bold shadow-sm border border-white/40 tracking-tight"
            >
              Back
            </button>
            
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-10 bg-[#FF7B7B]' : 'w-2 bg-[#FF7B7B]/20'}`} 
                />
              ))}
            </div>

            {currentSlide === slides.length - 1 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setCurrentPage('final')}
                className="px-8 py-3 bg-[#FF7B7B] hover:bg-[#FF6B6B] text-white rounded-full transition-all text-sm font-bold shadow-xl shadow-[#FF7B7B]/20 hover:scale-105 active:scale-95 tracking-tight"
              >
                End of explanation
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'lp') {
    return (
      <div className="min-h-screen bg-[#FDF8F5] relative flex items-center justify-center p-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <BackgroundHearts count={80} />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-[10%] w-64 h-64 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-70 animate-pulse-soft" />
          <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-70 animate-pulse-soft" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stone-50 rounded-full blur-3xl opacity-60" />
        </div>

        {/* Dynamic Cute Objects - Densely filling the page */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(100)].map((_, i) => {
            const icons = [
              <Heart key="h" size={Math.random() * 15 + 15} fill="currentColor" />,
              <Flower2 key="f" size={Math.random() * 20 + 20} />,
              <Star key="s" size={Math.random() * 10 + 10} fill="currentColor" />,
              <Sparkles key="sp" size={Math.random() * 10 + 10} />,
              <Cloud key="c" size={Math.random() * 25 + 25} fill="currentColor" />
            ];
            const colors = ["text-[#FF7B7B]/40", "text-[#FF8B8B]/40", "text-[#FF9B9B]/40", "text-[#FF6B6B]/40", "text-[#FF5B5B]/40"];
            
            return (
              <FloatingObject 
                key={i}
                className={colors[i % colors.length]}
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  opacity: 0.45
                }}
                delay={Math.random() * 5}
                duration={3 + Math.random() * 7}
              >
                {icons[i % icons.length]}
              </FloatingObject>
            );
          })}
        </div>

        <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <AnimatePresence>
            <div className="flex flex-col items-center justify-center w-full max-w-3xl -mt-32">
              {/* Letter Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                className="w-full"
              >
                <div className="bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-inner border border-white/20 relative mb-10">
                  {/* Decorative corner */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B5E3C]/20 rounded-tl-lg" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B5E3C]/20 rounded-br-lg" />
                  
                  <p className="text-lg md:text-xl font-vintage text-[#4A3728] leading-relaxed text-center">
                    HEHEHEHE UMMAHHHHHH, I WILL NEVER EVER GET TIRED OR LEAVE YOU . <br /><br />
                    I LEAVE THE KEY TO MY HEART HERE , INCASE YOU FEEL LIKE GO TO HOME. YOU KNOW ITS OUR "HOME" AND ITS ALWAYS BEEN
                    <Heart className="inline-block ml-2" style={{ color: '#FF7B7B' }} size={28} fill="currentColor" />
                  </p>
                </div>
              
                <div className="flex flex-col items-center gap-4 mb-10">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage('slides')}
                    className="px-10 py-4 bg-[#FF7B7B] hover:bg-[#FF6B6B] text-white rounded-full shadow-xl shadow-[#FF7B7B]/20 transition-all font-semibold tracking-wide"
                  >
                    Go to the part of the things i want to say you
                  </motion.button>
                </div>
              </motion.div>

              {/* Heart Burst Animation - Now positioned below the letter */}
              <div className="relative h-32 flex items-center justify-center mt-4">
                {/* Main Heart Burst with Drop Animation like RP */}
                <motion.div
                  key="heart-burst"
                  initial={{ scale: 1, y: -300, opacity: 0 }}
                  animate={{ 
                    y: [ -300, 0, 0, 0 ],
                    scale: [ 1, 1, 3, 0 ],
                    opacity: [ 0, 1, 1, 0 ],
                    rotate: [ 0, 0, 15, -15, 0 ]
                  }}
                  transition={{ 
                    duration: 3.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeOut"
                  }}
                >
                  <Heart size={120} style={{ color: '#FF7B7B' }} fill="currentColor" />
                </motion.div>

                {/* Burst Particles */}
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{ 
                      scale: [0, 1.2, 0.6],
                      x: (Math.cos(i * 22.5 * (Math.PI / 180)) * 180),
                      y: (Math.sin(i * 22.5 * (Math.PI / 180)) * 180),
                      opacity: [1, 1, 0]
                    }}
                    transition={{ 
                      delay: 2.2,
                      duration: 1,
                      ease: "easeOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <Heart size={20} style={{ color: '#FF7B7B' }} fill="currentColor" />
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (currentPage === 'final') {
    return (
      <div className="min-h-screen bg-[#FDF8F5] relative flex flex-col items-center justify-center p-6 overflow-hidden">
        <BackgroundHearts count={80} />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-[10%] w-64 h-64 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-70 animate-pulse-soft" />
          <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-70 animate-pulse-soft" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-vintage text-[#4A3728] mb-8 tracking-tight">
            End of explanation
          </h1>
          <button
            onClick={() => {
              setCurrentPage('main');
              setCurrentSlide(0);
            }}
            className="px-10 py-4 bg-[#FF7B7B] hover:bg-[#FF6B6B] text-white rounded-full shadow-xl shadow-[#FF7B7B]/20 transition-all font-semibold tracking-wide"
          >
            Restart
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] relative flex flex-col items-center justify-center p-6 overflow-hidden">
      <BackgroundHearts count={60} />
      <AnimatePresence>
        {loveTexts.map(text => (
          <motion.div
            key={text.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: [0, -100], 
              scale: [0.5, 1.2, 1],
            }}
            style={{ 
              left: `${text.x}%`, 
              top: `${text.y}%`,
              position: 'absolute'
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            onAnimationComplete={() => removeLoveText(text.id)}
            className="text-[#FF7B7B] font-cute whitespace-nowrap pointer-events-none z-50 text-xl md:text-2xl drop-shadow-lg"
          >
            {text.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-70 animate-pulse-soft" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-[#FF7B7B]/10 rounded-full blur-3xl opacity-70 animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-stone-50 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Dynamic Cute Objects */}
      <FloatingObject className="top-20 left-20 text-[#FF7B7B]/30" delay={0}>
        <Heart size={48} fill="currentColor" opacity={0.6} />
      </FloatingObject>
      
      <FloatingObject className="bottom-40 left-[15%] text-[#FF7B7B]/20" delay={1.5} duration={7}>
        <Flower2 size={56} opacity={0.6} />
      </FloatingObject>

      <FloatingObject className="top-40 right-[15%] text-[#FF7B7B]/40" delay={2} duration={5}>
        <Star size={40} fill="currentColor" opacity={0.7} />
      </FloatingObject>

      <FloatingObject className="bottom-20 right-20 text-[#FF7B7B]/20" delay={0.5} duration={8}>
        <Cloud size={64} fill="currentColor" opacity={0.5} />
      </FloatingObject>

      <FloatingObject className="top-1/4 right-1/3 text-[#FF7B7B]/30" delay={3} duration={4}>
        <Sparkles size={32} opacity={0.8} />
      </FloatingObject>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <header className="mb-8">
          <div className="relative inline-block mb-6">
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: -50,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  exit={{ opacity: 0, scale: 0, y: -20 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-[#8B5E3C] text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-lg z-40 pointer-events-none"
                >
                  CLICK ME
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#8B5E3C] rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: animationState === 'zooming' ? 0 : 1,
                opacity: animationState === 'zooming' ? 0 : 1
              }}
              whileHover={animationState === 'none' ? { scale: 1.1 } : {}}
              whileTap={animationState === 'none' ? { scale: 0.9 } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10,
                duration: animationState === 'zooming' ? 0.8 : 0.3
              }}
              onClick={handleHeartClick}
              className="relative p-4 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-sm cursor-pointer hover:bg-white/60 transition-colors"
            >
              <Heart style={{ color: '#FF7B7B' }} fill="currentColor" size={32} />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif italic text-[#4A3728] mb-4 tracking-tight">
            Can we Start it over again? Hayati
          </h1>
          <p className="text-xl text-[#6F4E37] font-light tracking-wide">
            A small drop from my ocean of efforts for YOU
          </p>
        </header>

        <section className="grid gap-6">
          <div className="p-8 bg-white/30 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-xl shadow-[#FF7B7B]/10">
            <p className="text-xl leading-relaxed text-[#4A3728]">
              "Relationship doesnt always need to be happy and end in break but sometimes only to listen, forgive and understand"
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={navigateToLP}
              className="px-8 py-3 bg-[#FF7B7B] hover:bg-[#FF6B6B] text-white rounded-full transition-all duration-300 shadow-lg shadow-[#FF7B7B]/20 font-medium"
            >
              Get into the heart
            </button>
            <motion.button 
              animate={{ 
                scale: rpClickCount === 5 ? 0 : 1 - (rpClickCount * 0.18),
                opacity: rpClickCount === 5 ? 0 : 1,
                left: rpPosition ? `${rpPosition.x}%` : 'auto',
                top: rpPosition ? `${rpPosition.y}%` : 'auto',
                position: rpPosition ? 'fixed' : 'relative',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={navigateToRP}
              className="px-8 py-3 bg-white/50 hover:bg-white/80 text-[#6F4E37] rounded-full border border-white/60 font-medium z-[60]"
            >
              Dont leave ma
            </motion.button>
          </div>
        </section>

        <footer className="mt-16 text-[#8D6E63] text-sm uppercase tracking-[0.2em]">
          Made by gem ( with Love, Effort and Hope )
        </footer>
      </motion.main>

      {/* Extra floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#FF7B7B]/30 rounded-full opacity-60 pointer-events-none"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%" 
          }}
          animate={{ 
            y: [null, "-100%"],
            opacity: [0.6, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
}
