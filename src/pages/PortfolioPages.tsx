import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { Container, PageHeader, Card, Badge, Pill, SectionHeading, EmptyState, Button, ProgressBar, cn } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { useMemo, useState, useEffect } from 'react';
import { Search, ArrowUpRight, ArrowLeft, Calendar, Tag, Building2 } from 'lucide-react';

export function PortfolioPage() {
  const { projects, brand, track } = useStore();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  useEffect(() => { track('view', '/portfolio'); }, []);
  const items = projects.filter(p => p.status === 'published');
  const categories = ['All', ...Array.from(new Set(items.map(p => p.category)))];
  const filtered = useMemo(() => items.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (q === '' || p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
  ), [items, q, cat]);

  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Premium case files." description="Selected work for ambitious brands. Each project is an operating system, not a deliverable." />
      <Container className="py-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}
          </div>
          <div className="relative lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" className="w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ ['--tw-ring-color' as any]: brand.primaryColor }} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Search className="h-6 w-6" />} title="No projects match your filters" description="Try a different category or search term." />
        ) : (
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <Link key={p.id} to={`/portfolio/${p.slug}`} className="group block">
                <Card hoverable className="overflow-hidden h-full">
                  <div className={cn('aspect-[4/3] overflow-hidden', i % 5 === 0 && 'lg:aspect-[4/4.5]')}>
                    <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                      <span>{p.category}</span>
                      <span><Calendar className="inline h-3.5 w-3.5 mr-1" />{new Date(p.publishDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-neutral-900 group-hover:underline underline-offset-4">{p.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{p.description}</p>
                    <div className="mt-4 flex items-center text-sm font-semibold" style={{ color: brand.primaryColor }}>View case file <ArrowUpRight className="ml-1 h-4 w-4" /></div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
      <SmartCTA />
    </>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const { projects, brand, track } = useStore();
  const project = projects.find(p => p.slug === slug);
  useEffect(() => { if (slug) track('view', `/portfolio/${slug}`); }, [slug]);
  if (!project) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">Project not found</h1>
        <p className="mt-3 text-neutral-600">The project you are looking for does not exist or is not published.</p>
        <div className="mt-6"><Link to="/portfolio"><Button>Back to portfolio</Button></Link></div>
      </Container>
    );
  }
  const related = projects.filter(p => p.id !== project.id && (p.category === project.category || p.tags.some(t => project.tags.includes(t)))).slice(0, 3);
  return (
    <>
      <div className="border-b border-neutral-100" style={{ backgroundColor: brand.secondaryColor }}>
        <Container className="py-10">
          <Link to="/portfolio" className="inline-flex items-center text-sm font-semibold text-neutral-700"><ArrowLeft className="mr-1 h-4 w-4" />Back to portfolio</Link>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
            <Badge color="primary">{project.category}</Badge>
            <Badge color="secondary">{project.client}</Badge>
            <span className="text-neutral-500">· {new Date(project.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 max-w-4xl leading-[1.05]">{project.title}</h1>
          <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">{project.description}</p>
        </Container>
      </div>
      <Container className="py-16">
        <div className="aspect-[16/9] rounded-[28px] overflow-hidden border border-neutral-100 shadow-xl">
          <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover" />
        </div>
        <div className="mt-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {[
              { title: 'The Challenge', body: project.challenge },
              { title: 'The Solution', body: project.solution },
              { title: 'The Execution', body: project.execution },
              { title: 'The Results', body: project.results },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: brand.primaryColor }}>0{i + 1}</div>
                <h2 className="mt-1 text-3xl font-bold text-neutral-900">{s.title}</h2>
                <p className="mt-4 text-neutral-700 leading-relaxed text-[15px]">{s.body}</p>
              </div>
            ))}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-5">Gallery</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.gallery.map((g, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-100"><img src={g} alt={`${project.title} ${i+1}`} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" /></div>
                ))}
              </div>
            </div>
          </div>
          <aside className="lg:col-span-4 space-y-5">
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">Client</div>
              <div className="flex items-center gap-3"><Building2 className="h-5 w-5" style={{ color: brand.primaryColor }} /><span className="font-bold text-neutral-900">{project.client}</span></div>
            </Card>
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">Tags</div>
              <div className="flex flex-wrap gap-2">{project.tags.map(t => <Badge key={t} color="secondary"><Tag className="h-3 w-3" />{t}</Badge>)}</div>
            </Card>
            <Card className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">Impact</div>
              <div className="space-y-4">
                <ProgressBar value={82} label="Brand lift" />
                <ProgressBar value={91} label="Lead volume" />
                <ProgressBar value={78} label="Conversion" />
              </div>
            </Card>
            <Card className="p-6" style={{ backgroundColor: brand.secondaryColor }}>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-700">Want a similar system?</div>
              <p className="mt-2 text-neutral-800 leading-relaxed text-sm">We architect premium growth systems for a small number of ambitious teams.</p>
              <Link to="/contact" className="mt-4 block"><Button block>Start a project</Button></Link>
            </Card>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <SectionHeading eyebrow="Related" title="More premium work." />
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} to={`/portfolio/${p.slug}`} className="block">
                  <Card hoverable className="overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden"><img src={p.coverImage} alt={p.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" /></div>
                    <div className="p-5"><Badge color="secondary">{p.category}</Badge><h3 className="mt-2 text-lg font-bold text-neutral-900">{p.title}</h3></div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
      <SmartCTA />
    </>
  );
}
