export interface Student {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  skills: string[];
  availability: string[];
  location: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  year: number;
}

export interface StudySession {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  participants: Student[];
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'article' | 'quiz';
  subject: string;
  url: string;
  description: string;
  rating: number;
}

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: '/api/placeholder/40/40',
    subjects: ['Computer Science', 'Mathematics'],
    skills: ['Python', 'Data Structures', 'Calculus'],
    availability: ['Monday 2-4 PM', 'Wednesday 10-12 PM', 'Friday 1-3 PM'],
    location: 'Engineering Building',
    learningStyle: 'visual',
    year: 2
  },
  {
    id: '2',
    name: 'Arjun Patel',
    avatar: '/api/placeholder/40/40',
    subjects: ['Physics', 'Mathematics'],
    skills: ['Quantum Mechanics', 'Linear Algebra', 'Research Methods'],
    availability: ['Tuesday 3-5 PM', 'Thursday 11-1 PM', 'Saturday 9-11 AM'],
    location: 'Science Library',
    learningStyle: 'auditory',
    year: 3
  },
  {
    id: '3',
    name: 'Kavya Reddy',
    avatar: '/api/placeholder/40/40',
    subjects: ['Biology', 'Chemistry'],
    skills: ['Organic Chemistry', 'Cell Biology', 'Lab Techniques'],
    availability: ['Monday 10-12 PM', 'Wednesday 2-4 PM', 'Friday 9-11 AM'],
    location: 'Life Sciences Building',
    learningStyle: 'kinesthetic',
    year: 2
  },
  {
    id: '4',
    name: 'Rohit Gupta',
    avatar: '/api/placeholder/40/40',
    subjects: ['Computer Science', 'Statistics'],
    skills: ['Machine Learning', 'R Programming', 'Data Analysis'],
    availability: ['Tuesday 1-3 PM', 'Thursday 2-4 PM', 'Sunday 10-12 PM'],
    location: 'Computer Lab',
    learningStyle: 'reading',
    year: 4
  }
];

export const mockSessions: StudySession[] = [
  {
    id: '1',
    title: 'Calculus Study Group',
    subject: 'Mathematics',
    date: '2025-09-22',
    time: '14:00',
    duration: 120,
    participants: [mockStudents[0], mockStudents[1]],
    location: 'Library Room 205',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Python Programming Workshop',
    subject: 'Computer Science',
    date: '2025-09-24',
    time: '10:00',
    duration: 180,
    participants: [mockStudents[0], mockStudents[3]],
    location: 'Computer Lab 3',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Organic Chemistry Review',
    subject: 'Chemistry',
    date: '2025-09-20',
    time: '15:00',
    duration: 90,
    participants: [mockStudents[2]],
    location: 'Chemistry Building',
    status: 'completed'
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Linear Algebra Fundamentals',
    type: 'video',
    subject: 'Mathematics',
    url: '#',
    description: 'Comprehensive video series covering linear algebra basics',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Python Data Structures Guide',
    type: 'pdf',
    subject: 'Computer Science',
    url: '#',
    description: 'Complete guide to Python data structures and algorithms',
    rating: 4.6
  },
  {
    id: '3',
    title: 'Organic Chemistry Reactions Quiz',
    type: 'quiz',
    subject: 'Chemistry',
    url: '#',
    description: 'Interactive quiz on organic chemistry reaction mechanisms',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Quantum Physics Explained',
    type: 'article',
    subject: 'Physics',
    url: '#',
    description: 'In-depth article on quantum physics principles',
    rating: 4.5
  }
];

export const flashcards = [
  {
    id: '1',
    front: 'What is Big O notation?',
    back: 'Big O notation describes the upper bound of an algorithm\'s time complexity in the worst-case scenario.',
    subject: 'Computer Science'
  },
  {
    id: '2',
    front: 'Define derivative in calculus',
    back: 'A derivative represents the rate of change of a function with respect to a variable.',
    subject: 'Mathematics'
  },
  {
    id: '3',
    front: 'What is photosynthesis?',
    back: 'Photosynthesis is the process by which plants convert light energy into chemical energy (glucose).',
    subject: 'Biology'
  }
];