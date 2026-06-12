import { useEffect, useState } from 'react';
import { Container, PageHeader, Card, Badge, Button, Input, Textarea, ProgressBar, SectionHeading, AnimatedNumber, ProgressBar as _PB } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { useStore } from '../store/StoreContext';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Lightbulb, Zap, Globe, ArrowRight, Sparkles, Camera, Share2 } from 'lucide-react';
import type { AuditRequest } from '../types';

const DIMENSIONS: { key: keyof AuditRequest['scores']; label: string }[] = [
  { key: 'branding', label: 'Branding' },
  { key: 'offer', label: 'Offer' },
  { key: 'messaging', label: 'Messaging' },
  { key: 'cta', label: 'CTA' },
  { key: 'ux', label: 'UX' },
  { key: 'content', label: 'Content' },
  { key: 'engagement', label: 'Engagement' },
  { key: 'trust', label: 'Trust' },
  { key: 'conversion', label: 'Conversion Readiness' },
];

export default function AuditPage() {
  const { brand, addAudit, track } = useStore();
  const [form, setForm] = useState({ website: '', facebook: '', instagram: '', business: '', contactEmail: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditRequest | null>(null);

  useEffect(() => { track('view', '/audit'); }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.website || !form.contactEmail) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = addAudit({ ...form });
      setResult(r);
      setLoading(false);
      track('audit', '/audit', { website: form.website });
    }, 1400);
  };

  return (
    <>
      <PageHeader eyebrow="Marketing Audit" title="A premium diagnosis of your entire growth stack." description="9 dimensions. 30 seconds. Actionable plan included. Free forever for qualified brands." actions={<><Badge color="primary"><Sparkles className="h-3 w-3" /> 9 dimensions scored</Badge></>} />
      <Container className="py-16">
        {!result ? (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <Card className="p-8">
                <form onSubmit={submit} className="space-y-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Your details</div>
                  <h3 className="text-2xl font-bold text-neutral-900">Tell us about your business.</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Website URL" required placeholder="https://yourbrand.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                    <Input label="Contact email" type="email" required placeholder="you@company.com" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
                    <Input label="Facebook Page (optional)" placeholder="@yourbrand" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
                    <Input label="Instagram Account (optional)" placeholder="@yourbrand" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
                  </div>
                  <Textarea label="Business details" placeholder="Industry, stage, goals, budget…" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
                  <Button type="submit" size="lg" block disabled={loading}>
                    {loading ? 'Analyzing your growth stack…' : 'Run my premium audit'} <Sparkles className="ml-1.5 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-center text-neutral-500">Your data stays private. We email the full report within 72 hours.</p>
                </form>
              </Card>
            </div>
            <aside className="lg:col-span-5 space-y-5">
              <Card className="p-7" style={{ backgroundColor: brand.secondaryColor }}>
                <Badge color="primary">What you get</Badge>
                <ul className="mt-4 space-y-3 text-sm text-neutral-800">
                  {[
                    '9-dimension scorecard',
                    'Strengths & weaknesses',
                    'Quick wins (today)',
                    'Full action plan (30 days)',
                    'Premium follow-up email',
                  ].map(x => <li key={x} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />{x}</li>)}
                </ul>
              </Card>
              <Card className="p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Sample score</div>
                <div className="mt-4 space-y-4">
                  {DIMENSIONS.slice(0, 4).map((d, i) => <ProgressBar key={d.key} value={[78, 62, 84, 58][i]} label={d.label} />)}
                </div>
              </Card>
            </aside>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})`, color: '#fff' }}>
              <Badge color="secondary" className="mx-auto"><Sparkles className="h-3 w-3" /> Analysis complete</Badge>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Overall Score</h2>
              <div className="mt-2 text-7xl md:text-8xl font-bold"><AnimatedNumber value={result.overallScore} /></div>
              <div className="text-white/80 text-sm">/ 100 · across 9 growth dimensions</div>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15"><Globe className="h-3.5 w-3.5" /> {result.website || 'Your site'}</span>
                {result.instagram && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15"><Camera className="h-3.5 w-3.5" /> @{result.instagram}</span>}
                {result.facebook && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15"><Share2 className="h-3.5 w-3.5" /> {result.facebook}</span>}
              </div>
            </Card>

            <Card className="p-8">
              <SectionHeading eyebrow="Scorecard" title="9-dimension premium scorecard." />
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                {DIMENSIONS.map(d => <div key={d.key}><ProgressBar value={result.scores[d.key]} label={d.label} /></div>)}
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-5">
              <Card className="p-7">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" style={{ color: '#059669' }} /><h3 className="text-xl font-bold text-neutral-900">Strengths</h3></div>
                <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                  {result.strengths.map((x, i) => <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />{x}</li>)}
                </ul>
              </Card>
              <Card className="p-7">
                <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-600" /><h3 className="text-xl font-bold text-neutral-900">Weaknesses</h3></div>
                <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                  {result.weaknesses.map((x, i) => <li key={i} className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600" />{x}</li>)}
                </ul>
              </Card>
              <Card className="p-7">
                <div className="flex items-center gap-2"><Lightbulb className="h-5 w-5" style={{ color: brand.primaryColor }} /><h3 className="text-xl font-bold text-neutral-900">Opportunities</h3></div>
                <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                  {result.opportunities.map((x, i) => <li key={i} className="flex items-start gap-2"><Lightbulb className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />{x}</li>)}
                </ul>
              </Card>
              <Card className="p-7" style={{ backgroundColor: brand.secondaryColor }}>
                <div className="flex items-center gap-2"><Zap className="h-5 w-5" style={{ color: brand.primaryColor }} /><h3 className="text-xl font-bold text-neutral-900">Quick wins</h3></div>
                <ul className="mt-4 space-y-3 text-sm text-neutral-800">
                  {result.quickWins.map((x, i) => <li key={i} className="flex items-start gap-2"><Zap className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />{x}</li>)}
                </ul>
              </Card>
            </div>

            <Card className="p-8">
              <SectionHeading eyebrow="Action Plan" title="30-day premium action plan." />
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {result.actionPlan.map((x, i) => (
                  <div key={i} className="rounded-2xl border border-neutral-100 bg-neutral-50/60 p-5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Week {i + 1}</div>
                    <div className="mt-1 font-bold text-neutral-900">{x}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 text-center">
              <h3 className="text-2xl font-bold text-neutral-900">Want us to execute this plan with you?</h3>
              <p className="mt-2 text-neutral-600 max-w-xl mx-auto">We take on 4 new premium partners per quarter. If this report made sense, we are likely a good fit.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link to="/contact"><Button>Book a discovery call <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
                <Button variant="outline" onClick={() => { setResult(null); setForm({ website: '', facebook: '', instagram: '', business: '', contactEmail: '' }); }}>Run another audit</Button>
              </div>
            </Card>
          </div>
        )}
      </Container>
      <SmartCTA title="Want a deeper, team-led premium audit?" subtitle="We deliver a premium 30-page diagnostic + positioning doc within 72 hours. Free for qualified brands." />
    </>
  );
}
