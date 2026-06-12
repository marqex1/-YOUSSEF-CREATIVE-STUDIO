// Deterministic-ish "AI" content generator.
// No network calls; produces varied marketing copy structures based on randomized hooks, frameworks, and CTA patterns.
// In production this is swapped for OpenAI / Gemini / Claude calls controlled by AISettings in the store.

const hooks = [
  'Stop guessing. Start scaling.',
  'What if every click felt inevitable?',
  'The premium growth secret nobody talks about.',
  'Your biggest growth lever is not another ad.',
  'Ready to make premium revenue feel automatic?',
  'We turned $1 into $7. Here is exactly how.',
  'Growth is a system. Not a campaign.',
  'Your next 8 figures live inside the right offer.',
  'Brands that compound do these 3 things.',
  'What 92% of premium founders miss.',
];

const hooksB = [
  'Most premium brands confuse activity with traction.',
  'If you want premium growth, stop copying premium brands.',
  'Scale arrives when positioning meets performance.',
  'The #1 bottleneck is never budget. It is architecture.',
  'A great offer beats a great creative team.',
];

const mid = [
  'We help premium founders, operators, and category leaders architect growth engines that compound over time.',
  'We combine premium brand strategy, performance infrastructure, and AI creative systems into a single operating system.',
  'Our clients launch with conviction, scale without chaos, and build brands that compound across channels.',
  'We do not run campaigns. We build growth infrastructure — the creative, offers, funnels, and analytics that keep revenue compounding.',
];

const proof = [
  'Average ROAS 4.8× across current portfolio.',
  '184% average lead volume lift in 90 days.',
  '8-figure exits attributed to our positioning work.',
  'Creative systems used by 40+ premium teams.',
];

const ctas = [
  'Book a discovery call',
  'Start a project',
  'Request your audit',
  'Launch with us',
  'Talk to our strategy team',
  'See if we are a fit',
  'Take the 2-minute audit',
];

const offerFrames = [
  'The no-BS premium growth partner for serious operators.',
  'Brand systems for teams tired of one-off campaigns.',
  'Growth architecture, from positioning to pipeline.',
  'Creative strategy that scales beyond the founder.',
];

function r<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rMany<T>(arr: T[], n: number): T[] { const out: T[] = []; const copy = [...arr]; while (out.length < n && copy.length > 0) { const i = Math.floor(Math.random() * copy.length); out.push(copy[i]); copy.splice(i, 1); } return out; }

export interface AIGenerationResult {
  title: string;
  hook: string;
  body: string;
  bullets: string[];
  cta: string;
  meta: string;
}

export function generateCaption(topic: string, tone = 'premium'): AIGenerationResult {
  const h = r(hooks);
  const bullets = rMany([
    `Clarify the premium promise of ${topic || 'your brand'}.`,
    `Rewrite the hero of ${topic || 'your offer'} around one core tension.`,
    `Build a conversion stack for ${topic || 'your offer'} that compounds.`,
    `Make every impression of ${topic || 'your brand'} feel inevitable.`,
    `Position ${topic || 'your offer'} inside a premium category of one.`,
  ], 4);
  return {
    title: `${topic || 'Brand'} · ${r(['Growth Architecture', 'Premium Launch System', 'Creative Operating System'])}`,
    hook: h,
    body: `${r(mid)} ${r(mid)} ${r(proof)}`,
    bullets,
    cta: r(ctas),
    meta: `${tone} · ${topic || 'brand'} · ~120 words`,
  };
}

export function generateAdCopy(product: string, angle = 'performance'): AIGenerationResult {
  const bullets = rMany([
    `Hook: ${r(hooksB)}`,
    `Pain point: Most ${product || 'brands'} are leaving 70% of growth on the table.`,
    `Proof: ${r(proof)}`,
    `Offer: Premium architecture + launch in 30 days.`,
  ], 4);
  return {
    title: `${product || 'Product'} · ${angle} ad`,
    hook: r(hooksB),
    body: `${r(hooks)} ${r(mid)} ${r(offerFrames)} ${r(proof)}`,
    bullets,
    cta: r(ctas),
    meta: `${angle} · copy + headline + CTA`,
  };
}

