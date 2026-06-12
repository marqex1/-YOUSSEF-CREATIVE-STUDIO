import { useState, useEffect } from 'react';
import { Container, PageHeader, Card, Badge, Button, Input, Select } from '../components/ui/DesignSystem';
import { SmartCTA } from '../components/Layout';
import { useStore } from '../store/StoreContext';
import { runAITool, AITool, AIGenerationResult } from '../lib/ai';
import { Sparkles, Wand2, Copy, CheckCircle2, RefreshCw, Zap, FileText, Megaphone, Target, Lightbulb, BarChart3, Cpu, Mail, MessageSquare, Layout, Image, Rocket, Hash } from 'lucide-react';

interface ToolDef {
  id: AITool;
  label: string;
  description: string;
  icon: any;
  placeholder: string;
}

const TOOLS: ToolDef[] = [
  { id: 'caption', label: 'Caption Generator', description: 'Editorial-grade captions tuned for premium brands.', icon: Hash, placeholder: 'Premium skincare brand' },
  { id: 'ad-copy', label: 'Ad Copy Generator', description: 'Hook · Proof · Offer · CTA — never the same structure twice.', icon: Megaphone, placeholder: 'Growth analytics SaaS' },
  { id: 'brief', label: 'Creative Brief', description: 'A premium brief ready for your creative team.', icon: FileText, placeholder: 'Luxury DTC brand launch' },
  { id: 'content-ideas', label: 'Content Ideas', description: 'A month of premium content ideas in seconds.', icon: Lightbulb, placeholder: 'Premium B2B SaaS' },
  { id: 'campaign', label: 'Campaign Builder', description: 'A 90-day premium launch plan, fully structured.', icon: Rocket, placeholder: 'Premium skincare line' },
  { id: 'seo', label: 'SEO Blueprint', description: 'Keywords, clusters, schema, and internal link map.', icon: Target, placeholder: 'Creative agency pricing' },
  { id: 'strategy', label: 'Marketing Strategy', description: 'A 12-month premium growth operating system.', icon: Cpu, placeholder: 'Your brand' },
  { id: 'sales-script', label: 'Sales Script', description: 'Discovery-call scripts tuned for premium founders.', icon: Zap, placeholder: 'Premium SaaS discovery' },
  { id: 'offer', label: 'Offer Architect', description: 'Flagship · entry · scalable bundles.', icon: BarChart3, placeholder: 'Growth agency' },
  { id: 'email', label: 'Email Sequence', description: 'Subject · preheader · body · PS.', icon: Mail, placeholder: 'Launch follow-up' },
  { id: 'whatsapp', label: 'WhatsApp Broadcast', description: '4-touch premium broadcast sequence.', icon: MessageSquare, placeholder: 'Holiday launch' },
  { id: 'landing', label: 'Landing Page', description: 'An 8-section conversion-focused page.', icon: Layout, placeholder: 'Premium audit offer' },
  { id: 'image-prompt', label: 'Image Prompt Generator', description: 'Prompts tuned for Midjourney / DALL-E.', icon: Image, placeholder: 'Premium coffee brand' },
];

