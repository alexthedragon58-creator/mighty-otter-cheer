import React from 'react';
import { Course } from '../../types/lms';
import { useLms } from '../../context/LmsContext';
import { Star, Clock, BookOpen, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { openCoursePreview, startCourse, isEnrolled, getCourseProgressPercentage } = useLms();
  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgressPercentage(course.id);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'AI & Data Science': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Web Development': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'UI/UX Design': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Cloud & DevOps': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Business & Product': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Cybersecurity': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group flex flex-col bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => openCoursePreview(course)}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge className={`text-[10px] font-semibold border ${getCategoryColor(course.category)}`}>
            {course.category}
          </Badge>
          {course.bestseller && (
            <Badge className="bg-amber-500 text-white font-bold text-[10px] border-none shadow-sm">
              ★ Bestseller
            </Badge>
          )}
        </div>

        {/* Level badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-900/80 text-slate-200 backdrop-blur-sm border border-slate-700">
            {course.level}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Instructor & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
            <div className="flex items-center gap-1.5">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="h-5 w-5 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="font-medium text-slate-700 truncate max-w-[130px]">{course.instructor.name}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-amber-600">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal text-[11px]">({course.ratingCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors mb-2"
            onClick={() => openCoursePreview(course)}
          >
            {course.title}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {course.tagline}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-[11px] text-slate-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-indigo-500" />
              <span>{course.totalDuration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
              <span>{course.totalLessons} Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-indigo-500" />
              <span>{course.studentsEnrolled.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA / Progress */}
        <div className="pt-1">
          {enrolled ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1 text-indigo-600">
                  {progress === 100 ? (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  ) : (
                    `In Progress (${progress}%)`
                  )}
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-indigo-50 [&>div]:bg-indigo-600" />
              <Button
                onClick={() => startCourse(course)}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl h-9 shadow-sm gap-1.5"
              >
                {progress === 100 ? 'Review Classroom' : 'Continue Learning'}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-lg font-extrabold text-slate-900">${course.price}</span>
                {course.originalPrice && (
                  <span className="text-xs text-slate-400 line-through ml-1.5">${course.originalPrice}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openCoursePreview(course)}
                  className="rounded-xl text-xs font-medium border-slate-200 hover:bg-slate-50"
                >
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => startCourse(course)}
                  className="rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};