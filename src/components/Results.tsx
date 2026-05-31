import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Target, DollarSign, Users, Eye, MousePointer, Award } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

const platformIcons: Record<string, any> = {
  'Facebook': '📘',
  'Instagram': '📸',
  'Google': '🔍',
  'TikTok': '🎵',
  'LinkedIn': '💼',
  'Twitter': '🐦',
  'YouTube': '📺',
  'Snapchat': '👻',
};

export default function Results() {
  const { campaigns } = useStore();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  // Calculate aggregate stats
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgCTR = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length : 0;
  const avgROAS = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length : 0;

  // Prepare chart data
  const performanceData = campaigns.slice(0, 7).map(c => ({
    name: c.campaignName.substring(0, 15) + '...',
    reach: c.reach,
    conversions: c.conversions,
    ctr: c.ctr,
  }));

  const platformDistribution = campaigns.reduce((acc, c) => {
    const existing = acc.find(p => p.name === c.platform);
    if (existing) {
      existing.value += c.impressions;
    } else {
      acc.push({ name: c.platform, value: c.impressions });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <section id="results" className="py-20 lg:py-32 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
            Media Buying Results
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Campaign <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Performance</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real results from successful marketing campaigns across multiple platforms.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-bold text-gray-900">{(totalReach / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-sm text-gray-600">Total Reach</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <Eye className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">{(totalImpressions / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-sm text-gray-600">Impressions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <Target className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{totalConversions.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Conversions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <MousePointer className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">{avgCTR.toFixed(2)}%</span>
            </div>
            <p className="text-sm text-gray-600">Avg. CTR</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{avgROAS.toFixed(1)}x</span>
            </div>
            <p className="text-sm text-gray-600">Avg. ROAS</p>
          </motion.div>
        </div>

        {/* Charts */}
        {campaigns.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Campaign Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="reach" stroke="#6366f1" fillOpacity={1} fill="url(#colorReach)" />
                  <Area type="monotone" dataKey="conversions" stroke="#10b981" fillOpacity={1} fill="url(#colorConversions)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Platform Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Platform Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}

        {/* Campaign List */}
        {campaigns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Campaign Details</h3>
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCampaign(campaign)}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{platformIcons[campaign.platform] || '📊'}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{campaign.campaignName}</h4>
                      <p className="text-sm text-gray-600">{campaign.platform} • {campaign.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">${campaign.budget.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Budget</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{campaign.roas}x</div>
                      <div className="text-xs text-gray-500">ROAS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-indigo-600">{campaign.ctr}%</div>
                      <div className="text-xs text-gray-500">CTR</div>
                    </div>
                    <Award className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {campaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campaign Results Yet</h3>
            <p className="text-gray-600 mb-6">Start adding campaign results from the admin dashboard.</p>
            <a
              href="/admin-login"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Go to Dashboard
            </a>
          </motion.div>
        )}

        {/* Campaign Detail Modal */}
        <AnimatePresence>
          {selectedCampaign && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedCampaign(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-4xl mr-3">{platformIcons[selectedCampaign.platform] || '📊'}</span>
                      <h3 className="text-3xl font-bold text-gray-900">{selectedCampaign.campaignName}</h3>
                      <p className="text-gray-600 mt-2">{selectedCampaign.notes}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCampaign(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Budget</p>
                      <p className="text-2xl font-bold text-gray-900">${selectedCampaign.budget.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Reach</p>
                      <p className="text-2xl font-bold text-gray-900">{(selectedCampaign.reach / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Impressions</p>
                      <p className="text-2xl font-bold text-gray-900">{(selectedCampaign.impressions / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Conversions</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCampaign.conversions.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">CTR</p>
                      <p className="text-xl font-bold text-gray-900">{selectedCampaign.ctr}%</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">CPC</p>
                      <p className="text-xl font-bold text-gray-900">${selectedCampaign.cpc.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">CPM</p>
                      <p className="text-xl font-bold text-gray-900">${selectedCampaign.cpm.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">ROAS</p>
                      <p className="text-xl font-bold text-green-600">{selectedCampaign.roas}x</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Platform</p>
                      <p className="text-xl font-bold text-gray-900">{selectedCampaign.platform}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
