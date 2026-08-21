import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { UserRole } from '../../types/lms';
import { 
  GraduationCap, 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  BookOpen,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { showError } from '../../utils/toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signin',
  defaultRole = 'student'
}) => {
  const { login, register, demoLogin } = useLms();
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [role, setRole] = useState<UserRole>(defaultRole);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please enter both email and password');
      return;
    }

    if (mode === 'signin') {
      const ok = login(email, password);
      if (ok) {
        onClose();
      }
    } else {
      if (!name.trim()) {
        showError('Please provide your full name');
        return;
      }
      const ok = register({
        name,
        email,
        password,
        role,
        specialty: specialty || undefined
      });
      if (ok) {
        onClose();
      }
    }
  };

  const handleDemoClick = (persona: UserRole) => {
    demoLogin(persona);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        {/* Top Header */}
        <div className="px-6 pt-6 pb-4 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">
                {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'signin' 
                  ? 'Access your enrolled masterclasses & roadmap' 
                  : 'Join 120,000+ engineers leveling up'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Toggle: Sign In vs Register */}
        <div className="p-6 space-y-5">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Register New Account
            </button>
          </div>

          {/* Quick Demo Accounts Selection */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-indigo-600" />
                Instant 1-Click Demo Login:
              </span>
              <span className="text-[10px] text-indigo-500 font-normal">Pre-configured personas</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoClick('student')}
                className="px-2 py-1.5 bg-white hover:bg-indigo-600 hover:text-white rounded-xl border border-indigo-200/80 text-[11px] font-semibold text-slate-700 transition-colors<dyad-write path="src/components/auth/AuthModal.tsx" description="Modern Auth Modal supporting Sign In, Registration with role selection, and instant demo persona credentials">
import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { UserRole } from '../../types/lms';
import { 
  GraduationCap, 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  BookOpen,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { showError } from '../../utils/toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signin',
  defaultRole = 'student'
}) => {
  const { login, register, demoLogin } = useLms();
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [role, setRole] = useState<UserRole>(defaultRole);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please enter both email and password');
      return;
    }

    if (mode === 'signin') {
      const ok = login(email, password);
      if (ok) {
        onClose();
      }
    } else {
      if (!name.trim()) {
        showError('Please provide your full name');
        return;
      }
      const ok = register({
        name,
        email,
        password,
        role,
        specialty: specialty || undefined
      });
      if (ok) {
        onClose();
      }
    }
  };

  const handleDemoClick = (persona: UserRole) => {
    demoLogin(persona);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        {/* Top Header */}
        <div className="px-6 pt-6 pb-4 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">
                {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'signin' 
                  ? 'Access your enrolled masterclasses & roadmap' 
                  : 'Join 120,000+ engineers leveling up'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Toggle: Sign In vs Register */}
        <div className="p-6 space-y-5">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Register New Account
            </button>
          </div>

          {/* Quick Demo Accounts Selection */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-indigo-600" />
                Instant 1-Click Demo Login:
              </span>
              <span className="text-[10px] text-indigo-500 font-normal">Pre-configured personas</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoClick('student')}
                className="px-2 py-1.5 bg-white hover:bg-indigo-600 hover:text-white rounded-xl border border-indigo-200/80 text-[11px] font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <BookOpen className="h-3 w-3" />
                Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('instructor')}
                className="px-2 py-1.5 bg-white hover:bg-purple-600 hover:text-white rounded-xl border border-indigo-200/80 text-[11px] font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <Layers className="h-3 w-3" />
                Instructor
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick('admin')}
                className="px-2 py-1.5 bg-white hover:bg-emerald-600 hover:text-white rounded-xl border border-indigo-200/80 text-[11px] font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <ShieldCheck className="h-3 w-3" />
                Admin
              </button>
            </div>
          </div>

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Role Selection when Registering */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Select Account Role</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                      role === 'student'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600 font-medium'
                    }`}
                  >
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    <span className="text-[11px]">Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('instructor')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                      role === 'instructor'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold ring-2 ring-purple-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600 font-medium'
                    }`}
                  >
                    <Layers className="h-4 w-4 text-purple-600" />
                    <span className="text-[11px]">Instructor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-center transition-all ${
                      role === 'admin'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600 font-medium'
                    }`}
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="text-[11px]">Admin</span>
                  </button>
                </div>
              </div>
            )}

            {/* Name input on register */}
            {mode === 'signup' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    required
                    type="text"
                    placeholder="e.g. Alex Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 rounded-xl text-xs"
                  />
                </div>
              </div>
            )}

            {/* Specialty on Instructor Registration */}
            {mode === 'signup' && role === 'instructor' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Teaching Focus / Domain</label>
                <Input
                  type="text"
                  placeholder="e.g. Generative AI, Cloud & Distributed Systems"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="rounded-xl text-xs"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  required
                  type="email"
                  placeholder="alex@learnsphere.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Password</label>
                {mode === 'signin' && (
                  <span className="text-[10px] text-indigo-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 rounded-xl text-xs"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold py-5 shadow-sm mt-2 gap-1.5"
            >
              <span>{mode === 'signin' ? 'Sign In to Portal' : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </form>

          {/* Footer switch note */}
          <div className="text-center text-[11px] text-slate-500 pt-1">
            {mode === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Sign up for free
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};