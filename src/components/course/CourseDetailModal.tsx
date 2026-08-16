import React, { useState } from 'react';
import { Course } from '../../types/lms';
import { useLms } from '../../context/LmsContext';
import { 
  X, 
  Check, 
  Star, 
  Clock, 
  BookOpen, 
  Award, 
  PlayCircle, 
  Users, 
  Calendar, 
  ShieldCheck, 
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const { startCourse, isEnrolled, getCourseProgressPercentage } = useLms();
  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgressPercentage(course.id);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(course.chapters[0]?.id || null);

  const toggleChapter = (id: string) => {
    setExpandedChapter(prev => prev === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-semibold bg-white text-indigo-700 border-indigo-200">
              {course.category}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Last updated {course.updatedAt}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {course.tagline}
              </p>

              {/* Badges and metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal">({course.ratingCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <Users className="h-4 w-4 text-indigo-500" />
                  <span>{course.studentsEnrolled.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <Award className="h-4 w-4 text-emerald-500" />
                  <span>Certificate Included</span>
                </div>
              </div>

              {/* Instructor badge */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-200"
                />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Created by {course.instructor.name}</div>
                  <div className="text-[11px] text-slate-500">{course.instructor.title}</div>
                </div>
              </div>
            </div>

            {/* Right enrollment box */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-100 space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-md group">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle className="h-7 w-7 fill-indigo-600 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-slate-400 line-through font-medium">${course.originalPrice}</span>
                  )}
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    SAVE {Math.round(((course.originalPrice! - course.price) / course.originalPrice!) * 100)}%
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Full lifetime access on web & mobile
                </p>
              </div>

              <Button
                onClick={() => startCourse(course)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl py-6 shadow-md shadow-indigo-200"
              >
                {enrolled ? `Continue Learning (${progress}%)` : 'Enroll Now & Get Access'}
              </Button>

              <div className="text-[11px] text-slate-500 text-center space-y-1">
                <div className="flex items-center justify-center gap-1 text-slate-600 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Overview, Curriculum, Instructor, Reviews */}
          <Tabs defaultValue="curriculum" className="w-full pt-4">
            <TabsList className="grid grid-cols-4 w-full bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="curriculum" className="rounded-lg text-xs font-semibold">Syllabus</TabsTrigger>
              <TabsTrigger value="outcomes" className="rounded-lg text-xs font-semibold">What You'll Learn</TabsTrigger>
              <TabsTrigger value="instructor" className="rounded-lg text-xs font-semibold">Instructor</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg text-xs font-semibold">Reviews ({course.reviews.length})</TabsTrigger>
            </TabsList>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                <span>{course.chapters.length} Modules • {course.totalLessons} Lessons</span>
                <span>{course.totalDuration} total length</span>
              </div>

              <div className="space-y-3">
                {course.chapters.map((chapter, idx) => {
                  const isExpanded = expandedChapter === chapter.id;
                  return (
                    <div key={chapter.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-xs text-indigo-600">Module {idx + 1}</span>
                          <span className="font-semibold text-xs text-slate-800">{chapter.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{chapter.lessons.length} lessons</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="divide-y divide-slate-100 px-4 py-2 bg-white">
                          {chapter.lessons.map(lesson => (
                            <div key={lesson.id} className="py-2.5 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 text-slate-700">
                                <PlayCircle className="h-4 w-4 text-indigo-500" />
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-slate-400 font-medium">{lesson.duration}</span>
                            </div>
                          ))}
                          {chapter.quiz && (
                            <div className="py-2.5 flex items-center justify-between text-xs text-amber-700 font-semibold bg-amber-50/50 px-2 rounded-lg my-1">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-amber-600" />
                                <span>Quiz: {chapter.quiz.title}</span>
                              </div>
                              <span className="text-[11px] text-amber-800">{chapter.quiz.questions.length} questions</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Learning Outcomes Tab */}
            <TabsContent value="outcomes" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Prerequisites</h4>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  {course.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Instructor Tab */}
            <TabsContent value="instructor" className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-300"
                />
                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-bold text-slate-900">{course.instructor.name}</h3>
                  <p className="text-xs text-indigo-600 font-medium">{course.instructor.title}</p>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed">{course.instructor.bio}</p>
                  <div className="flex gap-4 pt-2 text-xs font-semibold text-slate-700">
                    <div>⭐ {course.instructor.rating} Instructor Rating</div>
                    <div>🎓 {course.instructor.studentsCount.toLocaleString()} Students</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-3 pt-4">
              {course.reviews.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 text-center">No reviews yet. Be the first to leave one after enrolling!</p>
              ) : (
                course.reviews.map(rev => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.userAvatar} alt={rev.userName} className="h-6 w-6 rounded-full object-cover" />
                        <span className="font-semibold text-slate-900">{rev.userName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom footer button for quick enroll */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Includes full certificate of completion & downloadable resources
          </div>
          <Button
            onClick={() => startCourse(course)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl px-5"
          >
            {enrolled ? 'Open Classroom' : `Enroll for $${course.price}`}
          </Button>
        </div>
      </div>
    </div>
  );
};