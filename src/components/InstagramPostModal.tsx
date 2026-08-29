import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight, CheckCircle2, ShoppingBag, Share2, Sparkles } from 'lucide-react';
import { InstagramPost, Product } from '../types';
import { BRAND_CONFIG } from '../data/brandData';

interface InstagramPostModalProps {
  post: InstagramPost | null;
  onClose: () => void;
  onOpenProductById: (id: string) => void;
  products: Product[];
}

export const InstagramPostModal: React.FC<InstagramPostModalProps> = ({
  post,
  onClose,
  onOpenProductById,
  products,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(post?.comments || []);
  const [likeAnimation, setLikeAnimation] = useState(false);

  if (!post) return null;

  const currentLikes = post.likes + (isLiked ? 1 : 0);

  const handleDoubleTap = () => {
    setIsLiked(true);
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 900);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: `c-user-${Date.now()}`,
      user: 'street.collector_26',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      text: commentInput.trim(),
      timeAgo: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setCommentInput('');
  };

  const taggedProducts = (post.taggedProductIds || [])
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#151515] border border-[#222] rounded-3xl my-auto shadow-2xl overflow-hidden text-[#E5E5E5] flex flex-col lg:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-[#1a1a1a] hover:bg-white hover:text-black rounded-full border border-[#333] transition-colors text-white"
          aria-label="Close Instagram modal"
        >
          <X size={18} />
        </button>

        {/* Left Side: Media Display (Photo / Carousel) */}
        <div
          onDoubleClick={handleDoubleTap}
          className="relative lg:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[340px] sm:min-h-[460px]"
        >
          <img
            src={post.images[activeImageIdx] || post.images[0]}
            alt={post.caption}
            className="w-full h-full object-contain max-h-[70vh] lg:max-h-[85vh] select-none"
            referrerPolicy="no-referrer"
          />

          {/* Double tap heart animation */}
          {likeAnimation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-ping duration-700">
              <Heart size={90} className="text-white fill-white drop-shadow-2xl" />
            </div>
          )}

          {/* Carousel Arrows */}
          {post.images.length > 1 && (
            <>
              {activeImageIdx > 0 && (
                <button
                  onClick={() => setActiveImageIdx(activeImageIdx - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
              {activeImageIdx < post.images.length - 1 && (
                <button
                  onClick={() => setActiveImageIdx(activeImageIdx + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              )}

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                {post.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      activeImageIdx === idx ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Tagged Products Floating Pill */}
          {taggedProducts.length > 0 && (
            <div className="absolute bottom-4 left-4 z-10">
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-mono-code text-white">
                <ShoppingBag size={11} />
                <span>{taggedProducts.length} TAGGED PIECES</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Instagram Post Social Metadata & Stream */}
        <div className="lg:w-2/5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#222] bg-[#151515] max-h-[70vh] lg:max-h-[85vh]">
          {/* Header (Profile Handle & Follow) */}
          <div className="p-4 border-b border-[#222] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={post.avatar}
                alt={post.handle}
                className="w-9 h-9 rounded-full object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-semibold text-xs text-white">{post.handle}</span>
                  {post.isVerified && <CheckCircle2 size={13} className="text-blue-400 fill-blue-400" />}
                </div>
                {post.location && (
                  <span className="text-[10px] text-[#888] font-mono-code block">{post.location}</span>
                )}
              </div>
            </div>

            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono-code text-blue-400 hover:text-blue-300 font-semibold tracking-wider uppercase"
            >
              FOLLOW
            </a>
          </div>

          {/* Scrollable Comments & Caption */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
            {/* Main Post Caption */}
            <div className="flex items-start space-x-3 text-xs leading-relaxed pb-3 border-b border-[#222]">
              <img
                src={post.avatar}
                alt={post.handle}
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <p className="text-[#ccc]">
                  <strong className="text-white mr-1.5">{post.handle}</strong>
                  {post.caption}
                </p>
                <div className="flex items-center space-x-2 text-[10px] font-mono-code text-[#777] pt-1">
                  <span>{post.timestamp}</span>
                  {post.audioTrack && (
                    <>
                      <span>•</span>
                      <span className="truncate max-w-[180px]">{post.audioTrack}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tagged Products Shortcuts */}
            {taggedProducts.length > 0 && (
              <div className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl space-y-2">
                <span className="text-[9px] font-mono-code uppercase tracking-wider text-[#888] block">
                  SHOP THE LOOK:
                </span>
                <div className="space-y-2">
                  {taggedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onOpenProductById(p.id)}
                      className="flex items-center justify-between p-2 bg-[#222] hover:bg-[#2a2a2a] rounded-lg border border-[#333] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <img src={p.images.main} alt={p.name} className="w-8 h-8 object-cover rounded-md" referrerPolicy="no-referrer" />
                        <div>
                          <h5 className="font-editorial-serif text-xs text-white uppercase">{p.name}</h5>
                          <span className="text-[10px] font-mono-code text-[#aaa]">{p.price}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono-code text-white underline">VIEW →</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Comments Stream */}
            <div className="space-y-3 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2.5 text-xs">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-0.5">
                    <p className="text-[#ccc]">
                      <strong className="text-white mr-1.5">{comment.user}</strong>
                      {comment.text}
                    </p>
                    <div className="flex items-center space-x-3 text-[10px] font-mono-code text-[#777]">
                      <span>{comment.timeAgo}</span>
                      <span>{comment.likes} likes</span>
                      <button className="hover:text-white">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Action Bar */}
          <div className="p-4 border-t border-[#222] space-y-3 bg-[#111111]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="hover:scale-110 transition-transform"
                >
                  <Heart
                    size={20}
                    className={isLiked ? 'text-red-500 fill-red-500' : 'text-white'}
                  />
                </button>
                <button className="hover:scale-110 transition-transform text-white">
                  <MessageCircle size={20} />
                </button>
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform text-white"
                >
                  <Send size={20} />
                </a>
              </div>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="hover:scale-110 transition-transform text-white"
              >
                <Bookmark size={20} fill={isBookmarked ? 'white' : 'none'} />
              </button>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-xs text-white">
                {currentLikes.toLocaleString()} likes
              </span>
              <div className="text-[10px] font-mono-code text-[#888] uppercase">
                {post.timestamp}
              </div>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-[#222] flex items-center space-x-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment for @featous..."
                className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="text-xs font-mono-code uppercase font-semibold text-white disabled:text-[#555] hover:text-[#aaa] transition-colors"
              >
                POST
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
