import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ShoppingBag,
  Music,
  Instagram,
  Mic,
  Film,
  Sparkles,
  Radio
} from 'lucide-react';
import { ReelItem, Product, BrandConfig } from '../types';

interface ReelPlayerModalProps {
  reel: ReelItem | null;
  onClose: () => void;
  onOpenProductById: (id: string) => void;
  products: Product[];
  brandConfig?: BrandConfig;
}

export const ReelPlayerModal: React.FC<ReelPlayerModalProps> = ({
  reel,
  onClose,
  onOpenProductById,
  products,
  brandConfig,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync Video & Voice Playback State
  useEffect(() => {
    if (!reel) return;
    setIsPlaying(true);
    setProgress(0);
    setVideoError(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    if (audioRef.current && reel.voiceAudioUrl && reel.voiceEnabled !== false) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [reel]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }

    if (audioRef.current && reel?.voiceAudioUrl && reel.voiceEnabled !== false) {
      if (isPlaying && !isVoiceMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isVoiceMuted, reel]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted || isVoiceMuted;
    }
  }, [isMuted, isVoiceMuted]);

  // Handle Video Time Update for accurate progress
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  // Fallback timer if video element is not present or is an image thumbnail
  useEffect(() => {
    if (!reel || !isPlaying || (reel.videoUrl && !videoError)) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 150);
    return () => clearInterval(interval);
  }, [reel, isPlaying, videoError]);

  if (!reel) return null;

  const instagramUrl = brandConfig?.instagramUrl || 'https://instagram.com/featous';
  const hasVoice = Boolean(reel.voiceAudioUrl && reel.voiceEnabled !== false);
  const taggedProducts = (reel.taggedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-40 p-2.5 bg-[#1a1a1a] hover:bg-white hover:text-black rounded-full border border-[#333] text-white transition-colors shadow-2xl"
        aria-label="Close Reel modal"
      >
        <X size={20} />
      </button>

      <div className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] bg-[#111] border border-[#262626] rounded-3xl shadow-2xl overflow-hidden text-[#E5E5E5] flex flex-col justify-between my-auto">
        {/* Hidden Audio Element for Custom Voiceover */}
        {reel.voiceAudioUrl && (
          <audio
            ref={audioRef}
            src={reel.voiceAudioUrl}
            loop
            onEnded={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
            }}
          />
        )}

        {/* Media Container: HTML5 Video OR Cinematic Image Fallback */}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 z-0 cursor-pointer overflow-hidden rounded-3xl bg-black"
        >
          {reel.videoUrl && !videoError ? (
            <video
              ref={videoRef}
              src={reel.videoUrl}
              poster={reel.thumbnail}
              loop
              playsInline
              autoPlay
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
            />
          )}

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/20 to-black/70 opacity-90 pointer-events-none" />

          {/* Pause overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                <Play size={36} fill="white" className="ml-1 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Top Progress Bar & Category/Voiceover Badges */}
        <div className="relative z-20 p-4 space-y-3">
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono-code">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-white font-semibold text-[10px] tracking-wider">
                  {reel.videoUrl && !videoError ? 'HD VIDEO' : 'MOTION'} // {reel.category}
                </span>
              </div>

              {/* Voiceover Indicator Tag */}
              {hasVoice && (
                <div className="flex items-center space-x-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono-code animate-pulse">
                  <Mic size={11} className="text-emerald-400" />
                  <span className="tracking-wide uppercase font-semibold">VOICE</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-1.5">
              {hasVoice && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVoiceMuted(!isVoiceMuted);
                  }}
                  title={isVoiceMuted ? 'Unmute Voiceover' : 'Mute Voiceover'}
                  className={`p-2 rounded-full backdrop-blur-md border text-xs flex items-center space-x-1 ${
                    isVoiceMuted
                      ? 'bg-red-950/70 border-red-500/40 text-red-300'
                      : 'bg-emerald-900/60 border-emerald-400/40 text-emerald-200'
                  }`}
                >
                  <Mic size={12} />
                  <span className="text-[9px] font-mono-code">{isVoiceMuted ? 'OFF' : 'VOICE'}</span>
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20"
                title={isMuted ? 'Unmute Media' : 'Mute Media'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>

          {/* Active Voiceover Track Banner */}
          {hasVoice && (
            <div className="bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-xl p-2 flex items-center justify-between text-[11px] font-mono-code text-emerald-300 shadow-xl animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center space-x-2 truncate">
                <div className="flex items-center space-x-0.5 px-1 py-0.5 bg-emerald-500/20 rounded">
                  <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
                <span className="truncate text-white font-medium">
                  {reel.voiceTitle || 'Custom Voiceover Active'}
                </span>
              </div>
              <span className="text-[9px] text-emerald-400/80 uppercase tracking-widest pl-2">
                NARRATION
              </span>
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center space-y-3.5">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center space-y-1 hover:scale-110 transition-transform"
          >
            <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
              <Heart
                size={20}
                className={isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}
              />
            </div>
            <span className="text-[10px] font-mono-code">{reel.likes}</span>
          </button>

          <button className="flex flex-col items-center space-y-1 hover:scale-110 transition-transform">
            <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
              <MessageCircle size={20} />
            </div>
            <span className="text-[10px] font-mono-code">1.4K</span>
          </button>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-1 hover:scale-110 transition-transform"
          >
            <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
              <Instagram size={20} />
            </div>
            <span className="text-[10px] font-mono-code">IG</span>
          </a>
        </div>

        {/* Bottom Details & Tagged Items */}
        <div className="relative z-20 p-4 space-y-3 bg-gradient-to-t from-[#0A0A0A] via-black/85 to-transparent pt-6">
          {/* Creator handle */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xs text-white">{reel.creator}</span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 border border-white/40 text-[9px] font-mono-code uppercase hover:bg-white hover:text-black rounded-md transition-colors"
            >
              FOLLOW
            </a>
          </div>

          {/* Caption */}
          <p className="text-xs text-[#ccc] line-clamp-2 leading-relaxed">
            {reel.caption}
          </p>

          {/* Audio track ticker */}
          <div className="flex items-center space-x-2 text-[10px] font-mono-code text-[#888]">
            <Music size={11} className="text-[#ccc] shrink-0" />
            <span className="truncate">{reel.audioTrack}</span>
          </div>

          {/* Shoppable Tagged Items */}
          {taggedProducts.length > 0 && (
            <div className="pt-1">
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
                {taggedProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onOpenProductById(p.id)}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-[#1a1a1a]/95 hover:bg-white text-[#E5E5E5] hover:text-black border border-[#333] hover:border-white rounded-xl transition-all shrink-0 shadow-lg"
                  >
                    <ShoppingBag size={12} />
                    <span className="text-[10px] font-mono-code uppercase font-semibold">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
