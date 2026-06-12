import { useState, useEffect } from 'react';
import { Container, PageHeader, Card, Button, Badge, Input, Textarea, Select } from '../components/ui/DesignSystem';
import { useStore } from '../store/StoreContext';
import { SmartCTA } from '../components/Layout';
import { Mail, Phone, MapPin, CheckCircle2, Send, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const { brand, site, addContact, track } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Brand & Growth Project', budget: '10k-25k', message: '', source: 'contact-form' });
  const [sent, setSent] = useState(false);
  useEffect(() => { track('view', '/contact'); }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    addContact({ ...form });
    track('conversion', '/contact', { source: 'contact-form' });
    setSent(true);
    setForm({ name: '', email: '', phone: '', subject: 'Brand & Growth Project', budget: '10k-25k', message: '', source: 'contact-form' });
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's architect your growth operating system." description="Tell us about your brand and goals. We will respond with a premium plan within one business day." />
      <Container className="py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-5">
            <Card className="p-7" style={{ backgroundColor: brand.secondaryColor }}>
              <Badge color="primary"><Sparkles className="h-3 w-3" /> Studio hours</Badge>
              <h3 className="mt-4 text-2xl font-bold text-neutral-900">Premium, unhurried.</h3>
              <p className="mt-3 text-neutral-800 text-sm leading-relaxed">We take on 4 new premium partners per quarter. Every engagement starts with a premium audit and positioning doc.</p>
              <div className="mt-6 space-y-3 text-sm text-neutral-800">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: brand.primaryColor }} />{site.email}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: brand.primaryColor }} />{site.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" style={{ color: brand.primaryColor }} />{site.address}</div>
              </div>
            </Card>
            <Card className="p-7">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Response window</div>
              <div className="mt-2 text-lg font-bold text-neutral-900">1 business day</div>
              <p className="mt-2 text-sm text-neutral-600">We respond to every qualified inquiry. Please allow one business day for a premium, thoughtful response.</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                {['Free initial discovery call', 'Premium audit within 72 hours', 'Action plan + proposal within 7 days'].map(x => <li key={x} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: brand.primaryColor }} />{x}</li>)}
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-7">
            <Card className="p-8">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto h-16 w-16 rounded-3xl flex items-center justify-center" style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}><CheckCircle2 className="h-8 w-8" /></div>
                  <h3 className="mt-5 text-2xl font-bold text-neutral-900">Message received.</h3>
                  <p className="mt-2 text-neutral-600">A premium, thoughtful response is on its way within one business day. In the meantime, feel free to request a free marketing audit.</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button onClick={() => setSent(false)} className="inline-flex items-center justify-center font-semibold tracking-tight transition-all rounded-2xl px-5 py-2.5 text-sm text-white hover:-translate-y-0.5" style={{ backgroundColor: brand.primaryColor }}>Send another</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Project inquiry</div>
                  <h3 className="text-2xl font-bold text-neutral-900">Tell us about your brand.</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Founder" />
                    <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
                    <Input label="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 000 0000" />
                    <Select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} options={[
                      { value: 'Brand & Growth Project', label: 'Brand & Growth Project' },
                      { value: 'Performance Marketing', label: 'Performance Marketing' },
                      { value: 'Creative / AI Studio', label: 'Creative / AI Studio' },
                      { value: 'Web Design & Development', label: 'Web Design & Development' },
                      { value: 'Marketing Audit', label: 'Marketing Audit' },
                      { value: 'Other / Partnership', label: 'Other / Partnership' },
                    ]} />
                    <Select label="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} options={[
                      { value: '<10k', label: 'Under $10k' },
                      { value: '10k-25k', label: '$10k — $25k' },
                      { value: '25k-50k', label: '$25k — $50k' },
                      { value: '50k-100k', label: '$50k — $100k' },
                      { value: '100k+', label: '$100k+' },
                    ]} />
                    <div className="md:col-span-2"><Textarea label="Project overview" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your brand, goals, and timeline." /></div>
                  </div>
                  <Button type="submit" size="lg" block>Send inquiry <Send className="ml-1.5 h-4 w-4" /></Button>
                  <p className="text-xs text-center text-neutral-500">By submitting, you agree to be contacted about your project. Your data is private and never shared.</p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
      <SmartCTA title="Need a quick diagnosis first?" subtitle="Try our free marketing audit — 9 dimensions scored in under 60 seconds." actionLabel="Start audit" />
    </>
  );
}
