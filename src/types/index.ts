export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  gradeLevels: GradeLevel[];
}

export interface GradeLevel {
  id: string;
  name: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  exam: Exam;
  isCompleted: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string[];
  quiz: Quiz;
  isCompleted: boolean;
}

export interface Quiz {
  id: string;
  questions: Question[];
  timeLimit: number; // in minutes
}

export interface Exam {
  id: string;
  questions: Question[];
  timeLimit: number; // in minutes
  passingScore: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface UserProgress {
  userId: string;
  subjectProgress: SubjectProgress[];
}

export interface SubjectProgress {
  subjectId: string;
  gradeLevelId: string;
  completedModules: string[];
  currentModule: string;
  currentLesson: string;
  quizScores: { [lessonId: string]: number };
  examScore?: number;
}

