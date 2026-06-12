import { Container, PageHeader, Card, SectionHeading, Badge, AnimatedNumber, ProgressBar } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { useStore } from '../store/StoreContext';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Award, Users, Target, Lightbulb, Zap, Handshake, Clock, Star } from 'lucide-react';
import { useEffect } from 'react';

export default function AboutPage() {
  const { brand, testimonials, services, track } = useStore();
  useEffect(() => { track('view', '/about'); }, []);
  return (
    <>
      <PageHeader eyebrow="About" title="A premium growth operating system, not a creative agency." description="We architect compounding growth machines for ambitious, category-defining brands." actions={<><Link to="/contact"><button className="inline-flex items-center justify-center font-semibold tracking-tight transition-all rounded-2xl px-5 py-2.5 text-sm text-white hover:-translate-y-0.5" style={{ backgroundColor: brand.primaryColor }}>Work with us <ArrowRight className="ml-1.5 h-4 w-4" /></button></Link></>} />
      <Container className="py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-5 text-neutral-700 leading-relaxed text-[15px]">
            <p>Youssef Creative Studio OS is a premium marketing operating system — a single place where brand strategy, performance infrastructure, AI creative, and analytics compound.</p>
            <p>We work with founders, operators, and category leaders who are tired of one-off campaigns and agencies that optimize activity over traction.</p>
            <p>Our model: architect a growth system for your brand — positioning, offers, creative, and funnels — then run it with you. Premium, unhurried, compounding.</p>
          </div>
          <div className="lg:col-span-5">
            <Card className="p-6" style={{ backgroundColor: brand.secondaryColor }}>
              <Badge color="primary">Operating principles</Badge>
              <div className="mt-4 space-y-3 text-sm text-neutral-800">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />Positioning over promises.</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />Systems over campaigns.</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />Leading indicators over vanity metrics.</div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />Compound over scale.</div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Award, label: 'Premium projects', value: 320, suffix: '+' },
            { icon: Users, label: 'Teams served', value: 84, suffix: '+' },
            { icon: Target, label: 'Avg. ROAS', value: 48 },
            { icon: Lightbulb, label: 'Countries', value: 14 },
          ].map((m, i) => (
            <Card key={i} className="p-6">
              <div className="h-11 w-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}><m.icon className="h-5 w-5" /></div>
              <div className="mt-4 text-4xl font-bold text-neutral-900">{i === 2 ? '4.8×' : <><AnimatedNumber value={m.value} suffix={m.suffix || ''} /></>}</div>
              <div className="mt-1 text-sm text-neutral-500">{m.label}</div>
            </Card>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="What we do" title="Six interlocking modules. One operating system." center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter(s => s.status === 'published').slice(0, 6).map((s, i) => (
              <Card key={s.id} hoverable className="p-6">
                <div className="h-11 w-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}>
                  {i === 0 && <Lightbulb className="h-5 w-5" />}{i === 1 && <Zap className="h-5 w-5" />}{i === 2 && <Target className="h-5 w-5" />}{i === 3 && <Users className="h-5 w-5" />}{i === 4 && <Handshake className="h-5 w-5" />}{i === 5 && <Clock className="h-5 w-5" />}
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Capabilities" title="A full-stack growth engine." center />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Brand Strategy & Identity', v: 95 },
              { label: 'Performance Marketing', v: 92 },
              { label: 'Creative Systems & Content', v: 89 },
              { label: 'AI Marketing Automation', v: 94 },
              { label: 'Web Design & Development', v: 88 },
              { label: 'Analytics & Attribution', v: 86 },
            ].map((k, i) => (
              <Card key={i} className="p-6"><ProgressBar value={k.v} label={k.label} /></Card>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Team voices" title="Trusted by premium founders & operators." center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-7">
                <div className="flex items-center gap-1">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="mt-4 text-neutral-700 leading-relaxed">"{t.message}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                  <div><div className="font-bold text-sm text-neutral-900">{t.name}</div><div className="text-xs text-neutral-500">{t.role} · {t.company}</div></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
      <SmartCTA />
    </>
  );
}
