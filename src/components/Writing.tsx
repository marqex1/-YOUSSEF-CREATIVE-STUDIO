import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { FileText, Book, MessageSquare, Mail, FileCheck, Search } from 'lucide-react';

const contentCategories = ['All', 'Blog Writing', 'Social Media Content', 'Ad Copy', 'Product Description', 'Website Content', 'SEO Articles', 'Email Marketing'];

const contentTypeIcons: Record<string, any> = {
  'Blog Writing': Book,
  'Social Media Content': MessageSquare,
  'Ad Copy': FileText,
  'Product Description': FileCheck,
  'Website Content': Search,
  'SEO Articles': Book,
  'Email Marketing': Mail,
};

export default function Writing() {
  const { articles } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <section id="writing" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Content Writing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Writing <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compelling content that engages audiences and drives action across all platforms.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {contentCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredArticles.map((article, index) => {
                const Icon = contentTypeIcons[article.contentType] || FileText;
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Platform Badge */}
                    <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium mb-3">
                      {article.platform}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Preview */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.preview || 'Click to read more...'}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{article.contentType}</span>
                      <span className="text-green-600 font-medium">Read More →</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Writing Projects Yet</h3>
            <p className="text-gray-600 mb-6">Start adding content projects from the admin dashboard.</p>
            <a
              href="/admin-login"
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Go to Dashboard
            </a>
          </motion.div>
        )}

        {/* Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
                        {selectedArticle.category}
                      </span>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {selectedArticle.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {selectedArticle.contentType}
                    </span>
                    <span>•</span>
                    <span>{selectedArticle.platform}</span>
                  </div>

                  <div className="prose max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Preview</h4>
                    <p className="text-gray-600 mb-6">{selectedArticle.preview}</p>

                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Full Content</h4>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedArticle.fullContent || selectedArticle.preview}
                      </p>
                    </div>
                  </div>

                  {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {selectedArticle.tags.map((tag: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
