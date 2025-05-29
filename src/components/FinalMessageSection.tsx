'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface FinalMessageSectionProps {
  message: string;
}

export default function FinalMessageSection({ message }: FinalMessageSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/amir.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.7;
      audioRef.current.onerror = (e) => {
        console.error('Error loading audio for FinalMessageSection:', e);
        console.warn('Please ensure that /amir.mp3 exists in the public folder.');
      };
      audioRef.current.onplay = () => {
        console.log('FinalMessageSection audio started playing.');
      };
      audioRef.current.onpause = () => {
        console.log('FinalMessageSection audio paused.');
      };
    }

    if (isVisible) {
      audioRef.current.play().catch(error => {
        console.warn('Autoplay prevented or failed for FinalMessageSection audio.', error);
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current && !isVisible) {
        audioRef.current.pause();
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center"
      >
        <motion.h2 
          className="text-5xl md:text-7xl font-bold mb-6"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.8)",
              "0 0 30px rgba(255,255,255,1)",
              "0 0 20px rgba(255,255,255,0.8)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          يا اغلي ما عندي
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl md:text-3xl whitespace-pre-line"
        >
          {message}
        </motion.p>
      </motion.div>
    </section>
  );
} 