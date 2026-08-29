import React, { useState } from 'react';
import { ArrowRight, Bookmark, Sparkles, Check, Eye } from 'lucide-react';
import { Product, CollectionCategory } from '../types';

interface ProductShowcaseProps {
  products: Product[];
  selectedCategory: CollectionCategory;
  onSelectCategory: (category: CollectionCategory) => void;
  onOpenProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
  savedProductIds: string[];
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenProduct,
  onToggleSave,
  savedProductIds,
}) => {
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, number>>({});

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter(p => p.collection === selectedCategory);

  const categories: { id: CollectionCategory; label: string; count: number }[] = [
    { id: 'ALL', label: 'ALL SILHOUETTES', count: products.length },
    { id: 'ACTIVE', label: 'ACTIVE COLLECTION', count: products.filter(p => p.collection === 'ACTIVE').length },
    { id: 'PREMIUM', label: 'PREMIUM MENSWEAR', count: products.filter(p => p.collection === 'PREMIUM').length },
    { id: 'RETRO', label: 'RETRO ARCHIVE', count: products.filter(p => p.collection === 'RETRO').length },
  ];

  return (
    <section id="catalog" className="w-full py-16 sm:py-24 bg-[#0A0A0A] text-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#222]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono-code tracking-[0.3em] text-[#888] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>CURATED SILHOUETTES</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl text-[#E5E5E5] uppercase tracking-tight">
              EDITORIAL SHOWCASE
            </h2>
            <p className="text-xs font-mono-code tracking-[0.2em] text-[#888] uppercase pt-1">
              BUILT AT THE INTERSECTION OF STREET, DISCIPLINE & TIMELESS LUXURY
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-[11px] font-mono-code tracking-wider uppercase transition-all duration-200 border rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black border-white font-semibold shadow-lg shadow-white/10'
                    : 'bg-[#151515] text-[#888] border-[#2a2a2a] hover:border-[#444] hover:text-white'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);
            const activeColorIdx = selectedColorMap[product.id] ?? 0;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#151515] border border-[#222] hover:border-[#444] rounded-2xl transition-all duration-300 relative overflow-hidden shadow-xl"
              >
                {/* Product Image Frame */}
                <div
                  onClick={() => onOpenProduct(product)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#0A0A0A] cursor-pointer"
                >
                  <img
                    src={product.images.main}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                    referrerPolicy="no-referrer"
                  />

                  {/* Secondary image hover transition if exists */}
                  <img
                    src={product.images.editorial}
                    alt={`${product.name} editorial look`}
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 brightness-95"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center pointer-events-none">
                    <span className="px-2.5 py-1 bg-[#151515]/90 backdrop-blur-md border border-[#2a2a2a] text-[9px] font-mono-code tracking-widest uppercase text-[#E5E5E5] rounded-full">
                      {product.collection}
                    </span>
                    {product.weightGsm && (
                      <span className="px-2.5 py-1 bg-[#151515]/90 backdrop-blur-md text-[9px] font-mono-code tracking-widest text-[#aaa] border border-[#2a2a2a] rounded-full">
                        {product.weightGsm}
                      </span>
                    )}
                  </div>

                  {/* Save / Moodboard Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(product.id);
                    }}
                    title={isSaved ? 'Remove from Moodboard' : 'Save to Moodboard'}
                    className={`absolute bottom-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
                      isSaved
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-[#151515]/80 text-[#aaa] hover:text-white hover:bg-[#222] border border-[#2a2a2a]'
                    }`}
                  >
                    <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>

                  {/* Hover Quick View Trigger */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 bg-white text-black font-mono-code text-[10px] tracking-[0.2em] font-semibold uppercase flex items-center space-x-1.5 rounded-xl shadow-2xl">
                      <Eye size={12} />
                      <span>QUICK VIEW</span>
                    </span>
                  </div>
                </div>

                {/* Editorial Content Info */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4 bg-[#151515]">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-mono-code tracking-[0.2em] text-[#888] uppercase">
                        {product.fit}
                      </span>
                      {product.price && (
                        <span className="text-xs font-mono-code text-white font-semibold">
                          {product.price}
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onOpenProduct(product)}
                      className="font-editorial-serif text-xl text-[#E5E5E5] uppercase tracking-wide cursor-pointer hover:text-white transition-colors leading-tight"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs font-mono-code text-[#888] tracking-wider line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Color Swatches & Action */}
                  <div className="pt-3 border-t border-[#222] flex items-center justify-between">
                    {/* Colors */}
                    <div className="flex items-center space-x-2">
                      {product.colors.map((color, cIdx) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColorMap({ ...selectedColorMap, [product.id]: cIdx })}
                          title={color.name}
                          className={`w-3.5 h-3.5 rounded-full border transition-all ${
                            activeColorIdx === cIdx ? 'border-white scale-125 ring-1 ring-white/50' : 'border-[#444] hover:border-zinc-400'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                      <span className="text-[10px] font-mono-code text-[#888] pl-1">
                        {product.colors[activeColorIdx]?.name}
                      </span>
                    </div>

                    {/* Discover / View Product Button */}
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="text-xs font-mono-code uppercase tracking-[0.18em] text-[#E5E5E5] hover:text-white flex items-center space-x-1 group/btn"
                    >
                      <span className="border-b border-[#444] group-hover/btn:border-white pb-0.5">DISCOVER</span>
                      <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
