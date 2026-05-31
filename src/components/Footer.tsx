import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Sparkles, Heart, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { siteSettings, socialLinks } = useStore();
  const activeLinks = socialLinks.filter(l => l.active);

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{siteSettings.heroTitle}</h3>
                <p className="text-white/60 text-sm">Creative Studio</p>
              </div>
            </div>
            <p className="text-white/60 mb-6 max-w-md">
              Transforming ideas into stunning visual experiences. Professional creative services for brands that want to stand out.
            </p>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Writing', 'Results', 'AI Studio', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {['Graphic Design', 'Branding', 'Media Buying', 'Content Writing', 'Copywriting', 'AI Creative Tools'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-white/60 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-white/60">Follow me:</span>
              <div className="flex space-x-3">
                {activeLinks.slice(0, 5).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"
                    title={link.name}
                  >
                    {link.icon === 'message-circle' && <MessageCircle className="w-5 h-5" />}
                    {link.icon === 'facebook' && <span className="text-sm font-bold">f</span>}
                    {link.icon === 'instagram' && <span className="text-sm">📷</span>}
                    {link.icon === 'linkedin' && <span className="text-sm font-bold">in</span>}
                    {link.icon === 'external-link' && <span className="text-sm">🎨</span>}
                    {link.icon === 'music' && <span className="text-sm">🎵</span>}
                    {link.icon === 'youtube' && <span className="text-sm">▶️</span>}
                  </a>
                ))}
              </div>
            </div>
            <p className="text-white/40 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by Youssef
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Youssef Creative Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
