import { Container, PageHeader, Card, Badge, Button, SectionHeading } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { useStore } from '../store/StoreContext';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, BarChart3, PenTool, Megaphone, Zap, Target, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const ICONS: Record<string, any> = { Sparkles, BarChart3, PenTool, Megaphone, Zap, Target };

export default function ServicesPage() {
  const { services, brand, track } = useStore();
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => { track('view', '/services'); }, []);
  const items = services.filter(s => s.status === 'published');
  return (
    <>
      <PageHeader eyebrow="Services" title="A premium marketing operating system." description="Six interconnected services engineered to compound growth for ambitious brands." />
      <Container className="py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            const isActive = active === s.id;
            return (
              <Card key={s.id} hoverable className={`p-7 cursor-pointer ${isActive ? 'ring-2' : ''}`} style={isActive ? { boxShadow: `0 0 0 2px ${brand.primaryColor}` } : undefined} onClick={() => setActive(isActive ? null : s.id)}>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}><Icon className="h-6 w-6" /></div>
                  <Badge color={i % 2 === 0 ? 'primary' : 'secondary'}>Module {i + 1}</Badge>
                </div>
                <h3 className="mt-5 text-xl font-bold text-neutral-900">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.description}</p>
                {s.price && <div className="mt-4 text-sm font-bold" style={{ color: brand.primaryColor }}>{s.price}</div>}
                <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                  {s.features.map((f, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: brand.primaryColor }} />{f}</li>))}
                </ul>
                <div className="mt-6 flex items-center font-semibold text-sm" style={{ color: brand.primaryColor }}>Get started <ArrowUpRight className="ml-1 h-4 w-4" /></div>
              </Card>
            );
          })}
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Packages" title="Premium pricing, premium outcomes." subtitle="Transparent packages. Premium teams only. 4 new clients per quarter." center />
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              { title: 'Audit', price: '$2,900', duration: 'one-time', features: ['Marketing audit', 'Offer architecture doc', 'Priority action plan', '2-hour strategy call'] },
              { title: 'Launch', price: '$14,500', duration: '30 days', features: ['Positioning & offer', 'Creative system', 'Launch campaign', 'Analytics stack'], highlight: true },
              { title: 'Growth OS', price: '$9,500', duration: '/ month', features: ['Full growth system', 'AI creative studio', 'Performance pods', 'Weekly scorecards'] },
            ].map((p, i) => (
              <Card key={i} className={`p-8 ${p.highlight ? 'ring-2 text-white relative overflow-hidden' : ''}`} style={p.highlight ? { background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})` } : undefined}>
                {p.highlight && <Badge color="secondary" className="absolute top-5 right-5">Most popular</Badge>}
                <div className={`text-sm font-bold uppercase tracking-wider ${p.highlight ? 'text-white/80' : 'text-neutral-500'}`}>{p.title}</div>
                <div className="mt-4 flex items-baseline gap-1"><div className="text-5xl font-bold">{p.price}</div><div className={`text-sm ${p.highlight ? 'text-white/80' : 'text-neutral-500'}`}>{p.duration}</div></div>
                <ul className={`mt-6 space-y-3 text-sm ${p.highlight ? 'text-white/90' : 'text-neutral-600'}`}>
                  {p.features.map((f, j) => (<li key={j} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: p.highlight ? '#fff' : brand.primaryColor }} />{f}</li>))}
                </ul>
                <Link to="/contact" className="block mt-8"><Button block variant={p.highlight ? 'secondary' : 'primary'}>Book a discovery call</Button></Link>
              </Card>
            ))}
          </div>
        </div>
      </Container>
      <SmartCTA title="Not sure which module you need?" subtitle="We start every relationship with a premium audit. From there we scope the right operating system." actionLabel="Request audit" />
    </>
  );
}
