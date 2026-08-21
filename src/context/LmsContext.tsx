import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, UserProgress, UserRole, LiveSession, ForumPost, Review, UserAccount } from '../types/lms';
import { INITIAL_COURSES, INITIAL_LIVE_SESSIONS, INITIAL_FORUM_POSTS } from '../data/mockLmsData';
import { showSuccess, showError } from '../utils/toast';
import { triggerConfetti } from '../utils/confetti';

const PRESET_ACCOUNTS: UserAccount[] = [
  {
    id: 'user-student-1',
    name: 'Alex Sterling',
    email: 'student@learnsphere.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    streakDays: 6,
    weeklyGoalHours: 10,
    completedHoursThisWeek: 7.5,
    joinedDate: 'October 2024'
  },
  {
    id: 'user-instructor-1',
    name: 'Dr. Sarah Vance',
    email: 'instructor@learnsphere.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'instructor',
    specialty: 'Next.js 15 & AI Systems',
    streakDays: 14,
    weeklyGoalHours: 15,
    completedHoursThisWeek: 12.0,
    joinedDate: 'January 2024'
  },
  {
    id: 'user-admin-1',
    name: 'Chief Admin Helena',
    email: 'admin@learnsphere.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    streakDays: 30,
    weeklyGoalHours: 20,
    completedHoursThisWeek: 18.5,
    joinedDate: 'November 2023'
  }
];

interface LmsContextType {
  currentUser: UserAccount | null;
  accounts: UserAccount[];
  
