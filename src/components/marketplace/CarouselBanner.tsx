import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { BrandStore } from '../../types';

interface CarouselBannerProps {
  stores: BrandStore[];
  onOpenStore: (store: BrandStore) => void;
}

export const CarouselBanner: React.FC<CarouselBannerProps> = ({ stores, onOpenStore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Flatten banners with store context
  const slides = stores.map((s, idx) => ({
    store: s,
    image: s.banners[0],
    title: s.name,
    tagline: s.tagline,
    category: s.category,
    accent: s.primaryColor,
    idx,
  }));

  // Auto rotation every 4.5 seconds
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIdx] || slides[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Container */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[460px] overflow-hidden bg-slate-950">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Measured Contrast Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090f]/90 via-[#08090f]/40 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 z-10">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08090f]/80 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-cyan-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentSlide.category}</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {currentSlide.title}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 line-clamp-2 max-w-xl">
              {currentSlide.tagline}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenStore(currentSlide.store)}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Explorar Vitrine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Chevrons */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#08090f]/70 hover:bg-[#08090f] text-slate-200 hover:text-white border border-slate-700/80 backdrop-blur-sm opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all z-20"
        title="Banner anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#08090f]/70 hover:bg-[#08090f] text-slate-200 hover:text-white border border-slate-700/80 backdrop-blur-sm opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all z-20"
        title="Próximo banner"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-3 right-4 sm:right-8 flex items-center gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIdx === i ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#38bdf8]' : 'w-2 bg-slate-600 hover:bg-slate-400'
            }`}
            title={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
