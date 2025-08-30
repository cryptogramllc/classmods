import type { Subject } from '../types';

export const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: '🔢',
    color: '#4CAF50',
    description: 'Learn numbers, shapes, patterns, and problem-solving skills',
    gradeLevels: [
      {
        id: 'k',
        name: 'Kindergarten',
        modules: [
          {
            id: 'k-math-1',
            title: 'Numbers 1-10',
            description: 'Learn to count, recognize, and write numbers 1-10',
            lessons: [
              {
                id: 'k-math-1-lesson-1',
                title: 'Counting to 5',
                content: [
                  'Let\'s learn to count from 1 to 5!',
                  '1 - One apple',
                  '2 - Two balloons',
                  '3 - Three cats',
                  '4 - Four dogs',
                  '5 - Five stars'
                ],
                quiz: {
                  id: 'k-math-1-quiz-1',
                  questions: [
                    {
                      id: 'q1',
                      type: 'multiple-choice',
                      question: 'How many apples do you see? (Picture shows 3 apples)',
                      options: ['1', '2', '3', '4'],
                      correctAnswer: '3'
                    },
                    {
                      id: 'q2',
                      type: 'multiple-choice',
                      question: 'What comes after 2?',
                      options: ['1', '3', '4', '5'],
                      correctAnswer: '3'
                    }
                  ],
                  timeLimit: 5
                },
                isCompleted: false
              }
            ],
            exam: {
              id: 'k-math-1-exam',
              questions: [
                {
                  id: 'e1',
                  type: 'multiple-choice',
                  question: 'Count the objects: How many are there?',
                  options: ['3', '4', '5', '6'],
                  correctAnswer: '4'
                }
              ],
              timeLimit: 15,
              passingScore: 80
            },
            isCompleted: false,
            progress: 0
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: '#2196F3',
    description: 'Explore the world around us through observation and experiments',
    gradeLevels: [
      {
        id: 'k',
        name: 'Kindergarten',
        modules: [
          {
            id: 'k-science-1',
            title: 'Five Senses',
            description: 'Learn about sight, hearing, touch, taste, and smell',
            lessons: [
              {
                id: 'k-science-1-lesson-1',
                title: 'Sense of Sight',
                content: [
                  'Our eyes help us see the world around us',
                  'We can see colors, shapes, and sizes',
                  'Light helps us see things clearly',
                  'Some animals can see better than humans in the dark'
                ],
                quiz: {
                  id: 'k-science-1-quiz-1',
                  questions: [
                    {
                      id: 'q1',
                      type: 'multiple-choice',
                      question: 'Which part of our body helps us see?',
                      options: ['Ears', 'Eyes', 'Nose', 'Mouth'],
                      correctAnswer: 'Eyes'
                    }
                  ],
                  timeLimit: 5
                },
                isCompleted: false
              }
            ],
            exam: {
              id: 'k-science-1-exam',
              questions: [
                {
                  id: 'e1',
                  type: 'multiple-choice',
                  question: 'How many senses do humans have?',
                  options: ['3', '4', '5', '6'],
                  correctAnswer: '5'
                }
              ],
              timeLimit: 15,
              passingScore: 80
            },
            isCompleted: false,
            progress: 0
          }
        ]
      }
    ]
  },
  {
    id: 'reading',
    name: 'Reading & Language Arts',
    icon: '📚',
    color: '#FF9800',
    description: 'Develop reading, writing, and communication skills',
    gradeLevels: [
      {
        id: 'k',
        name: 'Kindergarten',
        modules: [
          {
            id: 'k-reading-1',
            title: 'Letter Recognition',
            description: 'Learn to recognize and write letters A-Z',
            lessons: [
              {
                id: 'k-reading-1-lesson-1',
                title: 'Letter A',
                content: [
                  'A is for Apple',
                  'A is for Ant',
                  'A is for Airplane',
                  'The letter A makes the "ah" sound'
                ],
                quiz: {
                  id: 'k-reading-1-quiz-1',
                  questions: [
                    {
                      id: 'q1',
                      type: 'multiple-choice',
                      question: 'Which letter is this? (Shows letter A)',
                      options: ['A', 'B', 'C', 'D'],
                      correctAnswer: 'A'
                    }
                  ],
                  timeLimit: 5
                },
                isCompleted: false
              }
            ],
            exam: {
              id: 'k-reading-1-exam',
              questions: [
                {
                  id: 'e1',
                  type: 'multiple-choice',
                  question: 'How many letters are in the alphabet?',
                  options: ['24', '25', '26', '27'],
                  correctAnswer: '26'
                }
              ],
              timeLimit: 15,
              passingScore: 80
            },
            isCompleted: false,
            progress: 0
          }
        ]
      }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};

export const getGradeLevel = (subjectId: string, gradeId: string) => {
  const subject = getSubjectById(subjectId);
  return subject?.gradeLevels.find(grade => grade.id === gradeId);
};

export const getModule = (subjectId: string, gradeId: string, moduleId: string) => {
  const gradeLevel = getGradeLevel(subjectId, gradeId);
  return gradeLevel?.modules.find(module => module.id === moduleId);
};

