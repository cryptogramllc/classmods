export interface Group {
  id: string;
  name: string;
  description: string;
  subject: string;
  gradeLevel: string;
  maxMembers: number;
  currentMembers: number;
  isPrivate: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // userId
  tags: string[];
  avatar?: string;
  coverImage?: string;
  rules: string[];
  topics: string[];
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  lastActive: Date;
  isActive: boolean;
  permissions: string[];
  profile: {
    displayName: string;
    avatar?: string;
    grade: string;
    subjects: string[];
  };
}

export interface GroupMessage {
  id: string;
  groupId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'quiz' | 'achievement';
  timestamp: Date;
  isEdited: boolean;
  editedAt?: Date;
  reactions: MessageReaction[];
  replies: GroupMessage[];
  attachments?: MessageAttachment[];
  mentions: string[]; // userIds
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  timestamp: Date;
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
}

export interface GroupDiscussion {
  id: string;
  groupId: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
  replies: DiscussionReply[];
  likes: string[]; // userIds
  views: number;
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  likes: string[]; // userIds
  parentReplyId?: string; // for nested replies
}

export interface GroupActivity {
  id: string;
  groupId: string;
  type: 'message' | 'discussion' | 'quiz' | 'achievement' | 'member_joined' | 'member_left';
  userId: string;
  data: any;
  timestamp: Date;
  isPublic: boolean;
}

export interface GroupQuiz {
  id: string;
  groupId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  participants: QuizParticipant[];
  maxAttempts: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
}

export interface QuizParticipant {
  userId: string;
  score: number;
  timeTaken: number;
  attempts: number;
  completedAt?: Date;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  points: number;
  timeSpent: number;
}

export interface GroupStudySession {
  id: string;
  groupId: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  startTime: Date;
  endTime: Date;
  maxParticipants: number;
  currentParticipants: number;
  isActive: boolean;
  createdBy: string;
  participants: StudySessionParticipant[];
  materials: StudyMaterial[];
  notes: StudyNote[];
}

export interface StudySessionParticipant {
  userId: string;
  joinedAt: Date;
  isPresent: boolean;
  contribution: string;
  rating?: number;
}

export interface StudyMaterial {
  id: string;
  sessionId: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'quiz';
  url: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface StudyNote {
  id: string;
  sessionId: string;
  authorId: string;
  content: string;
  timestamp: Date;
  isPublic: boolean;
  tags: string[];
}

export interface GroupInvitation {
  id: string;
  groupId: string;
  invitedUserId: string;
  invitedBy: string;
  message?: string;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Date;
}

export interface GroupNotification {
  id: string;
  groupId: string;
  userId: string;
  type: 'message' | 'discussion' | 'quiz' | 'invitation' | 'achievement';
  title: string;
  message: string;
  isRead: boolean;
  timestamp: Date;
  data?: any;
}

export interface GroupStats {
  groupId: string;
  totalMessages: number;
  totalDiscussions: number;
  totalQuizzes: number;
  totalStudySessions: number;
  activeMembers: number;
  averageActivityScore: number;
  topContributors: TopContributor[];
  recentActivity: GroupActivity[];
}

export interface TopContributor {
  userId: string;
  displayName: string;
  avatar?: string;
  contributionScore: number;
  messagesCount: number;
  discussionsCount: number;
  quizzesCreated: number;
}

