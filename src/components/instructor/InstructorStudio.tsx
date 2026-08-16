import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Course } from '../../types/lms';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  DollarSign, 
  Users, 
  BookOpen, 
  Star, 
  PlusCircle, 
  TrendingUp, 
  Layers, 
  Upload, 
  CheckCircle2 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const REVENUE_DATA = [
  { month: 'Jun', revenue: 4200, students: 120 },
  { month: 'Jul', revenue: 6800, students: 210 },
  { month: 'Aug', revenue: 8400, students: 290 },
  { month: 'Sep', revenue: 11200, students: 380 },
  { month: 'Oct', revenue: 14800, students: 490 },
  { month: 'Nov', revenue: 19500, students: 640 },
];

export const InstructorStudio: React.FC = () => {
  const { courses, currentUser, addNewCourse } = useLms();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for creating a course
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Web Development' | 'AI & Data Science' | 'UI/UX Design' | 'Cloud & DevOps' | 'Business & Product' | 'Cybersecurity'>('Web Development');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Intermediate');
  const [price, setPrice] = useState('79.99');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80');

  const totalRevenue = 64900;
  const totalStudents = courses.reduce((acc, c) => acc + c.studentsEnrolled, 0);
  const avgRating = 4.9;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addNewCourse({
      title,
      tagline,
      description,
      category,
      level,
      price: parseFloat(price) || 49.99,
      thumbnail: thumbnailUrl
    });

    // Reset Form
    setTitle('');
    setTagline('');
    setDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs font-bold">
              Instructor Studio
            </Badge>
            <span className="text-xs text-slate-500">Live analytics & authoring dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Teaching Dashboard</h1>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold gap-2 shadow-sm h-10 px-4"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Publish New Course</span>
        </Button>
      </div>

      {/* Analytics KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Earnings</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">${totalRevenue.toLocaleString()}</h2>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+24.5% this month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Enrolled Students</span>
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">{totalStudents.toLocaleString()}</h2>
          <p className="text-xs text-slate-500 font-medium">Across {courses.length} active courses</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Instructor Reputation</span>
            <Star className="h-4 w-4 text-amber-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">4.92 ★</h2>
          <p className="text-xs text-slate-500 font-medium">From 4,800+ student reviews</p>
        </div>
      </div>

      {/* Revenue & Growth Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Monthly Revenue Performance</h3>
            <p className="text-xs text-slate-500">Gross revenue generated from course sales and live webinars</p>
          </div>
          <Badge variant="outline" className="text-xs font-semibold text-indigo-600 bg-indigo-50 border-indigo-200">
            Last 6 Months
          </Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Revenue']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Courses Catalog Manager */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Published Masterclasses ({courses.length})</h3>
            <p className="text-xs text-slate-500">Manage curriculum, students, and pricing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-indigo-700 shadow-sm">
                    {course.category}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{course.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{course.tagline}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-slate-900 text-sm">${course.price}</span>
                  <span className="text-slate-400 text-[11px] block">{course.studentsEnrolled} enrolled</span>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl text-xs font-semibold hover:bg-indigo-50 hover:text-indigo-600">
                  Edit Curriculum
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Publish Course */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Publish New Course</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)} className="rounded-full text-xs">
                Cancel
              </Button>
            </div>

            <form onSubmit={handlePublish} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title</label>
                <Input
                  required
                  placeholder="e.g. Master TypeScript 5 & Advanced Generics"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Tagline</label>
                <Input
                  required
                  placeholder="e.g. Comprehensive guide from types to enterprise codebases."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                    <SelectTrigger className="rounded-xl text-xs">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="AI & Data Science">AI & Data Science</SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="Cloud & DevOps">Cloud & DevOps</SelectItem>
                      <SelectItem value="Business & Product">Business & Product</SelectItem>
                      <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price ($USD)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
                <Textarea
                  placeholder="Describe what students will build and master..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl text-xs min-h-[90px]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Cover Image URL</label>
                <Input
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold">
                  Publish to Catalog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};