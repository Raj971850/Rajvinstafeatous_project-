import React, { useState } from 'react';
import { Instagram, ExternalLink, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface InstagramLinkInputProps {
  url: string;
  handle: string;
  onUrlChange: (url: string) => void;
  onHandleChange: (handle: string) => void;
  followers?: string;
  posts?: string;
  following?: string;
  onFollowersChange?: (val: string) => void;
  onPostsChange?: (val: string) => void;
  onFollowingChange?: (val: string) => void;
}

export const InstagramLinkInput: React.FC<InstagramLinkInputProps> = ({
  url,
  handle,
  onUrlChange,
  onHandleChange,
  followers,
  posts,
  following,
  onFollowersChange,
  onPostsChange,
  onFollowingChange,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && (text.includes('instagram.com') || text.startsWith('http'))) {
        onUrlChange(text.trim());
        // Extract handle if formatted like instagram.com/username
        const match = text.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
        if (match && match[1]) {
          onHandleChange(`@${match[1].toUpperCase()}`);
        }
      }
    } catch {
      // ignore
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValidInstagram = url.includes('instagram.com');

  return (
    <div className="bg-[#151515] border border-[#222] rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#222]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1.5px] shadow-lg">
            <div className="w-full h-full bg-[#151515] rounded-[10px] flex items-center justify-center text-white">
              <Instagram size={20} />
            </div>
          </div>
          <div>
            <h4 className="font-editorial-serif text-lg text-white uppercase tracking-wider">
              INSTAGRAM ACCOUNT LINK & PROFILE
            </h4>
            <p className="text-[11px] font-mono-code text-[#888]">
              Paste your official Instagram account URL to sync links across the entire website
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isValidInstagram ? (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-mono-code uppercase">
              <CheckCircle2 size={12} />
              <span>Link Verified</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-mono-code uppercase">
              <AlertCircle size={12} />
              <span>Custom URL</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Instagram Link Input Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono-code uppercase tracking-wider text-[#aaa] flex items-center space-x-1.5">
            <span>PASTE INSTAGRAM ACCOUNT LINK *</span>
          </label>

          <button
            type="button"
            onClick={handlePasteUrl}
            className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] hover:text-white px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] rounded-md transition-colors"
          >
            Paste From Clipboard
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                const val = e.target.value;
                onUrlChange(val);
                const match = val.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
                if (match && match[1]) {
                  onHandleChange(`@${match[1].toUpperCase()}`);
                }
              }}
              placeholder="https://instagram.com/yourbrand"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-4 py-3 text-xs font-mono-code text-[#E5E5E5] placeholder-[#555] transition-colors"
            />
          </div>

          {/* Test Link Button */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#E5E5E5] rounded-xl text-xs font-mono-code uppercase tracking-wider transition-all flex items-center space-x-1.5 shrink-0 shadow-md"
            title="Open Link in New Tab to Test"
          >
            <span>TEST LINK</span>
            <ExternalLink size={13} />
          </a>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-3 bg-[#1A1A1A] hover:bg-[#222] border border-[#2a2a2a] text-[#aaa] hover:text-white rounded-xl transition-colors shrink-0"
            title="Copy URL"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Profile Handle & Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div>
          <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
            DISPLAY HANDLE
          </label>
          <input
            type="text"
            value={handle}
            onChange={(e) => onHandleChange(e.target.value)}
            placeholder="@FEATOUS"
            className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2 text-xs font-mono-code text-[#E5E5E5] transition-colors"
          />
        </div>

        {onFollowersChange && (
          <div>
            <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
              FOLLOWERS COUNT
            </label>
            <input
              type="text"
              value={followers || ''}
              onChange={(e) => onFollowersChange(e.target.value)}
              placeholder="284K"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2 text-xs font-mono-code text-[#E5E5E5] transition-colors"
            />
          </div>
        )}

        {onPostsChange && (
          <div>
            <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
              TOTAL POSTS
            </label>
            <input
              type="text"
              value={posts || ''}
              onChange={(e) => onPostsChange(e.target.value)}
              placeholder="348"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2 text-xs font-mono-code text-[#E5E5E5] transition-colors"
            />
          </div>
        )}

        {onFollowingChange && (
          <div>
            <label className="text-[10px] font-mono-code uppercase tracking-wider text-[#888] block mb-1.5">
              FOLLOWING COUNT
            </label>
            <input
              type="text"
              value={following || ''}
              onChange={(e) => onFollowingChange(e.target.value)}
              placeholder="42"
              className="w-full bg-[#101010] border border-[#2a2a2a] focus:border-white focus:outline-none rounded-xl px-3.5 py-2 text-xs font-mono-code text-[#E5E5E5] transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  );
};
