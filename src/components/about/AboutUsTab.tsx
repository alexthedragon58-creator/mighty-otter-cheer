import React from 'react';
import { 
  Target, 
  Sparkles, 
  Award, 
  Users, 
  Cpu, 
  HeartHandshake, 
  Globe2, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  BookOpenCheck 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface AboutUsTabProps {
  onExploreCourses: () => void;
  onOpenStudio: () => void;
}

export const AboutUsTab: React.FC<AboutUsTabProps> = ({ onExploreCourses, onOpenStudio }) => {
  const leadership = [
    {
      name: 'Dr. Sarah Vance',
      role: 'Head of Curriculum & Systems Architecture',
      prev: 'Ex-Staff Architect @ Meta & Google Developer Expert',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Pioneered distributed systems and modern web rendering architectures. Dedicated to transforming theoretical computer science into production-grade muscle memory.'
    },
    {
      name: 'Marcus Thorne, Ph.D.',
      role: 'Director of AI Research & Neural Systems',
      prev: 'Ex-DeepMind Research Scientist & Stanford Alum',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Leading our generative agent curriculum. Published author on agentic orchestration, high-dimensional vector spaces, and real-time fine-tuning.'
    },
    {
      name: 'Maya Lin',
      role: 'Dean of Product Design & Human Factors',
      prev: 'Ex-Staff Experience Designer @ Airbnb & Stripe',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Champion for accessible, tokenized design engineering. Bridges the gap between creative visual fidelity and robust frontend component systems.'
    },
    {
      name: 'James Kowalski',
      role: 'Head of Cloud & Infrastructure Engineering',
      prev: 'Certified Kubernetes Lead Architect @ Cloudflare',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialist in hyper-resilient GitOps pipelines and edge compute topologies. Trains teams to debug enterprise production war rooms with poise.'
    }
  ];

  const pillars = [
    {
      icon: Cpu,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      title: 'Production-First Pedagogical Rigor',
      description: 'We reject surface-level "hello world" demos. Every curriculum is reverse-engineered from multi-billion request systems used in top technology companies.'
    },
    {
      icon: BookOpenCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      title: 'Interactive Live Sandboxes',
      description: 'True mastery happens through code execution. Our in-browser test runners and flashcard loops ensure theoretical knowledge immediately becomes actionable skill.'
    },
    {
      icon: HeartHandshake,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      title: 'Direct Industry Mentorship',
      description: 'Learn directly alongside seasoned engineering leads through scheduled live war-room simulations, direct code review, and vibrant Q&A discussions.'
    },
    {
      icon: ShieldCheck,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      title: 'Verifiable Proof of Competence',
      description: 'Our cryptographically verified certificates represent rigorous project completion, knowledge checkpoints, and verifiable portfolio submissions.'
    }
  ];

  const metrics = [
    { label: 'Global Engineers Trained', val: '120,000+', change: 'Across 68 countries' },
    { label: 'Career Advancement Rate', val: '94.2%', change: 'Within 6 months of graduation' },
    { label: 'Average Instructor Rating', val: '4.91 / 5.0', change: 'From 50,000+ verified reviews' },
    { label: 'Interactive Code Executions', val: '2.8 Million', change: 'Evaluated in safe sandboxes' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Hero Manifesto Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-14 text-white shadow-2xl border border-indigo-900/30">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>Our Mission & Manifesto</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Democratizing world-class engineering mastery for the next generation of builders.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            The world of software moves at an extraordinary pace. Traditional education cannot keep up with AI breakthroughs, modern cloud orchestration, and real-world system architecture. LearnSphere was founded on a simple premise: <strong>learn directly from the practitioners who architect the tools you use every day.</strong>
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Button
              onClick={onExploreCourses}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold px-5 h-11 shadow-lg shadow-indigo-600/30 gap-2"
            >
              Explore Masterclasses
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onOpenStudio}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl text-xs font-bold px-5 h-11 backdrop-blur-sm"
            >
              Teach on LearnSphere
            </Button>
          </div>
        </div>

        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Impact Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-xs font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.val}</h3>
            <p className="text-xs font-semibold text-indigo-600 pt-0.5">{stat.change}</p>
          </div>
        ))}
      </section>

      {/* The 4 Pedagogical Pillars */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs font-bold">
            How We Teach Differently
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Four Core Pillars of the LearnSphere Method
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We combined cognitive learning science with real-world engineering standards to build the ultimate learning operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-indigo-300 transition-all space-y-3">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership & Faculty */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs font-bold">
            World-Class Faculty
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Engineered by veteran architects
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Our curriculum advisory committee consists of industry-renowned tech leaders, open-source contributors, and research scientists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-square w-full overflow-hidden bg-slate-900 relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 block">
                      {member.prev}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base text-slate-900">{member.name}</h3>
                  <p className="text-xs font-medium text-indigo-600">{member.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
            <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>Ready to accelerate your career?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Start learning without barriers today.</h2>
          <p className="text-xs sm:text-sm text-indigo-200 font-light leading-relaxed">
            Join thousands of developers leveling up in Next.js 15, Generative AI agentic workflows, Kubernetes, and UI design systems.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Button
            onClick={onExploreCourses}
            className="bg-white hover:bg-slate-100 text-indigo-950 font-bold rounded-xl text-xs h-11 px-6 shadow-md"
          >
            Explore All Courses
          </Button>
          <Button
            variant="outline"
            onClick={onOpenStudio}
            className="border-white/30 text-white hover:bg-white/10 rounded-xl text-xs font-semibold h-11 px-6"
          >
            Instructor Portal
          </Button>
        </div>
      </section>
    </div>
  );
};