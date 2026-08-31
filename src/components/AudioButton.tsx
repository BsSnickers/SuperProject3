import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: number;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, className = '', size = 15, label }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.88;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      id={`audio-btn-${text.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '-')}`}
      type="button"
      onClick={speak}
      title="Озвучить немецкую фразу"
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono uppercase tracking-wider bg-white hover:bg-black hover:text-white text-zinc-900 border border-zinc-300 transition-colors cursor-pointer rounded-none select-none ${className}`}
    >
      {isPlaying ? <VolumeX size={size} className="animate-pulse text-zinc-950" /> : <Volume2 size={size} />}
      <span>{label || 'Audio'}</span>
    </button>
  );
};