export default function AIStudioPage() {
  const { brand, ai, track, addLead } = useStore();
  const [active, setActive] = useState<AITool>('caption');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AIGenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);

  const tool = TOOLS.find(t => t.id === active)!;
  useEffect(() => { track('view', '/ai-studio'); }, []);

  const run = () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    track('ai-generate', `/ai-studio/${active}`, { tool: active, input });
    setTimeout(() => {
      const r = runAITool(active, input);
      // Apply model temperature/settings for "variation feel"
      if (ai.temperature > 0.7) {
        r.body = r.body.split(' ').map(w => Math.random() < 0.04 ? w.toUpperCase() : w).join(' ');
      }
      setResult(r);
      setLoading(false);
    }, 700 + Math.random() * 800);
  };

  const copy = () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.hook}\n\n${result.body}\n\n${result.bullets.map((b, i) => `${i + 1}. ${b}`).join('\n')}\n\nCTA: ${result.cta}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  const capture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.includes('@')) return;
    addLead({ name: leadEmail.split('@')[0], email: leadEmail, source: 'ai-studio', status: 'warm', score: 58 });
    track('lead', '/ai-studio', { source: 'ai-studio' });
    setLeadCaptured(true);
    setLeadEmail('');
  };

  return (
    <>
      <PageHeader eyebrow="AI Studio" title="In-house AI creative tools — tuned for premium brands." description="Thirteen tools. One premium operating system. Never the same output twice." actions={<><Badge color="primary"><Sparkles className="h-3 w-3" /> Provider · {ai.provider} / {ai.model}</Badge></>} />
      <Container className="py-16">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Tools</div>
            {TOOLS.map(t => (
              <button key={t.id} onClick={() => { setActive(t.id); setResult(null); setInput(''); }} className={`w-full text-left p-4 rounded-2xl border transition-all ${active === t.id ? 'border-transparent shadow-lg' : 'border-neutral-100 bg-white hover:bg-neutral-50'}`} style={active === t.id ? { backgroundColor: brand.secondaryColor } : undefined}>
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: active === t.id ? brand.primaryColor : '#F1EFEC', color: active === t.id ? '#fff' : brand.primaryColor }}><t.icon className="h-4 w-4" /></div>
                  <div>
                    <div className="font-bold text-sm text-neutral-900">{t.label}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{t.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </aside>
          <section className="lg:col-span-8 space-y-5">
            <Card className="p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="primary"><Wand2 className="h-3 w-3" /> Tool</Badge>
                <h2 className="text-2xl font-bold text-neutral-900">{tool.label}</h2>
              </div>
              <p className="mt-2 text-sm text-neutral-600">{tool.description}</p>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Input label="Topic / Brand / Project" placeholder={tool.placeholder} value={input} onChange={(e) => setInput(e.target.value)} />
                <Select label="Output length" value="standard" onChange={() => {}} options={[{ value: 'short', label: 'Short' }, { value: 'standard', label: 'Standard' }, { value: 'long', label: 'Long' }]} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={run} disabled={loading}>{loading ? <><RefreshCw className="animate-spin h-4 w-4 mr-1.5" />Generating…</> : <><Wand2 className="h-4 w-4 mr-1.5" />Generate</>}</Button>
                <Button variant="outline" onClick={() => { setInput(''); setResult(null); }}>Reset</Button>
              </div>
              <div className="mt-6 text-xs text-neutral-500 flex items-center gap-4">
                <span>Temperature: {ai.temperature}</span>
                <span>Max tokens: {ai.maxTokens}</span>
                <span>Model: {ai.model}</span>
              </div>
            </Card>

            {result ? (
              <Card className="p-7 border-l-4" style={{ borderLeftColor: brand.primaryColor }}>
                <div className="flex items-center justify-between">
                  <Badge color="primary">Generated · {result.meta}</Badge>
                  <Button variant="outline" size="sm" onClick={copy}>{copied ? <><CheckCircle2 className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy all</>}</Button>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-neutral-900">{result.title}</h3>
                <div className="mt-4 rounded-2xl p-6" style={{ backgroundColor: brand.secondaryColor }}>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Hook</div>
                  <div className="mt-1 text-lg font-bold text-neutral-900">{result.hook}</div>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-3">
                  {result.bullets.map((b, i) => (
                    <div key={i} className="rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4 text-sm text-neutral-700"><span className="font-bold" style={{ color: brand.primaryColor }}>0{i + 1} · </span>{b}</div>
                  ))}
                </div>
                <div className="mt-6 text-neutral-700 leading-relaxed">{result.body}</div>
                <div className="mt-6 flex items-center gap-3">
                  <Badge color="primary"><Zap className="h-3 w-3" /> CTA</Badge>
                  <span className="font-bold text-neutral-900">{result.cta}</span>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center text-neutral-500">
                <Sparkles className="mx-auto h-10 w-10 mb-3" style={{ color: brand.primaryColor }} />
                <div className="font-bold text-neutral-900">Your generation will appear here.</div>
                <div className="mt-1 text-sm">Enter a topic and click Generate — output changes every time.</div>
              </Card>
            )}

            {!leadCaptured && (
              <Card className="p-7" style={{ backgroundColor: brand.secondaryColor }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <Badge color="primary">Stay in the loop</Badge>
                    <h3 className="mt-3 text-xl font-bold text-neutral-900">Monthly premium playbooks, straight to your inbox.</h3>
                    <p className="mt-1 text-sm text-neutral-700">Join 4,800+ founders. One email per month. Zero noise.</p>
                  </div>
                  <form onSubmit={capture} className="flex gap-2 min-w-[320px]">
                    <Input placeholder="you@company.com" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} className="flex-1" />
                    <Button type="submit">Subscribe</Button>
                  </form>
                </div>
              </Card>
            )}
          </section>
        </div>
      </Container>
      <SmartCTA title="Need a premium AI creative system for your team?" subtitle="We tune the AI Studio to your brand, offers, and voice — so every generation sounds like yours." />
    </>
  );
}
