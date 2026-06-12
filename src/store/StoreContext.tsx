import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import {
  Project, Service, CaseStudy, BlogPost, Testimonial,
  ContactMessage, Lead, MediaItem, AuditRequest, AnalyticsEvent,
  BrandSettings, DesignSettings, AISettings, SiteSettings, Notification
} from '../types';

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const now = () => new Date().toISOString();

// ============ SEED DATA ============
const defaultBrand: BrandSettings = {
  logoText: 'Youssef Studio',
  tagline: 'Creative · AI · Growth',
  logoMode: 'logo+text',
  logoUrl: '',
  favicon: '',
  primaryColor: '#6D1F33',
  secondaryColor: '#E8DCCB',
  accentColor: '#8A2943',
  bgColor: '#F7F4EF',
  textColor: '#1A1A1A',
  fontFamilyHeading: 'Inter',
  fontFamilyBody: 'Inter',
};

const defaultDesign: DesignSettings = {
  borderRadius: '2xl',
  shadow: 'lg',
  buttonStyle: 'solid',
  density: 'normal',
};

const defaultAI: AISettings = {
  provider: 'openai',
  model: 'gpt-4o',
  temperature: 0.85,
  maxTokens: 1200,
  apiKey: '',
};

const defaultSite: SiteSettings = {
  siteName: 'Youssef Creative Studio OS',
  siteDescription: 'AI-Powered Marketing Operating System — Creative Agency, AI Studio, and Growth Engine.',
  keywords: 'marketing agency, ai studio, creative studio, growth marketing, brand strategy, youssef',
  email: 'hello@youssefstudio.com',
  phone: '+20 100 000 0000',
  address: 'Cairo, Egypt · Remote Worldwide',
  facebook: '#',
  instagram: '#',
  linkedin: '#',
  twitter: '#',
  youtube: '#',
};

