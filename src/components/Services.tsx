import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  Palette, Share2, Award, Sparkles, Printer, Package,
  Target, TrendingUp, FileText, PenTool, Search, Cpu,
  ArrowRight
} from 'lucide-react';

const serviceIcons: Record<string, any> = {
  palette: Palette,
  'share-2': Share2,
  award: Award,
  sparkles: Sparkles,
  printer: Printer,
  package: Package,
  target: Target,
  'chart-line': TrendingUp,
  'file-text': FileText,
  'pen-tool': PenTool,
  search: Search,
  cpu: Cpu,
};

export default function Services() {
  const { services } = useStore();

  const featuredServices = services.filter(s => s.featured);
  const allServices = services;

  const iconMap: Record<string, any> = {
    'Graphic Design': Palette,
    'Social Media Design': Share2,
    'Logo Design': Award,
    'Branding': Sparkles,
    'Print Design': Printer,
    'Packaging Design': Package,
    'Media Buying': Target,
    'Marketing Strategy': TrendingUp,
    'Content Writing': FileText,
    'Copywriting': PenTool,
    'SEO Content': Search,
    'AI Content Creation': Cpu,
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            My Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Offer</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive creative and marketing solutions tailored to elevate your brand and drive results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allServices.map((service, index) => {
            const Icon = iconMap[service.name] || Palette;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200"
              >
                {service.featured && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}
                
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>

                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700"
                >
                  Learn more
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
          >
            Get a Custom Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
