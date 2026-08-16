import React from 'react';
import { useLms } from '../../context/LmsContext';
import { Video, Calendar, Clock, Users, CheckCircle2, Radio } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const LiveWebinarsTab: React.FC = () => {
  const { liveSessions, toggleRegisterLiveSession } = useLms();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide">
            <Radio className="h-3.5 w-3.5 animate-pulse text-white" />
            <span>Interactive Live Workshops & Office Hours</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Learn live from industry leads</h1>
          <p className="text-xs sm:text-sm text-pink-100 font-light leading-relaxed">
            Participate in real-time coding sessions, ask questions directly, and debug live architecture challenges alongside seasoned instructors.
          </p>
        </div>
      </div>

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between">
            <div>
              {/* Cover Image */}
              <div className="relative aspect-video w-full bg-slate-900">
                <img src={session.coverImage} alt={session.title} className="w-full h-full object-cover opacity-90" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-600 text-white text-[10px] font-bold border-none">
                    🔴 Live Webinar
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/80 px-2 py-0.5 rounded-full text-[10px] text-slate-200 font-medium">
                  {session.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                    <Calendar className="h-3.5 w-3.5" /> {session.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {session.time}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">{session.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{session.description}</p>

                {/* Host */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={session.instructorAvatar} alt={session.instructorName} className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-200" />
                    <span className="font-medium text-slate-700">{session.instructorName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <Users className="h-3.5 w-3.5 text-indigo-500" />
                    <span>{session.attendeesCount} Attending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Registration CTA */}
            <div className="p-5 pt-0">
              <Button
                onClick={() => toggleRegisterLiveSession(session.id)}
                className={`w-full rounded-xl text-xs font-bold transition-all shadow-xs ${
                  session.isRegistered
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {session.isRegistered ? (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Reserved (Calendar Synced)
                  </span>
                ) : (
                  'Reserve Free Seat'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};