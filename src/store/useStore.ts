import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  clientName: string;
  projectDate: string;
  tags: string[];
  featured: boolean;
  images: string[];
  videos: string[];
  beforeAfter?: { before: string; after: string };
  aiCaption?: string;
  aiDescription?: string;
  published: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  featured: boolean;
  order: number;
}

export interface Campaign {
  id: string;
  campaignName: string;
  platform: string;
  budget: number;
  reach: number;
  impressions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  roas: number;
  notes: string;
  screenshots: string[];
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  preview: string;
  fullContent: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  order: number;
  active: boolean;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroTitles: string[];
  aboutBiography: string;
  aboutExperience: string;
  countriesWorked: string[];
  skills: string[];
  achievements: string[];
  whatsappNumber: string;
  primaryColor: string;
  secondaryColor: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  category: string;
  tags: string[];
  createdAt: string;
}

export interface AIHistory {
  id: string;
  tool: string;
  input: string;
  output: string;
  createdAt: string;
}

interface AppState {
  // Data
  projects: Project[];
  services: Service[];
  campaigns: Campaign[];
  articles: Article[];
  socialLinks: SocialLink[];
  mediaAssets: MediaAsset[];
  siteSettings: SiteSettings;
  aiHistory: AIHistory[];
  
  // Auth
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  
  // UI State
  currentRoute: string;
  activeSection: string;
  isMenuOpen: boolean;
  
