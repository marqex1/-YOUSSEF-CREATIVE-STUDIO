import { useParams, Link } from 'react-router-dom';
import { Container, PageHeader, Card, Badge, Pill, EmptyState, Button, SectionHeading } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { useStore } from '../store/StoreContext';
import { useMemo, useState, useEffect } from 'react';
import { Search, ArrowUpRight, Calendar, Tag, ArrowLeft, Clock } from 'lucide-react';

export function BlogPage() {
  const { posts, brand, track } = useStore();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  useEffect(() => { track('view', '/blog'); }, []);
  const items = posts.filter(p => p.status === 'published');
  const categories = ['All', ...Array.from(new Set(items.map(p => p.category)))];
  const filtered = useMemo(() => items.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (q === '' || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()))
  ), [items, q, cat]);
  const featured = items[0];

  return (
    <>
      <PageHeader eyebrow="Journal" title="Ideas, systems, and playbooks." description="Field notes from inside the premium growth operating system." />
      <Container className="py-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}
          </div>
          <div className="relative lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search journal…" className="w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2" style={{ ['--tw-ring-color' as any]: brand.primaryColor }} />
          </div>
        </div>

        {featured && cat === 'All' && q === '' && (
          <Link to={`/blog/${featured.slug}`} className="block mb-12">
            <Card hoverable className="overflow-hidden grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden"><img src={featured.featuredImage} alt={featured.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" /></div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <Badge color="primary">Featured · {featured.category}</Badge>
                <h2 className="mt-4 text-2xl md:text-4xl font-bold text-neutral-900 leading-tight">{featured.title}</h2>
                <p className="mt-4 text-neutral-600 leading-relaxed">{featured.excerpt}</p>
                <div className="mt-6 text-xs font-semibold text-neutral-500 flex items-center gap-3"><Calendar className="h-3.5 w-3.5" />{new Date(featured.publishDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}<Clock className="h-3.5 w-3.5" />6 min read</div>
                <div className="mt-5 font-semibold text-sm" style={{ color: brand.primaryColor }}>Read article <ArrowUpRight className="inline h-4 w-4" /></div>
              </div>
            </Card>
          </Link>
        )}

        {filtered.length === 0 ? (
          <EmptyState icon={<Search className="h-6 w-6" />} title="No articles found" description="Try different keywords or categories." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(featured && cat === 'All' && q === '' ? 1 : 0).map(p => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="block">
                <Card hoverable className="overflow-hidden h-full">
                  <div className="aspect-[16/10] overflow-hidden"><img src={p.featuredImage} alt={p.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" /></div>
                  <div className="p-6">
                    <Badge color="secondary">{p.category}</Badge>
                    <h3 className="mt-3 text-lg font-bold text-neutral-900 leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{p.excerpt}</p>
                    <div className="mt-5 text-xs text-neutral-500">{new Date(p.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} · {p.author}</div>
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

export function BlogPostPage() {
  const { slug } = useParams();
  const { posts, brand, track } = useStore();
  const post = posts.find(p => p.slug === slug);
  useEffect(() => { if (slug) track('view', `/blog/${slug}`); }, [slug]);
  if (!post) {
    return <Container className="py-24 text-center"><h1 className="text-3xl font-bold text-neutral-900">Article not found</h1><div className="mt-6"><Link to="/blog"><Button>Back to journal</Button></Link></div></Container>;
  }
  const related = posts.filter(p => p.id !== post.id && (p.category === post.category)).slice(0, 3);
  return (
    <>
      <div className="border-b border-neutral-100" style={{ backgroundColor: brand.secondaryColor }}>
        <Container className="py-12">
          <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-neutral-700"><ArrowLeft className="mr-1 h-4 w-4" />Back to journal</Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge color="primary">{post.category}</Badge>
            <span className="text-xs font-semibold text-neutral-500">{new Date(post.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} · {post.author} · 6 min read</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 max-w-4xl leading-[1.05]">{post.title}</h1>
          <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">{post.excerpt}</p>
        </Container>
      </div>
      <Container className="py-12">
        <div className="aspect-[16/9] rounded-[28px] overflow-hidden border border-neutral-100 shadow-xl mb-12">
          <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover" />
        </div>
        <article className="max-w-3xl mx-auto prose-content">
          <p className="text-lg text-neutral-700 leading-relaxed">{post.content}</p>
          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-neutral-900">Why this matters for premium brands</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">Premium teams confuse activity with traction. What compounds is a system — positioning, offers, creative, and analytics — that keeps revenue growing without founder burnout.</p>
          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-neutral-900">The operating system</h2>
          <ul className="mt-4 space-y-3 text-neutral-700 leading-relaxed">
            <li>Positioning · category-of-one architecture.</li>
            <li>Offers · premium flagship + scalable entry.</li>
            <li>Creative · editorial-grade + performance-tested.</li>
            <li>Demand · content + paid + founder distribution.</li>
            <li>Analytics · attribution + leading indicators.</li>
          </ul>
          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-neutral-900">What premium teams do next</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">They stop guessing. They start architecting. They measure leading indicators. They compound.</p>
        </article>
        <div className="max-w-3xl mx-auto mt-12">
          <div className="flex flex-wrap gap-2">{post.tags.map(t => <Badge key={t} color="secondary"><Tag className="h-3 w-3" />{t}</Badge>)}</div>
        </div>
        {related.length > 0 && (
          <div className="mt-24">
            <SectionHeading eyebrow="Related" title="More from the journal." />
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="block">
                  <Card hoverable className="overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden"><img src={p.featuredImage} alt={p.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" /></div>
                    <div className="p-5"><Badge color="secondary">{p.category}</Badge><h3 className="mt-2 text-lg font-bold text-neutral-900 line-clamp-2">{p.title}</h3></div>
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
