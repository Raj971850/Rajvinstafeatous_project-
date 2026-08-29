import React, { useState, useEffect } from 'react';
import { Instagram, Bookmark, Volume2, VolumeX, Menu, X, Search, Sparkles, Sliders } from 'lucide-react';
import { soundscape } from '../utils/soundscape';
import { BrandConfig } from '../types';

interface NavbarProps {
  onOpenMoodboard: () => void;
  savedCount: number;
  onOpenSearch: () => void;
  onSelectCollection: (category: 'ALL' | 'ACTIVE' | 'PREMIUM' | 'RETRO') => void;
  onOpenStory: () => void;
  brandConfig: BrandConfig;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMoodboard,
  savedCount,
  onOpenSearch,
  onSelectCollection,
  onOpenStory,
  brandConfig,
  onOpenAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [activeTab, setActiveTab] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const active = soundscape.toggle();
    setAudioActive(active);
  };

  const navLinks = [
    { label: 'HOME', id: 'home', action: () => { setActiveTab('HOME'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'ACTIVE', id: 'active', action: () => { setActiveTab('ACTIVE'); onSelectCollection('ACTIVE'); scrollToSection('collections'); } },
    { label: 'PREMIUM', id: 'premium', action: () => { setActiveTab('PREMIUM'); onSelectCollection('PREMIUM'); scrollToSection('collections'); } },
    { label: 'RETRO', id: 'retro', action: () => { setActiveTab('RETRO'); onSelectCollection('RETRO'); scrollToSection('retro-section'); } },
    { label: 'NEW DROPS', id: 'drops', action: () => { setActiveTab('NEW DROPS'); scrollToSection('new-drop'); } },
    { label: 'CAMPAIGNS', id: 'campaigns', action: () => { setActiveTab('CAMPAIGNS'); scrollToSection('campaigns'); } },
    { label: 'INSTAGRAM', id: 'instagram', action: () => { setActiveTab('INSTAGRAM'); scrollToSection('instagram-hub'); } },
    { label: 'COMMUNITY', id: 'community', action: () => { setActiveTab('COMMUNITY'); scrollToSection('community-section'); } },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#151515]/95 backdrop-blur-md border-b border-[#222] py-3 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-baseline space-x-1"
            >
              <span className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#E5E5E5] group-hover:text-white transition-colors">
                {brandConfig.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
            </a>

            <span className="hidden xl:inline-block text-[10px] uppercase font-mono-code tracking-widest text-[#888] border-l border-[#222] pl-4 py-0.5">
              EST. 2026 // ERA ARCHIVE
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[12px] font-medium tracking-[0.18em] uppercase">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`relative py-1 transition-all duration-300 ${
                  activeTab === item.label
                    ? 'text-white font-semibold'
                    : 'text-[#888] hover:text-[#E5E5E5]'
                }`}
              >
                {item.label}
                {activeTab === item.label && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Ambient Audio Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={toggleAudio}
              title={audioActive ? 'Mute Club Ambient Audio' : 'Play Club Ambient Soundscape'}
              className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                audioActive
                  ? 'border-white text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                  : 'border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] bg-[#151515]'
              }`}
            >
              {audioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span className="hidden md:inline text-[10px] font-mono-code tracking-wider">
                {audioActive ? 'AUDIO ON' : 'SOUNDSCAPE'}
              </span>
            </button>

            {/* Search / Lookbook Quick Filter */}
            <button
              id="search-open-btn"
              onClick={onOpenSearch}
              title="Search Catalog & Drops"
              className="p-2 text-[#888] hover:text-white hover:bg-[#1A1A1A] rounded-full border border-transparent hover:border-[#2a2a2a] transition-all"
            >
              <Search size={18} />
            </button>

            {/* Saved Moodboard */}
            <button
              id="moodboard-open-btn"
              onClick={onOpenMoodboard}
              title="Saved Capsule Moodboard"
              className="relative p-2 text-[#888] hover:text-white hover:bg-[#1A1A1A] rounded-full border border-transparent hover:border-[#2a2a2a] transition-all"
            >
              <Bookmark size={18} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white text-black font-bold text-[10px] rounded-full flex items-center justify-center shadow-md">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Direct Instagram Link Button */}
            <a
              id="header-instagram-btn"
              href={brandConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white text-black hover:bg-[#E5E5E5] transition-all font-sans font-semibold text-[11px] tracking-wider uppercase shadow-lg shadow-white/10"
            >
              <Instagram size={13} className="text-black" />
              <span>{brandConfig.handle}</span>
            </a>

            {/* Admin Panel Quick Trigger */}
            <button
              id="nav-admin-btn"
              onClick={onOpenAdmin}
              title="Open Admin Control Panel"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-[#2a2a2a] hover:border-[#444] text-[#E5E5E5] text-[11px] font-mono-code uppercase tracking-wider transition-all"
            >
              <Sliders size={12} className="text-emerald-400" />
              <span>ADMIN</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#888] hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-24 lg:hidden animate-in fade-in duration-300">
          <div className="space-y-6">
            <div className="text-[11px] font-mono-code tracking-[0.25em] text-[#888] uppercase pb-2 border-b border-[#222]">
              EXPLORE THE ERA
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="text-left font-editorial-serif text-2xl font-normal tracking-wide text-[#888] hover:text-white hover:translate-x-2 transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono-code text-[#555]">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#222]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-[#151515] border border-[#2a2a2a] text-white font-mono-code text-xs uppercase tracking-widest rounded-xl hover:bg-[#202020] transition-colors"
            >
              <Sliders size={14} className="text-emerald-400" />
              <span>OPEN ADMIN PANEL</span>
            </button>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-[#888]">ATMOSPHERE AUDIO</span>
              <button
                onClick={toggleAudio}
                className="px-3 py-1 text-xs border border-[#2a2a2a] rounded-full text-white bg-[#151515]"
              >
                {audioActive ? 'PAUSE SOUND' : 'START SOUND'}
              </button>
            </div>

            <a
              href={brandConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#E5E5E5] transition-colors"
            >
              <Instagram size={16} />
              <span>FOLLOW {brandConfig.handle} ON INSTAGRAM</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

