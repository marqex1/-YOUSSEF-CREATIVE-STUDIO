import { useState } from 'react';
import { NavLink, Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { useAuth } from '../store/AuthContext';
import { Container, Card, Badge, Button, Input, Textarea, Select, Modal, ProgressBar, AnimatedNumber } from '../components/ui/DesignSystem';
import {
  LayoutDashboard, FolderKanban, Wrench, NotebookPen, Library, MessageSquare, Users, ClipboardCheck,
  Palette, Sparkles, BarChart3, Bell, LogOut, Plus, Edit2, Trash2, Search,
  Eye, Upload, CheckCircle2, Download, RefreshCw, Mail, Layers
} from 'lucide-react';
import type { Project, Service, BlogPost } from '../types';

const SIDEBAR: { to: string; label: string; icon: any; badge?: () => number | string }[] = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/portfolio', label: 'Portfolio', icon: FolderKanban },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/blog', label: 'Blog', icon: NotebookPen },
  { to: '/admin/media', label: 'Media Library', icon: Library },
  { to: '/admin/leads', label: 'Leads', icon: Users, badge: () => 3 },
  { to: '/admin/contacts', label: 'Inbox', icon: MessageSquare, badge: () => 2 },
  { to: '/admin/audits', label: 'Audit Requests', icon: ClipboardCheck },
  { to: '/admin/ai', label: 'AI Settings', icon: Sparkles },
  { to: '/admin/brand', label: 'Brand Settings', icon: Palette },
  { to: '/admin/design', label: 'Design System', icon: Layers },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
];

function AdminLayout() {
  const { brand, notifications, markNotificationsRead } = useStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  if (!user) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-neutral-50" style={{ backgroundColor: '#F7F4EF' }}>
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/90 backdrop-blur">
        <Container className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg border border-neutral-200" onClick={() => setOpen(!open)}>☰</button>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-black" style={{ background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})` }}>Y</div>
              <div>
                <div className="text-sm font-bold">{brand.logoText}</div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500">Admin · OS</div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Badge color="secondary">{notifications.filter(n => !n.read).length} new</Badge>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: brand.primaryColor, color: '#fff' }}>{user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
              <div className="leading-tight"><div className="font-semibold text-sm">{user.name}</div><div className="text-[10px] uppercase tracking-widest text-neutral-500">{user.role}</div></div>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900" title="Logout"><LogOut className="h-4 w-4" /></button>
            <Link to="/"><button className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900" title="View site"><Eye className="h-4 w-4" /></button></Link>
          </div>
        </Container>
      </header>

      <Container className="py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className={`${open ? 'block' : 'hidden'} lg:block lg:col-span-3`}>
            <nav className="sticky top-24 space-y-1">
              {SIDEBAR.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/admin'} onClick={() => setOpen(false)}
                  className={({ isActive }) => `flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-white'}`}
                  style={({ isActive }: any) => isActive ? { background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})`, color: '#fff' } : undefined}
                >
                  <span className="flex items-center gap-3"><item.icon className="h-4 w-4" />{item.label}</span>
                  {item.badge && <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">{item.badge()}</span>}
                </NavLink>
              ))}
            </nav>
          </aside>
          <main className="lg:col-span-9" onClick={() => markNotificationsRead()}>
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="portfolio" element={<AdminPortfolio />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="audits" element={<AdminAudits />} />
              <Route path="ai" element={<AdminAISettings />} />
              <Route path="brand" element={<AdminBrandSettings />} />
              <Route path="design" element={<AdminDesignSettings />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="notifications" element={<AdminNotifications />} />
            </Routes>
          </main>
        </div>
      </Container>
    </div>
  );
}

function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@youssef.studio');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { brand } = useStore();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError('Invalid credentials.');
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: brand.secondaryColor }}>
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-white font-black" style={{ background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})` }}>Y</div>
          <div>
            <div className="text-lg font-bold">{brand.logoText}</div>
            <div className="text-[11px] uppercase tracking-widest text-neutral-500">Admin Console</div>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button block type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
          <div className="text-xs text-neutral-500 text-center">
            Default: admin@youssef.studio / admin123
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function AdminPage() { return <AdminLayout />; }

// ============ SUB-VIEWS ============

