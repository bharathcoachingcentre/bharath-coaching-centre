export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
    imageUrl: string;
    imageHint: string;
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    course: string;
    quote: string;
    avatarUrl: string;
    avatarHint: string;
  }
  
  export interface Event {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: 'Workshop' | 'Seminar' | 'Deadline' | 'Holiday';
  }
  
  export interface BlogPost {
    slug: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    imageUrl: string;
    imageHint: string;
    content: string;
  }