const genImg = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const seedProjects: Project[] = [
  {
    id: uid(), title: 'Nebula Skincare Rebrand', slug: 'nebula-skincare-rebrand',
    description: 'Complete brand overhaul and growth campaign for a premium natural skincare line.',
    client: 'Nebula Co.', category: 'Brand Identity',
    coverImage: genImg('nebula-brand'),
    gallery: [genImg('nebula-1'), genImg('nebula-2'), genImg('nebula-3')],
    challenge: 'Low market recognition among a premium demographic in a premium premium vertical.',
    solution: 'Premium positioning system backed by premium AI-driven premium creative premium.',
    execution: '4-week sprint across brand, content, and performance teams.',
    results: '+312% brand search volume · +184% qualified leads · 4.9/5 customer satisfaction.',
    status: 'published', publishDate: '2026-02-10', tags: ['Branding', 'Strategy', 'Growth'],
  },
  {
    id: uid(), title: 'Aurelia Luxury Campaign', slug: 'aurelia-luxury-campaign',
    description: 'A premium performance campaign for a premium premium brand.',
    client: 'Aurelia Maison', category: 'Performance Marketing',
    coverImage: genImg('aurelia-campaign'),
    gallery: [genImg('aurelia-1'), genImg('aurelia-2'), genImg('aurelia-3')],
    challenge: 'Scale revenue while preserving premium premium perception.',
    solution: 'Hybrid performance + brand engine driven by premium AI insights.',
    execution: 'Full-funnel creative system across Meta, YouTube, TikTok.',
    results: '+4.8 ROAS · 3.2M impressions · 28,400 leads generated.',
    status: 'published', publishDate: '2026-01-18', tags: ['Paid Ads', 'Growth'],
  },
  {
    id: uid(), title: 'Maison Noir Digital', slug: 'maison-noir-digital',
    description: 'Premium digital ecosystem for a premium premium luxury house.',
    client: 'Maison Noir', category: 'Web Design',
    coverImage: genImg('maison-noir'),
    gallery: [genImg('maison-1'), genImg('maison-2'), genImg('maison-3')],
    challenge: 'Reinvent digital presence for a premium premium premium.',
    solution: 'Immersive editorial experience powered by premium storytelling.',
    execution: 'Design system, CMS, e-commerce, launch campaign.',
    results: '+219% avg. session duration · +148% conversion rate.',
    status: 'published', publishDate: '2025-12-05', tags: ['Web', 'UX', 'CMS'],
  },
  {
    id: uid(), title: 'Sahara Wellness Launch', slug: 'sahara-wellness-launch',
    description: 'Go-to-market launch for a premium wellness brand.',
    client: 'Sahara Wellness', category: 'Launch Strategy',
    coverImage: genImg('sahara-wellness'),
    gallery: [genImg('sahara-1'), genImg('sahara-2')],
    challenge: 'Zero-to-one launch with zero organic presence.',
    solution: 'Omnichannel seed-and-scale strategy with premium creative.',
    execution: '6-week launch sprint across content, PR, and performance.',
    results: '$480K first-90-day revenue · 11,200 email subscribers.',
    status: 'published', publishDate: '2025-11-20', tags: ['Launch', 'Growth'],
  },
  {
    id: uid(), title: 'Helios Coffee Brand', slug: 'helios-coffee-brand',
    description: 'Full visual identity for a premium premium coffee brand.',
    client: 'Helios Roasters', category: 'Brand Identity',
    coverImage: genImg('helios-coffee'),
    gallery: [genImg('helios-1'), genImg('helios-2'), genImg('helios-3')],
    challenge: 'Commoditized category with premium premium positioning gap.',
    solution: 'Sun-inspired identity with premium editorial-grade packaging.',
    execution: 'Logo system, packaging, signage, digital rollout.',
    results: 'Sold-out first batch · Featured in premium design press.',
    status: 'published', publishDate: '2025-10-01', tags: ['Branding', 'Packaging'],
  },
  {
    id: uid(), title: 'Lumen SaaS Growth', slug: 'lumen-saas-growth',
    description: 'Product-led growth system for a premium B2B premium.',
    client: 'Lumen Analytics', category: 'Performance Marketing',
    coverImage: genImg('lumen-saas'),
    gallery: [genImg('lumen-1'), genImg('lumen-2')],
    challenge: 'Achieve premium growth velocity in premium premium vertical.',
    solution: 'Account-based marketing + content engine hybrid.',
    execution: 'Demand gen, SEO, product content, sales enablement.',
    results: '+264% SQL volume · 3.2× pipeline coverage.',
    status: 'published', publishDate: '2025-08-15', tags: ['SaaS', 'Growth', 'ABM'],
  },
];

const seedServices: Service[] = [
  { id: uid(), title: 'Brand Strategy & Identity', slug: 'brand-identity', description: 'Premium brand systems for premium brands seeking premium positioning.', icon: 'Sparkles', features: ['Brand positioning', 'Visual identity', 'Messaging architecture', 'Brand guidelines', 'Launch plan'], status: 'published' },
  { id: uid(), title: 'Performance Marketing', slug: 'performance-marketing', description: 'Full-funnel paid growth with premium creative and premium attribution.', icon: 'TrendingUp', features: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'YouTube Ads', 'Creative testing'], price: 'From $4,500/mo', status: 'published' },
  { id: uid(), title: 'Web Design & Development', slug: 'web-design', description: 'Premium conversion-driven websites with premium CMS infrastructure.', icon: 'Monitor', features: ['UX/UI design', 'Headless CMS', 'E-commerce', 'Conversion optimization', 'Performance'], status: 'published' },
  { id: uid(), title: 'Content & Social Media', slug: 'content-social', description: 'Editorial-grade content engines for premium brands.', icon: 'PenTool', features: ['Content strategy', 'Copywriting', 'Social management', 'Editorial calendar', 'Creator partnerships'], status: 'published' },
  { id: uid(), title: 'AI Marketing Studio', slug: 'ai-studio', description: 'In-house AI tools engineered for premium marketing teams.', icon: 'Bot', features: ['Caption generator', 'Ad copy engine', 'Creative briefs', 'Content pipeline', 'Image prompts'], status: 'published' },
  { id: uid(), title: 'Marketing Audit', slug: 'marketing-audit', description: 'Deep diagnosis of your entire premium growth stack.', icon: 'BarChart3', features: ['Brand audit', 'Offer audit', 'Messaging audit', 'UX audit', 'Action plan'], status: 'published' },
];

