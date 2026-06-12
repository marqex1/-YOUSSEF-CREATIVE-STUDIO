import { Container, PageHeader, Card, Badge, Button, ProgressBar } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { useStore } from '../store/StoreContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function CaseStudiesPage() {
  const { caseStudies, brand, track } = useStore();
  const [active, setActive] = useState(0);
  useEffect(() => { track('view', '/case-studies'); }, []);
  const c = caseStudies[active];
  return (
    <>
      <PageHeader eyebrow="Case studies" title="Premium results in black and white." description="Sales-focused case studies from the growth stacks we architect. Hard numbers, real clients." />
      <Container className="py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-3">
            {caseStudies.map((cs, i) => (
              <button key={cs.id} onClick={() => setActive(i)} className={`w-full text-left p-5 rounded-2xl border transition-all ${active === i ? 'border-transparent shadow-lg' : 'border-neutral-100 bg-white hover:bg-neutral-50'}`} style={active === i ? { backgroundColor: brand.secondaryColor } : undefined}>
                <Badge color={active === i ? 'primary' : 'secondary'}>{cs.client}</Badge>
                <div className="mt-2 font-bold text-neutral-900">{cs.title}</div>
                <div className="mt-2 text-xs font-semibold text-neutral-500">ROAS {cs.roas} · {cs.leadVolume} leads</div>
              </button>
            ))}
          </aside>
          <div className="lg:col-span-8 space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-[16/8] overflow-hidden">
                <img src={c.cover} alt={c.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2">
                  <Badge color="primary">{c.client}</Badge>
                  <span className="text-xs font-semibold text-neutral-500">{c.budget}</span>
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">{c.title}</h2>
                <p className="mt-3 text-neutral-700 leading-relaxed"><span className="font-semibold">Business goal: </span>{c.businessGoal}</p>
              </div>
            </Card>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: DollarSign, k: 'CPL', v: c.cpl },
                { icon: Users, k: 'Lead Volume', v: c.leadVolume },
                { icon: TrendingUp, k: 'ROAS', v: c.roas },
              ].map((m, i) => (
                <Card key={i} className="p-6 text-center">
                  <div className="mx-auto h-11 w-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}><m.icon className="h-5 w-5" /></div>
                  <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-neutral-500">{m.k}</div>
                  <div className="mt-1 text-2xl font-bold" style={{ color: brand.primaryColor }}>{m.v}</div>
                </Card>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Card className="p-7">
                <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: brand.primaryColor }}>Strategy</div>
                <p className="mt-2 text-neutral-700 leading-relaxed">{c.strategy}</p>
              </Card>
              <Card className="p-7">
                <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: brand.primaryColor }}>Execution</div>
                <p className="mt-2 text-neutral-700 leading-relaxed">{c.execution}</p>
              </Card>
              <Card className="p-7 md:col-span-2">
                <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: brand.primaryColor }}>Results</div>
                <p className="mt-2 text-neutral-700 leading-relaxed">{c.results}</p>
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <ProgressBar value={88} label="Revenue" />
                  <ProgressBar value={82} label="Efficiency" />
                  <ProgressBar value={94} label="Brand lift" />
                </div>
              </Card>
              <Card className="p-7 md:col-span-2" style={{ backgroundColor: brand.secondaryColor }}>
                <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: brand.primaryColor }}>Key Learnings</div>
                <p className="mt-2 text-neutral-800 leading-relaxed">{c.learnings}</p>
              </Card>
            </div>
            <Card className="p-8 text-center">
              <Sparkles className="mx-auto h-6 w-6 mb-3" style={{ color: brand.primaryColor }} />
              <h3 className="text-2xl font-bold text-neutral-900">Want a similar premium outcome?</h3>
              <p className="mt-2 text-neutral-600 max-w-xl mx-auto">We architect growth operating systems for a small number of premium clients.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link to="/contact"><Button>Book a discovery call <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
                <Link to="/audit"><Button variant="outline">Request a free audit</Button></Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
      <SmartCTA />
    </>
  );
}
