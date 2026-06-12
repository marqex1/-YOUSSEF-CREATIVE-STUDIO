import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, HTMLAttributes } from 'react';
import { useStore } from '../../store/StoreContext';

export function useBranding() {
  const { brand, design } = useStore();
  return { brand, design };
}

// Border radius map
export const radiusMap: Record<string, string> = {
  none: 'rounded-none', sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg',
  xl: 'rounded-xl', '2xl': 'rounded-2xl', '3xl': 'rounded-3xl', full: 'rounded-full',
};
export const shadowMap: Record<string, string> = {
  none: '', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg', xl: 'shadow-xl',
};

export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  children?: ReactNode;
}
export function Button({ variant = 'primary', size = 'md', block, className, children, ...rest }: ButtonProps) {
  const { brand, design } = useStore();
  const r = radiusMap[design.borderRadius] || 'rounded-2xl';
  const sh = shadowMap[design.shadow] || 'shadow-lg';
  const sizeCls = size === 'sm' ? 'px-4 py-2 text-sm' : size === 'lg' ? 'px-6 py-3.5 text-base' : 'px-5 py-2.5 text-sm';
  const base = `inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 ${r} ${sizeCls} ${block ? 'w-full' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50`;
  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(base, sh, 'text-white hover:-translate-y-0.5 active:translate-y-0', className)}
        style={{ backgroundColor: brand.primaryColor, '--tw-ring-color': brand.primaryColor, '--hover': brand.accentColor } as any}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brand.accentColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = brand.primaryColor; }}
      >{children}</button>
    );
  }
  if (variant === 'secondary') {
    return (
      <button {...rest} className={cn(base, 'hover:-translate-y-0.5 active:translate-y-0', className)}
        style={{ backgroundColor: brand.secondaryColor, color: brand.primaryColor }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >{children}</button>
    );
  }
  if (variant === 'outline') {
    return (
      <button {...rest} className={cn(base, 'hover:-translate-y-0.5 active:translate-y-0 bg-white/70 backdrop-blur', className)}
        style={{ borderColor: brand.primaryColor, color: brand.primaryColor, borderWidth: 1.5 }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brand.primaryColor; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = brand.primaryColor; }}
      >{children}</button>
    );
  }
  return <button {...rest} className={cn(base, 'hover:bg-neutral-100', className)} style={{ color: brand.primaryColor }}>{children}</button>;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; hint?: string; }
export function Input({ label, hint, className, ...rest }: InputProps) {
  const { brand, design } = useStore();
  const r = radiusMap[design.borderRadius] || 'rounded-2xl';
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</span>}
      <input {...rest} className={cn('w-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-transparent focus:outline-none focus:ring-2', r, className)}
        style={{ '--tw-ring-color': brand.primaryColor } as any} />
      {hint && <span className="mt-1 block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; }
export function Textarea({ label, className, ...rest }: TextareaProps) {
  const { brand, design } = useStore();
  const r = radiusMap[design.borderRadius] || 'rounded-2xl';
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</span>}
      <textarea {...rest} className={cn('w-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 min-h-[120px]', r, className)}
        style={{ '--tw-ring-color': brand.primaryColor } as any} />
    </label>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label?: string; options: { value: string; label: string }[]; }
export function Select({ label, options, className, ...rest }: SelectProps) {
  const { brand, design } = useStore();
  const r = radiusMap[design.borderRadius] || 'rounded-2xl';
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</span>}
      <select {...rest} className={cn('w-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-transparent focus:outline-none focus:ring-2', r, className)}
        style={{ '--tw-ring-color': brand.primaryColor } as any}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

interface CardProps extends HTMLAttributes<HTMLDivElement> { children?: ReactNode; hoverable?: boolean; }
export function Card({ children, className, hoverable, ...rest }: CardProps) {
  const { design } = useStore();
  const r = radiusMap[design.borderRadius] || 'rounded-2xl';
  const sh = shadowMap[design.shadow] || 'shadow-md';
  return (
    <div {...rest} className={cn('bg-white border border-neutral-100', r, sh, hoverable && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl', className)}>
      {children}
    </div>
  );
}

interface BadgeProps { children: ReactNode; color?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning'; className?: string; }
export function Badge({ children, color = 'primary', className }: BadgeProps) {
  const { brand } = useStore();
  if (color === 'primary') return <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full', className)} style={{ backgroundColor: brand.primaryColor + '22', color: brand.primaryColor }}>{children}</span>;
  if (color === 'secondary') return <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full', className)} style={{ backgroundColor: brand.secondaryColor, color: brand.primaryColor }}>{children}</span>;
  if (color === 'success') return <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700', className)}>{children}</span>;
  if (color === 'warning') return <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700', className)}>{children}</span>;
  return <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-700', className)}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, subtitle, center }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  const { brand } = useStore();
  return (
    <div className={cn('max-w-3xl mb-12', center && 'mx-auto text-center')}>
      {eyebrow && <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: brand.primaryColor }}>{eyebrow}</div>}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-neutral-600 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function Container({ children, className, narrow }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return <div className={cn('mx-auto w-full', narrow ? 'max-w-4xl' : 'max-w-7xl', 'px-5 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-neutral-100" style={{ background: 'linear-gradient(180deg, #F7F4EF, #FFFFFF)' }}>
      <Container className="py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            {eyebrow && <Badge color="secondary">{eyebrow}</Badge>}
            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight text-neutral-900">{title}</h1>
            {description && <p className="mt-4 max-w-2xl text-lg text-neutral-600 leading-relaxed">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="py-20 text-center">
      {icon && <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">{icon}</div>}
      <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Pill({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  const { brand, design } = useStore();
  const r = radiusMap[design.borderRadius] || 'rounded-2xl';
  return (
    <button onClick={onClick} className={cn('px-4 py-2 text-sm font-semibold transition-all border', r)}
      style={active ? { backgroundColor: brand.primaryColor, borderColor: brand.primaryColor, color: '#fff' } : { backgroundColor: '#fff', borderColor: '#e5e5e5', color: '#404040' }}
    >{children}</button>
  );
}

// Animated counter
import { useEffect, useRef, useState } from 'react';
export function AnimatedNumber({ value, duration = 1400, prefix = '', suffix = '' }: { value: number; duration?: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            setN(Math.floor(p * value));
            if (p < 1) requestAnimationFrame(step);
            else setN(value);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

// Progress bar with animation
export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const [p, setP] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const { brand } = useStore();
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => setP(value), 50);
        }
      });
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref}>
      {label && <div className="mb-1.5 flex items-center justify-between text-sm font-medium text-neutral-700"><span>{label}</span><span style={{ color: brand.primaryColor }}>{Math.round(p)}%</span></div>}
      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full rounded-full transition-all duration-[1500ms] ease-out" style={{ width: `${p}%`, backgroundColor: brand.primaryColor }} />
      </div>
    </div>
  );
}

export function Modal({ open, onClose, title, children, size = 'md' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open) return null;
  const w = size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-3xl' : size === 'xl' ? 'max-w-5xl' : 'max-w-xl';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={`w-full ${w} bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100`}>
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500">✕</button>
        </div>
        <div className="p-6 max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