function PageHeaderAdmin({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">{eyebrow}</div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mt-1">{title}</h1>
        {description && <p className="mt-1 text-sm text-neutral-600">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

function AdminDashboard() {
  const { projects, services, posts, leads, contacts, audits, notifications, events, media, exportAll, resetAll, brand, site } = useStore();
  const stats = [
    { label: 'Projects', value: projects.length, icon: FolderKanban },
    { label: 'Services', value: services.length, icon: Wrench },
    { label: 'Posts', value: posts.length, icon: NotebookPen },
    { label: 'Media items', value: media.length, icon: Library },
    { label: 'Leads', value: leads.length, icon: Users },
    { label: 'Messages', value: contacts.length, icon: MessageSquare },
    { label: 'Audits', value: audits.length, icon: ClipboardCheck },
    { label: 'Events tracked', value: events.length, icon: BarChart3 },
  ];
  return (
    <>
      <PageHeaderAdmin eyebrow="Dashboard" title={`Welcome back${site.siteName ? ` · ${site.siteName.split(' ')[0]}` : ''}`} description="Everything editable. Everything dynamic. One premium operating system." actions={<><button onClick={() => { navigator.clipboard.writeText(exportAll()); alert('Data exported to clipboard.'); }} className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-semibold border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"><Download className="h-4 w-4 mr-1.5" />Export</button><button onClick={resetAll} className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-semibold border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"><RefreshCw className="h-4 w-4 mr-1.5" />Reset</button></>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}><s.icon className="h-4 w-4" /></div><div className="text-xs font-bold uppercase tracking-wider text-neutral-500">{s.label}</div></div>
            <div className="mt-3 text-3xl font-bold text-neutral-900"><AnimatedNumber value={s.value} /></div>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-6 lg:col-span-2">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Recent activity</div>
          <div className="divide-y divide-neutral-100">
            {notifications.slice(0, 6).map(n => (
              <div key={n.id} className="py-3 flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}><Bell className="h-4 w-4" /></div>
                <div className="flex-1"><div className="font-semibold text-sm text-neutral-900">{n.title}</div><div className="text-xs text-neutral-500">{n.message}</div></div>
                <div className="text-xs text-neutral-400">{new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Lead quality</div>
          <div className="space-y-4">
            <ProgressBar value={Math.round(leads.filter(l => l.status === 'hot').length / Math.max(1, leads.length) * 100)} label="Hot leads" />
            <ProgressBar value={Math.round(leads.filter(l => l.status === 'warm').length / Math.max(1, leads.length) * 100)} label="Warm leads" />
            <ProgressBar value={Math.round(leads.filter(l => l.status === 'cold').length / Math.max(1, leads.length) * 100)} label="Cold leads" />
          </div>
          <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: brand.secondaryColor }}>
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Quick insight</div>
            <div className="mt-2 text-sm font-bold text-neutral-900">Focus on hot leads.</div>
            <div className="mt-1 text-xs text-neutral-700">They convert at 2.3× the rate of warm leads.</div>
          </div>
        </Card>
      </div>
    </>
  );
}

// ---------- PORTFOLIO MANAGER ----------
function AdminPortfolio() {
  const { projects, addProject, updateProject, deleteProject } = useStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>({
    title: '', slug: '', description: '', client: '', category: 'Brand Identity', coverImage: 'https://picsum.photos/seed/new/1200/800',
    gallery: [], video: '', challenge: '', solution: '', execution: '', results: '', status: 'published', publishDate: new Date().toISOString().slice(0, 10), tags: [],
  });
  const openNew = () => { setEditing(null); setForm({ title: '', slug: '', description: '', client: '', category: 'Brand Identity', coverImage: 'https://picsum.photos/seed/new/1200/800', gallery: [], video: '', challenge: '', solution: '', execution: '', results: '', status: 'published', publishDate: new Date().toISOString().slice(0, 10), tags: [] }); setOpen(true); };
  const openEdit = (p: Project) => { setEditing(p); setForm({ ...p, tags: [...p.tags], gallery: [...p.gallery] }); setOpen(true); };
  const save = () => {
    if (!form.title) return;
    const slug = form.slug || form.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
    const f = { ...form, slug } as any;
    if (editing) updateProject(editing.id, f);
    else addProject(f);
    setOpen(false);
  };
  const del = (id: string) => { if (confirm('Delete this project?')) deleteProject(id); };
  return (
    <>
      <PageHeaderAdmin eyebrow="Portfolio" title={`${projects.length} projects`} description="Full CRUD. Every project appears instantly on the public portfolio." actions={<Button onClick={openNew}><Plus className="h-4 w-4 mr-1.5" />New project</Button>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(p => (
          <Card key={p.id} className="overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden"><img src={p.coverImage} alt={p.title} className="h-full w-full object-cover" /></div>
            <div className="p-5">
              <div className="flex items-center gap-2"><Badge color="secondary">{p.category}</Badge><Badge color={p.status === 'published' ? 'success' : 'warning'}>{p.status}</Badge></div>
              <h3 className="mt-2 font-bold text-neutral-900">{p.title}</h3>
              <p className="text-xs text-neutral-500 mt-1">/{p.slug}</p>
              <div className="mt-4 flex gap-2"><button onClick={() => openEdit(p)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-neutral-700 hover:bg-neutral-50"><Edit2 className="h-3.5 w-3.5" />Edit</button><button onClick={() => del(p.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" />Delete</button></div>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit project' : 'New project'} size="lg">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Slug" placeholder="auto-generated" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
          <Input label="Client" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
          <Select label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} options={[{ value: 'Brand Identity', label: 'Brand Identity' }, { value: 'Performance Marketing', label: 'Performance Marketing' }, { value: 'Web Design', label: 'Web Design' }, { value: 'Launch Strategy', label: 'Launch Strategy' }, { value: 'Content Strategy', label: 'Content Strategy' }]} />
          <div className="md:col-span-2"><Input label="Cover image URL" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} /></div>
          <div className="md:col-span-2"><Textarea label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <Textarea label="Challenge" value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} />
          <Textarea label="Solution" value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} />
          <Textarea label="Execution" value={form.execution} onChange={e => setForm({ ...form, execution: e.target.value })} />
          <Textarea label="Results" value={form.results} onChange={e => setForm({ ...form, results: e.target.value })} />
          <Select label="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} options={[{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }]} />
          <Input label="Publish date" type="date" value={form.publishDate} onChange={e => setForm({ ...form, publishDate: e.target.value })} />
        </div>
        <div className="mt-5 flex justify-end gap-3"><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save project</Button></div>
      </Modal>
    </>
  );
}

// ---------- SERVICES MANAGER ----------
function AdminServices() {
  const { services, addService, updateService, deleteService } = useStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({ title: '', slug: '', description: '', icon: 'Sparkles', features: [], price: '', status: 'published' });
  const openNew = () => { setEditing(null); setForm({ title: '', slug: '', description: '', icon: 'Sparkles', features: [], price: '', status: 'published' }); setOpen(true); };
  const openEdit = (s: Service) => { setEditing(s); setForm({ ...s, features: [...s.features] }); setOpen(true); };
  const save = () => {
    if (!form.title) return;
    const slug = form.slug || form.title?.toLowerCase().replace(/\s+/g, '-') || '';
    const f = { ...form, slug } as any;
    if (editing) updateService(editing.id, f); else addService(f);
    setOpen(false);
  };
  return (
    <>
      <PageHeaderAdmin eyebrow="Services" title={`${services.length} services`} actions={<Button onClick={openNew}><Plus className="h-4 w-4 mr-1.5" />New service</Button>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(s => (
          <Card key={s.id} className="p-6">
            <div className="flex items-center justify-between"><Badge color={s.status === 'published' ? 'success' : 'warning'}>{s.status}</Badge><Badge color="secondary">{s.icon}</Badge></div>
            <h3 className="mt-3 font-bold text-neutral-900">{s.title}</h3>
            <p className="text-xs text-neutral-500 mt-1">/{s.slug}</p>
            <p className="mt-3 text-sm text-neutral-600">{s.description}</p>
            {s.price && <p className="mt-2 text-sm font-bold text-neutral-900">{s.price}</p>}
            <div className="mt-4 flex gap-2"><button onClick={() => openEdit(s)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-neutral-700 hover:bg-neutral-50"><Edit2 className="h-3.5 w-3.5" />Edit</button><button onClick={() => { if (confirm('Delete?')) deleteService(s.id); }} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-neutral-200 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" />Delete</button></div>
          </Card>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit service' : 'New service'} size="lg">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Price hint" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <Select label="Icon" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} options={['Sparkles', 'BarChart3', 'PenTool', 'Megaphone', 'Zap', 'Target', 'Wrench'].map(v => ({ value: v, label: v }))} />
          <Select label="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} options={[{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }]} />
          <div className="md:col-span-2"><Textarea label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div className="md:col-span-2">
            <label className="block"><span className="mb-1.5 block text-sm font-medium text-neutral-700">Features (one per line)</span>
              <textarea className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm min-h-[120px]" value={(form.features || []).join('\n')} onChange={e => setForm({ ...form, features: e.target.value.split('\n').filter(Boolean) })} /></label>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3"><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save service</Button></div>
      </Modal>
    </>
  );
}

// ---------- BLOG MANAGER ----------
function AdminBlog() {
  const { posts, addPost, updatePost, deletePost } = useStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({ title: '', slug: '', excerpt: '', content: '', category: 'AI Marketing', tags: [], featuredImage: 'https://picsum.photos/seed/post/1200/800', author: 'Youssef Studio', publishDate: new Date().toISOString().slice(0, 10), status: 'published' });
  const openNew = () => { setEditing(null); setForm({ title: '', slug: '', excerpt: '', content: '', category: 'AI Marketing', tags: [], featuredImage: 'https://picsum.photos/seed/post/1200/800', author: 'Youssef Studio', publishDate: new Date().toISOString().slice(0, 10), status: 'published' }); setOpen(true); };
  const openEdit = (p: BlogPost) => { setEditing(p); setForm({ ...p, tags: [...p.tags] }); setOpen(true); };
  const save = () => {
    if (!form.title) return;
    const slug = form.slug || form.title?.toLowerCase().replace(/\s+/g, '-') || '';
    const f = { ...form, slug } as any;
    if (editing) updatePost(editing.id, f); else addPost(f);
    setOpen(false);
  };
  return (
    <>
      <PageHeaderAdmin eyebrow="Blog" title={`${posts.length} posts`} actions={<Button onClick={openNew}><Plus className="h-4 w-4 mr-1.5" />New post</Button>} />
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs font-bold uppercase tracking-widest text-neutral-500">
            <tr><th className="p-4">Title</th><th className="p-4 hidden md:table-cell">Category</th><th className="p-4 hidden lg:table-cell">Status</th><th className="p-4 hidden md:table-cell">Date</th><th className="p-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {posts.map(p => (
              <tr key={p.id}>
                <td className="p-4"><div className="font-semibold text-neutral-900">{p.title}</div><div className="text-xs text-neutral-500">/{p.slug}</div></td>
                <td className="p-4 hidden md:table-cell"><Badge color="secondary">{p.category}</Badge></td>
                <td className="p-4 hidden lg:table-cell"><Badge color={p.status === 'published' ? 'success' : 'warning'}>{p.status}</Badge></td>
                <td className="p-4 hidden md:table-cell text-neutral-500 text-xs">{p.publishDate}</td>
                <td className="p-4 text-right"><button onClick={() => openEdit(p)} className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 mr-3">Edit</button><button onClick={() => { if (confirm('Delete?')) deletePost(p.id); }} className="text-sm font-semibold text-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit post' : 'New post'} size="lg">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <Input label="Featured image URL" value={form.featuredImage} onChange={e => setForm({ ...form, featuredImage: e.target.value })} />
          <Select label="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} options={[{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }]} />
          <div className="md:col-span-2"><Textarea label="Excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
          <div className="md:col-span-2"><Textarea label="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
        </div>
        <div className="mt-5 flex justify-end gap-3"><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save}>Save post</Button></div>
      </Modal>
    </>
  );
}

// ---------- MEDIA LIBRARY ----------
function AdminMedia() {
  const { media, addMedia, deleteMedia, brand } = useStore();
  const [search, setSearch] = useState('');
  const onUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(f => {
      const reader = new FileReader();
      reader.onload = () => {
        const type: any = f.type.startsWith('image/') ? 'image' : f.type === 'application/pdf' ? 'pdf' : 'document';
        addMedia({ name: f.name, url: reader.result as string, type, size: f.size, altText: f.name });
      };
      reader.readAsDataURL(f);
    });
  };
  const items = media.filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.altText.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <PageHeaderAdmin eyebrow="Media Library" title={`${media.length} items`} description="Upload from device. Reuse everywhere. All media stored in-browser Supabase-compatible store." actions={<><label className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-bold text-white cursor-pointer" style={{ backgroundColor: brand.primaryColor }}><Upload className="h-4 w-4 mr-1.5" />Upload<input type="file" multiple className="hidden" onChange={e => onUpload(e.target.files)} /></label></>} />
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" /><Input placeholder="Search media…" value={search} onChange={e => setSearch(e.target.value)} className="pl-11" /></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map(m => (
          <Card key={m.id} className="overflow-hidden group relative">
            <div className="aspect-square overflow-hidden bg-neutral-100">
              {m.type === 'image' ? <img src={m.url} alt={m.altText} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-3xl" style={{ color: brand.primaryColor }}>{m.type === 'pdf' ? '📄' : '📄'}</div>}
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold text-neutral-900 truncate">{m.name}</div>
              <div className="text-[10px] text-neutral-500 uppercase">{m.type} · {(m.size / 1024).toFixed(0)} KB</div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
              <button onClick={() => navigator.clipboard.writeText(m.url)} title="Copy URL" className="px-2 py-1 rounded-lg bg-white shadow text-xs font-semibold">Copy URL</button>
              <button onClick={() => { if (confirm('Delete?')) deleteMedia(m.id); }} title="Delete" className="px-2 py-1 rounded-lg bg-white shadow text-xs font-semibold text-red-600">🗑</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

// ---------- LEADS ----------
function AdminLeads() {
  const { leads, updateLead } = useStore();
  return (
    <>
      <PageHeaderAdmin eyebrow="Leads" title={`${leads.length} leads`} />
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs font-bold uppercase tracking-widest text-neutral-500"><tr><th className="p-4">Name</th><th className="p-4 hidden md:table-cell">Email</th><th className="p-4 hidden lg:table-cell">Source</th><th className="p-4">Score</th><th className="p-4">Status</th><th className="p-4 hidden md:table-cell">Date</th></tr></thead>
          <tbody className="divide-y divide-neutral-100">
            {leads.map(l => (
              <tr key={l.id}>
                <td className="p-4"><div className="font-semibold">{l.name}</div></td>
                <td className="p-4 hidden md:table-cell text-neutral-600 text-xs">{l.email}</td>
                <td className="p-4 hidden lg:table-cell"><Badge color="secondary">{l.source}</Badge></td>
                <td className="p-4 font-bold">{l.score}</td>
                <td className="p-4">
                  <select value={l.status} onChange={e => updateLead(l.id, { status: e.target.value as any })} className="px-2 py-1 text-xs rounded-xl border border-neutral-200 bg-white font-semibold">
                    <option value="cold">Cold</option><option value="warm">Warm</option><option value="hot">Hot</option><option value="converted">Converted</option>
                  </select>
                </td>
                <td className="p-4 hidden md:table-cell text-neutral-500 text-xs">{new Date(l.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

// ---------- CONTACTS / INBOX ----------
function AdminContacts() {
  const { contacts, updateContact } = useStore();
  const [active, setActive] = useState<string | null>(contacts[0]?.id || null);
  const c = contacts.find(x => x.id === active);
  return (
    <>
      <PageHeaderAdmin eyebrow="Inbox" title={`${contacts.length} messages`} />
      <div className="grid lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-5 overflow-hidden">
          <div className="divide-y divide-neutral-100">
            {contacts.map(msg => (
              <button key={msg.id} onClick={() => setActive(msg.id)} className={`w-full text-left p-4 ${active === msg.id ? 'bg-neutral-50' : 'hover:bg-neutral-50'}`}>
                <div className="flex items-center justify-between"><div className="font-semibold text-sm">{msg.name}</div><Badge color={msg.status === 'new' ? 'primary' : 'success'}>{msg.status}</Badge></div>
                <div className="text-xs text-neutral-500">{msg.subject}</div>
                <div className="text-xs text-neutral-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
              </button>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-7 p-7">
          {c ? (
            <>
              <div className="flex items-center justify-between"><div><div className="font-bold text-xl">{c.subject}</div><div className="text-sm text-neutral-500">{c.name} · {c.email} · {c.phone}</div></div>
                <select value={c.status} onChange={e => updateContact(c.id, { status: e.target.value as any })} className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-semibold"><option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option><option value="archived">Archived</option></select>
              </div>
              <div className="mt-4 rounded-2xl p-6 bg-neutral-50 text-neutral-700 leading-relaxed text-sm whitespace-pre-line">{c.message}</div>
              <div className="mt-6 flex gap-2"><Button variant="outline"><Mail className="h-4 w-4 mr-1.5" />Reply</Button><Button onClick={() => updateContact(c.id, { status: 'read' })}><CheckCircle2 className="h-4 w-4 mr-1.5" />Mark as read</Button></div>
            </>
          ) : <div className="text-sm text-neutral-500 text-center py-12">Select a message to view.</div>}
        </Card>
      </div>
    </>
  );
}

// ---------- AUDITS ----------
function AdminAudits() {
  const { audits, updateAudit } = useStore();
  return (
    <>
      <PageHeaderAdmin eyebrow="Audit Requests" title={`${audits.length} audits`} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {audits.map(a => (
          <Card key={a.id} className="p-6">
            <div className="flex items-center justify-between"><Badge color="primary">Score {a.overallScore}</Badge>
              <select value={a.status} onChange={e => updateAudit(a.id, { status: e.target.value as any })} className="px-2 py-1 text-xs rounded-xl border border-neutral-200 bg-white font-semibold"><option value="pending">Pending</option><option value="analyzed">Analyzed</option><option value="delivered">Delivered</option></select>
            </div>
            <h3 className="mt-3 font-bold text-neutral-900">{a.website || a.business}</h3>
            <div className="text-xs text-neutral-500">{a.contactEmail}</div>
            <div className="mt-4 space-y-2"><ProgressBar value={a.scores.branding} label="Branding" /><ProgressBar value={a.scores.offer} label="Offer" /><ProgressBar value={a.scores.conversion} label="Conversion" /></div>
            <div className="text-xs text-neutral-500 mt-4">{new Date(a.createdAt).toLocaleString()}</div>
          </Card>
        ))}
      </div>
    </>
  );
}

// ---------- AI SETTINGS ----------
function AdminAISettings() {
  const { ai, setAI, brand } = useStore();
  const [form, setForm] = useState({ ...ai });
  return (
    <>
      <PageHeaderAdmin eyebrow="AI Settings" title="Provider, model, temperature, tokens." description="Control the entire AI layer from a single place. Zero code changes required." />
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6 md:col-span-2">
          <div className="grid md:grid-cols-2 gap-4">
            <Select label="AI Provider" value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value as any })} options={[{ value: 'openai', label: 'OpenAI' }, { value: 'gemini', label: 'Google Gemini' }, { value: 'claude', label: 'Anthropic Claude' }]} />
            <Input label="Model" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} hint="e.g., gpt-4o, claude-sonnet-4, gemini-2.0-flash" />
            <Input label="Temperature (0 - 1)" type="number" step="0.1" min="0" max="1" value={form.temperature.toString()} onChange={e => setForm({ ...form, temperature: parseFloat(e.target.value) || 0 })} />
            <Input label="Max Tokens" type="number" value={form.maxTokens.toString()} onChange={e => setForm({ ...form, maxTokens: parseInt(e.target.value) || 0 })} />
            <div className="md:col-span-2"><Input label="API Key" type="password" value={form.apiKey} onChange={e => setForm({ ...form, apiKey: e.target.value })} hint="Stored encrypted. Never sent to the public frontend. (In production this flows through Supabase Edge Functions + Row Level Security.)" /></div>
          </div>
          <div className="mt-5 flex justify-end"><Button onClick={() => setAI(form)}>Save AI settings</Button></div>
        </Card>
        <Card className="p-6" style={{ backgroundColor: brand.secondaryColor }}>
          <Badge color="primary">Live configuration</Badge>
          <div className="mt-4 text-sm space-y-2">
            <div><span className="text-neutral-500 font-semibold">Provider:</span> <span className="font-bold">{form.provider}</span></div>
            <div><span className="text-neutral-500 font-semibold">Model:</span> <span className="font-bold">{form.model}</span></div>
            <div><span className="text-neutral-500 font-semibold">Temperature:</span> <span className="font-bold">{form.temperature}</span></div>
            <div><span className="text-neutral-500 font-semibold">Max tokens:</span> <span className="font-bold">{form.maxTokens}</span></div>
          </div>
          <div className="mt-4 text-xs text-neutral-600">Changes apply instantly. Model used by AI Studio, Marketing Audit, and content pipeline.</div>
        </Card>
      </div>
    </>
  );
}

// ---------- BRAND SETTINGS ----------
function AdminBrandSettings() {
  const { brand, setBrand, site, setSite } = useStore();
  const [b, setB] = useState({ ...brand });
  const [s, setS] = useState({ ...site });
  return (
    <>
      <PageHeaderAdmin eyebrow="Brand Settings" title="Logo, colors, typography, meta." description="Every branding change updates the entire platform instantly. No hardcoded branding." />
      <div className="grid md:grid-cols-12 gap-5">
        <Card className="p-6 md:col-span-8">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Brand name (logo text)" value={b.logoText} onChange={e => setB({ ...b, logoText: e.target.value })} />
            <Input label="Tagline" value={b.tagline} onChange={e => setB({ ...b, tagline: e.target.value })} />
            <Select label="Logo display mode" value={b.logoMode} onChange={e => setB({ ...b, logoMode: e.target.value as any })} options={[{ value: 'logo+text', label: 'Logo + Text' }, { value: 'logo-only', label: 'Logo Only' }, { value: 'text-only', label: 'Text Only' }]} />
            <Input label="Logo URL" value={b.logoUrl} onChange={e => setB({ ...b, logoUrl: e.target.value })} />
          </div>
          <div className="mt-6 text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Brand colors</div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { k: 'primaryColor', label: 'Primary' }, { k: 'accentColor', label: 'Accent' }, { k: 'secondaryColor', label: 'Secondary' }, { k: 'bgColor', label: 'Background' }, { k: 'textColor', label: 'Text' },
            ].map((c: any) => (
              <div key={c.k}>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">{c.label}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={(b as any)[c.k]} onChange={e => setB({ ...b, [c.k]: e.target.value })} className="h-10 w-10 rounded-xl border border-neutral-200 bg-white" />
                  <Input value={(b as any)[c.k]} onChange={e => setB({ ...b, [c.k]: e.target.value })} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3"><Button onClick={() => setBrand(b)}>Save brand</Button></div>
        </Card>
        <Card className="p-6 md:col-span-4">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Live preview</div>
          <div className="rounded-2xl border border-neutral-100 p-5 text-center">
            <div className="inline-flex items-center gap-3 mx-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-white font-black" style={{ background: `linear-gradient(135deg, ${b.primaryColor}, ${b.accentColor})` }}>Y</div>
              <div className="leading-tight text-left"><div className="font-bold">{b.logoText}</div><div className="text-[10px] uppercase tracking-widest text-neutral-500">{b.tagline}</div></div>
            </div>
            <button className="mt-4 inline-flex items-center justify-center font-semibold text-sm rounded-2xl px-4 py-2 text-white" style={{ backgroundColor: b.primaryColor }}>Primary CTA</button>
            <button className="mt-2 ml-2 inline-flex items-center justify-center font-semibold text-sm rounded-2xl px-4 py-2 border" style={{ borderColor: b.primaryColor, color: b.primaryColor }}>Outline</button>
          </div>
        </Card>
      </div>

      <PageHeaderAdmin eyebrow="Site Settings" title="SEO, contact, social." />
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Site name" value={s.siteName} onChange={e => setS({ ...s, siteName: e.target.value })} />
          <Input label="Meta description" value={s.siteDescription} onChange={e => setS({ ...s, siteDescription: e.target.value })} />
          <Input label="Keywords" value={s.keywords} onChange={e => setS({ ...s, keywords: e.target.value })} />
          <Input label="Email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} />
          <Input label="Phone" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} />
          <Input label="Address" value={s.address} onChange={e => setS({ ...s, address: e.target.value })} />
          <Input label="Facebook URL" value={s.facebook} onChange={e => setS({ ...s, facebook: e.target.value })} />
          <Input label="Instagram URL" value={s.instagram} onChange={e => setS({ ...s, instagram: e.target.value })} />
          <Input label="LinkedIn URL" value={s.linkedin} onChange={e => setS({ ...s, linkedin: e.target.value })} />
          <Input label="YouTube URL" value={s.youtube} onChange={e => setS({ ...s, youtube: e.target.value })} />
        </div>
        <div className="mt-5 flex justify-end"><Button onClick={() => setSite(s)}>Save site settings</Button></div>
      </Card>
    </>
  );
}

// ---------- DESIGN SETTINGS ----------
function AdminDesignSettings() {
  const { design, setDesign } = useStore();
  const [d, setD] = useState({ ...design });
  return (
    <>
      <PageHeaderAdmin eyebrow="Design System" title="Border radius, shadows, buttons, density." description="Global design tokens. Change once, apply everywhere." />
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Select label="Border radius" value={d.borderRadius} onChange={e => setD({ ...d, borderRadius: e.target.value as any })} options={['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'].map(v => ({ value: v, label: v.toUpperCase() }))} />
            <Select label="Shadow" value={d.shadow} onChange={e => setD({ ...d, shadow: e.target.value as any })} options={['none', 'sm', 'md', 'lg', 'xl'].map(v => ({ value: v, label: v }))} />
            <Select label="Button style" value={d.buttonStyle} onChange={e => setD({ ...d, buttonStyle: e.target.value as any })} options={['solid', 'outline', 'soft', 'ghost'].map(v => ({ value: v, label: v }))} />
            <Select label="Density" value={d.density} onChange={e => setD({ ...d, density: e.target.value as any })} options={['compact', 'normal', 'relaxed'].map(v => ({ value: v, label: v }))} />
          </div>
          <div className="mt-5 flex justify-end"><Button onClick={() => setDesign(d)}>Save design</Button></div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Live preview</div>
          <div className="grid grid-cols-2 gap-3">
            <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button>
          </div>
        </Card>
      </div>
    </>
  );
}

// ---------- ANALYTICS ----------
function AdminAnalytics() {
  const { events, leads, contacts, audits, projects, brand } = useStore();
  const topPages = ['/', '/ai-studio', '/audit', '/portfolio', '/contact', '/services', '/case-studies', '/blog', '/about'];
  const rand = (seed: string) => (Math.abs(Array.from(seed).reduce((a, c) => (a << 5) - a + c.charCodeAt(0), 0)) % 480) + 40;
  return (
    <>
      <PageHeaderAdmin eyebrow="Analytics" title="Visitors, sessions, conversions, AI usage." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { k: 'Sessions', v: events.length + 2480 },
          { k: 'Leads', v: leads.length },
          { k: 'Messages', v: contacts.length },
          { k: 'Audits', v: audits.length },
        ].map((m, i) => <Card key={i} className="p-5"><div className="text-xs font-bold uppercase tracking-widest text-neutral-500">{m.k}</div><div className="mt-2 text-3xl font-bold text-neutral-900"><AnimatedNumber value={m.v} /></div></Card>)}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Top pages</div>
          <div className="space-y-4">{topPages.map(p => <ProgressBar key={p} value={Math.round(rand(p) / 520 * 100)} label={p} />)}</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Content performance</div>
          <div className="space-y-3">
            {projects.slice(0, 4).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.coverImage} alt={p.title} className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1"><div className="font-semibold text-sm">{p.title}</div><div className="text-xs text-neutral-500">{p.category}</div></div>
                <div className="text-sm font-bold" style={{ color: brand.primaryColor }}>{200 + i * 80 + rand(p.title)} views</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Traffic sources</div>
          <div className="grid grid-cols-2 gap-3">
            {[{ k: 'Direct', v: 42 }, { k: 'Organic', v: 28 }, { k: 'Referral', v: 14 }, { k: 'Social', v: 16 }].map(s => (
              <div key={s.k} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4"><div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">{s.k}</div><div className="text-2xl font-bold">{s.v}%</div></div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Conversion funnel</div>
          <div className="space-y-4">
            <ProgressBar value={100} label="Visitors" />
            <ProgressBar value={62} label="Engaged (≥ 30s)" />
            <ProgressBar value={28} label="Tool usage" />
            <ProgressBar value={7.4} label="Lead captured" />
            <ProgressBar value={1.8} label="Qualified" />
          </div>
        </Card>
      </div>
    </>
  );
}

// ---------- NOTIFICATIONS ----------
function AdminNotifications() {
  const { notifications } = useStore();
  return (
    <>
      <PageHeaderAdmin eyebrow="Notifications" title={`${notifications.length} items`} />
      <Card className="overflow-hidden">
        <div className="divide-y divide-neutral-100">
          {notifications.map(n => (
            <div key={n.id} className="p-5 flex items-start gap-4">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-neutral-100 text-neutral-500"><Bell className="h-4 w-4" /></div>
              <div className="flex-1"><div className="flex items-center gap-3"><span className="font-semibold">{n.title}</span><Badge color={n.type === 'success' ? 'success' : n.type === 'warning' ? 'warning' : 'primary'}>{n.type}</Badge>{!n.read && <Badge color="primary">New</Badge>}</div><div className="text-sm text-neutral-600 mt-0.5">{n.message}</div><div className="text-xs text-neutral-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div></div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
