import type { 
  Group, 
  GroupMember, 
  GroupMessage, 
  GroupDiscussion, 
  GroupQuiz, 
  GroupStudySession,
  GroupStats 
} from '../types/groups';

// Sample Groups
export const sampleGroups: Group[] = [
  {
    id: 'math-enthusiasts-k',
    name: 'Math Enthusiasts - Kindergarten',
    description: 'A fun group for kindergarten students to explore math together! We solve puzzles, play counting games, and learn through interactive activities.',
    subject: 'math',
    gradeLevel: 'k',
    maxMembers: 20,
    currentMembers: 15,
    isPrivate: false,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    createdBy: 'teacher-sarah',
    tags: ['math', 'kindergarten', 'interactive', 'fun'],
    avatar: '🔢',
    coverImage: '/images/math-cover.jpg',
    rules: [
      'Be kind and respectful to everyone',
      'Share your math discoveries',
      'Ask questions when you need help',
      'Celebrate each other\'s achievements'
    ],
    topics: ['counting', 'shapes', 'patterns', 'addition', 'subtraction']
  },
  {
    id: 'science-explorers-1',
    name: 'Science Explorers - 1st Grade',
    description: 'Discover the wonders of science through experiments, observations, and group discussions. Perfect for curious young scientists!',
    subject: 'science',
    gradeLevel: '1',
    maxMembers: 25,
    currentMembers: 18,
    isPrivate: false,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-22'),
    createdBy: 'teacher-mike',
    tags: ['science', 'experiments', 'discovery', '1st-grade'],
    avatar: '🔬',
    coverImage: '/images/science-cover.jpg',
    rules: [
      'Safety first in all experiments',
      'Share your observations',
      'Ask "why" questions',
      'Respect nature and living things'
    ],
    topics: ['plants', 'animals', 'weather', 'matter', 'energy']
  },
  {
    id: 'reading-buddies-2',
    name: 'Reading Buddies - 2nd Grade',
    description: 'Join us for reading adventures! We discuss books, share stories, and help each other become better readers.',
    subject: 'reading',
    gradeLevel: '2',
    maxMembers: 30,
    currentMembers: 22,
    isPrivate: false,
    isActive: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-21'),
    createdBy: 'teacher-emma',
    tags: ['reading', 'books', 'stories', '2nd-grade', 'literature'],
    avatar: '📚',
    coverImage: '/images/reading-cover.jpg',
    rules: [
      'Listen when others are reading',
      'Share your favorite books',
      'Be patient with struggling readers',
      'Use kind words in discussions'
    ],
    topics: ['fiction', 'non-fiction', 'poetry', 'comprehension', 'vocabulary']
  },
  {
    id: 'math-masters-3',
    name: 'Math Masters - 3rd Grade',
    description: 'Advanced math concepts for 3rd graders. We tackle challenging problems, learn new strategies, and celebrate mathematical thinking.',
    subject: 'math',
    gradeLevel: '3',
    maxMembers: 20,
    currentMembers: 16,
    isPrivate: false,
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-23'),
    createdBy: 'teacher-david',
    tags: ['math', 'advanced', 'problem-solving', '3rd-grade'],
    avatar: '🧮',
    coverImage: '/images/math-advanced-cover.jpg',
    rules: [
      'Show your work and thinking',
      'Help others understand concepts',
      'Try challenging problems',
      'Learn from mistakes'
    ],
    topics: ['multiplication', 'division', 'fractions', 'geometry', 'word-problems']
  },
  {
    id: 'creative-writers-4',
    name: 'Creative Writers - 4th Grade',
    description: 'Unleash your imagination! Write stories, share ideas, and get feedback from fellow young authors.',
    subject: 'writing',
    gradeLevel: '4',
    maxMembers: 18,
    currentMembers: 12,
    isPrivate: false,
    isActive: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-24'),
    createdBy: 'teacher-lisa',
    tags: ['writing', 'creative', 'stories', '4th-grade', 'imagination'],
    avatar: '✍️',
    coverImage: '/images/writing-cover.jpg',
    rules: [
      'Be creative and original',
      'Give constructive feedback',
      'Respect different writing styles',
      'Share your work regularly'
    ],
    topics: ['narrative', 'descriptive', 'persuasive', 'poetry', 'dialogue']
  }
];

