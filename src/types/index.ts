export type ID = string;

export interface Project {
  id: ID;
  title: string;
  slug: string;
  description: string;
  client: string;
  category: string;
  coverImage: string;
  gallery: string[];
  video?: string;
  challenge: string;
  solution: string;
  execution: string;
  results: string;
  status: 'draft' | 'published';
  publishDate: string;
  tags: string[];
}

export interface Service {
  id: ID;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  status: 'draft' | 'published';
}

export interface CaseStudy {
  id: ID;
  title: string;
  client: string;
  cover: string;
  businessGoal: string;
  budget: string;
  strategy: string;
  execution: string;
  results: string;
  cpl: string;
  leadVolume: string;
  roas: string;
  learnings: string;
  relatedServices: string[];
}

export interface BlogPost {
  id: ID;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published';
}

export interface Testimonial {
  id: ID;
  name: string;
  role: string;
  company: string;
  avatar: string;
  message: string;
  rating: number;
}

export interface ContactMessage {
  id: ID;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  source: string;
  score: number;
}

export interface Lead {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  source: string;
  status: 'cold' | 'warm' | 'hot' | 'converted';
  score: number;
  createdAt: string;
}

export interface MediaItem {
  id: ID;
  name: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  size: number;
  altText: string;
  createdAt: string;
}

export interface AuditRequest {
  id: ID;
  website: string;
  facebook: string;
  instagram: string;
  business: string;
  contactEmail: string;
  scores: {
    branding: number;
    offer: number;
    messaging: number;
    cta: number;
    ux: number;
    content: number;
    engagement: number;
    trust: number;
    conversion: number;
  };
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  quickWins: string[];
  actionPlan: string[];
  overallScore: number;
  status: 'pending' | 'analyzed' | 'delivered';
  createdAt: string;
}

export interface AnalyticsEvent {
  id: ID;
  type: string;
  page: string;
  timestamp: string;
  sessionId: string;
  metadata?: any;
}

export interface BrandSettings {
  logoText: string;
  tagline: string;
  logoMode: 'logo-only' | 'text-only' | 'logo+text';
  logoUrl: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  fontFamilyHeading: string;
  fontFamilyBody: string;
}

export interface DesignSettings {
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  buttonStyle: 'solid' | 'outline' | 'soft' | 'ghost';
  density: 'compact' | 'normal' | 'relaxed';
}

export interface AISettings {
  provider: 'openai' | 'gemini' | 'claude';
  model: string;
  temperature: number;
  maxTokens: number;
  apiKey: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  keywords: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
}

export interface Notification {
  id: ID;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
