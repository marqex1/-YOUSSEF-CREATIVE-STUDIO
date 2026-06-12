import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Button, Container, cn, radiusMap } from './ui/DesignSystem';
import { Menu, X, Sparkles, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/ai-studio', label: 'AI Studio' },
  { to: '/audit', label: 'Audit' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export function TopBar() {
  const { brand, site } = useStore();
  return (
    <div className="hidden md:block text-xs" style={{ backgroundColor: brand.primaryColor, color: '#fff' }}>
      <Container className="flex items-center justify-between py-2">
        <div className="flex items-center gap-5 opacity-90">
          <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {site.phone}</span>
          <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {site.email}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {site.address}</span>
        </div>
        <div className="opacity-90">
          <Sparkles className="inline h-3.5 w-3.5 -mt-0.5 mr-1" /> Premium AI-Powered Marketing Operating System
        </div>
      </Container>
    </div>
  );
}

export function Header() {
  const { brand, design } = useStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const r = radiusMap[design.borderRadius] || 'rounded-2xl';
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md transition-all border-b" style={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.9)' : 'rgba(247,244,239,0.85)', borderColor: 'rgba(0,0,0,0.05)' }}>
      <TopBar />
      <Container className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          {brand.logoMode !== 'text-only' && (
            <div className={`flex h-10 w-10 items-center justify-center ${r} text-white font-black`} style={{ background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})` }}>
              Y
            </div>
          )}
          {brand.logoMode !== 'logo-only' && (
            <div className="leading-tight">
              <div className="text-lg font-bold tracking-tight text-neutral-900">{brand.logoText}</div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">{brand.tagline}</div>
            </div>
          )}
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => cn('px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors', isActive ? 'text-neutral-900 bg-neutral-100' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80')}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden sm:block"><Button size="sm"><span>Start a Project</span> <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg border border-neutral-200 text-neutral-700">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <div className="lg:hidden border-t border-neutral-100 bg-white">
          <Container className="py-3 flex flex-col">
            {NAV.map(n => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => cn('px-3 py-3 text-sm font-semibold rounded-xl', isActive ? 'text-neutral-900 bg-neutral-100' : 'text-neutral-600')}>{n.label}</NavLink>
            ))}
            <Link to="/contact" className="mt-3"><Button block><span>Start a Project</span> <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
          </Container>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { brand, site, posts, services } = useStore();
  return (
    <footer className="mt-24 border-t border-neutral-100" style={{ backgroundColor: '#111111', color: '#EDEDE8' }}>
      <Container className="py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-white font-black" style={{ background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})` }}>Y</div>
              <div>
                <div className="text-lg font-bold tracking-tight">{brand.logoText}</div>
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] opacity-70">{brand.tagline}</div>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed max-w-md">{site.siteDescription}</p>
            <div className="mt-6 space-y-2 text-sm opacity-80">
              <div><Mail className="inline h-4 w-4 mr-2 -mt-0.5" /> {site.email}</div>
              <div><Phone className="inline h-4 w-4 mr-2 -mt-0.5" /> {site.phone}</div>
              <div><MapPin className="inline h-4 w-4 mr-2 -mt-0.5" /> {site.address}</div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-[0.18em] opacity-60 mb-4">Services</div>
            <ul className="space-y-3 text-sm">
              {services.filter(s => s.status === 'published').slice(0, 6).map(s => (
                <li key={s.id}><Link to="/services" className="hover:text-white opacity-80">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-bold uppercase tracking-[0.18em] opacity-60 mb-4">Studio</div>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link to="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link to="/ai-studio" className="hover:text-white">AI Studio</Link></li>
              <li><Link to="/audit" className="hover:text-white">Marketing Audit</Link></li>
              <li><Link to="/blog" className="hover:text-white">Journal</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-bold uppercase tracking-[0.18em] opacity-60 mb-4">Latest</div>
            <ul className="space-y-3 text-sm opacity-80">
              {posts.filter(p => p.status === 'published').slice(0, 4).map(p => (
                <li key={p.id}><Link to={`/blog/${p.slug}`} className="hover:text-white line-clamp-1">{p.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-60">
          <div>© {new Date().getFullYear()} {brand.logoText}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:opacity-100">Admin</Link>
            <Link to="/contact" className="hover:opacity-100">Privacy</Link>
            <Link to="/contact" className="hover:opacity-100">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export function SmartCTA({ title, subtitle, actionLabel = 'Start a project' }: { title?: string; subtitle?: string; actionLabel?: string }) {
  const { brand } = useStore();
  return (
    <section className="mt-24">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] p-10 md:p-16 text-white" style={{ background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})` }}>
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-20" style={{ background: `radial-gradient(closest-side, ${brand.secondaryColor}, transparent)` }} />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-10" style={{ background: `radial-gradient(closest-side, ${brand.secondaryColor}, transparent)` }} />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full bg-white/15 backdrop-blur">Ready to grow</div>
              <h3 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-tight">{title || 'Let us turn your premium brand into a premium growth engine.'}</h3>
              <p className="mt-4 text-white/80 text-base md:text-lg max-w-lg">{subtitle || 'Book a discovery call. We will audit your stack, draft a premium plan, and show you where growth is hiding.'}</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 hover:bg-neutral-100 transition-all font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:-translate-y-0.5">{actionLabel} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/audit" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 transition-all font-bold px-6 py-3.5 rounded-2xl">Request a free audit</Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
