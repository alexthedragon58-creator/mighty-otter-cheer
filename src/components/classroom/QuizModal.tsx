import React, { useState } from 'react';
import { Quiz } from '../../types/lms';
import { useLms } from '../../context/LmsContext';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  quiz: Quiz;
  courseId: string;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, courseId, onClose }) => {
  const { submitQuizScore } = useLms();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    submitQuizScore(courseId, quiz.id, score);

    if (score >= quiz.passingScore) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const passed = score >= quiz.passingScore;
  const allAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs font-bold">
                Knowledge Check
              </Badge>
              <span className="text-xs text-slate-500">Passing Score: {quiz.passingScore}%</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">{quiz.title}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full text-xs">
            Close
          </Button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Result Banner if submitted */}
          {isSubmitted && (
            <div className={`p-5 rounded-2xl border flex items-center justify-between ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${passed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                  {passed ? <Award className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">
                    {passed ? '🎉 Congratulations! You Passed!' : 'Need a little more practice'}
                  </h3>
                  <p className="text-xs opacity-90">
                    You scored <strong>{score}%</strong> ({Object.values(selectedAnswers).filter((ans, idx) => ans === quiz.questions[idx].correctIndex).length} of {quiz.questions.length} correct).
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {!passed && (
                  <Button size="sm" variant="outline" onClick={handleRetake} className="text-xs rounded-xl gap-1">
                    <RotateCcw className="h-3.5 w-3.5" /> Retake
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-6">
            {quiz.questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md shrink-0">
                      Q{qIdx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">{q.question}</h4>
                  </div>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      let btnClasses = "w-full text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ";

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnClasses += "bg-emerald-100/70 border-emerald-400 text-emerald-950 font-semibold";
                        } else if (isChosen && !isCorrect) {
                          btnClasses += "bg-red-100/70 border-red-400 text-red-950";
                        } else {
                          btnClasses += "bg-white border-slate-200 text-slate-400 opacity-60";
                        }
                      } else {
                        if (isChosen) {
                          btnClasses += "bg-indigo-50 border-indigo-500 text-indigo-900 shadow-sm";
                        } else {
                          btnClasses += "bg-white hover:bg-slate-100 border-slate-200 text-slate-700";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelect(qIdx, optIdx)}
                          className={btnClasses}
                        >
                          <span>{opt}</span>
                          {isSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          )}
                          {isSubmitted && isChosen && !isCorrect && (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-2 p-2.5 rounded-lg bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
          </span>
          {!isSubmitted ? (
            <Button
              disabled={!allAnswered}
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl px-5 gap-1.5"
            >
              Submit Quiz
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl px-5"
            >
              Done & Return
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};