  // Auth actions
  login: (email: string, password: string) => boolean;
  register: (data: { name: string; email: string; password: string; role: UserRole; specialty?: string }) => boolean;
  demoLogin: (role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;

  courses: Course[];
  userProgress: Record<string, UserProgress>;
  activeCourse: Course | null;
  activeLessonId: string | null;
  selectedCourseForPreview: Course | null;
  liveSessions: LiveSession[];
  forumPosts: ForumPost[];
  
  // Navigation / Actions
  openCoursePreview: (course: Course) => void;
  closeCoursePreview: () => void;
  startCourse: (course: Course, lessonId?: string) => void;
  closeClassroom: () => void;
  setActiveLesson: (lessonId: string) => void;
  
  // Student Actions
  enrollCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  submitQuizScore: (courseId: string, quizId: string, scorePercentage: number) => void;
  addLessonNote: (courseId: string, lessonId: string, timestamp: string, text: string) => void;
  deleteLessonNote: (courseId: string, noteId: string) => void;
  addCourseReview: (courseId: string, rating: number, comment: string) => void;
  toggleRegisterLiveSession: (sessionId: string) => void;
  
  // Community Actions
  createForumPost: (newPost: { courseTitle: string; title: string; content: string; tags: string[] }) => void;
  upvotePost: (postId: string) => void;
  addPostReply: (postId: string, text: string) => void;
  
  // Instructor Actions
  addNewCourse: (newCourseData: Partial<Course>) => void;
  
  // Helper getters
  getCourseProgressPercentage: (courseId: string) => number;
  isEnrolled: (courseId: string) => boolean;
}

const LmsContext = createContext<LmsContextType | undefined>(undefined);

export const LmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('edu_accounts');
    return saved ? JSON.parse(saved) : PRESET_ACCOUNTS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('edu_current_user');
    if (saved) return JSON.parse(saved);
    return PRESET_ACCOUNTS[0]; // default to student demo
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('edu_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [userProgress, setUserProgress] = useState<Record<string, UserProgress>>(() => {
    const saved = localStorage.getItem('edu_progress');
    if (saved) return JSON.parse(saved);
    return {
      'course-1': {
        courseId: 'course-1',
        enrolledDate: '2024-10-15',
        completedLessonIds: ['les-1-1'],
        lastLessonId: 'les-1-2',
        quizScores: {},
        isCompleted: false,
        notes: [
          {
            id: 'note-1',
            lessonId: 'les-1-1',
            timestamp: '04:15',
            text: 'Server Components cannot access browser APIs like localStorage directly. Keep in mind!',
            createdAt: '2 days ago'
          }
        ]
      }
    };
  });

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [selectedCourseForPreview, setSelectedCourseForPreview] = useState<Course | null>(null);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>(() => {
    const saved = localStorage.getItem('edu_live_sessions');
    return saved ? JSON.parse(saved) : INITIAL_LIVE_SESSIONS;
  });
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('edu_forum_posts');
    return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('edu_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edu_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('edu_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('edu_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('edu_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('edu_live_sessions', JSON.stringify(liveSessions));
  }, [liveSessions]);

  useEffect(() => {
    localStorage.setItem('edu_forum_posts', JSON.stringify(forumPosts));
  }, [forumPosts]);

  // Auth Methods
  const login = (email: string, password: string): boolean => {
    const found = accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) {
      showError('Account not found with this email. Please check your credentials or register.');
      return false;
    }
    if (found.password && found.password !== password) {
      showError('Invalid password. Please try again.');
      return false;
    }
    setCurrentUser(found);
    showSuccess(`Welcome back, ${found.name}! Signed in as ${found.role.toUpperCase()}.`);
    return true;
  };

  const register = (data: { name: string; email: string; password: string; role: UserRole; specialty?: string }): boolean => {
    const existing = accounts.find(a => a.email.toLowerCase() === data.email.trim().toLowerCase());
    if (existing) {
      showError('An account with this email address already exists. Please sign in.');
      return false;
    }

    const defaultAvatars: Record<UserRole, string> = {
      student: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      instructor: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      admin: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    };

    const newAccount: UserAccount = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      role: data.role,
      specialty: data.specialty,
      avatar: defaultAvatars[data.role],
      streakDays: 1,
      weeklyGoalHours: data.role === 'instructor' ? 15 : 10,
      completedHoursThisWeek: 0,
      joinedDate: 'Just now'
    };

    const updated = [newAccount, ...accounts];
    setAccounts(updated);
    setCurrentUser(newAccount);
    showSuccess(`Account created! Welcome to LearnSphere as an ${data.role.toUpperCase()}.`);
    return true;
  };

  const demoLogin = (role: UserRole) => {
    const target = accounts.find(a => a.role === role) || PRESET_ACCOUNTS.find(a => a.role === role);
    if (target) {
      setCurrentUser(target);
      showSuccess(`Signed in to Demo ${role.toUpperCase()} account (${target.name})`);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    closeClassroom();
    closeCoursePreview();
    showSuccess('You have been signed out successfully');
  };

  const setRole = (role: UserRole) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, role };
    setCurrentUser(updatedUser);
    setAccounts(prev => prev.map(a => a.id === currentUser.id ? updatedUser : a));
    showSuccess(`Switched to ${role.charAt(0).toUpperCase() + role.slice(1)} view`);
  };

  const openCoursePreview = (course: Course) => {
    setSelectedCourseForPreview(course);
  };

  const closeCoursePreview = () => {
    setSelectedCourseForPreview(null);
  };

  const startCourse = (course: Course, lessonId?: string) => {
    if (!currentUser) {
      showError('Please sign in or register to open the interactive classroom.');
      return;
    }
    if (!userProgress[course.id]) {
      enrollCourse(course.id);
    }
    const defaultLessonId = lessonId || course.chapters[0]?.lessons[0]?.id || '';
    setActiveCourse(course);
    setActiveLessonId(defaultLessonId);
    setSelectedCourseForPreview(null);
  };

  const closeClassroom = () => {
    setActiveCourse(null);
    setActiveLessonId(null);
  };

  const setActiveLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    if (activeCourse) {
      setUserProgress(prev => {
        const cur = prev[activeCourse.id] || {
          courseId: activeCourse.id,
          enrolledDate: new Date().toISOString().split('T')[0],
          completedLessonIds: [],
          quizScores: {},
          isCompleted: false,
          notes: []
        };
        return {
          ...prev,
          [activeCourse.id]: {
            ...cur,
            lastLessonId: lessonId
          }
        };
      });
    }
  };

  const isEnrolled = (courseId: string) => {
    return !!userProgress[courseId];
  };

  const getCourseProgressPercentage = (courseId: string) => {
    const progress = userProgress[courseId];
    const course = courses.find(c => c.id === courseId);
    if (!progress || !course) return 0;
    
    let totalLessonsCount = 0;
    course.chapters.forEach(ch => {
      totalLessonsCount += ch.lessons.length;
    });

    if (totalLessonsCount === 0) return 0;
    const completedCount = progress.completedLessonIds.length;
    return Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
  };

  const enrollCourse = (courseId: string) => {
    if (!currentUser) {
      showError('Please sign in to enroll in this course');
      return;
    }
    if (userProgress[courseId]) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const firstLessonId = course.chapters[0]?.lessons[0]?.id || '';

    setUserProgress(prev => ({
      ...prev,
      [courseId]: {
        courseId,
        enrolledDate: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        lastLessonId: firstLessonId,
        quizScores: {},
        isCompleted: false,
        notes: []
      }
    }));

    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, studentsEnrolled: c.studentsEnrolled + 1 } : c));
    showSuccess(`Enrolled in "${course.title}"! Welcome aboard.`);
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setUserProgress(prev => {
      const cur = prev[courseId] || {
        courseId,
        enrolledDate: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        quizScores: {},
        isCompleted: false,
        notes: []
      };

      const isCompletedNow = cur.completedLessonIds.includes(lessonId);
      const updatedLessons = isCompletedNow
        ? cur.completedLessonIds.filter(id => id !== lessonId)
        : [...cur.completedLessonIds, lessonId];

      let totalLessons = 0;
      course.chapters.forEach(ch => { totalLessons += ch.lessons.length; });
      const completedAll = updatedLessons.length >= totalLessons;

      if (completedAll && !cur.isCompleted) {
        triggerConfetti();
        showSuccess('🎉 Congratulations! You have completed all lessons in this course!');
      }

      return {
        ...prev,
        [courseId]: {
          ...cur,
          completedLessonIds: updatedLessons,
          isCompleted: completedAll,
          completedDate: completedAll ? new Date().toISOString().split('T')[0] : cur.completedDate,
          certificateId: completedAll && !cur.certificateId ? `CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}` : cur.certificateId
        }
      };
    });
  };

  const submitQuizScore = (courseId: string, quizId: string, scorePercentage: number) => {
    setUserProgress(prev => {
      const cur = prev[courseId];
      if (!cur) return prev;
      return {
        ...prev,
        [courseId]: {
          ...cur,
          quizScores: {
            ...cur.quizScores,
            [quizId]: scorePercentage
          }
        }
      };
    });
  };

  const addLessonNote = (courseId: string, lessonId: string, timestamp: string, text: string) => {
    setUserProgress(prev => {
      const cur = prev[courseId];
      if (!cur) return prev;
      const newNote = {
        id: `note-${Date.now()}`,
        lessonId,
        timestamp,
        text,
        createdAt: 'Just now'
      };
      return {
        ...prev,
        [courseId]: {
          ...cur,
          notes: [newNote, ...cur.notes]
        }
      };
    });
    showSuccess('Note saved successfully');
  };

  const deleteLessonNote = (courseId: string, noteId: string) => {
    setUserProgress(prev => {
      const cur = prev[courseId];
      if (!cur) return prev;
      return {
        ...prev,
        [courseId]: {
          ...cur,
          notes: cur.notes.filter(n => n.id !== noteId)
        }
      };
    });
    showSuccess('Note removed');
  };

  const addCourseReview = (courseId: string, rating: number, comment: string) => {
    if (!currentUser) {
      showError('Please sign in to post a review');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating,
      date: 'Just now',
      comment
    };

    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const reviews = [newRev, ...c.reviews];
          const newAvg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
          return {
            ...c,
            reviews,
            rating: Number(newAvg.toFixed(2)),
            ratingCount: c.ratingCount + 1
          };
        }
        return c;
      })
    );
    showSuccess('Review submitted! Thank you for your feedback.');
  };

  const toggleRegisterLiveSession = (sessionId: string) => {
    if (!currentUser) {
      showError('Please sign in to register for live workshops');
      return;
    }

    setLiveSessions(prev =>
      prev.map(s => {
        if (s.id === sessionId) {
          const registered = !s.isRegistered;
          showSuccess(registered ? `Reserved your seat for "${s.title}"!` : 'Canceled webinar registration');
          return {
            ...s,
            isRegistered: registered,
            attendeesCount: registered ? s.attendeesCount + 1 : s.attendeesCount - 1
          };
        }
        return s;
      })
    );
  };

  const createForumPost = (newPost: { courseTitle: string; title: string; content: string; tags: string[] }) => {
    if (!currentUser) {
      showError('Please sign in to ask or discuss questions');
      return;
    }

    const post: ForumPost = {
      id: `post-${Date.now()}`,
      courseTitle: newPost.courseTitle,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role === 'instructor' ? 'Instructor' : 'Student'
      },
      title: newPost.title,
      content: newPost.content,
      tags: newPost.tags,
      upvotes: 1,
      hasUpvoted: true,
      replyCount: 0,
      timeAgo: 'Just now',
      replies: []
    };
    setForumPosts([post, ...forumPosts]);
    showSuccess('Discussion thread published to community!');
  };

  const upvotePost = (postId: string) => {
    if (!currentUser) {
      showError('Please sign in to upvote threads');
      return;
    }

    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const hasUpvoted = !p.hasUpvoted;
          return {
            ...p,
            hasUpvoted,
            upvotes: hasUpvoted ? p.upvotes + 1 : p.upvotes - 1
          };
        }
        return p;
      })
    );
  };

  const addPostReply = (postId: string, text: string) => {
    if (!currentUser) {
      showError('Please sign in to reply');
      return;
    }

    setForumPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const reply = {
            id: `rep-${Date.now()}`,
            author: {
              name: currentUser.name,
              avatar: currentUser.avatar,
              role: currentUser.role === 'instructor' ? 'Instructor' : 'Student'
            },
            content: text,
            timeAgo: 'Just now',
            isInstructorAnswer: currentUser.role === 'instructor'
          };
          return {
            ...p,
            replyCount: p.replyCount + 1,
            replies: [...(p.replies || []), reply]
          };
        }
        return p;
      })
    );
    showSuccess('Reply posted');
  };

  const addNewCourse = (newCourseData: Partial<Course>) => {
    if (!currentUser) {
      showError('Please sign in as an instructor to publish courses');
      return;
    }

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: newCourseData.title || 'Untitled Masterclass',
      slug: (newCourseData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      tagline: newCourseData.tagline || 'Essential skills from scratch to production ready.',
      description: newCourseData.description || 'Comprehensive step-by-step curriculum.',
      category: newCourseData.category || 'Web Development',
      level: newCourseData.level || 'Intermediate',
      thumbnail: newCourseData.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
      instructor: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        title: currentUser.specialty ? `Lead Instructor • ${currentUser.specialty}` : 'Senior Lead Instructor',
        bio: 'Industry practitioner sharing practical architecture and development techniques.',
        rating: 5.0,
        studentsCount: 1
      },
      price: newCourseData.price || 49.99,
      originalPrice: (newCourseData.price || 49.99) * 1.5,
      rating: 5.0,
      ratingCount: 1,
      studentsEnrolled: 0,
      totalDuration: '8h 30m',
      totalLessons: newCourseData.chapters ? newCourseData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0) : 4,
      chapters: newCourseData.chapters || [
        {
          id: 'ch-new-1',
          title: 'Module 1: Introduction & Environment Setup',
          lessons: [
            {
              id: `les-new-1`,
              title: '1.1 Welcome to the Course & Project Setup',
              duration: '10:00',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              description: 'Setting up IDE, dependencies, and project blueprint.'
            }
          ]
        }
      ],
      learningOutcomes: newCourseData.learningOutcomes || ['Build real-world production projects', 'Best practices and design patterns'],
      requirements: ['Basic computer literacy', 'A desire to learn'],
      reviews: [],
      updatedAt: 'Just now',
      status: 'published'
    };

    setCourses([newCourse, ...courses]);
    showSuccess(`Course "${newCourse.title}" published to catalog!`);
  };

  return (
    <LmsContext.Provider
      value={{
        currentUser,
        accounts,
        login,
        register,
        demoLogin,
        logout,
        setRole,
        courses,
        userProgress,
        activeCourse,
        activeLessonId,
        selectedCourseForPreview,
        liveSessions,
        forumPosts,
        openCoursePreview,
        closeCoursePreview,
        startCourse,
        closeClassroom,
        setActiveLesson,
        enrollCourse,
        toggleLessonComplete,
        submitQuizScore,
        addLessonNote,
        deleteLessonNote,
        addCourseReview,
        toggleRegisterLiveSession,
        createForumPost,
        upvotePost,
        addPostReply,
        addNewCourse,
        getCourseProgressPercentage,
        isEnrolled
      }}
    >
      {children}
    </LmsContext.Provider>
  );
};

export const useLms = () => {
  const context = useContext(LmsContext);
  if (!context) throw new Error('useLms must be used within an LmsProvider');
  return context;
};