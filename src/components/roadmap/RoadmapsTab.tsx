import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Award, 
  Layers, 
  Cpu, 
  Globe2, 
  ShieldCheck,
  Flame,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface RoadmapTrack {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  badge: string;
  milestones: {
    id: string;
    step: number;
    title: string;
    level: string;
    duration: string;
    skills: string[];
    courseId?: string;
    status: 'completed' | 'in-progress' | 'locked';
  }[];
}

export const RoadmapsTab: React.FC<{ onSelectCourse: (courseId: string) => void }> = ({ onSelectCourse }) => {
  const { courses, userProgress } = useLms();

  const tracks: RoadmapTrack[] = [
    {
      id: 'track-ai-fullstack',
      title: 'Full-Stack Autonomous AI Engineer',
      description: 'The premier curriculum to build, deploy, and scale AI-native applications with React 19, LangGraph, and Vector DBs.',
      icon: Cpu,
      color: 'from-purple-600 to-indigo-600',
      badge: 'High Demand',
      milestones: [
        {
          id: 'ms-1',
          step: 1,
          title: 'Full-Stack Next.js 15 & React 19 Architecture',
          level: 'Core Foundation',
          duration: '18h 45m',
          skills: ['Server Actions', 'Streaming SSR', 'App Router Topologies', 'Zod'],
          courseId: 'course-1',
          status: userProgress['course-1']?.isCompleted ? 'completed' : userProgress['course-1'] ? 'in-progress' : 'in-progress'
        },
        {
          id: 'ms-2',
          step: 2,
          title: 'Generative AI & LLM Systems Engineering',
          level: 'Advanced Mastery',
          duration: '22h 30m',
          skills: ['LangGraph Agents', 'Hybrid RAG', 'Vector Embeddings', 'LoRA Fine-tuning'],
          courseId: 'course-2',
          status: userProgress['course-2']?.isCompleted ? 'completed' : userProgress['course-2'] ? 'in-progress' : 'locked'
        },
        {
          id: 'ms-3',
          step: 3,
          title: 'Cloud Native Microservices & Kubernetes on AWS',
          level: 'Production Deployment',
          duration: '19h 50m',
          skills: ['EKS', 'Terraform GitOps', 'ArgoCD', 'Prometheus'],
          courseId: 'course-4',
          status: 'locked'
        }
      ]
    },
    {
      id: 'track-design<dyad-write path="src/components/roadmap/RoadmapsTab.tsx" description="Interactive visual skill progression trees and engineering career roadmaps">
import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Award, 
  Layers, 
  Cpu, 
  Globe2, 
  ShieldCheck,
  Flame,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface RoadmapTrack {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  badge: string;
  milestones: {
    id: string;
    step: number;
    title: string;
    level: string;
    duration: string;
    skills: string[];
    courseId?: string;
    status: 'completed' | 'in-progress' | 'locked';
  }[];
}

export const RoadmapsTab: React.FC<{ onSelectCourse: (courseId: string) => void }> = ({ onSelectCourse }) => {
  const { courses, userProgress } = useLms();

  const tracks: RoadmapTrack[] = [
    {
      id: 'track-ai-fullstack',
      title: 'Full-Stack Autonomous AI Engineer',
      description: 'The premier curriculum to build, deploy, and scale AI-native applications with React 19, LangGraph, and Vector DBs.',
      icon: Cpu,
      color: 'from-purple-600 to-indigo-600',
      badge: 'High Demand',
      milestones: [
        {
          id: 'ms-1',
          step: 1,
          title: 'Full-Stack Next.js 15 & React 19 Architecture',
          level: 'Core Foundation',
          duration: '18h 45m',
          skills: ['Server Actions', 'Streaming SSR', 'App Router Topologies', 'Zod'],
          courseId: 'course-1',
          status: userProgress['course-1']?.isCompleted ? 'completed' : 'in-progress'
        },
        {
          id: 'ms-2',
          step: 2,
          title: 'Generative AI & LLM Systems Engineering',
          level: 'Advanced Mastery',
          duration: '22h 30m',
          skills: ['LangGraph Agents', 'Hybrid RAG', 'Vector Embeddings', 'LoRA Fine-tuning'],
          courseId: 'course-2',
          status: userProgress['course-2']?.isCompleted ? 'completed' : userProgress['course-2'] ? 'in-progress' : 'locked'
        },
        {
          id: 'ms-3',
          step: 3,
          title: 'Cloud Native Microservices & Kubernetes on AWS',
          level: 'Production Deployment',
          duration: '19h 50m',
          skills: ['EKS', 'Terraform GitOps', 'ArgoCD', 'Prometheus'],
          courseId: 'course-4',
          status: 'locked'
        }
      ]
    },
    {
      id: 'track-design-systems',
      title: 'Design Systems & Frontend Architect',
      description: 'Master tokenized design pipelines, WCAG AAA accessibility standards, and production React component libraries.',
      icon: Layers,
      color: 'from-pink-600 to-indigo-600',
      badge: 'Popular',
      milestones: [
        {
          id: 'ms-201',
          step: 1,
          title: 'UI/UX Design Systems: Figma to Production Code',
          level: 'Visual Foundations',
          duration: '14h 10m',
          skills: ['Figma Variables', 'Design Tokens', 'Tailwind Theming', 'Accessibility'],
          courseId: 'course-3',
          status: userProgress['course-3']?.isCompleted ? 'completed' : 'in-progress'
        },
        {
          id: 'ms-202',
          step: 2,
          title: 'Full-Stack Next.js 15 Component Architectures',
          level: 'Frontend Integration',
          duration: '18h 45m',
          skills: ['Micro-interactions', 'Radix UI', 'Storybook', 'Framer Motion'],
          courseId: 'course-1',
          status: 'locked'
        }
      ]
    },
    {
      id: 'track-cybersecurity',
      title: 'Defensive Security & Cloud Governance',
      description: 'Become a threat hunter with deep packet inspection, SIEM alerting, and Kubernetes zero-trust policies.',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-700',
      badge: 'Certified Track',
      milestones: [
        {
          id: 'ms-301',
          step: 1,
          title: 'Applied Defensive Cybersecurity & Threat Hunting',
          level: 'Threat Detection',
          duration: '16h 15m',
          skills: ['Wireshark', 'MITRE ATT&CK', 'Sigma Rules', 'PCAP Analysis'],
          courseId: 'course-6',
          status: userProgress['course-6']?.isCompleted ? 'completed' : 'in-progress'
        },
        {
          id: 'ms-302',
          step: 2,
          title: 'Cloud Native Kubernetes & AWS Security Meshes',
          level: 'Infrastructure Defense',
          duration: '19h 50m',
          skills: ['OPA Gatekeeper', 'Istio mTLS', 'AWS IAM Zero Trust', 'CIS Benchmarks'],
          courseId: 'course-4',
          status: 'locked'
        }
      ]
    }
  ];

  const [activeTrackId, setActiveTrackId] = useState<string>(tracks[0].id);
  const currentTrack = tracks.find(t => t.id === activeTrackId) || tracks[0];

  const completedMilestones = currentTrack.milestones.filter(m => m.status === 'completed').length;
  const progressPct = Math.round((completedMilestones / currentTrack.milestones.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-indigo-300">
            <Compass className="h-3.5 w-3.5 text-amber-300 animate-spin" />
            <span>Structured Career Progression Roadmaps</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Curated pathways from novice to principal engineer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Skip the guesswork. Follow opinionated, step-by-step tracks designed in partnership with hiring managers at world-class tech firms.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-2 min-w-[240px]">
          <div className="flex justify-between text-xs font-bold text-indigo-200">
            <span>Track Completion</span>
            <span>{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-2 bg-white/20 [&>div]:bg-emerald-400" />
          <p className="text-[11px] text-slate-300">
            {completedMilestones} of {currentTrack.milestones.length} core milestones mastered
          </p>
        </div>
      </div>

      {/* Track Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tracks.map(track => {
          const Icon = track.icon;
          const isSelected = track.id === activeTrackId;

          return (
            <div
              key={track.id}
              onClick={() => setActiveTrackId(track.id)}
              className={`p-5 rounded-2xl cursor-pointer border transition-all space-y-3 relative overflow-hidden ${
                isSelected
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                  : 'bg-white/80 border-slate-200 hover:border-indigo-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${track.color} text-white flex items-center justify-center shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border-indigo-200">
                  {track.badge}
                </Badge>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900">{track.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{track.description}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                <span>{track.milestones.length} Step Pathway</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Track Milestones Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{currentTrack.title} Roadmap</h2>
            <p className="text-xs text-slate-500">{currentTrack.description}</p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 text-xs font-bold self-start sm:self-auto">
            Verified Career Certificate on Completion
          </Badge>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-100">
          {currentTrack.milestones.map((ms) => {
            const course = courses.find(c => c.id === ms.courseId);

            return (
              <div key={ms.id} className="relative group">
                {/* Step Circle Indicator */}
                <div className={`absolute -left-6 sm:-left-8 top-1.5 h-6 w-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-all ${
                  ms.status === 'completed'
                    ? 'bg-emerald-500 border-emerald-500 text-white ring-4 ring-emerald-100'
                    : ms.status === 'in-progress'
                    ? 'bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-100'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {ms.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : ms.status === 'locked' ? (
                    <Lock className="h-3 w-3" />
                  ) : (
                    ms.step
                  )}
                </div>

                {/* Milestone Content Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                        Step {ms.step}: {ms.level}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Est. {ms.duration}</span>
                    </div>

                    <Badge variant="outline" className={`text-[10px] font-bold self-start sm:self-auto ${
                      ms.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                      ms.status === 'in-progress' ? 'bg-indigo-50 text-indigo-700 border-indigo-300' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {ms.status === 'completed' ? '✓ Mastered' : ms.status === 'in-progress' ? 'In Progress' : 'Prerequisite Required'}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{ms.title}</h3>

                  {/* Skills Checklist */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ms.skills.map((skill, idx) => (
                      <span key={idx} className="text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-lg">
                        • {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA */}
                  {course && (
                    <div className="pt-2 flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => onSelectCourse(course.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold gap-1.5 shadow-sm"
                      >
                        <span>Open Course Blueprint</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};