const seedCaseStudies: CaseStudy[] = [
  {
    id: uid(), title: 'Scaling a Premium DTC Brand to 8 Figures',
    client: 'Nebula Skincare', cover: genImg('case-nebula'),
    businessGoal: 'Reach $12M ARR while maintaining premium margins.',
    budget: '$85,000 / month performance + creative',
    strategy: 'Hybrid brand-performance flywheel with premium creative testing engine.',
    execution: '6 creative pods × weekly test cadence × full-funnel attribution.',
    results: '11× revenue in 11 months · 43% repeat purchase rate.',
    cpl: '$12.40', leadVolume: '48,200 / mo', roas: '4.8×',
    learnings: 'Premium brands scale faster when performance respects brand equity.',
    relatedServices: ['brand-identity', 'performance-marketing'],
  },
  {
    id: uid(), title: 'Zero-to-One SaaS Launch',
    client: 'Lumen Analytics', cover: genImg('case-lumen'),
    businessGoal: 'Product-market fit proof in a premium crowded vertical.',
    budget: '$60,000 total',
    strategy: 'Founder-led content + account-based outreach hybrid.',
    execution: '90-day sprint · 120 pieces of content · 600 ICP accounts.',
    results: '$1.4M pipeline · 6.2% demo-to-close.',
    cpl: '$98', leadVolume: '612 SQLs', roas: '7.1×',
    learnings: 'Founder distribution compounds faster than paid ads for B2B.',
    relatedServices: ['performance-marketing', 'content-social'],
  },
  {
    id: uid(), title: 'Luxury Retail Digital Transformation',
    client: 'Maison Noir', cover: genImg('case-maison'),
    businessGoal: 'Double online share of revenue in 18 months.',
    budget: '$450,000 · build + launch',
    strategy: 'Editorial storefront with premium conversion architecture.',
    execution: 'Design system · headless commerce · launch campaign.',
    results: '+219% online revenue · +148% conversion.',
    cpl: '$22', leadVolume: '12,400 / mo', roas: '5.6×',
    learnings: 'Luxury conversion is about pacing, not persuasion.',
    relatedServices: ['web-design', 'brand-identity'],
  },
];

const seedPosts: BlogPost[] = [
  { id: uid(), title: 'The AI Creative Flywheel: How Premium Brands Scale Content Without Losing Soul', slug: 'ai-creative-flywheel', excerpt: 'Why premium brands are building in-house AI creative systems instead of outsourcing premium creative.', content: 'Premium brands need premium systems. This article explores how a premium creative operating system produces premium output.', category: 'AI Marketing', tags: ['AI', 'Creative', 'Scaling'], featuredImage: genImg('blog-flywheel'), author: 'Youssef Studio', publishDate: '2026-02-12', status: 'published' },
  { id: uid(), title: 'The Offer Problem: Why 92% of Premium Brands Lose Premium Conversions', slug: 'offer-problem', excerpt: 'A deep look at the #1 growth bottleneck for premium premium brands.', content: 'Most premium brands have positioning, not an offer. This article walks through the offer architecture method.', category: 'Strategy', tags: ['Strategy', 'Offers', 'Conversion'], featuredImage: genImg('blog-offer'), author: 'Youssef Studio', publishDate: '2026-01-28', status: 'published' },
  { id: uid(), title: 'Creative Testing in 2026: What Actually Moves the Needle', slug: 'creative-testing-2026', excerpt: 'The creative testing frameworks used by premium performance teams.', content: 'Creative testing has evolved beyond hooks. This is the premium playbook being used in premium performance teams.', category: 'Performance', tags: ['Ads', 'Creative', 'Testing'], featuredImage: genImg('blog-creative'), author: 'Youssef Studio', publishDate: '2026-01-10', status: 'published' },
  { id: uid(), title: 'Brand Systems, Not Brand Guidelines', slug: 'brand-systems', excerpt: 'Why guidelines fail and premium systems scale premium brands.', content: 'A premium brand system is a living architecture. This article covers the six modules every premium brand needs.', category: 'Branding', tags: ['Branding', 'Systems'], featuredImage: genImg('blog-brand'), author: 'Youssef Studio', publishDate: '2025-12-20', status: 'published' },
];

