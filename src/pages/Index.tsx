import React, { useState, useMemo } from 'react';
import { LmsProvider, useLms } from '../context/LmsContext';
import { Navbar } from '../components/layout/Navbar';
import { CourseCard } from '../components/course/CourseCard';
import { CourseDetailModal } from '../components/course/CourseDetailModal';
import { CoursePlayer } from '../components/classroom/CoursePlayer';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';
import { InstructorStudio } from '../components/instructor/InstructorStudio';
import { LiveWebinarsTab } from '../components/live/LiveWebinarsTab';
import { CommunityForumTab } from '../components/community/CommunityForumTab';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { 
  BookOpen, 
  LayoutDashboard, 
  Video, 
  MessageSquare, 
  Sparkles, 
  SlidersHorizontal,
  Search,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const CATEGORIES = [
  'All Categories',
  'Web Development',
  'AI & Data Science',
  'UI/UX Design',
  'Cloud & DevOps',
  'Business & Product',
  'Cybersecurity'
];

const MainLmsApp: React.FC = () => {
  const { 
    courses, 
    selectedCourseForPreview, 
    closeCoursePreview, 
    activeCourse,
    currentUser
  } = useLms();

  const [currentTab, setCurrentTab] = useState<'explore' | 'dashboard' | 'studio' | 'webinars' | 'community' | 'admin'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  // Filter & Search Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
      const matchLevel = selectedLevel === 'All' || course.level === selectedLevel;

      return matchSearch && matchCategory && matchLevel;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.studentsEnrolled - a.studentsEnrolled;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab: any) => setCurrentTab(tab)}
        onOpenCreateCourse={() => setCurrentTab('studio')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Tab Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
            <button
              onClick={() => setCurrentTab('explore')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                currentTab === 'explore'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Course Catalog</span>
            </button>

            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                currentTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>My Learning Desk</span>
            </button>

            <button
              onClick={() => setCurrentTab('webinars')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                currentTab === 'webinars'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Video className="h-4 w-4" />
              <span>Live Workshops</span>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            </button>

            <button
              onClick={() => setCurrentTab('community')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                currentTab === 'community'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Discussions & Q&A</span>
            </button>

            {currentUser.role === 'instructor' && (
              <button
                onClick={() => setCurrentTab('studio')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  currentTab === 'studio'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>Instructor Studio</span>
              </button>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  currentTab === 'admin'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin Console</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* TAB 1: Explore Courses */}
        {currentTab === 'explore' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Header */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl">
              <div className="max-w-2xl space-y-4 relative z-10">
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 text-xs font-semibold px-3 py-1">
                  ⚡ Next-Gen Engineering Academy
                </Badge>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Master cutting-edge tech from world-class architects.
                </h1>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  Deep-dive masterclasses in AI systems, Next.js 15, scalable cloud microservices, design systems, and cybersecurity with verifiable certificates.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    onClick={() => setSelectedCategory('AI & Data Science')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold px-4 h-10 shadow-lg shadow-indigo-600/30"
                  >
                    Explore Generative AI
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory('Web Development')}
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl text-xs font-bold px-4 h-10 backdrop-blur-sm"
                  >
                    Full-Stack Next.js
                  </Button>
                </div>
              </div>

              {/* Background gradient decorative glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Category Pills Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filters and Sorting Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
                <span>Showing <strong className="text-slate-900">{filteredCourses.length}</strong> masterclasses</span>
                {selectedCategory !== 'All Categories' && (
                  <Badge variant="secondary" className="text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                    {selectedCategory}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Level Filter */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-36 h-9 rounded-xl text-xs border-slate-200">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Option */}
                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-36 h-9 rounded-xl text-xs border-slate-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Recently Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <Search className="h-10 w-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No courses match your filter criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search keyword or switching difficulty and category filters.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                    setSelectedLevel('All');
                  }}
                  variant="outline"
                  className="rounded-xl text-xs"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Student Dashboard */}
        {currentTab === 'dashboard' && (
          <StudentDashboard onExploreMore={() => setCurrentTab('explore')} />
        )}

        {/* TAB 3: Live Webinars */}
        {currentTab === 'webinars' && (
          <LiveWebinarsTab />
        )}

        {/* TAB 4: Community Forums */}
        {currentTab === 'community' && (
          <CommunityForumTab />
        )}

        {/* TAB 5: Instructor Studio */}
        {currentTab === 'studio' && (
          <InstructorStudio />
        )}

        {/* TAB 6: Admin Dashboard */}
        {currentTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Interactive Modals */}
      {selectedCourseForPreview && (
        <CourseDetailModal
          course={selectedCourseForPreview}
          onClose={closeCoursePreview}
        />
      )}

      {/* Active Classroom Player (Fullscreen Overlay) */}
      {activeCourse && <CoursePlayer />}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LearnSphere LMS. Empowering modern software engineers worldwide.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-800 cursor-pointer">API & Docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <LmsProvider>
      <MainLmsApp />
    </LmsProvider>
  );
};

export default Index;