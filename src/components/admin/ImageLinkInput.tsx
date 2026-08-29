import React, { useState } from 'react';
import { Image as ImageIcon, ExternalLink, Sparkles, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface ImageLinkInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspect?: 'square' | 'portrait' | 'landscape' | 'banner' | 'video';
  helpText?: string;
}

const PRESET_IMAGES = [
  { name: 'Model Dark Hood', url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Oversized Tee', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Activewear Tactical', url: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Night Cyber Shell', url: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Archival Runner Shoes', url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Vintage Acid Denim', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop' },
  { name: '925 Signet Ring', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Silk Knit Polo', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Shibuya City Neon', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop' }
];

export const ImageLinkInput: React.FC<ImageLinkInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://images.unsplash.com/... or any image link',
  aspect = 'portrait',
  helpText
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getAspectClass = () => {
    switch (aspect) {
      case 'square': return 'aspect-square';
      case 'portrait': return 'aspect-[3/4]';
      case 'landscape': return 'aspect-[16/10]';
      case 'banner': return 'aspect-[21/9]';
      case 'video': return 'aspect-[9/16]';
      default: return 'aspect-[3/4]';
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.startsWith('http')) {
        onChange(text.trim());
        setHasError(false);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-mono-code uppercase tracking-wider text-[#aaa] flex items-center space-x-1.5">
          <ImageIcon size={12} className="text-[#888]" />
          <span>{label}</span>
        </label>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handlePaste}
            className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] hover:text-white px-2 py-0.5 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] rounded transition-colors"
          >
            Paste Link
          </button>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="text-[10px] font-mono-code uppercase tracking-wider text-pink-300 hover:text-pink-200 px-2 py-0.5 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 rounded transition-colors flex items-center space-x-1"
          >
            <Sparkles size={10} />
            <span>Presets</span>
          </button>
        </div>
      </div>

      {/* Input row */}
      <div className="relative flex items-center">
        <input
          type="url"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setHasError(false);
          }}
          placeholder={placeholder}
          className="w-full bg-[#151515] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-code text-[#E5E5E5] placeholder-[#555] transition-colors pr-16"
        />

        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Image Link in New Tab"
            className="absolute right-2.5 p-1.5 text-[#888] hover:text-white bg-[#1A1A1A] hover:bg-[#222] border border-[#333] rounded-lg transition-colors"
          >
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      {helpText && (
        <p className="text-[10px] font-mono-code text-[#777]">{helpText}</p>
      )}

      {/* Preset selector drawer */}
      {showPresets && (
        <div className="p-3 bg-[#181818] border border-[#2a2a2a] rounded-xl space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-[10px] font-mono-code text-[#888] uppercase">
            <span>CURATED LUXURY PRESETS</span>
            <button
              type="button"
              onClick={() => setShowPresets(false)}
              className="text-[#666] hover:text-white"
            >
              CLOSE
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {PRESET_IMAGES.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  onChange(preset.url);
                  setShowPresets(false);
                  setHasError(false);
                }}
                className="group relative aspect-video rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-white transition-all text-left"
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/50 p-1 flex items-end">
                  <span className="text-[9px] font-mono-code text-white line-clamp-1 leading-tight">
                    {preset.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Box */}
      {value && (
        <div className="flex items-start space-x-3 pt-1">
          <div className={`relative w-24 sm:w-28 ${getAspectClass()} bg-[#101010] rounded-xl border border-[#2a2a2a] overflow-hidden shrink-0 shadow-md`}>
            <img
              src={value}
              alt="Preview"
              onError={() => setHasError(true)}
              onLoad={() => setHasError(false)}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {hasError && (
              <div className="absolute inset-0 bg-red-950/80 p-2 flex flex-col items-center justify-center text-center">
                <AlertCircle size={14} className="text-red-400 mb-1" />
                <span className="text-[8px] font-mono-code text-red-300 uppercase leading-tight">
                  Image Load Failed
                </span>
              </div>
            )}
          </div>

          <div className="text-[11px] font-mono-code space-y-1 text-[#888] pt-1">
            <div className="flex items-center space-x-1.5">
              {hasError ? (
                <span className="text-red-400 flex items-center space-x-1">
                  <AlertCircle size={11} />
                  <span>Invalid Image URL</span>
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center space-x-1">
                  <Check size={11} />
                  <span>Live Preview Active</span>
                </span>
              )}
            </div>
            <p className="text-[10px] text-[#666] line-clamp-2 break-all">
              {value}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
