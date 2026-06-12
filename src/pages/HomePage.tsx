import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { Badge, Button, Card, Container, SectionHeading, AnimatedNumber, ProgressBar, cn } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { ArrowRight, Star, CheckCircle2, ArrowUpRight, Sparkles, BarChart3, Megaphone, Zap, Target, PenTool } from 'lucide-react';
import { useEffect } from 'react';

export default function HomePage() {
  const { brand, site, projects, services, caseStudies, testimonials, posts, track } = useStore();
  useEffect(() => { track('view', '/'); }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(180deg, ${brand.secondaryColor}55, ${brand.bgColor})` }} />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-40 blur-3xl -z-10" style={{ background: brand.primaryColor + '22' }} />
        <Container className="pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Badge color="secondary" className="mb-6"><Sparkles className="h-3 w-3" /> AI-Powered Marketing OS</Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05]">
                The premium <span className="relative inline-block"><span style={{ color: brand.primaryColor }}>growth operating system</span><span className="absolute -bottom-2 left-0 right-0 h-2 rounded-full opacity-30" style={{ backgroundColor: brand.primaryColor }} /></span> for ambitious brands.
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-neutral-600 leading-relaxed">{site.siteDescription}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact"><Button size="lg">Start a project <ArrowRight className="ml-1.5 h-5 w-5" /></Button></Link>
                <Link to="/audit"><Button size="lg" variant="outline">Request free audit</Button></Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                  <span className="font-semibold text-neutral-700">4.9 / 5</span> from premium clients
                </div>
                <div className="hidden sm:block h-6 w-px bg-neutral-200" />
                <div>40+ premium teams served</div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-6 rounded-[36px] opacity-30 blur-2xl" style={{ background: brand.primaryColor + '44' }} />
                <Card className="relative p-5">
                  <div className="flex items-center justify-between mb-4">
                    <Badge color="primary">Live Preview · AI Studio</Badge>
                    <span className="text-xs text-neutral-400">v2026.2</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: brand.secondaryColor }}>
                    <img src="https://picsum.photos/seed/studio-hero/800/500" alt="Hero preview" className="w-full h-56 object-cover" />
                  </div>
                  <div className="mt-4 space-y-3">
                    <ProgressBar value={82} label="Offer Score" />
                    <ProgressBar value={74} label="Brand Score" />
                    <ProgressBar value={68} label="Creative Score" />
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[{ k: 'Leads', v: 48200 }, { k: 'ROAS', v: 4.8, suffix: '×' }, { k: 'Lift', v: 184, suffix: '%' }].map((m, i) => (
                      <div key={i} className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4">
                        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{m.k}</div>
                        <div className="mt-1 text-2xl font-bold text-neutral-900"><AnimatedNumber value={typeof m.v === 'number' ? (m.suffix === '×' ? Math.round(m.v * 10) : m.v) : 0} prefix="" suffix={m.suffix || (typeof m.v === 'number' && m.v < 100 && m.suffix === '×' ? '' : '')} />{m.suffix === '×' ? '.8×' : ''}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATISTICS */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { k: 'Premium clients', v: 84, suffix: '+' },
              { k: 'Projects delivered', v: 320, suffix: '+' },
              { k: 'Avg. ROAS', v: 48, prefix: '', suffix: '' },
              { k: 'Average lead lift', v: 184, suffix: '%' },
            ].map((m, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold" style={{ color: brand.primaryColor }}>
                  {i === 2 ? '4.8×' : <><AnimatedNumber value={m.v} suffix={m.suffix} /></>}
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-500">{m.k}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section>
        <Container>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <SectionHeading eyebrow="Services" title="A premium operating system — not a one-off campaign." subtitle="Six interconnected modules. One compounding growth engine." />
            <Link to="/services" className="text-sm font-bold" style={{ color: brand.primaryColor }}>Explore all services <ArrowRight className="inline h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter(s => s.status === 'published').slice(0, 6).map((s, i) => (
              <Link key={s.id} to="/services" className="block">
                <Card hoverable className="h-full p-7">
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}>
                    {i === 0 && <Sparkles className="h-6 w-6" />}
                    {i === 1 && <BarChart3 className="h-6 w-6" />}
                    {i === 2 && <PenTool className="h-6 w-6" />}
                    {i === 3 && <Megaphone className="h-6 w-6" />}
                    {i === 4 && <Zap className="h-6 w-6" />}
                    {i === 5 && <Target className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    {s.features.slice(0, 3).map((f, j) => (
                      <li key={j} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: brand.primaryColor }} />{f}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center font-semibold text-sm" style={{ color: brand.primaryColor }}>Learn more <ArrowUpRight className="ml-1 h-4 w-4" /></div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* PORTFOLIO */}
      <section className="mt-24">
        <Container>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <SectionHeading eyebrow="Portfolio" title="Selected premium work." subtitle="A glimpse into the brands we architect, scale, and compound." />
            <Link to="/portfolio" className="text-sm font-bold" style={{ color: brand.primaryColor }}>See all projects <ArrowRight className="inline h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.filter(p => p.status === 'published').slice(0, 6).map((p, i) => (
              <Link key={p.id} to={`/portfolio/${p.slug}`} className="group block">
                <Card hoverable className="overflow-hidden">
                  <div className={cn('aspect-[4/3] overflow-hidden', i === 0 && 'lg:aspect-[4/4]')}>
                    <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                      <span>{p.category}</span>
                      <span>{new Date(p.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-neutral-900 group-hover:underline underline-offset-4">{p.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{p.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="mt-24">
        <Container>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <SectionHeading eyebrow="Case studies" title="Premium results. In black and white." subtitle="Hard numbers from the growth stacks we architect." />
            <Link to="/case-studies" className="text-sm font-bold" style={{ color: brand.primaryColor }}>Read all case studies <ArrowRight className="inline h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {caseStudies.slice(0, 3).map((c) => (
              <Link key={c.id} to="/case-studies" className="block">
                <Card hoverable className="overflow-hidden h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={c.cover} alt={c.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <Badge color="secondary">{c.client}</Badge>
                    <h3 className="mt-3 text-lg font-bold text-neutral-900">{c.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{c.businessGoal}</p>
                    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-neutral-50 p-3">
                        <div className="text-[11px] font-semibold text-neutral-500 uppercase">CPL</div>
                        <div className="mt-1 font-bold" style={{ color: brand.primaryColor }}>{c.cpl}</div>
                      </div>
                      <div className="rounded-xl bg-neutral-50 p-3">
                        <div className="text-[11px] font-semibold text-neutral-500 uppercase">Leads</div>
                        <div className="mt-1 font-bold" style={{ color: brand.primaryColor }}>{c.leadVolume}</div>
                      </div>
                      <div className="rounded-xl bg-neutral-50 p-3">
                        <div className="text-[11px] font-semibold text-neutral-500 uppercase">ROAS</div>
                        <div className="mt-1 font-bold" style={{ color: brand.primaryColor }}>{c.roas}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* AI STUDIO PREVIEW */}
      <section className="mt-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Badge color="primary" className="mb-4"><Sparkles className="h-3 w-3" /> AI Studio</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">In-house AI creative tools — tuned for premium brands.</h2>
              <p className="mt-4 text-lg text-neutral-600">Generate captions, ad copy, creative briefs, landing pages, image prompts, and full content pipelines — all tuned to never repeat the same structure twice.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-600">
                {['Caption Generator', 'Ad Copy Engine', 'Creative Brief', 'Content Ideas', 'Campaign Builder', 'SEO Blueprint', 'Sales Scripts', 'Email Sequences', 'WhatsApp Broadcasts', 'Landing Pages', 'Image Prompts', 'Marketing Strategy'].map(x => (
                  <div key={x} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" style={{ color: brand.primaryColor }} />{x}</div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Link to="/ai-studio"><Button size="lg">Open AI Studio <ArrowRight className="ml-1.5 h-5 w-5" /></Button></Link>
                <Link to="/audit"><Button variant="outline" size="lg">Try marketing audit</Button></Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <AIPreview />
            </div>
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-24">
        <Container>
          <SectionHeading eyebrow="Testimonials" title="Trusted by premium operators." center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(0, 6).map((t, i) => (
              <Card key={i} className="p-7">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="mt-4 text-neutral-700 leading-relaxed">"{t.message}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-neutral-900 text-sm">{t.name}</div>
                    <div className="text-xs text-neutral-500">{t.role} · {t.company}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* LATEST ARTICLES */}
      <section className="mt-24">
        <Container>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <SectionHeading eyebrow="Journal" title="Ideas, systems, and playbooks." subtitle="Field notes from inside the premium growth operating system." />
            <Link to="/blog" className="text-sm font-bold" style={{ color: brand.primaryColor }}>Read the journal <ArrowRight className="inline h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {posts.filter(p => p.status === 'published').slice(0, 3).map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="block">
                <Card hoverable className="overflow-hidden h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.featuredImage} alt={p.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <Badge color="secondary">{p.category}</Badge>
                    <h3 className="mt-3 text-lg font-bold text-neutral-900 leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{p.excerpt}</p>
                    <div className="mt-5 text-xs text-neutral-500">{new Date(p.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} · {p.author}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <SmartCTA title="Ready to turn your brand into a growth operating system?" subtitle="We work with 4 new premium partners per quarter. Book a discovery call to see if we are the right team." />
    </>
  );
}

function AIPreview() {
  const { brand } = useStore();
  const tools = [
    { label: 'Hook', value: 'Stop guessing. Start scaling.' },
    { label: 'Offer', value: 'Premium growth architecture in 30 days.' },
    { label: 'Proof', value: 'Avg. 4.8× ROAS across portfolio.' },
    { label: 'CTA', value: 'Book a discovery call.' },
  ];
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: brand.primaryColor }}>Live generation</div>
          <div className="mt-1 text-xl font-bold text-neutral-900">Caption Generator · Premium skincare brand</div>
        </div>
        <Badge color="primary" className="hidden sm:inline-flex">Streaming · 120 wpm</Badge>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {tools.map((t, i) => (
          <div key={i} className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{t.label}</div>
            <div className="mt-1 text-sm font-semibold text-neutral-900">{t.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl p-6 border-l-4" style={{ backgroundColor: brand.secondaryColor, borderColor: brand.primaryColor }}>
        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Full caption preview</div>
        <p className="mt-2 text-neutral-800 leading-relaxed text-sm">Most premium brands confuse activity with traction. We turn positioning, offers, and creative into a compounding system — so every click, every post, and every dollar feels inevitable.</p>
        <div className="mt-4 text-[11px] font-semibold text-neutral-500">Generated in 0.8s · temperature 0.85 · GPT-4o</div>
      </div>
    </Card>
  );
}
