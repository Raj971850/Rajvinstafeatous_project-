import React, { useState } from 'react';
import { X, Search, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpenProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onOpenProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const popularSearches = ['320 GSM Box Tee', 'Tactical Cargos', 'FEAT.01 Runner', 'Cashmere Silk', 'Raw Selvedge Denim', 'Signet Ring'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#151515] border border-[#222] rounded-3xl shadow-2xl p-6 sm:p-8 text-[#E5E5E5] space-y-6">
        {/* Header and Search Input */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222]">
          <div className="flex items-center space-x-3 flex-1 mr-4">
            <Search size={20} className="text-[#888] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search silhouettes, materials, GSM, or drop collections..."
              className="w-full bg-transparent text-sm sm:text-base font-mono-code text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#2a2a2a] text-[#888] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="space-y-3">
            <span className="text-[10px] font-mono-code tracking-[0.25em] text-[#888] uppercase block">
              POPULAR DISCOVERIES:
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 bg-[#1a1a1a] hover:bg-[#222] text-xs font-mono-code text-[#ccc] hover:text-white rounded-xl border border-[#2a2a2a] hover:border-[#444] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[50vh] overflow-y-auto space-y-3 no-scrollbar">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono-code text-[#777]">
              NO SILHOUETTES MATCHING "{query.toUpperCase()}"
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onOpenProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3.5 bg-[#1a1a1a] hover:bg-[#202020] border border-[#2a2a2a] hover:border-[#444] rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={product.images.main}
                    alt={product.name}
                    className="w-12 h-12 object-cover bg-[#101010] rounded-xl border border-[#333]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[9px] font-mono-code text-[#888] uppercase">
                      {product.collection}
                    </span>
                    <h5 className="font-editorial-serif text-sm text-white uppercase">
                      {product.name}
                    </h5>
                    <span className="text-[10px] font-mono-code text-[#aaa]">
                      {product.fabric}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono-code text-[#ccc]">
                  {product.price || 'VIEW →'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
