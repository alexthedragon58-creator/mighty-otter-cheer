import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Lesson, Quiz } from '../../types/lms';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Download, 
  StickyNote, 
  Award, 
  X, 
  Trash2,
  Check,
  Code2,
  Sparkles,
  Layers
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { QuizModal } from './QuizModal';
import { CertificateModal } from './CertificateModal';
import { CodeEditorSandbox } from './CodeEditorSandbox';
import { FlashcardsModal } from './FlashcardsModal';

export const CoursePlayer: React.FC = () => {
  const { 
    activeCourse, 
    activeLessonId, 
    closeClassroom, 
    setActiveLesson, 
    userProgress, 
    toggleLessonComplete,
    addLessonNote,
    deleteLessonNote,
    getCourseProgressPercentage,
    createForumPost
  } = useLms();

  if (!activeCourse) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'practice' | 'notes' | 'resources' | 'discussion'>('overview');
  const [noteText, setNoteText] = useState('');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [discussionInput, setDiscussionInput] = useState('');

  const progress = userProgress[activeCourse.id] || {
    courseId: activeCourse.id,
    enrolledDate: '',
    completedLessonIds: [],
    quizScores: {},
    isCompleted: false,
    notes: []
  };

  const progressPercentage = getCourseProgressPercentage(activeCourse.id);

  // Flatten lessons for linear playlist
  const allLessons: Lesson[] = [];
  activeCourse.chapters.forEach(ch => {
    ch.lessons.forEach(l => allLessons.push(l));
  });

  const currentLessonIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCurrentCompleted = currentLesson ? progress.completedLessonIds.includes(currentLesson.id) : false;

  const handleSaveNote = () => {
    if (!noteText.trim() || !currentLesson) return;
    addLessonNote(activeCourse.id, currentLesson.id, '03:40', noteText);
    setNoteText('');
  };

  const handlePostQuestion = () => {
    if (!discussionInput.trim()) return;
    createForumPost({
      courseTitle: activeCourse.title,
      title: `Question regarding: ${currentLesson?.title || 'Lecture'}`,
      content: discussionInput,
      tags: [activeCourse.category, 'Classroom Q&A']
    });
    setDiscussionInput('');
    setActiveTab('discussion');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-white overflow-hidden animate-in fade-in duration-200">
      {/* Top Classroom Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={closeClassroom}
            className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl gap-1 text-xs px-2.5"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <h2 className="text-xs sm:text-sm font-bold text-slate-100 truncate max-w-[200px] sm:max-w-md">
            {activeCourse.title}
          </h2>
        </div>

        {/* Progress Bar & Modals Action */}
        <div className="flex items-center gap-3">
          {activeCourse.flashcards && activeCourse.flashcards.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowFlashcards(true)}
              className="text-xs h-8 rounded-xl border-purple-500/40 bg-purple-950/30 text-purple-300 hover:bg-purple-900/50 gap-1 font-semibold"
            >
              <Layers className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Study Flashcards</span>
            </Button>
          )}

          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">{progressPercentage}% Completed</span>
            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {progressPercentage === 100 && (
            <Button
              size="sm"
              onClick={() => setShowCertificate(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md gap-1.5 animate-pulse"
            >
              <Award className="h-4 w-4" />
              <span>Certificate</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={closeClassroom}
            className="text-slate-400 hover:text-white rounded-full h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Classroom Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-950">
        {/* Left Side: Video Player & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-900/40">
          {/* Video Container */}
          <div className="w-full bg-black aspect-video max-h-[52vh] flex items-center justify-center relative shadow-2xl">
            {currentLesson?.videoUrl ? (
              <video
                key={currentLesson.id}
                src={currentLesson.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={activeCourse.thumbnail}
              />
            ) : (
              <div className="text-center p-8">
                <Play className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Stream ready</p>
              </div>
            )}
          </div>

          {/* Lesson Navigation & Completion Bar */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Lesson in Progress</span>
              <h1 className="text-base sm:text-lg font-bold text-white leading-tight mt-0.5">
                {currentLesson?.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => currentLesson && toggleLessonComplete(activeCourse.id, currentLesson.id)}
                className={`text-xs font-semibold rounded-xl border transition-all gap-1.5 ${
                  isCurrentCompleted
                    ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-600/30'
                    : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Check className={`h-4 w-4 ${isCurrentCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{isCurrentCompleted ? 'Completed' : 'Mark Completed'}</span>
              </Button>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!prevLesson}
                  onClick={() => prevLesson && setActiveLesson(prevLesson.id)}
                  className="rounded-xl text-slate-400 hover:text-white disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!nextLesson}
                  onClick={() => nextLesson && setActiveLesson(nextLesson.id)}
                  className="rounded-xl text-slate-400 hover:text-white disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Classroom Tabs */}
          <div className="p-4 sm:p-6 flex-1 bg-slate-950">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-full">
              <TabsList className="bg-slate-900 p-1 border border-slate-800 rounded-xl">
                <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                {currentLesson?.codeExercise && (
                  <TabsTrigger value="practice" className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white flex items-center gap-1">
                    <Code2 className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Interactive Code</span>
                  </TabsTrigger>
                )}
                <TabsTrigger value="notes" className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Notes ({progress.notes.length})
                </TabsTrigger>
                <TabsTrigger value="resources" className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Resources ({currentLesson?.resources?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="discussion" className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Lecture Q&A
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Overview */}
              <TabsContent value="overview" className="space-y-4 pt-4 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h3 className="font-bold text-slate-100 text-sm">Lecture Overview</h3>
                  <p className="leading-relaxed text-slate-300">{currentLesson?.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeCourse.instructor.avatar}
                      alt={activeCourse.instructor.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                    />
                    <div>
                      <div className="font-bold text-slate-100">{activeCourse.instructor.name}</div>
                      <div className="text-[11px] text-indigo-400">{activeCourse.instructor.title}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl border-slate-700 text-slate-200 text-xs hover:bg-slate-800">
                    Contact Instructor
                  </Button>
                </div>
              </TabsContent>

              {/* Tab 2: Interactive Code Exercise */}
              {currentLesson?.codeExercise && (
                <TabsContent value="practice" className="pt-4">
                  <CodeEditorSandbox
                    exercise={currentLesson.codeExercise}
                    onSolved={() => toggleLessonComplete(activeCourse.id, currentLesson.id)}
                  />
                </TabsContent>
              )}

              {/* Tab 3: Notes */}
              <TabsContent value="notes" className="space-y-4 pt-4">
                <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5 text-indigo-400">
                      <StickyNote className="h-4 w-4" /> Add Timestamped Note
                    </span>
                  </div>
                  <Textarea
                    placeholder="Type key takeaway or syntax reminder..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-slate-200 text-xs min-h-[70px] rounded-xl focus:border-indigo-500"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleSaveNote}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                    >
                      Save Note
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {progress.notes.length === 0 ? (
                    <p className="text-xs text-slate-500 italic text-center py-4">No notes created yet.</p>
                  ) : (
                    progress.notes.map(note => (
                      <div key={note.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="font-mono text-[11px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                            ⏱ {note.timestamp}
                          </span>
                          <p className="text-slate-200 pt-1 leading-relaxed">{note.text}</p>
                          <span className="text-[10px] text-slate-500">{note.createdAt}</span>
                        </div>
                        <button
                          onClick={() => deleteLessonNote(activeCourse.id, note.id)}
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Tab 4: Resources */}
              <TabsContent value="resources" className="space-y-3 pt-4">
                {(!currentLesson?.resources || currentLesson.resources.length === 0) ? (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-xl">
                    No downloadable assets for this lecture. Check earlier lectures or module notes.
                  </div>
                ) : (
                  currentLesson.resources.map((res, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{res.name}</p>
                          {res.size && <span className="text-[10px] text-slate-500">{res.size}</span>}
                        </div>
                      </div>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </a>
                    </div>
                  ))
                )}
              </TabsContent>

              {/* Tab 5: Q&A */}
              <TabsContent value="discussion" className="space-y-3 pt-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-200">Got a question on this lecture?</h4>
                  <Textarea
                    placeholder="Ask the instructor & community peers..."
                    value={discussionInput}
                    onChange={(e) => setDiscussionInput(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-xs rounded-xl"
                  />
                  <div className="flex justify-end">
                    <Button size="sm" onClick={handlePostQuestion} className="bg-indigo-600 hover:bg-indigo-500 text-xs text-white rounded-xl">
                      Post Question
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Side: Chapter Playlist */}
        <div className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-auto lg:h-full">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-200">Curriculum Syllabus</h3>
            <span className="text-xs text-slate-400 font-medium">
              {progress.completedLessonIds.length} / {allLessons.length} Done
            </span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-800/80 p-2 space-y-2">
            {activeCourse.chapters.map((chapter, cIdx) => (
              <div key={chapter.id} className="space-y-1 py-1">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Module {cIdx + 1}: {chapter.title.split(':')[1] || chapter.title}</span>
                </div>

                <div className="space-y-1">
                  {chapter.lessons.map(lesson => {
                    const isSelected = lesson.id === activeLessonId;
                    const isDone = progress.completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson.id)}
                        className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? 'bg-indigo-600/20 border border-indigo-500/50 text-indigo-200'
                            : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLessonComplete(activeCourse.id, lesson.id);
                            }}
                            className="shrink-0 text-slate-400 hover:text-emerald-400"
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
                            ) : (
                              <Circle className="h-4 w-4 text-slate-600" />
                            )}
                          </button>
                          <span className={`truncate ${isDone ? 'line-through text-slate-500' : ''}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono shrink-0 ml-2">
                          {lesson.duration}
                        </span>
                      </div>
                    );
                  })}

                  {/* Chapter Quiz Trigger */}
                  {chapter.quiz && (
                    <div
                      onClick={() => setActiveQuiz(chapter.quiz!)}
                      className="p-3 mx-1 rounded-xl bg-amber-950/30 border border-amber-800/40 hover:bg-amber-900/40 cursor-pointer transition-all flex items-center justify-between text-xs text-amber-300 font-semibold"
                    >
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-400" />
                        <span>Quiz: {chapter.quiz.title.split(':')[0]}</span>
                      </div>
                      {progress.quizScores[chapter.quiz.id] !== undefined ? (
                        <Badge className="bg-emerald-900 text-emerald-300 border-none text-[10px]">
                          {progress.quizScores[chapter.quiz.id]}% Score
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-900 text-amber-200 border-none text-[10px]">
                          Start
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Modal Overlay */}
      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz}
          courseId={activeCourse.id}
          onClose={() => setActiveQuiz(null)}
        />
      )}

      {/* Certificate Modal Overlay */}
      {showCertificate && (
        <CertificateModal
          course={activeCourse}
          progress={progress}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Flashcards Modal Overlay */}
      {showFlashcards && activeCourse.flashcards && (
        <FlashcardsModal
          flashcards={activeCourse.flashcards}
          courseTitle={activeCourse.title}
          onClose={() => setShowFlashcards(false)}
        />
      )}
    </div>
  );
};