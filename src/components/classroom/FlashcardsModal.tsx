import React, { useState } from 'react';
import { Flashcard } from '../../types/lms';
import { ChevronLeft, ChevronRight, RotateCw, X, Sparkles, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface FlashcardsModalProps {
  flashcards: Flashcard[];
  courseTitle: string;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  flashcards,
  courseTitle,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) return null;

  const current = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs font-bold">
              Rapid Study Flashcards
            </Badge>
            <span className="text-xs text-slate-500 truncate max-w-[200px]">{courseTitle}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Card Arena */}
        <div className="p-8 flex flex-col items-center justify-center space-y-6">
          <div className="text-xs font-semibold text-slate-400">
            Card {currentIndex + 1} of {flashcards.length}
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-indigo-200/80 shadow-md hover:shadow-xl transition-all cursor-pointer p-6 flex flex-col justify-between select-none relative group transform active:scale-95"
          >
            <div className="flex items-center justify-between text-xs text-indigo-700 font-bold">
              <span>{current.category}</span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-normal">
                <RotateCw className="h-3 w-3" /> Click card to flip
              </span>
            </div>

            <div className="text-center my-auto px-4">
              {!isFlipped ? (
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Question</span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    {current.front}
                  </h3>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[11px] uppercase tracking-wider text-indigo-600 font-bold block mb-1">Answer</span>
                  <p className="text-sm sm:text-base font-semibold text-indigo-950 leading-relaxed">
                    {current.back}
                  </p>
                </div>
              )}
            </div>

            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-medium">
                {isFlipped ? 'Tap to view Question' : 'Tap to Reveal Answer'}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="rounded-xl text-xs gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs gap-1 px-5 font-semibold"
            >
              Next Card <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};