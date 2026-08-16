import React from 'react';
import { useLms } from '../../context/LmsContext';
import { CourseCard } from '../course/CourseCard';
import { 
  Flame, 
  Target, 
  Award, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

interface StudentDashboardProps {
  onExploreMore: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onExploreMore }) => {
  const { currentUser, courses, userProgress, startCourse } = useLms();

  const enrolledCourseIds = Object.keys(userProgress);
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  const completedCourses = enrolledCourses.filter(c => userProgress[c.id]?.isCompleted);
  const inProgressCourses = enrolledCourses.filter(c => !userProgress[c.id]?.isCompleted);

  const weeklyGoalPercentage = Math.min(100, Math.round((currentUser.completedHoursThisWeek / currentUser.weeklyGoalHours) * 100));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Welcome back, {currentUser.name}!</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to level up your engineering skills today?
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100 font-light leading-relaxed">
            You're on track for your weekly study target. Complete today's module to keep your {currentUser.streakDays}-day streak active.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {inProgressCourses.length > 0 ? (
              <Button
                onClick={() => startCourse(inProgressCourses[0])}
                className="bg-white hover:bg-slate-100 text-indigo-950 font-bold rounded-xl shadow-lg gap-2 text-xs h-10 px-5"
              >
                Resume: {inProgressCourses[0].title.slice(0, 26)}...
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={onExploreMore}
                className="bg-white hover:bg-slate-100 text-indigo-950 font-bold rounded-xl shadow-lg gap-2 text-xs h-10 px-5"
              >
                Explore New Courses
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Decorative background blurs */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-purple-500/20 to-transparent pointer-events-none" />
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Daily Streak</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{currentUser.streakDays} Days</h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Top 5% of active learners</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
            <Flame className="h-6 w-6 fill-amber-500 text-amber-500" />
          </div>
        </div>

        {/* Weekly Study Goal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-medium">Weekly Goal</p>
            <h3 className="text-2xl font-extrabold text-slate-900">{currentUser.completedHoursThisWeek} / {currentUser.weeklyGoalHours}h</h3>
            <div className="w-28 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${weeklyGoalPercentage}%` }} />
            </div>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Target className="h-6 w-6" />
          </div>
        </div>

        {/* Courses in Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Courses</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{inProgressCourses.length}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{enrolledCourses.length} total enrolled</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        {/* Certificates Earned */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Certificates</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{completedCourses.length}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Shareable credentials</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Award className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* In-Progress Learning Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Continue Learning</h2>
            <p className="text-xs text-slate-500">Pick up right where you left off</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onExploreMore} className="text-indigo-600 text-xs font-semibold gap-1">
            Browse all courses <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {inProgressCourses.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
            <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No active courses in progress</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore our masterclasses in AI, Next.js, Cloud, and Design to start your learning journey!
            </p>
            <Button onClick={onExploreMore} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl">
              Browse Course Catalog
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Completed Courses & Certifications */}
      {completedCourses.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              <span>Earned Certifications ({completedCourses.length})</span>
            </h2>
            <p className="text-xs text-slate-500">Verified credentials issued in your name</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCourses.map(c => (
              <div key={c.id} className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified</Badge>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{c.title}</h4>
                  <p className="text-[10px] text-slate-500">Instructor: {c.instructor.name}</p>
                </div>
                <Button size="sm" onClick={() => startCourse(c)} variant="outline" className="text-xs rounded-xl border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  View Certificate
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};