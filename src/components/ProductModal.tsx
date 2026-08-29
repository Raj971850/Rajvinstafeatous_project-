import React, { useState } from 'react';
import { X, Bookmark, Share2, Instagram, Check, ArrowRight, ShieldCheck, Truck, Sparkles, Layers } from 'lucide-react';
import { Product } from '../types';
import { BRAND_CONFIG } from '../data/brandData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleSave: (productId: string) => void;
  isSaved: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onToggleSave,
  isSaved,
}) => {
  const [selectedImage, setSelectedImage] = useState<'main' | 'editorial' | 'detail'>('main');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [alertReserved, setAlertReserved] = useState(false);

  if (!product) return null;

  const currentImage = selectedImage === 'main'
    ? product.images.main
    : selectedImage === 'editorial'
    ? product.images.editorial
    : (product.images.detail || product.images.main);

  const handleShareStory = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#151515] border border-[#222] rounded-3xl my-auto shadow-2xl overflow-hidden text-[#E5E5E5]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#aaa] transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Editorial Photo Gallery */}
          <div className="lg:col-span-7 bg-[#101010] p-6 flex flex-col justify-between space-y-4">
            {/* Active Display Photo */}
            <div className="relative aspect-[3/4] w-full bg-black overflow-hidden rounded-2xl border border-[#222]">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Collection Stamp */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-mono-code tracking-[0.25em] uppercase">
                {product.collection} COLLECTION // {product.dropStatus || 'ARCHIVE'}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedImage('main')}
                className={`relative w-20 aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                  selectedImage === 'main' ? 'border-white' : 'border-[#2a2a2a] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.images.main} alt="Main view" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>

              <button
                onClick={() => setSelectedImage('editorial')}
                className={`relative w-20 aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                  selectedImage === 'editorial' ? 'border-white' : 'border-[#2a2a2a] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.images.editorial} alt="Editorial look" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>

              {product.images.detail && (
                <button
                  onClick={() => setSelectedImage('detail')}
                  className={`relative w-20 aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    selectedImage === 'detail' ? 'border-white' : 'border-[#2a2a2a] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={product.images.detail} alt="Detail look" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Product Editorial Spec & Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#151515]">
            <div className="space-y-4">
              {/* Category & Serial */}
              <div className="flex justify-between items-center text-[10px] font-mono-code tracking-[0.2em] text-[#888] uppercase pb-2 border-b border-[#222]">
                <span>{product.collection} // DESIGN ARCHIVE</span>
                <span>{product.instagramTag || '#FEATOUS'}</span>
              </div>

              {/* Title & Price */}
              <div>
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-white uppercase tracking-wide leading-tight">
                  {product.name}
                </h3>
                {product.price && (
                  <div className="text-base font-mono-code text-[#E5E5E5] font-semibold pt-1">
                    {product.price} <span className="text-[10px] text-[#666] font-normal">USD // COMPLIMENTARY WORLDWIDE DELIVERY</span>
                  </div>
                )}
              </div>

              {/* Tagline & Story */}
              <p className="text-xs font-mono-code text-[#aaa] tracking-wider leading-relaxed">
                {product.description}
              </p>

              {/* Material & Construction Specs */}
              <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl space-y-2 text-[11px] font-mono-code">
                <div className="flex justify-between">
                  <span className="text-[#888]">FABRICATION:</span>
                  <span className="text-white text-right">{product.fabric}</span>
                </div>
                {product.weightGsm && (
                  <div className="flex justify-between">
                    <span className="text-[#888]">WEIGHT:</span>
                    <span className="text-white">{product.weightGsm}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#888]">SILHOUETTE FIT:</span>
                  <span className="text-white">{product.fit}</span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono-code tracking-wider text-[#888] uppercase">
                  <span>COLORWAY:</span>
                  <span className="text-white font-semibold">{product.colors[selectedColorIdx]?.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColorIdx === idx ? 'border-white scale-110 shadow-lg ring-1 ring-white/50' : 'border-zinc-700 hover:border-zinc-400'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono-code tracking-wider text-[#888] uppercase">
                    <span>SELECT PROPORTION:</span>
                    <span className="text-[#888]">SIGNATURE BOXY FIT</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-mono-code uppercase rounded-xl transition-colors border ${
                          selectedSize === size
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-[#1a1a1a] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#222]">
              <div className="flex gap-3">
                {/* Save to Moodboard */}
                <button
                  onClick={() => onToggleSave(product.id)}
                  className={`flex-1 py-3 px-4 font-mono-code text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all border ${
                    isSaved
                      ? 'bg-white text-black border-white'
                      : 'bg-[#1a1a1a] text-white border-[#2a2a2a] hover:bg-white hover:text-black'
                  }`}
                >
                  <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                  <span>{isSaved ? 'IN MOODBOARD' : 'SAVE TO MOODBOARD'}</span>
                </button>

                {/* Drop Alert / Reserve */}
                <button
                  onClick={() => setAlertReserved(true)}
                  className="flex-1 py-3 px-4 bg-white text-black hover:bg-[#E5E5E5] rounded-xl transition-all font-mono-code text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-1.5 shadow-xl"
                >
                  {alertReserved ? <Check size={14} /> : <Sparkles size={14} />}
                  <span>{alertReserved ? 'ALERT RESERVED' : 'DROP VIP ALERT'}</span>
                </button>
              </div>

              {/* Instagram Share Link */}
              <div className="flex justify-between items-center pt-2 text-[10px] font-mono-code text-[#888]">
                <button
                  onClick={handleShareStory}
                  className="flex items-center space-x-1.5 hover:text-white transition-colors"
                >
                  <Share2 size={12} />
                  <span>{copied ? 'LINK COPIED TO CLIPBOARD' : 'SHARE ON INSTAGRAM STORY'}</span>
                </button>

                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-[#aaa] hover:text-white transition-colors"
                >
                  <Instagram size={12} />
                  <span>TAG #FEATOUS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