// Sample Group Members
export const sampleGroupMembers: GroupMember[] = [
  // Math Enthusiasts - Kindergarten
  {
    id: 'mem-1',
    groupId: 'math-enthusiasts-k',
    userId: 'student-alex',
    role: 'admin',
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date('2024-01-25'),
    isActive: true,
    permissions: ['manage_group', 'moderate_content', 'invite_members'],
    profile: {
      displayName: 'Alex Chen',
      avatar: '👦',
      grade: 'Kindergarten',
      subjects: ['math', 'science']
    }
  },
  {
    id: 'mem-2',
    groupId: 'math-enthusiasts-k',
    userId: 'student-maya',
    role: 'member',
    joinedAt: new Date('2024-01-16'),
    lastActive: new Date('2024-01-25'),
    isActive: true,
    permissions: ['send_messages', 'participate_discussions'],
    profile: {
      displayName: 'Maya Rodriguez',
      avatar: '👧',
      grade: 'Kindergarten',
      subjects: ['math', 'reading']
    }
  },
  // Science Explorers - 1st Grade
  {
    id: 'mem-3',
    groupId: 'science-explorers-1',
    userId: 'student-jake',
    role: 'moderator',
    joinedAt: new Date('2024-01-10'),
    lastActive: new Date('2024-01-25'),
    isActive: true,
    permissions: ['moderate_content', 'manage_discussions'],
    profile: {
      displayName: 'Jake Thompson',
      avatar: '👦',
      grade: '1st Grade',
      subjects: ['science', 'math']
    }
  }
];

// Sample Group Messages
export const sampleGroupMessages: GroupMessage[] = [
  {
    id: 'msg-1',
    groupId: 'math-enthusiasts-k',
    senderId: 'student-alex',
    content: 'Hi everyone! I learned to count to 100 today! 🎉',
    type: 'text',
    timestamp: new Date('2024-01-25T10:00:00'),
    isEdited: false,
    reactions: [
      {
        id: 'react-1',
        messageId: 'msg-1',
        userId: 'student-maya',
        emoji: '🎉',
        timestamp: new Date('2024-01-25T10:02:00')
      },
      {
        id: 'react-2',
        messageId: 'msg-1',
        userId: 'student-jake',
        emoji: '👏',
        timestamp: new Date('2024-01-25T10:03:00')
      }
    ],
    replies: [],
    mentions: []
  },
  {
    id: 'msg-2',
    groupId: 'math-enthusiasts-k',
    senderId: 'student-maya',
    content: 'That\'s amazing Alex! I can count to 50. Can you teach me how to count higher?',
    type: 'text',
    timestamp: new Date('2024-01-25T10:05:00'),
    isEdited: false,
    reactions: [],
    replies: [],
    mentions: ['student-alex']
  },
  {
    id: 'msg-3',
    groupId: 'science-explorers-1',
    senderId: 'student-jake',
    content: 'Today we learned about plants! 🌱 Did anyone else grow a seed?',
    type: 'text',
    timestamp: new Date('2024-01-25T14:00:00'),
    isEdited: false,
    reactions: [
      {
        id: 'react-3',
        messageId: 'msg-3',
        userId: 'student-sarah',
        emoji: '🌱',
        timestamp: new Date('2024-01-25T14:01:00')
      }
    ],
    replies: [],
    mentions: []
  }
];

// Sample Group Discussions
export const sampleGroupDiscussions: GroupDiscussion[] = [
  {
    id: 'disc-1',
    groupId: 'math-enthusiasts-k',
    title: 'What\'s your favorite number and why?',
    content: 'Let\'s share our favorite numbers and the reasons we like them! This will help us learn about numbers in a fun way.',
    authorId: 'teacher-sarah',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    isPinned: true,
    isLocked: false,
    tags: ['numbers', 'favorites', 'discussion'],
    replies: [
      {
        id: 'reply-1',
        discussionId: 'disc-1',
        authorId: 'student-alex',
        content: 'My favorite number is 7 because it\'s lucky! 🍀',
        createdAt: new Date('2024-01-20T15:00:00'),
        updatedAt: new Date('2024-01-20T15:00:00'),
        isEdited: false,
        likes: ['student-maya', 'student-jake'],
        parentReplyId: undefined
      },
      {
        id: 'reply-2',
        discussionId: 'disc-1',
        authorId: 'student-maya',
        content: 'I like the number 10 because it\'s easy to count with! ✋✋',
        createdAt: new Date('2024-01-20T15:30:00'),
        updatedAt: new Date('2024-01-20T15:30:00'),
        isEdited: false,
        likes: ['student-alex'],
        parentReplyId: undefined
      }
    ],
    likes: ['student-alex', 'student-maya', 'student-jake'],
    views: 25
  },
  {
    id: 'disc-2',
    groupId: 'science-explorers-1',
    title: 'What animals did you see today?',
    content: 'Share the animals you observed today, whether they were pets, wild animals, or even insects!',
    authorId: 'teacher-mike',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    isPinned: false,
    isLocked: false,
    tags: ['animals', 'observation', 'nature'],
    replies: [],
    likes: ['student-jake'],
    views: 18
  }
];

