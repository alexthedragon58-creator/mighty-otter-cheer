import { Course, LiveSession, ForumPost } from '../types/lms';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Full-Stack Next.js 15 & AI App Masterclass',
    slug: 'nextjs-15-ai-masterclass',
    tagline: 'Master modern React 19, Server Components, AI Agent integrations, and enterprise deployment.',
    description: 'A comprehensive, hands-on production course designed to take you from foundational TypeScript & React 19 concepts to building enterprise AI SaaS platforms using Next.js 15, Tailwind CSS, LangChain, and Supabase.',
    category: 'Web Development',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    instructor: {
      id: 'inst-1',
      name: 'Dr. Sarah Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      title: 'Principal Software Architect & Google Developer Expert',
      bio: 'Over 12 years of enterprise engineering experience at Meta & Stripe. Passionate educator with 80,000+ students worldwide.',
      rating: 4.9,
      studentsCount: 38400,
    },
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.9,
    ratingCount: 1420,
    studentsEnrolled: 12450,
    totalDuration: '18h 45m',
    totalLessons: 24,
    featured: true,
    bestseller: true,
    updatedAt: 'October 2024',
    learningOutcomes: [
      'Architect robust Server and Client Component topologies in React 19',
      'Build autonomous AI streaming tools with Vercel AI SDK',
      'Implement authentication, role-based access control, and Stripe billing',
      'Deploy CI/CD pipelines with high-availability microservices on AWS'
    ],
    requirements: [
      'Basic knowledge of JavaScript / ES6 and modern React syntax',
      'Node.js v18+ installed on your computer',
      'A code editor like VS Code'
    ],
    chapters: [
      {
        id: 'ch-1',
        title: 'Module 1: Next.js 15 Foundations & Server Architecture',
        lessons: [
          {
            id: 'les-1-1',
            title: '1.1 Introduction to Next.js 15 & React 19 Paradigm',
            duration: '14:20',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Deep dive into the App Router architecture, streaming SSR, and server action mutations.',
            resources: [
              { name: 'Architecture Cheat Sheet (PDF)', type: 'pdf', size: '2.4 MB', url: '#' },
              { name: 'Starter Starter Kit (GitHub)', type: 'link', url: 'https://github.com' }
            ]
          },
          {
            id: 'les-1-2',
            title: '1.2 Server Components vs. Client Components Decoded',
            duration: '18:50',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Learn boundary definitions, bundle optimization, and hydration performance secrets.'
          },
          {
            id: 'les-1-3',
            title: '1.3 Dynamic Routing & Nested Layouts Mastery',
            duration: '12:15',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Configure parallel routes, intercepting routes, and global error boundaries gracefully.'
          }
        ],
        quiz: {
          id: 'quiz-1',
          title: 'Module 1 Knowledge Check: Next.js 15 & React Server Components',
          timeLimitMinutes: 10,
          passingScore: 70,
          questions: [
            {
              id: 'q-1',
              question: 'Which directive designates a component as a Client Component in Next.js App Router?',
              options: ['use server', 'use client', 'client only', 'hydrate client'],
              correctIndex: 1,
              explanation: '"use client" is the boundary indicator that tells React to bundle that component for client-side JavaScript hydration.'
            },
            {
              id: 'q-2',
              question: 'Can a React Server Component directly use hooks like `useState` or `useEffect`?',
              options: ['Yes, always', 'No, only Client Components can use interactive hooks', 'Only if wrapped in Suspense', 'Only in Next.js 15+'],
              correctIndex: 1,
              explanation: 'Server Components execute only on the server, so stateful client hooks like useState and useEffect are not supported in them.'
            },
            {
              id: 'q-3',
              question: 'What is the main benefit of streaming with React Suspense in Next.js?',
              options: ['Automatic CSS bundling', 'Progressively rendering UI blocks as async data resolves without blocking the whole page', 'Compressing audio files', 'Eliminating all JavaScript'],
              correctIndex: 1,
              explanation: 'Suspense allows fast initial HTML responses while streaming slower asynchronous data chunks into the page seamlessly.'
            }
          ]
        }
      },
      {
        id: 'ch-2',
        title: 'Module 2: AI Agents & Real-Time Streaming Pipelines',
        lessons: [
          {
            id: 'les-2-1',
            title: '2.1 Vercel AI SDK Core & OpenAI Stream Handlers',
            duration: '22:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            description: 'Constructing robust streaming edge endpoints with tool calling and markdown rendering.'
          },
          {
            id: 'les-2-2',
            title: '2.2 Retrieval-Augmented Generation (RAG) with Vector Databases',
            duration: '26:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            description: 'Embedding text chunks with OpenAI and querying nearest neighbors with pgvector.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Alex Chen',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Hands down the best Next.js 15 course available. The AI agent section alone is worth 10x the price!'
      },
      {
        id: 'rev-2',
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Crystal clear explanations on server actions and streaming. I rebuilt our company internal tool right away.'
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Generative AI & LLM Systems Engineering',
    slug: 'generative-ai-llm-engineering',
    tagline: 'Build production-ready LLM pipelines, fine-tuning, RAG, and multi-agent systems with Python.',
    description: 'Learn how to architect, optimize, and deploy LLMs in production. Master prompt engineering, LangGraph agent workflows, DSPy optimizations, evaluation metrics, and local Ollama model serving.',
    category: 'AI & Data Science',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
    instructor: {
      id: 'inst-2',
      name: 'Marcus Thorne, Ph.D.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      title: 'AI Research Lead & Ex-DeepMind Scientist',
      bio: 'Research specialist in neural architectures, fine-tuning, and deterministic agent orchestrations.',
      rating: 4.95,
      studentsCount: 29000,
    },
    price: 99.99,
    originalPrice: 169.99,
    rating: 4.95,
    ratingCount: 890,
    studentsEnrolled: 8400,
    totalDuration: '22h 30m',
    totalLessons: 28,
    featured: true,
    bestseller: true,
    updatedAt: 'November 2024',
    learningOutcomes: [
      'Master LangGraph state machines and multi-agent coordination',
      'Implement enterprise RAG with hybrid search and rerankers',
      'Fine-tune open-weight models (Llama 3, Mistral) using LoRA / QLoRA',
      'Build evaluation guardrails against hallucinations and prompt injection'
    ],
    requirements: [
      'Intermediate Python knowledge (asyncio, type hints, pydantic)',
      'Basic familiarity with machine learning and API calls'
    ],
    chapters: [
      {
        id: 'ch-2-1',
        title: 'Module 1: Vector Spaces & Hybrid RAG Architectures',
        lessons: [
          {
            id: 'les-2-1-1',
            title: '1.1 Embeddings Math, Cosine Distance & HNSW Indexing',
            duration: '21:00',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            description: 'Understanding high-dimensional spaces, quantization, and index clustering.'
          },
          {
            id: 'les-2-1-2',
            title: '1.2 Advanced Chunking Strategies and BM25 + Vector Hybrid',
            duration: '25:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            description: 'How to achieve 98% recall accuracy using Cohere rerankers.'
          }
        ],
        quiz: {
          id: 'quiz-2',
          title: 'Module 1 Quiz: RAG & Vector Embeddings',
          timeLimitMinutes: 8,
          passingScore: 75,
          questions: [
            {
              id: 'q-2-1',
              question: 'What is the primary benefit of hybrid search over pure vector search in RAG?',
              options: [
                'Faster GPU computation',
                'Combines exact keyword BM25 matching with semantic dense vector retrieval',
                'Eliminates the need for an LLM completely',
                'Reduces token costs by 100%'
              ],
              correctIndex: 1,
              explanation: 'Hybrid search ensures exact product codes/names are found while preserving contextual semantic similarity.'
            }
          ]
        }
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'David Miller',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'The depth of content on LangGraph and evaluation harnesses is unmatched. Recommended to my entire ML team!'
      }
    ]
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Systems: Figma to Production Code',
    slug: 'ui-ux-design-systems-figma',
    tagline: 'Craft scalable design tokens, accessibility-first component libraries, and interactive micro-interactions.',
    description: 'Transform your design workflow. Learn how to architect multi-brand design systems in Figma, handle responsive auto-layout, wire up variable tokens, and translate them directly into Tailwind CSS and React component kits.',
    category: 'UI/UX Design',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1000&q=80',
    instructor: {
      id: 'inst-3',
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      title: 'Design Director & Ex-Airbnb Staff Designer',
      bio: 'Award-winning designer with 10+ years shaping top consumer applications and design toolkits.',
      rating: 4.88,
      studentsCount: 45000,
    },
    price: 69.99,
    originalPrice: 119.99,
    rating: 4.88,
    ratingCount: 1650,
    studentsEnrolled: 18200,
    totalDuration: '14h 10m',
    totalLessons: 19,
    featured: false,
    bestseller: true,
    updatedAt: 'September 2024',
    learningOutcomes: [
      'Master Figma Variables, Modes, and Component Properties',
      'Build WCAG AAA accessible typography, contrast, and focus states',
      'Connect Figma Tokens with GitHub Actions & Tailwind tokens automatically',
      'Create interactive prototypes with complex micro-animations'
    ],
    requirements: [
      'A free Figma account',
      'No prior coding or design background required'
    ],
    chapters: [
      {
        id: 'ch-3-1',
        title: 'Module 1: Design Tokens & Atomic Structure',
        lessons: [
          {
            id: 'les-3-1-1',
            title: '1.1 The Anatomy of an Enterprise Design System',
            duration: '16:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Colors, spacing scales, typography ladders, and component taxonomy.'
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Sophia Garcia',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'Made our design handoff 10x faster. The Figma variable tokens tricks are pure gold!'
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Cloud Native Kubernetes & DevOps on AWS',
    slug: 'cloud-native-kubernetes-aws',
    tagline: 'Deploy, scale, and secure enterprise microservices using EKS, Terraform, Helm, and ArgoCD GitOps.',
    description: 'Practical infrastructure as code and container orchestration. Build resilient, autoscaling Kubernetes clusters on AWS with zero downtime rolling upgrades, monitoring with Prometheus & Grafana, and secure Istio service meshes.',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1000&q=80',
    instructor: {
      id: 'inst-4',
      name: 'James Kowalski',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      title: 'DevOps Lead & Certified Kubernetes Administrator',
      bio: 'Cloud architect managing multi-region clusters handling over 2B requests/day.',
      rating: 4.85,
      studentsCount: 21000,
    },
    price: 84.99,
    originalPrice: 139.99,
    rating: 4.85,
    ratingCount: 740,
    studentsEnrolled: 6900,
    totalDuration: '19h 50m',
    totalLessons: 22,
    featured: false,
    bestseller: false,
    updatedAt: 'October 2024',
    learningOutcomes: [
      'Provision multi-AZ VPC and EKS clusters with Terraform modules',
      'Configure ArgoCD GitOps sync for declarative zero-touch deployments',
      'Build autoscaling rules with KEDA and cluster autoscaler',
      'Enforce security policies with OPA Gatekeeper and Kyverno'
    ],
    requirements: [
      'Basic Linux CLI skills and Docker container knowledge',
      'An active AWS Free Tier or paid account'
    ],
    chapters: [
      {
        id: 'ch-4-1',
        title: 'Module 1: Infrastructure as Code with Terraform',
        lessons: [
          {
            id: 'les-4-1-1',
            title: '1.1 Terraform State & AWS VPC Architecture',
            duration: '19:30',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Building isolated subnets, NAT gateways, and security groups.'
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-5',
    title: 'Product Management for Modern Tech Leaders',
    slug: 'product-management-modern-tech',
    tagline: 'From product strategy, user discovery, metrics, PRDs to leading high-velocity engineering squads.',
    description: 'Learn the battle-tested product management framework used by hyper-growth tech startups. Master data-informed product discovery, customer interviews, OKRs, unit economics, and AI-assisted prototyping.',
    category: 'Business & Product',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    instructor: {
      id: 'inst-5',
      name: 'Claire Zhang',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      title: 'VP of Product & Angel Investor',
      bio: 'Built and scaled products from 0 to $50M ARR. Mentor to 50+ startup founders.',
      rating: 4.92,
      studentsCount: 31000,
    },
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.92,
    ratingCount: 1120,
    studentsEnrolled: 14100,
    totalDuration: '11h 20m',
    totalLessons: 16,
    featured: true,
    bestseller: false,
    updatedAt: 'November 2024',
    learningOutcomes: [
      'Write compelling Product Requirement Documents (PRDs) that devs love',
      'Run impactful qualitative customer discovery interviews',
      'Track North Star metrics, cohort retention, and churn analysis',
      'Prioritize roadmaps using RICE and Value vs Effort frameworks'
    ],
    requirements: [
      'No technical prerequisites needed',
      'Curiosity for product strategy and business execution'
    ],
    chapters: [
      {
        id: 'ch-5-1',
        title: 'Module 1: Product Strategy & Market Discovery',
        lessons: [
          {
            id: 'les-5-1-1',
            title: '1.1 Finding Product-Market Fit & Opportunity Solution Trees',
            duration: '15:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Deconstruct real market opportunities with Teresa Torres opportunity mapping.'
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-6',
    title: 'Applied Defensive Cybersecurity & Threat Hunting',
    slug: 'cybersecurity-threat-hunting',
    tagline: 'Detect, investigate, and mitigate advanced cyber attacks using SIEM, MITRE ATT&CK, and Wireshark.',
    description: 'Step into the shoes of a Security Operations Center (SOC) analyst. Investigate ransomware, analyze malicious network traffic, configure detection rules in Splunk/Elastic, and secure cloud endpoints.',
    category: 'Cybersecurity',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    instructor: {
      id: 'inst-6',
      name: 'Captain Robert Miller',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      title: 'Senior Cyber Incident Responder & CISSP',
      bio: '15+ years defending critical infrastructure and investigating high-profile security incidents.',
      rating: 4.87,
      studentsCount: 16000,
    },
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.87,
    ratingCount: 630,
    studentsEnrolled: 5800,
    totalDuration: '16h 15m',
    totalLessons: 20,
    featured: false,
    bestseller: false,
    updatedAt: 'October 2024',
    learningOutcomes: [
      'Map enterprise attack vectors against the MITRE ATT&CK Matrix',
      'Analyze live network packets and TLS handshakes in Wireshark',
      'Write custom Sigma and Yara detection rules',
      'Perform memory forensics on compromised Windows and Linux systems'
    ],
    requirements: [
      'Basic networking concepts (TCP/IP, DNS, OSI model)',
      'VirtualBox or VMware installed for lab simulations'
    ],
    chapters: [
      {
        id: 'ch-6-1',
        title: 'Module 1: Network Traffic Forensics & PCAP Analysis',
        lessons: [
          {
            id: 'les-6-1-1',
            title: '1.1 Deep Packet Inspection with Wireshark Filters',
            duration: '23:45',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            description: 'Identifying beaconing malware, DNS tunneling, and abnormal data exfiltration.'
          }
        ]
      }
    ],
    reviews: []
  }
];

export const INITIAL_LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'live-1',
    title: 'Building Real-time Voice Agents with WebRTC & Deepgram',
    instructorName: 'Dr. Sarah Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'Tomorrow',
    time: '6:00 PM EST',
    attendeesCount: 342,
    category: 'AI & Data Science',
    isRegistered: true,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    description: 'Join this live interactive coding session where we build an ultra low-latency conversational voice bot with React, WebRTC, and Python backend.'
  },
  {
    id: 'live-2',
    title: 'Figma to Code: Building Accessible Design Tokens at Scale',
    instructorName: 'Maya Lin',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: 'Thursday, 3:00 PM',
    time: '3:00 PM EST',
    attendeesCount: 512,
    category: 'UI/UX Design',
    isRegistered: false,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'Live workshop covering design system synchronization, color contrast automation, and team collaboration workflows.'
  },
  {
    id: 'live-3',
    title: 'Kubernetes Production Incident War Room Simulation',
    instructorName: 'James Kowalski',
    instructorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    date: 'Friday, 1:00 PM',
    time: '1:00 PM EST',
    attendeesCount: 198,
    category: 'Cloud & DevOps',
    isRegistered: false,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Hands-on troubleshooting live drill: Memory leaks, OOMKilled pods, DNS latency spikes, and SSL certificate expiration emergency recovery.'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    courseTitle: 'Full-Stack Next.js 15 & AI App Masterclass',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Student'
    },
    title: 'How to handle revalidation in Server Actions with optimistic UI updates?',
    content: 'When using `useOptimistic` alongside `revalidatePath` inside a server action, the client briefly flashes the old data before receiving the updated stream. What is the standard pattern to avoid this flicker?',
    tags: ['Next.js 15', 'Server Actions', 'Optimistic UI'],
    upvotes: 24,
    hasUpvoted: false,
    replyCount: 3,
    timeAgo: '3 hours ago',
    replies: [
      {
        id: 'rep-1',
        author: {
          name: 'Dr. Sarah Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          role: 'Instructor'
        },
        content: 'Great question David! You should wrap the mutation in a React `startTransition`. That way React delays unmounting the optimistic state until the revalidated Server Component payload has resolved over the network.',
        timeAgo: '1 hour ago',
        isInstructorAnswer: true
      }
    ]
  },
  {
    id: 'post-2',
    courseTitle: 'Generative AI & LLM Systems Engineering',
    author: {
      name: 'Samantha Ray',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Student'
    },
    title: 'Cohere Reranker vs. Cross-Encoder local latency comparison benchmark',
    content: 'I ran a benchmark test on 10,000 PDF documents comparing Cohere Rerank API (cloud) vs a local BAAI/bge-reranker-large on an RTX 4090. Here are the latency findings!',
    tags: ['RAG', 'Embeddings', 'Benchmarking', 'Vector Search'],
    upvotes: 45,
    hasUpvoted: true,
    replyCount: 6,
    timeAgo: '1 day ago'
  },
  {
    id: 'post-3',
    courseTitle: 'UI/UX Design Systems: Figma to Production Code',
    author: {
      name: 'Lucas Dupont',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Student'
    },
    title: 'Best practice for managing dark mode semantic tokens in Figma Variables',
    content: 'Should we create alias modes per theme or define separate collection variables for base and semantic aliases?',
    tags: ['Figma', 'Design Systems', 'Dark Mode'],
    upvotes: 18,
    hasUpvoted: false,
    replyCount: 2,
    timeAgo: '2 days ago'
  }
];