export function generateCreativeBrief(business: string): AIGenerationResult {
  const bullets = rMany([
    `Business: ${business || 'Premium DTC brand'}`,
    `Category: Premium / premium-adjacent`,
    `Primary goal: Position + scale revenue`,
    `Core tension: Premium positioning vs. premium performance`,
    `Guardrail: Never sacrifice premium for performance.`,
  ], 4);
  return {
    title: `Creative Brief · ${business || 'Brand'}`,
    hook: `${business || 'Your brand'} can scale without losing its soul.`,
    body: `${r(mid)} ${r(offerFrames)} ${r(proof)}`,
    bullets,
    cta: r(ctas),
    meta: 'Brief · 4-page',
  };
}

export function generateContentIdeas(topic: string): AIGenerationResult {
  const bullets = rMany([
    `The quiet death of the ${topic || 'premium'} campaign model.`,
    `3 ${topic || 'brand'} systems that compound beyond the founder.`,
    `What 92% of ${topic || 'brand'} teams get wrong about offers.`,
    `A premium ${topic || 'brand'} growth playbook, from zero to 8 figures.`,
    `The ${topic || 'brand'} operating system used by premium founders.`,
    `Why your ${topic || 'brand'} strategy keeps failing — and how to fix it.`,
    `How premium ${topic || 'brand'} teams plan their quarterly creative.`,
  ], 6);
  return {
    title: `Content Ideas · ${topic || 'Brand'}`,
    hook: r(hooks),
    body: `${r(mid)} ${r(offerFrames)}`,
    bullets,
    cta: r(ctas),
    meta: `${bullets.length} ideas · varied formats`,
  };
}

export function generateCampaign(campaignName: string): AIGenerationResult {
  const bullets = [
    `Phase 1 — Offer architecture · positioning doc`,
    `Phase 2 — Creative system · 40+ assets`,
    `Phase 3 — Paid pilot · 3 channels`,
    `Phase 4 — Scale + attribution stack`,
  ];
  return {
    title: `${campaignName || 'Campaign'} · Launch plan`,
    hook: r(hooks),
    body: `${r(mid)} ${r(offerFrames)} ${r(proof)}`,
    bullets,
    cta: r(ctas),
    meta: '90-day plan',
  };
}

export function generateSEO(topic: string): AIGenerationResult {
  const bullets = rMany([
    `Primary keyword: ${topic || 'premium marketing agency'}`,
    `Secondary: ${topic || 'agency'} for premium brands, ${topic || 'creative'} agency pricing, ${topic || 'growth'} studio`,
    `Content clusters: offers → positioning → case studies`,
    `Featured snippet target: How to ${topic || 'scale a premium brand'}`,
    `Internal link map: service → portfolio → case study → blog`,
    `Schema: LocalBusiness + Article + FAQPage`,
  ], 5);
  return {
    title: `SEO Plan · ${topic || 'Brand'}`,
    hook: `Build an SEO engine for ${topic || 'your premium brand'} that compounds.`,
    body: `${r(mid)} ${r(offerFrames)}`,
    bullets,
    cta: r(ctas),
    meta: 'on-page + off-page + technical',
  };
}

export function generateMarketingStrategy(business: string): AIGenerationResult {
  const bullets = [
    `1. Positioning · category-of-one architecture`,
    `2. Offer · premium flagship + scalable entry offer`,
    `3. Creative system · editorial + performance hybrid`,
    `4. Demand engine · content + paid + founder distribution`,
    `5. Analytics · attribution + leading-indicator scorecards`,
  ];
  return {
    title: `Strategy · ${business || 'Your brand'}`,
    hook: r(hooks),
    body: `${r(mid)} ${r(offerFrames)}`,
    bullets,
    cta: r(ctas),
    meta: '12-month strategy',
  };
}

export function generateSalesScript(scenario: string): AIGenerationResult {
  const bullets = rMany([
    `Opening: ${r(hooks)}`,
    `Diagnostic: “Walk me through the last 90 days.”`,
    `Quantify: “What is the cost of not fixing this?”`,
    `Offer: Premium architecture, launch in 30 days.`,
    `Close: “Does next Tuesday work to kick this off?”`,
  ], 4);
  return {
    title: `Sales Script · ${scenario || 'Discovery'}`,
    hook: r(hooksB),
    body: `${r(mid)} ${r(proof)}`,
    bullets,
    cta: 'Book next step',
    meta: 'discovery · 30 minutes',
  };
}