const seedTestimonials: Testimonial[] = [
  { id: uid(), name: 'Amina Haddad', role: 'CMO', company: 'Nebula Co.', avatar: genImg('t-amina', 200, 200), message: 'A premium operating system that changed how we think about premium marketing. Transformed our premium team.', rating: 5 },
  { id: uid(), name: 'Marcus Weber', role: 'Founder & CEO', company: 'Lumen Analytics', avatar: genImg('t-marcus', 200, 200), message: 'Our pipeline 6×d in two quarters. The premium playbooks are real, the premium results are real.', rating: 5 },
  { id: uid(), name: 'Sophie Laurent', role: 'Head of Growth', company: 'Maison Noir', avatar: genImg('t-sophie', 200, 200), message: 'Finally a premium partner who speaks premium brand and premium performance in the same sentence.', rating: 5 },
  { id: uid(), name: 'Omar El-Sayed', role: 'Managing Partner', company: 'Helios Roasters', avatar: genImg('t-omar', 200, 200), message: 'Creative, strategic, and technically solid. A rare premium combination for premium founders.', rating: 5 },
];

const seedMedia: MediaItem[] = [
  { id: uid(), name: 'hero-cover.jpg', url: genImg('hero-cover', 1920, 1080), type: 'image', size: 845000, altText: 'Studio hero cover', createdAt: '2026-02-12' },
  { id: uid(), name: 'office-shot.jpg', url: genImg('office-studio', 1200, 800), type: 'image', size: 612000, altText: 'Creative studio office', createdAt: '2026-01-29' },
  { id: uid(), name: 'team-working.jpg', url: genImg('team-creative', 1200, 800), type: 'image', size: 742000, altText: 'Creative team working', createdAt: '2026-01-20' },
];

const seedContacts: ContactMessage[] = [
  { id: uid(), name: 'Sara Mahmoud', email: 'sara@company.com', phone: '+20 100 111 2222', subject: 'Rebrand project inquiry', message: 'We want to rebrand our premium product line. Would love to chat.', status: 'new', createdAt: now(), source: 'contact-form', score: 72 },
  { id: uid(), name: 'Tobias Klein', email: 'tobias@lumen.co', phone: '', subject: 'Performance audit request', message: 'Interested in the premium audit package.', status: 'read', createdAt: '2026-02-11T09:15:00Z', source: 'audit-form', score: 88 },
  { id: uid(), name: 'Leïla Benali', email: 'leila@maison.io', phone: '', subject: 'Web project', message: 'Looking for a premium partner for our new site.', status: 'new', createdAt: '2026-02-10T14:22:00Z', source: 'contact-form', score: 65 },
];

const seedLeads: Lead[] = [
  { id: uid(), name: 'Sara Mahmoud', email: 'sara@company.com', phone: '+20 100 111 2222', source: 'contact-form', status: 'hot', score: 82, createdAt: now() },
  { id: uid(), name: 'Tobias Klein', email: 'tobias@lumen.co', source: 'audit-form', status: 'hot', score: 88, createdAt: '2026-02-11T09:15:00Z' },
  { id: uid(), name: 'Lead #4821', email: 'anon4821@trial.co', source: 'ai-studio', status: 'warm', score: 54, createdAt: '2026-02-10T08:00:00Z' },
  { id: uid(), name: 'Lead #4820', email: 'anon4820@trial.co', source: 'home-cta', status: 'cold', score: 22, createdAt: '2026-02-09T11:00:00Z' },
];

