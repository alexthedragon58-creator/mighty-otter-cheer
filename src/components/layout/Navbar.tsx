import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { 
  GraduationCap, 
  Flame, 
  Search, 
  Bell, 
  Sparkles, 
  UserCheck, 
  Layers, 
  PlusCircle, 
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { UserRole } from '../../types/lms';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenCreateCourse: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenCreateCourse,
  searchQuery,
  setSearchQuery,
}) => {
  const { currentUser, setRole, activeCourse } = useLms();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('explore')}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              LearnSphere
            </span>
            <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
              Pro LMS
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search AI, Next.js, Cloud, UI/UX, Python..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 rounded-full text-sm transition-all h-9"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right Section Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Learning Streak */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-bold shadow-xs">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{currentUser.streakDays} Day Streak!</span>
          </div>

          {/* Quick Create Button (If Instructor) */}
          {currentUser.role === 'instructor' && (
            <Button
              onClick={onOpenCreateCourse}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium shadow-sm gap-1.5 text-xs px-3"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Create Course</span>
            </Button>
          )}

          {/* Role Switcher Pill */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full text-xs font-medium border-slate-200 bg-slate-50 hover:bg-slate-100 gap-1.5 px-3">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span className="capitalize">{currentUser.role} View</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 p-2">
              <DropdownMenuLabel className="text-xs font-semibold text-slate-500">Switch Persona</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setRole('student')}
                className={`cursor-pointer text-xs flex items-center justify-between p-2 rounded-lg ${currentUser.role === 'student' ? 'bg-indigo-50 text-indigo-700 font-semibold' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Student Portal</span>
                </div>
                {currentUser.role === 'student' && <Badge variant="secondary" className="text-[10px]">Active</Badge>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setRole('instructor')}
                className={`cursor-pointer text-xs flex items-center justify-between p-2 rounded-lg ${currentUser.role === 'instructor' ? 'bg-indigo-50 text-indigo-700 font-semibold' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-600" />
                  <span>Instructor Studio</span>
                </div>
                {currentUser.role === 'instructor' && <Badge variant="secondary" className="text-[10px]">Active</Badge>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setRole('admin')}
                className={`cursor-pointer text-xs flex items-center justify-between p-2 rounded-lg ${currentUser.role === 'admin' ? 'bg-indigo-50 text-indigo-700 font-semibold' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-emerald-600" />
                  <span>Admin Manager</span>
                </div>
                {currentUser.role === 'admin' && <Badge variant="secondary" className="text-[10px]">Active</Badge>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-slate-900 rounded-full h-9 w-9">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-3">
              <DropdownMenuLabel className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Recent Updates</span>
                <span className="text-[10px] text-indigo-600 font-normal cursor-pointer">Mark all read</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 py-1 text-xs">
                <div className="p-2 bg-indigo-50/60 rounded-lg hover:bg-indigo-50 cursor-pointer">
                  <p className="font-medium text-slate-800">🎙️ Live session starting tomorrow</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Voice Agents with WebRTC kicks off at 6:00 PM EST.</p>
                </div>
                <div className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <p className="font-medium text-slate-800">🎉 Quiz Passed!</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">You scored 100% on Next.js 15 Foundations.</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-1">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full ring-2 ring-indigo-500/20 object-cover"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800">{currentUser.name}</div>
              <div className="text-[10px] text-indigo-600 capitalize font-medium">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};