  // Actions
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  
  addArticle: (article: Omit<Article, 'id' | 'createdAt'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  
  addSocialLink: (link: Omit<SocialLink, 'id'>) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;
  
  updateSettings: (settings: Partial<SiteSettings>) => void;
  
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => void;
  deleteMediaAsset: (id: string) => void;
  
  addAIHistory: (history: Omit<AIHistory, 'id' | 'createdAt'>) => void;
  
  login: (email: string, name: string) => void;
  logout: () => void;
  
  navigateTo: (route: string) => void;
  setActiveSection: (section: string) => void;
  toggleMenu: () => void;
}

const defaultSettings: SiteSettings = {
  heroTitle: 'YOUSSEF',
  heroSubtitle: 'Creative Studio',
  heroTitles: [
    'Graphic Designer',
    'Media Buyer',
    'Content Writer',
    'Copywriter',
    'Branding Specialist',
    'Marketing Consultant',
    'AI Creative Designer'
  ],
  aboutBiography: 'I am a passionate creative professional with years of experience in graphic design, media buying, content creation, and branding. I help businesses and individuals establish their unique identity and reach their target audience effectively.',
  aboutExperience: 'Over 8+ years of professional experience working with clients from various industries and countries.',
  countriesWorked: ['Egypt', 'UAE', 'Saudi Arabia', 'USA', 'UK', 'Germany', 'France', 'Australia'],
  skills: ['Graphic Design', 'Branding', 'Media Buying', 'Content Writing', 'Copywriting', 'SEO', 'AI Tools', 'Marketing Strategy'],
  achievements: ['500+ Projects Completed', '200+ Happy Clients', '10+ Years Experience', 'Award-Winning Designer'],
  whatsappNumber: '201032869945',
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  seoTitle: 'Youssef Creative Studio - Professional Design & Marketing',
  seoDescription: 'Professional graphic designer, media buyer, content writer, and marketing consultant offering creative solutions for your business.',
  seoKeywords: ['graphic design', 'media buying', 'content writing', 'copywriting', 'branding', 'marketing'],
};

const defaultSocialLinks: SocialLink[] = [
  { id: '1', name: 'WhatsApp', url: 'https://wa.me/201032869945', icon: 'message-circle', order: 1, active: true },
  { id: '2', name: 'Facebook', url: 'https://facebook.com', icon: 'facebook', order: 2, active: true },
  { id: '3', name: 'Instagram', url: 'https://instagram.com', icon: 'instagram', order: 3, active: true },
  { id: '4', name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin', order: 4, active: true },
  { id: '5', name: 'Behance', url: 'https://behance.net', icon: 'external-link', order: 5, active: true },
  { id: '6', name: 'TikTok', url: 'https://tiktok.com', icon: 'music', order: 6, active: true },
  { id: '7', name: 'YouTube', url: 'https://youtube.com', icon: 'youtube', order: 7, active: true },
];

const defaultServices: Service[] = [
  { id: '1', name: 'Graphic Design', description: 'Professional visual design for all your needs', icon: 'palette', category: 'design', featured: true, order: 1 },
  { id: '2', name: 'Social Media Design', description: 'Eye-catching designs for social platforms', icon: 'share-2', category: 'design', featured: true, order: 2 },
  { id: '3', name: 'Logo Design', description: 'Memorable logos that represent your brand', icon: 'award', category: 'design', featured: true, order: 3 },
  { id: '4', name: 'Branding', description: 'Complete brand identity development', icon: 'sparkles', category: 'design', featured: true, order: 4 },
  { id: '5', name: 'Print Design', description: 'Professional print materials and layouts', icon: 'printer', category: 'design', featured: false, order: 5 },
  { id: '6', name: 'Packaging Design', description: 'Creative packaging that stands out', icon: 'package', category: 'design', featured: false, order: 6 },
  { id: '7', name: 'Media Buying', description: 'Strategic ad placement and optimization', icon: 'target', category: 'marketing', featured: true, order: 7 },
  { id: '8', name: 'Marketing Strategy', description: 'Comprehensive marketing planning', icon: 'chart-line', category: 'marketing', featured: true, order: 8 },
  { id: '9', name: 'Content Writing', description: 'Engaging written content for all platforms', icon: 'file-text', category: 'content', featured: true, order: 9 },
  { id: '10', name: 'Copywriting', description: 'Persuasive copy that converts', icon: 'pen-tool', category: 'content', featured: true, order: 10 },
  { id: '11', name: 'SEO Content', description: 'Search-optimized content writing', icon: 'search', category: 'content', featured: false, order: 11 },
  { id: '12', name: 'AI Content Creation', description: 'AI-powered content generation', icon: 'cpu', category: 'ai', featured: true, order: 12 },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      projects: [],
      services: defaultServices,
      campaigns: [],
      articles: [],
      socialLinks: defaultSocialLinks,
      mediaAssets: [],
      siteSettings: defaultSettings,
      aiHistory: [],
      
      // Auth
      isAuthenticated: false,
      user: null,
      
      // UI State
      currentRoute: '/',
      activeSection: 'home',
      isMenuOpen: false,
      
      // Project Actions
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      })),
      updateProject: (id, project) => set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? { ...p, ...project } : p))
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      })),
      
      // Service Actions
      addService: (service) => set((state) => ({
        services: [...state.services, { ...service, id: Date.now().toString() }]
      })),
      updateService: (id, service) => set((state) => ({
        services: state.services.map((s) => (s.id === id ? { ...s, ...service } : s))
      })),
      deleteService: (id) => set((state) => ({
        services: state.services.filter((s) => s.id !== id)
      })),
      
      // Campaign Actions
      addCampaign: (campaign) => set((state) => ({
        campaigns: [...state.campaigns, { ...campaign, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      })),
      updateCampaign: (id, campaign) => set((state) => ({
        campaigns: state.campaigns.map((c) => (c.id === id ? { ...c, ...campaign } : c))
      })),
      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter((c) => c.id !== id)
      })),
      
      // Article Actions
      addArticle: (article) => set((state) => ({
        articles: [...state.articles, { ...article, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      })),
      updateArticle: (id, article) => set((state) => ({
        articles: state.articles.map((a) => (a.id === id ? { ...a, ...article } : a))
      })),
      deleteArticle: (id) => set((state) => ({
        articles: state.articles.filter((a) => a.id !== id)
      })),
      
      // Social Link Actions
      addSocialLink: (link) => set((state) => ({
        socialLinks: [...state.socialLinks, { ...link, id: Date.now().toString() }]
      })),
      updateSocialLink: (id, link) => set((state) => ({
        socialLinks: state.socialLinks.map((l) => (l.id === id ? { ...l, ...link } : l))
      })),
      deleteSocialLink: (id) => set((state) => ({
        socialLinks: state.socialLinks.filter((l) => l.id !== id)
      })),
      
      // Settings Actions
      updateSettings: (settings) => set((state) => ({
        siteSettings: { ...state.siteSettings, ...settings }
      })),
      
      // Media Actions
      addMediaAsset: (asset) => set((state) => ({
        mediaAssets: [...state.mediaAssets, { ...asset, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      })),
      deleteMediaAsset: (id) => set((state) => ({
        mediaAssets: state.mediaAssets.filter((m) => m.id !== id)
      })),
      
      // AI History Actions
      addAIHistory: (history) => set((state) => ({
        aiHistory: [...state.aiHistory, { ...history, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      })),
      
      // Auth Actions
      login: (email, name) => set({ isAuthenticated: true, user: { email, name } }),
      logout: () => set({ isAuthenticated: false, user: null }),
      
      // Navigation Actions
      navigateTo: (route) => set({ currentRoute: route }),
      setActiveSection: (section) => set({ activeSection: section }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    }),
    {
      name: 'youssef-creative-os',
    }
  )
);
