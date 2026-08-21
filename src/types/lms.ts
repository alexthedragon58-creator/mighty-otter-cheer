export type UserRole = 'student' | 'instructor' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  provider?: 'email' | 'google';
  streakDays: number;
  weeklyGoalHours: number;
  completedHoursThisWeek: number;
}

export interface CodeExercise {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solutionCode: string;
  language: 'javascript' | 'typescript' | 'python' | 'html';
  hints: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  resources?: { name: string; type: 'pdf' | 'zip' | 'link'; size?: string; url: string }[];
  codeExercise?: CodeExercise;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  timeLimitMinutes: number;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'AI & Data Science' | 'Web Development' | 'UI/UX Design' | 'Cloud & DevOps' | 'Business & Product' | 'Cybersecurity';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio: string;
    rating: number;
    studentsCount: number;
  };
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  studentsEnrolled: number;
  totalDuration: string;
  totalLessons: number;
  chapters: Chapter[];
  learningOutcomes: string[];
  requirements: string[];
  reviews: Review[];
  featured?: boolean;
  bestseller?: boolean;
  flashcards?: Flashcard[];
  updatedAt: string;
  status?: 'published' | 'under_review' | 'draft';
}

export interface UserProgress {
  courseId: string;
  enrolledDate: string;
  completedLessonIds: string[];
  lastLessonId?: string;
  quizScores: Record<string, number>;
  isCompleted: boolean;
  completedDate?: string;
  certificateId?: string;
  notes: { id: string; lessonId: string; timestamp: string; text: string; createdAt: string }[];
}

export interface LiveSession {
  id: string;
  title: string;
  instructorName: string;
  instructorAvatar: string;
  date: string;
  time: string;
  attendeesCount: number;
  category: string;
  isRegistered?: boolean;
  coverImage: string;
  description: string;
}

export interface ForumPost {
  id: string;
  courseTitle: string;
  author: {
    name: string;
    avatar: string;
    role: 'Student' | 'Instructor' | 'TA';
  };
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  hasUpvoted?: boolean;
  replyCount: number;
  timeAgo: string;
  replies?: {
    id: string;
    author: { name: string; avatar: string; role: string };
    content: string;
    timeAgo: string;
    isInstructorAnswer?: boolean;
  }[];
}