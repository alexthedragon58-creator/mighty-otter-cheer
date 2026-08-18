import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Activity, 
  Server, 
  Database, 
  DollarSign, 
  Settings,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { showSuccess } from '../../utils/toast';

export const AdminDashboard: React.FC = () => {
  const { courses } = useLms();
  const [searchFilter, setSearchFilter] = useState('');
  const [systemHealthy, setSystemHealthy] = useState(true);

  const totalLearners = courses.reduce((acc, c) => acc + c.studentsEnrolled, 0) + 1420;
  const platformRevenue = courses.reduce((acc, c) => acc + (c.price * c.studentsEnrolled), 0);

  const mockUsers = [
    { id: 'u1', name: 'Alex Sterling', email: 'alex.sterling@devmail.io', role: 'Student', enrolled: 4, joined: 'Oct 2024', status: 'Active' },
    { id: 'u2', name: 'Dr. Sarah Vance', email: 'sarah.vance@stanford.edu', role: 'Instructor', enrolled: 0, joined: 'Jan 2024', status: 'Active' },
    { id: 'u3', name: 'Marcus Thorne, Ph.D.', email: 'thorne@deepmind.io', role: 'Instructor', enrolled: 0, joined: 'Mar 2024', status: 'Active' },
    { id: 'u4', name: 'Maya Lin', email: 'maya@designsystems.co', role: 'Instructor', enrolled: 0, joined: 'May 2024', status: 'Active' },
    { id: 'u5', name: 'James Kowalski', email: 'james@devopsguru.net', role: 'Instructor', enrolled: 0, joined: 'Aug 2024', status: 'Active' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-bold">
              Root Administrator Control
            </Badge>
            <span className="text-xs text-slate-400">System Telemetry & Platform Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Platform Admin Console</h1>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-300">All Microservices Operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Global Learners</span>
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">{totalLearners.toLocaleString()}</h2>
          <p className="text-xs text-emerald-600 font-semibold">+18% growth this quarter</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Platform Volume</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">${(platformRevenue / 1000).toFixed(1)}k</h2>
          <p className="text-xs text-slate-500">Gross marketplace transaction volume</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Catalog Courses</span>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">{courses.length}</h2>
          <p className="text-xs text-slate-500">Across 6 tech tracks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Edge Infrastructure</span>
            <Server className="h-4 w-4 text-purple-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">99.98%</h2>
          <p className="text-xs text-emerald-600 font-semibold">Edge CDN & Streaming SLA</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900">Registered Accounts & Roles</h3>
            <p className="text-xs text-slate-500">Inspect permissions, enrollments, and status</p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search users..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="rounded-xl text-xs h-8 w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Enrolled / Courses</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockUsers
                .filter(u => u.name.toLowerCase().includes(searchFilter.toLowerCase()) || u.email.toLowerCase().includes(searchFilter.toLowerCase()))
                .map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[10px] font-semibold ${user.role === 'Instructor' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{user.enrolled}</td>
                    <td className="py-3 px-4 text-slate-500">{user.joined}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                        <CheckCircle className="h-3 w-3" /> {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => showSuccess(`Action executed for ${user.name}`)}
                        className="rounded-lg text-xs h-7 hover:bg-slate-200"
                      >
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};