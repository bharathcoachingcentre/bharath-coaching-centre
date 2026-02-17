
import type { Course, Testimonial, Event, BlogPost } from './types';

export const courses: Course[] = [
  {
    id: 'cs101',
    title: 'Introduction to Computer Science',
    description: 'A foundational course covering the principles of programming, algorithms, and data structures.',
    instructor: 'Dr. Alan Turing',
    schedule: 'Mon, Wed, Fri 10:00 - 11:00 AM',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'computer code',
  },
  {
    id: 'phy201',
    title: 'Advanced Physics',
    description: 'Explore the depths of quantum mechanics, relativity, and cosmology.',
    instructor: 'Dr. Marie Curie',
    schedule: 'Tue, Thu 2:00 - 3:30 PM',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'atom particle',
  },
  {
    id: 'lit305',
    title: 'World Literature',
    description: 'A journey through classic and contemporary literary works from around the globe.',
    instructor: 'Prof. Maya Angelou',
    schedule: 'Mon, Wed 1:00 - 2:30 PM',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'books library',
  },
  {
    id: 'art110',
    title: 'Digital Art & Design',
    description: 'Learn the tools and techniques for creating stunning digital artwork and graphic designs.',
    instructor: 'Leo da Vinci',
    schedule: 'Fri 1:00 PM - 4:00 PM',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'digital art',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    course: 'Introduction to Computer Science',
    quote: 'The instructors are incredibly knowledgeable and supportive. I went from knowing nothing about code to building my own applications!',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarHint: 'student portrait',
  },
  {
    id: 't2',
    name: 'John Doe',
    course: 'Advanced Physics',
    quote: "Bharath Academy challenged me to think critically and pushed me beyond my limits. The physics course was mind-bending in the best way possible.",
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarHint: 'person smiling',
  },
  {
    id: 't3',
    name: 'Aisha Khan',
    course: 'World Literature',
    quote: 'I discovered a passion for literature I never knew I had. The discussions were so engaging and opened my eyes to new perspectives.',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarHint: 'graduate student',
  },
];

export const events: Event[] = [
    {
      id: 'e1',
      title: 'Mid-term Examinations',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      description: 'The mid-term examination week begins. Please check the detailed schedule.',
      category: 'Deadline',
    },
    {
      id: 'e2',
      title: 'Guest Lecture: AI in Modern Science',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
      description: 'A special guest lecture by a leading AI researcher.',
      category: 'Seminar',
    },
    {
      id: 'e3',
      title: 'Digital Art Workshop',
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
      description: 'Hands-on workshop for students of ART110.',
      category: 'Workshop',
    },
    {
      id: 'e4',
      title: 'Semester Break',
      date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20),
      description: 'The academy will be closed for a short break.',
      category: 'Holiday',
    },
  ];

export const blogPosts: BlogPost[] = [
    {
        slug: 'the-future-of-learning',
        title: 'The Future of Learning: Trends to Watch in Education',
        author: 'Jane Doe',
        date: 'October 26, 2023',
        excerpt: 'Education is evolving at a rapid pace. In this article, we explore the key trends shaping the future of learning, from AI tutors to virtual classrooms.',
        imageUrl: '/blog-1.jpg',
        imageHint: 'blog future',
        content: `
<p>Education is undergoing a profound transformation. The traditional model of classroom-based learning is being augmented, and in some cases, replaced by innovative technologies and pedagogical approaches. In this article, we'll explore some of the most significant trends that are shaping the future of education.</p>

<h3 class="text-2xl font-bold my-4">1. Artificial Intelligence in Education</h3>
<p>AI is no longer science fiction. It's becoming an integral part of the learning experience. AI-powered tools can provide personalized learning paths for students, adapting to their pace and style. Imagine an AI tutor that can explain complex concepts in a way that a specific student understands best, available 24/7. This is already becoming a reality.</p>

<h3 class="text-2xl font-bold my-4">2. Gamification</h3>
<p>Learning doesn't have to be a chore. By incorporating game-like elements such as points, badges, and leaderboards, educators can make learning more engaging and motivating. Gamification taps into our natural desire for competition and achievement, turning study into an enjoyable challenge.</p>

<h3 class="text-2xl font-bold my-4">3. Immersive Learning with AR/VR</h3>
<p>Augmented Reality (AR) and Virtual Reality (VR) are set to revolutionize how we learn. Imagine a history class where you can walk through ancient Rome, or a biology class where you can dissect a virtual frog without harming any animals. These immersive technologies provide experiences that are impossible in a traditional classroom, leading to deeper understanding and retention.</p>

<p>The future of learning is exciting and full of possibilities. By embracing these new trends, institutions like Bharath Academy can provide a more effective, engaging, and personalized education for all students.</p>
        `
    },
    {
        slug: 'mastering-the-art-of-studying',
        title: 'Mastering the Art of Studying: Techniques for a New Era',
        author: 'John Smith',
        date: 'November 5, 2023',
        excerpt: 'Studying effectively is a skill. We dive into proven techniques like active recall and spaced repetition to help you get the most out of your study sessions.',
        imageUrl: '/blog-2.jpg',
        imageHint: 'student studying',
        content: `
<p>It's a common misconception that spending more hours studying automatically leads to better results. The key to academic success isn't about the quantity of time, but the quality of your study methods. Let's explore some evidence-based techniques.</p>

<h3 class="text-2xl font-bold my-4">1. Active Recall</h3>
<p>Instead of passively re-reading your notes or textbooks, actively try to retrieve information from your memory. You can do this by closing the book and trying to summarize a chapter, using flashcards, or teaching the concept to someone else. This process of retrieval strengthens neural pathways, making the information easier to remember in the future.</p>

<h3 class="text-2xl font-bold my-4">2. Spaced Repetition</h3>
<p>Don't cram! Our brains learn more effectively when we space out our learning over time. Instead of studying a topic for five hours in one day, it's far more effective to study it for one hour a day over five days. Spaced repetition systems (SRS) like Anki are fantastic tools for automating this process.</p>

<h3 class="text-2xl font-bold my-4">3. The Feynman Technique</h3>
<p>To truly understand something, try to explain it in simple terms, as if you were teaching it to a child. This technique, named after the physicist Richard Feynman, forces you to distill complex ideas into their core components and identify any gaps in your own understanding.</p>

<p>By incorporating these techniques into your study routine, you can learn more effectively and achieve your academic goals with less stress. Happy studying!</p>
        `
    }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
}
