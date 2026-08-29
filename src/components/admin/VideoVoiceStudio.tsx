import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Mic,
  MicOff,
  Film,
  Music,
  Play,
  Pause,
  Trash2,
  Check,
  Sparkles,
  Radio,
  Volume2,
  VolumeX,
  RefreshCw,
  Link,
  FileVideo,
  FileAudio,
  Headphones,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ReelItem } from '../../types';
import { SAMPLE_VIDEO_PRESETS, SAMPLE_VOICE_PRESETS, VideoPreset, VoicePreset } from '../../data/brandData';

interface VideoVoiceStudioProps {
  reel: ReelItem;
  onChange: (updatedReel: ReelItem) => void;
}

export const VideoVoiceStudio: React.FC<VideoVoiceStudioProps> = ({
  reel,
  onChange,
}) => {
  // Video tabs: 'UPLOAD' | 'URL' | 'PRESETS'
  const [videoTab, setVideoTab] = useState<'UPLOAD' | 'URL' | 'PRESETS'>('UPLOAD');
  
  // Voice tabs: 'RECORD' | 'UPLOAD' | 'PRESETS'
  const [voiceTab, setVoiceTab] = useState<'RECORD' | 'UPLOAD' | 'PRESETS'>('RECORD');

  // Video local state
  const [videoUrlInput, setVideoUrlInput] = useState(reel.videoUrl || '');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState<number | null>(null);
  const [videoFileMeta, setVideoFileMeta] = useState<{ name: string; size: string } | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Audio File Upload State
  const audioFileInputRef = useRef<HTMLInputElement>(null);
  const [audioFileMeta, setAudioFileMeta] = useState<{ name: string; size: string } | null>(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const audioPreviewRef = useRef<HTMLAudioElement>(null);

  // Clean up recording stream on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update internal URL input if reel changes
  useEffect(() => {
    setVideoUrlInput(reel.videoUrl || '');
  }, [reel.videoUrl]);

  // --- VIDEO HANDLERS ---
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate video MIME
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file (MP4, WebM, MOV, M4V).');
      return;
    }

    const fileSizeFormatted = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    setVideoFileMeta({ name: file.name, size: fileSizeFormatted });
    setVideoUploadProgress(20);

    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 90);
        setVideoUploadProgress(percent);
      }
    };

    reader.onload = () => {
      const dataUrl = reader.result as string;
      setVideoUploadProgress(100);
      setTimeout(() => setVideoUploadProgress(null), 800);

      onChange({
        ...reel,
        videoUrl: dataUrl,
        videoType: 'upload',
      });
    };

    reader.onerror = () => {
      alert('Error reading video file. Please try a different video or use a direct URL.');
      setVideoUploadProgress(null);
    };

    reader.readAsDataURL(file);
  };

  const handleApplyVideoUrl = () => {
    if (!videoUrlInput.trim()) {
      onChange({ ...reel, videoUrl: undefined, videoType: undefined });
      return;
    }
    onChange({
      ...reel,
      videoUrl: videoUrlInput.trim(),
      videoType: 'url',
    });
  };

  const handleSelectVideoPreset = (preset: VideoPreset) => {
    setVideoUrlInput(preset.videoUrl);
    onChange({
      ...reel,
      videoUrl: preset.videoUrl,
      videoType: 'preset',
      thumbnail: preset.thumbnail,
      duration: preset.duration,
    });
  };

  const handleRemoveVideo = () => {
    setVideoUrlInput('');
    setVideoFileMeta(null);
    onChange({
      ...reel,
      videoUrl: undefined,
      videoType: undefined,
    });
  };

  // --- VOICE RECORDING HANDLERS ---
  const startRecording = async () => {
    setRecordingError(null);
    setRecordedAudioBlob(null);
    setRecordedAudioUrl(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone audio recording is not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        // Convert blob to base64 DataURL for persistence
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          onChange({
            ...reel,
            voiceAudioUrl: base64Audio,
            voiceTitle: reel.voiceTitle || 'Microphone Voiceover Recording',
            voiceEnabled: true,
          });
        };
        reader.readAsDataURL(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.error('Recording error:', err);
      setRecordingError(err.message || 'Could not access microphone.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  // --- AUDIO FILE UPLOAD HANDLERS ---
  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select a valid audio file (MP3, WAV, M4A, OGG, AAC).');
      return;
    }

    const fileSizeFormatted = `${(file.size / 1024).toFixed(1)} KB`;
    setAudioFileMeta({ name: file.name, size: fileSizeFormatted });

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onChange({
        ...reel,
        voiceAudioUrl: dataUrl,
        voiceTitle: reel.voiceTitle || `Voice Note (${file.name})`,
        voiceEnabled: true,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectVoicePreset = (preset: VoicePreset) => {
    onChange({
      ...reel,
      voiceAudioUrl: preset.audioUrl,
      voiceTitle: `${preset.name} (${preset.narrator})`,
      voiceEnabled: true,
    });
  };

  const handleRemoveVoice = () => {
    setRecordedAudioBlob(null);
    setRecordedAudioUrl(null);
    setAudioFileMeta(null);
    onChange({
      ...reel,
      voiceAudioUrl: undefined,
      voiceTitle: undefined,
      voiceEnabled: false,
    });
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pt-2 border-t border-[#262626]">
      {/* SECTION 1: VIDEO UPLOAD & MEDIA STUDIO */}
      <div className="bg-[#121212] border border-[#222] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#222]">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Film size={16} />
            </div>
            <div>
              <h4 className="font-editorial-serif text-sm text-white uppercase tracking-wider">
                VIDEO MEDIA & MOTION ASSET
              </h4>
              <p className="text-[10px] font-mono-code text-[#888]">
                Upload high-definition MP4/WebM video or paste streaming link
              </p>
            </div>
          </div>

          {reel.videoUrl && (
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <span className="px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-500/30 rounded-full text-[9px] font-mono-code flex items-center space-x-1">
                <CheckCircle2 size={10} />
                <span>VIDEO ATTACHED</span>
              </span>
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="p-1.5 bg-red-950/30 hover:bg-red-950/60 text-red-400 rounded-lg border border-red-900/40 text-[10px] transition-colors"
                title="Remove Attached Video"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Video Mode Tabs */}
        <div className="flex items-center space-x-2 bg-[#0A0A0A] p-1 rounded-xl border border-[#222]">
          <button
            type="button"
            onClick={() => setVideoTab('UPLOAD')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-mono-code uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
              videoTab === 'UPLOAD'
                ? 'bg-[#222] text-white font-semibold shadow'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <Upload size={11} />
            <span>UPLOAD VIDEO FILE</span>
          </button>
          <button
            type="button"
            onClick={() => setVideoTab('URL')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-mono-code uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
              videoTab === 'URL'
                ? 'bg-[#222] text-white font-semibold shadow'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <Link size={11} />
            <span>PASTE VIDEO URL</span>
          </button>
          <button
            type="button"
            onClick={() => setVideoTab('PRESETS')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-mono-code uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
              videoTab === 'PRESETS'
                ? 'bg-[#222] text-white font-semibold shadow'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <Sparkles size={11} />
            <span>STREET PRESETS</span>
          </button>
        </div>

        {/* Tab 1: Video File Upload */}
        {videoTab === 'UPLOAD' && (
          <div className="space-y-3">
            <input
              ref={videoFileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-m4v"
              onChange={handleVideoFileUpload}
              className="hidden"
            />
            <div
              onClick={() => videoFileInputRef.current?.click()}
              className="border-2 border-dashed border-[#333] hover:border-blue-500/60 bg-[#0c0c0c] hover:bg-[#151518] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileVideo size={22} className="text-blue-400" />
              </div>
              <p className="text-xs font-mono-code uppercase font-semibold text-white">
                DRAG & DROP OR CLICK TO CHOOSE VIDEO FILE
              </p>
              <p className="text-[10px] font-mono-code text-[#777] mt-1">
                Supports MP4, WebM, MOV, M4V (Optimal for 9:16 vertical short-form reels)
              </p>
              {videoFileMeta && (
                <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 bg-blue-950/60 border border-blue-500/40 rounded-full text-[10px] font-mono-code text-blue-300">
                  <Check size={12} />
                  <span>{videoFileMeta.name} ({videoFileMeta.size})</span>
                </div>
              )}
            </div>

            {videoUploadProgress !== null && (
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono-code text-[#aaa]">
                  <span>PROCESSING VIDEO ASSET...</span>
                  <span>{videoUploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${videoUploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Video URL Paste */}
        {videoTab === 'URL' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/assets/reel-lookbook-video.mp4"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                className="flex-1 bg-[#0c0c0c] border border-[#2a2a2a] rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleApplyVideoUrl}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-mono-code uppercase font-semibold transition-colors"
              >
                APPLY URL
              </button>
            </div>
            <p className="text-[10px] font-mono-code text-[#777]">
              Provide a direct streaming HTTPS URL to an MP4 video file.
            </p>
          </div>
        )}

        {/* Tab 3: Curated Video Presets */}
        {videoTab === 'PRESETS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SAMPLE_VIDEO_PRESETS.map((preset) => {
              const isSelected = reel.videoUrl === preset.videoUrl;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectVideoPreset(preset)}
                  className={`text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500/60 shadow-lg'
                      : 'bg-[#0c0c0c] border-[#222] hover:border-[#444]'
                  }`}
                >
                  <img
                    src={preset.thumbnail}
                    alt={preset.name}
                    className="w-12 h-16 rounded-lg object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono-code text-blue-400 font-semibold uppercase">
                        {preset.category}
                      </span>
                      <span className="text-[9px] font-mono-code text-[#777]">
                        {preset.duration}
                      </span>
                    </div>
                    <h5 className="font-editorial-serif text-xs text-white uppercase line-clamp-1">
                      {preset.name}
                    </h5>
                    <p className="text-[9px] font-mono-code text-[#888] line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Live Video Preview Box (if videoUrl exists) */}
        {reel.videoUrl && (
          <div className="bg-[#0c0c0c] border border-[#262626] rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-28 aspect-[9/16] rounded-lg overflow-hidden bg-black shrink-0 border border-[#333]">
              <video
                ref={videoPreviewRef}
                src={reel.videoUrl}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />
              <button
                type="button"
                onClick={() => {
                  if (videoPreviewRef.current) {
                    if (isVideoPlaying) {
                      videoPreviewRef.current.pause();
                    } else {
                      videoPreviewRef.current.play().catch(() => {});
                    }
                  }
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors text-white"
              >
                {isVideoPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
              </button>
            </div>

            <div className="flex-1 space-y-1.5 text-left w-full">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono-code uppercase font-semibold text-blue-400">
                  PREVIEWING ACTIVE VIDEO
                </span>
                <span className="text-[9px] font-mono-code text-[#777]">
                  (Format: {reel.videoType || 'HD'})
                </span>
              </div>
              <p className="text-xs font-mono-code text-white break-all line-clamp-2">
                {reel.videoUrl.startsWith('data:')
                  ? 'Local Video Data Stream (Base64 Encoded)'
                  : reel.videoUrl}
              </p>
              <div className="flex items-center space-x-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (videoPreviewRef.current) {
                      videoPreviewRef.current.currentTime = 0;
                      videoPreviewRef.current.play().catch(() => {});
                    }
                  }}
                  className="text-[10px] font-mono-code text-[#aaa] hover:text-white flex items-center space-x-1"
                >
                  <RefreshCw size={10} />
                  <span>REPLAY</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: ADD A VOICE TO REELS AND VIDEO */}
      <div className="bg-[#121212] border border-[#222] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#222]">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Mic size={16} />
            </div>
            <div>
              <h4 className="font-editorial-serif text-sm text-white uppercase tracking-wider">
                VOICEOVER & AUDIO STUDIO
              </h4>
              <p className="text-[10px] font-mono-code text-[#888]">
                Record live voiceover commentary, upload narration audio, or apply curated voice presets
              </p>
            </div>
          </div>

          {reel.voiceAudioUrl && (
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded-full text-[9px] font-mono-code flex items-center space-x-1 animate-pulse">
                <CheckCircle2 size={10} />
                <span>VOICE NOTE ACTIVE</span>
              </span>
              <button
                type="button"
                onClick={handleRemoveVoice}
                className="p-1.5 bg-red-950/30 hover:bg-red-950/60 text-red-400 rounded-lg border border-red-900/40 text-[10px] transition-colors"
                title="Remove Voice Note"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Voice Studio Mode Tabs */}
        <div className="flex items-center space-x-2 bg-[#0A0A0A] p-1 rounded-xl border border-[#222]">
          <button
            type="button"
            onClick={() => setVoiceTab('RECORD')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-mono-code uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
              voiceTab === 'RECORD'
                ? 'bg-[#222] text-white font-semibold shadow'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <Radio size={11} />
            <span>RECORD LIVE VOICE</span>
          </button>
          <button
            type="button"
            onClick={() => setVoiceTab('UPLOAD')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-mono-code uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
              voiceTab === 'UPLOAD'
                ? 'bg-[#222] text-white font-semibold shadow'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <FileAudio size={11} />
            <span>UPLOAD AUDIO FILE</span>
          </button>
          <button
            type="button"
            onClick={() => setVoiceTab('PRESETS')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-mono-code uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
              voiceTab === 'PRESETS'
                ? 'bg-[#222] text-white font-semibold shadow'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <Headphones size={11} />
            <span>VOICEOVER PRESETS</span>
          </button>
        </div>

        {/* Voice Tab 1: Live Voice Recorder Studio */}
        {voiceTab === 'RECORD' && (
          <div className="bg-[#0c0c0c] border border-[#262626] rounded-2xl p-5 text-center space-y-4">
            <div className="flex flex-col items-center justify-center space-y-3">
              {/* Pulsing Recording Visualizer */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? 'bg-rose-600/30 text-rose-500 ring-8 ring-rose-500/20 animate-pulse'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {isRecording ? <Radio size={32} className="animate-spin" /> : <Mic size={28} />}
              </div>

              <div>
                <span className="font-mono-code text-2xl font-bold tracking-widest text-white block">
                  {formatTimer(recordingSeconds)}
                </span>
                <span className="text-[10px] font-mono-code text-[#777] uppercase tracking-wider">
                  {isRecording ? 'LIVE RECORDING IN PROGRESS...' : 'MAX DURATION: 1 MINUTE'}
                </span>
              </div>

              {/* Animated Waveform Bars during recording */}
              {isRecording && (
                <div className="flex items-center space-x-1 h-6">
                  {[40, 75, 90, 50, 100, 60, 80, 45, 95, 70, 85, 30].map((height, i) => (
                    <div
                      key={i}
                      className="w-1 bg-rose-500 rounded-full animate-pulse"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${(i % 5) * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {recordingError && (
              <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs font-mono-code text-red-300 flex items-center space-x-2 text-left">
                <AlertCircle size={14} className="shrink-0" />
                <span>{recordingError}</span>
              </div>
            )}

            <div className="flex items-center justify-center space-x-3 pt-2">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono-code uppercase tracking-wider font-semibold flex items-center space-x-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-105"
                >
                  <Mic size={14} />
                  <span>START RECORDING VOICEOVER</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-mono-code uppercase tracking-wider font-semibold flex items-center space-x-2 shadow-lg shadow-rose-950/50 transition-all hover:scale-105"
                >
                  <MicOff size={14} />
                  <span>STOP & SAVE RECORDING</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Voice Tab 2: Upload Audio File */}
        {voiceTab === 'UPLOAD' && (
          <div className="space-y-3">
            <input
              ref={audioFileInputRef}
              type="file"
              accept="audio/mp3,audio/wav,audio/m4a,audio/aac,audio/ogg,audio/webm"
              onChange={handleAudioFileUpload}
              className="hidden"
            />
            <div
              onClick={() => audioFileInputRef.current?.click()}
              className="border-2 border-dashed border-[#333] hover:border-emerald-500/60 bg-[#0c0c0c] hover:bg-[#151815] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileAudio size={22} className="text-emerald-400" />
              </div>
              <p className="text-xs font-mono-code uppercase font-semibold text-white">
                DRAG & DROP OR CLICK TO UPLOAD VOICE AUDIO
              </p>
              <p className="text-[10px] font-mono-code text-[#777] mt-1">
                Supports MP3, WAV, M4A, AAC, OGG (Speech, Narrations, Voice Notes)
              </p>
              {audioFileMeta && (
                <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-[10px] font-mono-code text-emerald-300">
                  <Check size={12} />
                  <span>{audioFileMeta.name} ({audioFileMeta.size})</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Voice Tab 3: Curated Voiceover Presets */}
        {voiceTab === 'PRESETS' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_VOICE_PRESETS.map((preset) => {
              const isSelected = reel.voiceAudioUrl === preset.audioUrl;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectVoicePreset(preset)}
                  className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg'
                      : 'bg-[#0c0c0c] border-[#222] hover:border-[#444]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono-code text-emerald-400 font-semibold uppercase block">
                      {preset.type}
                    </span>
                    <h5 className="font-editorial-serif text-xs text-white uppercase line-clamp-1">
                      {preset.name}
                    </h5>
                    <p className="text-[9px] font-mono-code text-[#aaa]">
                      {preset.narrator}
                    </p>
                  </div>
                  <p className="text-[9px] font-mono-code text-[#777] line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Voice Track Settings & Live Audio Player */}
        {reel.voiceAudioUrl && (
          <div className="bg-[#0c0c0c] border border-emerald-500/30 rounded-xl p-4 space-y-3">
            {/* Hidden Audio Player for In-Admin Testing */}
            <audio
              ref={audioPreviewRef}
              src={reel.voiceAudioUrl}
              onPlay={() => setIsVoicePlaying(true)}
              onPause={() => setIsVoicePlaying(false)}
              onEnded={() => setIsVoicePlaying(false)}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    if (audioPreviewRef.current) {
                      if (isVoicePlaying) {
                        audioPreviewRef.current.pause();
                      } else {
                        audioPreviewRef.current.play().catch(() => {});
                      }
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-lg shrink-0"
                >
                  {isVoicePlaying ? <Pause size={16} /> : <Play size={16} fill="white" />}
                </button>

                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono-code text-emerald-400 uppercase font-semibold">
                    VOICEOVER READY TO PLAY
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Director Commentary / Voiceover by @kai"
                    value={reel.voiceTitle || ''}
                    onChange={(e) => onChange({ ...reel, voiceTitle: e.target.value })}
                    className="w-full bg-[#181818] border border-[#333] rounded-lg px-2.5 py-1 text-xs font-mono-code text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Voice Enable / Mute Toggle */}
              <div className="flex items-center space-x-2">
                <label className="text-[10px] font-mono-code text-[#aaa] uppercase cursor-pointer">
                  ENABLE VOICE ON PLAYBACK:
                </label>
                <button
                  type="button"
                  onClick={() => onChange({ ...reel, voiceEnabled: reel.voiceEnabled === false ? true : false })}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono-code uppercase font-semibold transition-all ${
                    reel.voiceEnabled !== false
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#222] text-[#888]'
                  }`}
                >
                  {reel.voiceEnabled !== false ? 'ON' : 'MUTED'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