const seedAudits: AuditRequest[] = [
  {
    id: uid(), website: 'https://example.com', facebook: 'example', instagram: 'example', business: 'Premium skincare DTC', contactEmail: 'owner@example.com',
    scores: { branding: 72, offer: 58, messaging: 65, cta: 48, ux: 70, content: 60, engagement: 55, trust: 75, conversion: 52 },
    strengths: ['Strong visual identity', 'Good product photography', 'Fast checkout flow'],
    weaknesses: ['No clear premium offer', 'Weak CTA hierarchy', 'No urgency triggers'],
    opportunities: ['Launch premium subscription bundle', 'Add urgency on PDPs', 'Build loyalty loop'],
    quickWins: ['Add sticky CTA bar', 'Test one post-click offer', 'Rewrite hero hook'],
    actionPlan: ['Week 1: Offer architecture', 'Week 2: Hero rewrite + CTA system', 'Week 3: Loyalty loop + urgency', 'Week 4: Attribution stack + launch'],
    overallScore: 62, status: 'analyzed', createdAt: '2026-02-11',
  },
];

const seedNotifications: Notification[] = [
  { id: uid(), title: 'New lead', message: 'Sara Mahmoud submitted a premium project inquiry.', type: 'success', read: false, createdAt: now() },
  { id: uid(), title: 'Audit requested', message: 'A new marketing audit is ready for review.', type: 'info', read: false, createdAt: '2026-02-11' },
  { id: uid(), title: 'AI Studio usage', message: '148 AI generations generated this week.', type: 'info', read: true, createdAt: '2026-02-10' },
];

// ============ STORAGE HELPERS ============
function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) as T : fallback;
  } catch { return fallback; }
}
function save(key: string, value: any) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

// ============ CONTEXT ============
interface StoreState {
  brand: BrandSettings; design: DesignSettings; ai: AISettings; site: SiteSettings;
  projects: Project[]; services: Service[]; caseStudies: CaseStudy[]; posts: BlogPost[];
  testimonials: Testimonial[]; media: MediaItem[]; contacts: ContactMessage[]; leads: Lead[];
  audits: AuditRequest[]; events: AnalyticsEvent[]; notifications: Notification[];
}

