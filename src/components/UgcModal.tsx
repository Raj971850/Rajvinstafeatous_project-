import React, { useState } from 'react';
import { X, Instagram, Upload, Check, Sparkles, MapPin, Tag } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';

interface UgcModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLook: (look: { handle: string; city: string; pieces: string; caption: string }) => void;
}

export const UgcModal: React.FC<UgcModalProps> = ({
  isOpen,
  onClose,
  onSubmitLook,
}) => {
  const [handle, setHandle] = useState('');
  const [city, setCity] = useState('London, UK');
  const [pieces, setPieces] = useState('');
  const [caption, setCaption] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    onSubmitLook({
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      city,
      pieces: pieces || 'FEATOUS Oversized Box Tee',
      caption: caption || 'Ready for the new era.'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#151515] border border-[#222] rounded-3xl shadow-2xl p-6 sm:p-8 text-[#E5E5E5] space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#888] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase">
            <Instagram size={13} className="text-[#aaa]" />
            <span>COMMUNITY CURATION</span>
          </div>
          <h3 className="font-editorial-serif text-2xl sm:text-3xl text-white uppercase tracking-tight">
            TAG @FEATOUS TO BE FEATURED
          </h3>
          <p className="text-xs font-mono-code text-[#888] leading-relaxed">
            Submit your Instagram handle and styling breakdown to be curated on the global homepage and receive VIP access to private drop previews.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-xl">
              <Check size={24} />
            </div>
            <h4 className="font-editorial-serif text-xl uppercase text-white">
              LOOK SUBMITTED FOR REVIEW
            </h4>
            <p className="text-xs font-mono-code text-[#888]">
              Our styling team reviews submissions daily. Keep your Instagram profile public.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                INSTAGRAM HANDLE *
              </label>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@yourhandle"
                className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-xs font-mono-code text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                  CITY / REGION
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Tokyo, Japan"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-xs font-mono-code text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                  TAGGED FEATOUS PIECES
                </label>
                <input
                  type="text"
                  value={pieces}
                  onChange={(e) => setPieces(e.target.value)}
                  placeholder="e.g. 320 GSM Box Tee"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-xs font-mono-code text-white focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono-code uppercase text-[#888] block mb-1">
                STYLING NOTE / CAPTION
              </label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="How did you style this look?"
                className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-xs font-sans text-white focus:border-white focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>SUBMIT LOOK FOR CURATION</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
