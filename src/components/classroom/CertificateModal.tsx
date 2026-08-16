import React, { useRef } from 'react';
import { Course, UserProgress } from '../../types/lms';
import { useLms } from '../../context/LmsContext';
import { Award, Download, Share2, CheckCircle, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { showSuccess } from '../../utils/toast';

interface CertificateModalProps {
  course: Course;
  progress: UserProgress;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ course, progress, onClose }) => {
  const { currentUser } = useLms();
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showSuccess('Certificate verification link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <span className="text-xs font-bold text-slate-800">Official Certificate of Completion</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Certificate Printable Area */}
        <div className="p-8 bg-slate-50 flex justify-center">
          <div
            ref={certRef}
            className="w-full max-w-2xl bg-white border-8 border-double border-indigo-900/40 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 100%)' }}
          >
            {/* Watermark badge background */}
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
              <Award className="w-80 h-80 text-indigo-950" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-center gap-2 text-indigo-700 font-extrabold uppercase tracking-widest text-xs">
                <Sparkles className="h-4 w-4" />
                <span>LearnSphere Academy Certification</span>
                <Sparkles className="h-4 w-4" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                Certificate of Achievement
              </h1>
              <p className="text-xs text-slate-500 font-medium">This is proudly presented to</p>

              <div className="py-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-indigo-900 border-b-2 border-indigo-300 pb-1 px-8 inline-block font-sans">
                  {currentUser.name}
                </span>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                for successfully demonstrating mastery and completing all practical modules, projects, and assessments for
              </p>

              <h3 className="text-lg font-bold text-slate-900 text-indigo-950 font-serif">
                "{course.title}"
              </h3>

              <div className="pt-6 grid grid-cols-2 gap-6 text-left border-t border-slate-200 mt-6 text-xs text-slate-600">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Instructor Signature</p>
                  <p className="font-serif font-bold text-slate-800 text-sm mt-1">{course.instructor.name}</p>
                  <p className="text-[10px] text-indigo-600">{course.instructor.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Verification ID & Date</p>
                  <p className="font-mono font-bold text-slate-800 text-xs mt-1">{progress.certificateId || 'CERT-982142'}</p>
                  <p className="text-[10px] text-slate-500">Issued on {progress.completedDate || new Date().toISOString().split('T')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <CheckCircle className="h-4 w-4" />
            <span>Cryptographically Verified Credential</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} className="rounded-xl text-xs gap-1.5">
              <Share2 className="h-3.5 w-3.5" /> Share
            </Button>
            <Button size="sm" onClick={handlePrint} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs gap-1.5 shadow-sm font-semibold">
              <Download className="h-3.5 w-3.5" /> Print / Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};