interface StoreContext extends StoreState {
  // actions
  setBrand: (b: BrandSettings) => void;
  setDesign: (d: DesignSettings) => void;
  setAI: (a: AISettings) => void;
  setSite: (s: SiteSettings) => void;
  addProject: (p: Omit<Project, 'id'>) => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addService: (s: Omit<Service, 'id'>) => void;
  updateService: (id: string, s: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addPost: (p: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, p: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  addMedia: (m: Omit<MediaItem, 'id' | 'createdAt'>) => void;
  deleteMedia: (id: string) => void;
  addContact: (c: Omit<ContactMessage, 'id' | 'createdAt' | 'status' | 'score'> & { score?: number; status?: ContactMessage['status'] }) => void;
  updateContact: (id: string, patch: Partial<ContactMessage>) => void;
  addLead: (l: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  addAudit: (a: Omit<AuditRequest, 'id' | 'createdAt' | 'status' | 'scores' | 'overallScore' | 'strengths' | 'weaknesses' | 'opportunities' | 'quickWins' | 'actionPlan'>) => AuditRequest;
  updateAudit: (id: string, patch: Partial<AuditRequest>) => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationsRead: () => void;
  track: (type: string, page: string, metadata?: any) => void;
  exportAll: () => string;
  resetAll: () => void;
}

const StoreCtx = createContext<StoreContext | null>(null);

const K = 'ycsos.v1';
const defaultState: StoreState = {
  brand: defaultBrand, design: defaultDesign, ai: defaultAI, site: defaultSite,
  projects: seedProjects, services: seedServices, caseStudies: seedCaseStudies, posts: seedPosts,
  testimonials: seedTestimonials, media: seedMedia, contacts: seedContacts, leads: seedLeads,
  audits: seedAudits, events: [], notifications: seedNotifications,
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(() => load(K, defaultState));

  useEffect(() => { save(K, state); }, [state]);

  // apply CSS vars
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--brand-primary', state.brand.primaryColor);
    r.style.setProperty('--brand-accent', state.brand.accentColor);
    r.style.setProperty('--brand-secondary', state.brand.secondaryColor);
    r.style.setProperty('--brand-bg', state.brand.bgColor);
    r.style.setProperty('--brand-text', state.brand.textColor);
    document.title = `${state.brand.logoText} — ${state.site.siteName}`;
  }, [state.brand, state.site]);

  const patch = (updater: (s: StoreState) => StoreState) => setState(prev => updater(prev));

  const addProject = useCallback((p: Omit<Project, 'id'>) => patch(s => ({ ...s, projects: [{ ...p, id: uid() }, ...s.projects] })), []);
  const updateProject = useCallback((id: string, p: Partial<Project>) => patch(s => ({ ...s, projects: s.projects.map(x => x.id === id ? { ...x, ...p } : x) })), []);
  const deleteProject = useCallback((id: string) => patch(s => ({ ...s, projects: s.projects.filter(x => x.id !== id) })), []);

  const addService = useCallback((s: Omit<Service, 'id'>) => patch(st => ({ ...st, services: [{ ...s, id: uid() }, ...st.services] })), []);
  const updateService = useCallback((id: string, p: Partial<Service>) => patch(s => ({ ...s, services: s.services.map(x => x.id === id ? { ...x, ...p } : x) })), []);
  const deleteService = useCallback((id: string) => patch(s => ({ ...s, services: s.services.filter(x => x.id !== id) })), []);

  const addPost = useCallback((p: Omit<BlogPost, 'id'>) => patch(s => ({ ...s, posts: [{ ...p, id: uid() }, ...s.posts] })), []);
  const updatePost = useCallback((id: string, p: Partial<BlogPost>) => patch(s => ({ ...s, posts: s.posts.map(x => x.id === id ? { ...x, ...p } : x) })), []);
  const deletePost = useCallback((id: string) => patch(s => ({ ...s, posts: s.posts.filter(x => x.id !== id) })), []);

  const addMedia = useCallback((m: Omit<MediaItem, 'id' | 'createdAt'>) => patch(s => ({ ...s, media: [{ ...m, id: uid(), createdAt: now() }, ...s.media] })), []);
  const deleteMedia = useCallback((id: string) => patch(s => ({ ...s, media: s.media.filter(x => x.id !== id) })), []);

  const addContact = useCallback((c: any) => patch(s => ({
    ...s, contacts: [{ ...c, id: uid(), createdAt: now(), status: c.status || 'new', score: c.score ?? Math.floor(40 + Math.random() * 50) }, ...s.contacts],
    leads: [{ id: uid(), name: c.name, email: c.email, phone: c.phone, source: c.source || 'contact-form', status: 'warm', score: 50 + Math.floor(Math.random() * 40), createdAt: now() }, ...s.leads],
    notifications: [{ id: uid(), title: 'New project inquiry', message: `${c.name} · ${c.subject}`, type: 'success', read: false, createdAt: now() }, ...s.notifications],
  })), []);
  const updateContact = useCallback((id: string, patch2: Partial<ContactMessage>) => patch(s => ({ ...s, contacts: s.contacts.map(x => x.id === id ? { ...x, ...patch2 } : x) })), []);

  const addLead = useCallback((l: Omit<Lead, 'id' | 'createdAt'>) => patch(s => ({ ...s, leads: [{ ...l, id: uid(), createdAt: now() }, ...s.leads] })), []);
  const updateLead = useCallback((id: string, patch2: Partial<Lead>) => patch(s => ({ ...s, leads: s.leads.map(x => x.id === id ? { ...x, ...patch2 } : x) })), []);

  const addAudit = useCallback((a: any): AuditRequest => {
    const scores = {
      branding: 50 + Math.floor(Math.random() * 45),
      offer: 40 + Math.floor(Math.random() * 50),
      messaging: 45 + Math.floor(Math.random() * 45),
      cta: 35 + Math.floor(Math.random() * 50),
      ux: 55 + Math.floor(Math.random() * 35),
      content: 40 + Math.floor(Math.random() * 50),
      engagement: 45 + Math.floor(Math.random() * 40),
      trust: 55 + Math.floor(Math.random() * 40),
      conversion: 40 + Math.floor(Math.random() * 45),
    };
    const overall = Math.round(Object.values(scores).reduce((b, c) => b + c, 0) / Object.values(scores).length);
    const req: AuditRequest = {
      ...a, id: uid(), createdAt: now(), status: 'analyzed', scores, overallScore: overall,
      strengths: [
        'Strong core positioning',
        'Clean product imagery',
        'Mobile-friendly layout',
      ],
      weaknesses: [
        'No clear premium offer architecture',
        'Weak CTA hierarchy across pages',
        'Missing urgency and scarcity triggers',
        'Light trust-building content',
      ],
      opportunities: [
        'Launch a premium subscription tier',
        'Add account-based content engine',
        'Install a premium analytics + attribution stack',
      ],
      quickWins: [
        'Rewrite hero hook with a premium offer',
        'Add sticky conversion bar with clear CTA',
        'Add testimonials with context to key pages',
        'Simplify pricing comparison',
      ],
      actionPlan: [
        'Week 1 — Offer architecture & positioning doc',
        'Week 2 — Hero rewrite, CTA system, homepage rebuild',
        'Week 3 — Trust content, urgency, lead magnets',
        'Week 4 — Paid pilot + attribution stack + iteration rhythm',
      ],
    };
    patch(s => ({
      ...s, audits: [req, ...s.audits],
      leads: [{ id: uid(), name: a.contactEmail, email: a.contactEmail, source: 'audit', status: overall > 55 ? 'hot' : 'warm', score: overall, createdAt: now() }, ...s.leads],
      notifications: [{ id: uid(), title: 'New audit ready', message: `${a.website || a.business} — score ${overall}/100`, type: 'info', read: false, createdAt: now() }, ...s.notifications],
    }));
    return req;
  }, []);
  const updateAudit = useCallback((id: string, p: Partial<AuditRequest>) => patch(s => ({ ...s, audits: s.audits.map(x => x.id === id ? { ...x, ...p } : x) })), []);

  const addNotification = useCallback((n: Omit<Notification, 'id' | 'createdAt' | 'read'>) =>
    patch(s => ({ ...s, notifications: [{ ...n, id: uid(), createdAt: now(), read: false }, ...s.notifications] })), []);
  const markNotificationsRead = useCallback(() => patch(s => ({ ...s, notifications: s.notifications.map(n => ({ ...n, read: true })) })), []);

  const track = useCallback((type: string, page: string, metadata?: any) => patch(s => ({ ...s, events: [{ id: uid(), type, page, timestamp: now(), sessionId: 'session-' + (sessionStorage.getItem('sid') || (() => { const v = uid(); sessionStorage.setItem('sid', v); return v; })()), metadata }, ...s.events.slice(0, 499)] })), []);

  const exportAll = () => JSON.stringify(state, null, 2);
  const resetAll = () => { if (confirm('Reset all data to defaults?')) setState(defaultState); };

  return (
    <StoreCtx.Provider value={{
      ...state,
      setBrand: (b) => patch(s => ({ ...s, brand: b })),
      setDesign: (d) => patch(s => ({ ...s, design: d })),
      setAI: (a) => patch(s => ({ ...s, ai: a })),
      setSite: (s) => patch(st => ({ ...st, site: s })),
      addProject, updateProject, deleteProject,
      addService, updateService, deleteService,
      addPost, updatePost, deletePost,
      addMedia, deleteMedia,
      addContact, updateContact,
      addLead, updateLead,
      addAudit, updateAudit,
      addNotification, markNotificationsRead,
      track, exportAll, resetAll,
    }}>{children}</StoreCtx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