// Sample Group Quizzes
export const sampleGroupQuizzes: GroupQuiz[] = [
  {
    id: 'quiz-1',
    groupId: 'math-enthusiasts-k',
    title: 'Counting Challenge',
    description: 'Test your counting skills with this fun quiz!',
    questions: [
      {
        id: 'q1',
        question: 'What comes after 5?',
        type: 'multiple_choice',
        options: ['3', '4', '6', '7'],
        correctAnswer: '6',
        points: 10,
        explanation: '5 + 1 = 6'
      },
      {
        id: 'q2',
        question: 'Count the stars: ⭐⭐⭐⭐',
        type: 'multiple_choice',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
        points: 10,
        explanation: 'There are 4 stars'
      }
    ],
    timeLimit: 10,
    isActive: true,
    startDate: new Date('2024-01-25T09:00:00'),
    endDate: new Date('2024-01-26T09:00:00'),
    createdBy: 'teacher-sarah',
    participants: [
      {
        userId: 'student-alex',
        score: 20,
        timeTaken: 5,
        attempts: 1,
        completedAt: new Date('2024-01-25T10:00:00'),
        answers: [
          {
            questionId: 'q1',
            answer: '6',
            isCorrect: true,
            points: 10,
            timeSpent: 2
          },
          {
            questionId: 'q2',
            answer: '4',
            isCorrect: true,
            points: 10,
            timeSpent: 3
          }
        ]
      }
    ],
    maxAttempts: 3
  }
];

// Sample Study Sessions
export const sampleGroupSessions: GroupStudySession[] = [
  {
    id: 'session-1',
    groupId: 'math-enthusiasts-k',
    title: 'Counting Practice Session',
    description: 'Let\'s practice counting together! We\'ll count objects, play counting games, and help each other learn.',
    subject: 'math',
    topic: 'counting',
    startTime: new Date('2024-01-26T14:00:00'),
    endTime: new Date('2024-01-26T15:00:00'),
    maxParticipants: 15,
    currentParticipants: 8,
    isActive: true,
    createdBy: 'teacher-sarah',
    participants: [
      {
        userId: 'student-alex',
        joinedAt: new Date('2024-01-25T16:00:00'),
        isPresent: false,
        contribution: 'Will bring counting blocks',
        rating: undefined
      },
      {
        userId: 'student-maya',
        joinedAt: new Date('2024-01-25T16:30:00'),
        isPresent: false,
        contribution: 'Will share counting songs',
        rating: undefined
      }
    ],
    materials: [
      {
        id: 'mat-1',
        sessionId: 'session-1',
        title: 'Counting Blocks Activity',
        type: 'document',
        url: '/materials/counting-blocks.pdf',
        description: 'Instructions for counting block activities',
        uploadedBy: 'teacher-sarah',
        uploadedAt: new Date('2024-01-25T15:00:00')
      }
    ],
    notes: []
  }
];

// Sample Group Stats
export const sampleGroupStats: GroupStats[] = [
  {
    groupId: 'math-enthusiasts-k',
    totalMessages: 45,
    totalDiscussions: 8,
    totalQuizzes: 3,
    totalStudySessions: 5,
    activeMembers: 12,
    averageActivityScore: 85,
    topContributors: [
      {
        userId: 'student-alex',
        displayName: 'Alex Chen',
        avatar: '👦',
        contributionScore: 95,
        messagesCount: 15,
        discussionsCount: 3,
        quizzesCreated: 0
      },
      {
        userId: 'student-maya',
        displayName: 'Maya Rodriguez',
        avatar: '👧',
        contributionScore: 88,
        messagesCount: 12,
        discussionsCount: 2,
        quizzesCreated: 0
      }
    ],
    recentActivity: [
      {
        id: 'act-1',
        groupId: 'math-enthusiasts-k',
        type: 'message',
        userId: 'student-alex',
        data: { messageId: 'msg-1' },
        timestamp: new Date('2024-01-25T10:00:00'),
        isPublic: true
      }
    ]
  }
];

// Helper functions
export const getGroupById = (groupId: string): Group | undefined => {
  return sampleGroups.find(group => group.id === groupId);
};

export const getGroupsBySubject = (subject: string): Group[] => {
  return sampleGroups.filter(group => group.subject === subject);
};

export const getGroupsByGrade = (grade: string): Group[] => {
  return sampleGroups.filter(group => group.gradeLevel === grade);
};

export const getGroupMembers = (groupId: string): GroupMember[] => {
  return sampleGroupMembers.filter(member => member.groupId === groupId);
};

export const getGroupMessages = (groupId: string): GroupMessage[] => {
  return sampleGroupMessages.filter(message => message.groupId === groupId);
};

export const getGroupDiscussions = (groupId: string): GroupDiscussion[] => {
  return sampleGroupDiscussions.filter(discussion => discussion.groupId === groupId);
};

export const getGroupQuizzes = (groupId: string): GroupQuiz[] => {
  return sampleGroupQuizzes.filter(quiz => quiz.groupId === groupId);
};

export const getGroupStudySessions = (groupId: string): GroupStudySession[] => {
  return sampleGroupSessions.filter(session => session.groupId === groupId);
};

export const getGroupStats = (groupId: string): GroupStats | undefined => {
  return sampleGroupStats.find(stats => stats.groupId === groupId);
};
