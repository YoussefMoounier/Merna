'use client'

import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

interface BackgroundMusicProps {
  src: string;
  loop?: boolean;
}

export default function BackgroundMusic({ src, loop = true }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setIsMuted(false); // Unmute when volume is adjusted
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-800 bg-opacity-75 p-3 rounded-lg flex items-center space-x-3">
      <audio ref={audioRef} src={src} loop={loop} />

      <button onClick={togglePlayPause} className="text-white text-lg">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button onClick={toggleMute} className="text-white text-lg">
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="w-24"
      />
    </div>
  );
} 