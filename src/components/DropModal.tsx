import React, { useState } from 'react';
import { X, Sparkles, Check, Clock, ShieldCheck, Instagram } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandData';

interface DropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DropModal: React.FC<DropModalProps> = ({ isOpen, onClose }) => {
  const [emailOrHandle, setEmailOrHandle] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrHandle.trim()) return;
    setSignedUp(true);
    setTimeout(() => {
      setSignedUp(false);
      onClose();
    }, 2500);
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

        <div className="space-y-2 text-center">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase bg-[#101010] px-3 py-1 rounded-full border border-[#2a2a2a]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>NEXT LIMITED RELEASE</span>
          </div>

          <h3 className="font-editorial-serif text-3xl sm:text-4xl text-white uppercase tracking-tight pt-2">
            DROP 04 // PRIVATE ACCESS
          </h3>

          <div className="py-3">
            <div className="inline-block p-3.5 bg-[#101010] border border-[#2a2a2a] rounded-2xl font-mono-code text-xl font-bold tracking-widest text-white shadow-inner">
              02 : 14 : 36 : 48
            </div>
            <div className="text-[9px] font-mono-code text-[#777] uppercase tracking-widest pt-1.5">
              DAYS : HOURS : MINS : SECS
            </div>
          </div>

          <p className="text-xs font-mono-code text-[#888] leading-relaxed max-w-sm mx-auto">
            Strict limit of 300 numbered units per silhouette. Join the private Instagram DM release broadcast to secure early checkout priority.
          </p>
        </div>

        {signedUp ? (
          <div className="py-6 text-center space-y-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4">
            <Check size={24} className="mx-auto text-emerald-400" />
            <h4 className="font-editorial-serif text-base uppercase text-white">
              VIP DROP PASS REGISTERED
            </h4>
            <p className="text-xs font-mono-code text-[#888]">
              You will receive the 15-minute secret early access link directly before public release.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3">
            <input
              type="text"
              required
              value={emailOrHandle}
              onChange={(e) => setEmailOrHandle(e.target.value)}
              placeholder="Enter Instagram Handle (@you) or Email"
              className="w-full p-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-xs font-mono-code text-white placeholder-zinc-500 focus:border-white focus:outline-none"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl"
            >
              <Sparkles size={14} />
              <span>CLAIM EARLY DROP VIP ACCESS</span>
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono-code text-[#888] hover:text-white uppercase tracking-wider flex items-center justify-center space-x-1.5"
          >
            <Instagram size={12} />
            <span>OR FOLLOW @FEATOUS BROADCAST CHANNEL</span>
          </a>
        </div>
      </div>
    </div>
  );
};