export function generateOffer(offerName: string): AIGenerationResult {
  const bullets = [
    `Flagship: Premium ${offerName || 'growth'} architecture · 90 days`,
    `Entry: ${offerName || 'Brand'} audit + positioning doc`,
    `Scalable: Retainer + performance incentives`,
    `Bundles: Brand + web + launch in 30 days`,
  ];
  return {
    title: `Offer Architecture · ${offerName || 'Service'}`,
    hook: r(hooks),
    body: `${r(mid)} ${r(offerFrames)}`,
    bullets,
    cta: r(ctas),
    meta: '4 offers · price ladder',
  };
}

export function generateEmail(purpose: string): AIGenerationResult {
  const bullets = rMany([
    `Subject: ${r(hooks)}`,
    `Preheader: ${r(offerFrames)}`,
    `Opening: ${r(hooksB)}`,
    `Offer: Premium architecture in 30 days.`,
    `PS: Limited to 4 new ${purpose || 'clients'} this month.`,
  ], 4);
  return {
    title: `Email · ${purpose || 'Outreach'}`,
    hook: r(hooks),
    body: `${r(mid)} ${r(offerFrames)} ${r(proof)}`,
    bullets,
    cta: 'Reply to book',
    meta: 'sequence · 5 emails',
  };
}

export function generateWhatsApp(campaign: string): AIGenerationResult {
  const bullets = rMany([
    `Message 1: ${r(hooks)} — 280 chars`,
    `Message 2: ${r(offerFrames)} — with preview`,
    `Message 3: ${r(proof)} — with social proof`,
    `Message 4: CTA + limited window`,
  ], 4);
  return {
    title: `WhatsApp · ${campaign || 'Campaign'}`,
    hook: r(hooks),
    body: `${r(mid)} ${r(offerFrames)}`,
    bullets,
    cta: r(ctas),
    meta: 'broadcast · 4 touches',
  };
}

export function generateLandingPage(topic: string): AIGenerationResult {
  const bullets = [
    `Hero: Hook · Sub · Visual · 1 CTA`,
    `Problem · Agitation · Solution`,
    `Proof · Logos · Case · Metrics`,
    `Offer · Objection handling · Final CTA`,
    `Exit-intent · Sticky CTA · Live chat`,
  ];
  return {
    title: `Landing Page · ${topic || 'Offer'}`,
    hook: r(hooks),
    body: `${r(mid)} ${r(offerFrames)}`,
    bullets,
    cta: r(ctas),
    meta: '8-section · conversion-focused',
  };
}

export function generateImagePrompt(subject: string): AIGenerationResult {
  const bullets = rMany([
    `Style: editorial premium, cinematic, warm tones`,
    `Composition: negative space, premium typography-ready`,
    `Color: cream, deep burgundy, soft gold accents`,
    `Lighting: soft directional, late afternoon`,
    `Mood: confident, unhurried, premium`,
  ], 4);
  return {
    title: `Image Prompt · ${subject || 'Subject'}`,
    hook: `Premium ${subject || 'visual'} with negative space for copy.`,
    body: `${r(mid)}`,
    bullets,
    cta: 'Use in Midjourney / DALL-E',
    meta: '5 prompt variants',
  };
}

export type AITool =
  | 'caption' | 'ad-copy' | 'brief' | 'content-ideas' | 'campaign'
  | 'seo' | 'strategy' | 'sales-script' | 'offer' | 'email'
  | 'whatsapp' | 'landing' | 'image-prompt';

export function runAITool(tool: AITool, input: string): AIGenerationResult {
  switch (tool) {
    case 'caption': return generateCaption(input);
    case 'ad-copy': return generateAdCopy(input);
    case 'brief': return generateCreativeBrief(input);
    case 'content-ideas': return generateContentIdeas(input);
    case 'campaign': return generateCampaign(input);
    case 'seo': return generateSEO(input);
    case 'strategy': return generateMarketingStrategy(input);
    case 'sales-script': return generateSalesScript(input);
    case 'offer': return generateOffer(input);
    case 'email': return generateEmail(input);
    case 'whatsapp': return generateWhatsApp(input);
    case 'landing': return generateLandingPage(input);
    case 'image-prompt': return generateImagePrompt(input);
  }
}
