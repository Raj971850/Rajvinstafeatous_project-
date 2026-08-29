import React, { useState } from 'react';
import { X, Trash2, Share2, Sparkles, ShoppingBag, Instagram, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { BRAND_CONFIG } from '../data/brandData';

interface MoodboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProductIds: string[];
  products: Product[];
  onRemoveSave: (productId: string) => void;
  onOpenProduct: (product: Product) => void;
  onClearAll: () => void;
}

export const MoodboardDrawer: React.FC<MoodboardDrawerProps> = ({
  isOpen,
  onClose,
  savedProductIds,
  products,
  onRemoveSave,
  onOpenProduct,
  onClearAll,
}) => {
  const [copied, setCopied] = useState(false);
  const [storyPreviewOpen, setStoryPreviewOpen] = useState(false);

  if (!isOpen) return null;

  const savedProducts = savedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const handleShareStory = () => {
    setStoryPreviewOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#151515] border-l border-[#222] text-[#E5E5E5] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#222] flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase">
                <span>FEATOUS CAPSULE</span>
              </div>
              <h3 className="font-editorial-serif text-2xl uppercase tracking-wide text-white">
                SAVED MOODBOARD ({savedProducts.length})
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#888] hover:text-white hover:bg-[#222] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
            {savedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <ShoppingBag size={36} className="mx-auto text-[#444]" />
                <h4 className="font-editorial-serif text-lg uppercase text-[#ccc]">
                  YOUR MOODBOARD IS EMPTY
                </h4>
                <p className="text-xs font-mono-code text-[#777] max-w-xs mx-auto leading-relaxed">
                  Bookmark pieces from the editorial showcase to curate your seasonal wardrobe capsule.
                </p>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#444] rounded-2xl transition-all group"
                >
                  <div
                    onClick={() => {
                      onOpenProduct(product);
                      onClose();
                    }}
                    className="flex items-center space-x-3.5 cursor-pointer flex-1"
                  >
                    <img
                      src={product.images.main}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-[#101010] shrink-0 border border-[#333]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono-code text-[#888] uppercase">
                        {product.collection}
                      </span>
                      <h5 className="font-editorial-serif text-xs text-white uppercase group-hover:text-[#E5E5E5]">
                        {product.name}
                      </h5>
                      <span className="text-[10px] font-mono-code text-[#ccc] font-semibold block">
                        {product.price || '$--'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveSave(product.id)}
                    className="p-2 text-[#777] hover:text-rose-400 transition-colors"
                    title="Remove piece"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedProducts.length > 0 && (
            <div className="p-6 border-t border-[#222] space-y-3 bg-[#111111]">
              <button
                onClick={handleShareStory}
                className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5E5E5] rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <Instagram size={15} />
                <span>GENERATE INSTAGRAM STORY</span>
              </button>

              <div className="flex items-center justify-between text-xs font-mono-code text-[#888] pt-1">
                <button
                  onClick={onClearAll}
                  className="hover:text-white transition-colors uppercase"
                >
                  CLEAR ALL
                </button>

                <button
                  onClick={handleCopyLink}
                  className="hover:text-white transition-colors uppercase flex items-center space-x-1"
                >
                  {copied ? <Check size={12} /> : <Share2 size={12} />}
                  <span>{copied ? 'COPIED' : 'SHARE CAPSULE'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Story Preview Modal */}
      {storyPreviewOpen && (
        <div className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-xs aspect-[9/16] bg-[#151515] border border-[#333] rounded-3xl p-6 flex flex-col justify-between text-center shadow-2xl text-white film-grain">
            <button
              onClick={() => setStoryPreviewOpen(false)}
              className="absolute top-3 right-3 p-1.5 bg-black/80 rounded-full text-white"
            >
              <X size={16} />
            </button>

            <div className="space-y-1 pt-4">
              <span className="font-cinzel text-lg tracking-[0.25em] font-bold text-white uppercase block">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[9px] font-mono-code tracking-widest text-[#888] uppercase">
                CURATED CAPSULE // SS26
              </span>
            </div>

            {/* Grid of 4 images */}
            <div className="grid grid-cols-2 gap-2 my-auto">
              {savedProducts.slice(0, 4).map((p) => (
                <div key={p.id} className="aspect-square bg-black overflow-hidden rounded-xl border border-[#333]">
                  <img src={p.images.main} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>

            <div className="space-y-2 pb-2">
              <span className="text-[10px] font-mono-code tracking-[0.2em] text-[#aaa] block">
                TAG @FEATOUS • #FEATOUSERA
              </span>
              <div className="text-[9px] font-mono-code bg-white text-black py-1.5 px-3 uppercase font-bold tracking-wider rounded-lg">
                READY FOR YOUR ERA
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
