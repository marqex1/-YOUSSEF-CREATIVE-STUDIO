import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Sparkles, Wand2, Image as ImageIcon, FileText, MessageSquare, Upload, Download, Copy, Check, Loader2 } from 'lucide-react';

export default function AIStudio() {
  const { addAIHistory } = useStore();
  const [activeTool, setActiveTool] = useState('caption');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Tool States
  const [captionInput, setCaptionInput] = useState('');
  const [captionLanguage, setCaptionLanguage] = useState('english');
  const [captionType, setCaptionType] = useState('marketing');

  const [writerInput, setWriterInput] = useState('');
  const [writerType, setWriterType] = useState('article');
  const [writerLanguage, setWriterLanguage] = useState('english');

  const [imageInput, setImageInput] = useState<string | null>(null);
  const [enhancementLevel, setEnhancementLevel] = useState('hd');

  const [mockupType, setMockupType] = useState('billboard');
  const [mockupImage, setMockupImage] = useState<string | null>(null);

  const tools = [
    { id: 'caption', name: 'AI Caption Generator', icon: MessageSquare, color: 'from-blue-500 to-indigo-600' },
    { id: 'writer', name: 'AI Content Writer', icon: FileText, color: 'from-green-500 to-teal-600' },
    { id: 'enhancer', name: 'AI Image Enhancer', icon: ImageIcon, color: 'from-purple-500 to-pink-600' },
    { id: 'mockup', name: 'AI Mockup Generator', icon: Wand2, color: 'from-orange-500 to-red-600' },
  ];

  const mockupTypes = [
    'Billboard', 'Phone', 'Laptop', 'Instagram', 'Facebook',
    'Packaging', 'Business Card', 'Uniform', 'T-Shirt', 'Mug', 'Rollup', 'Signboard'
  ];

  const handleGenerateCaption = async () => {
    setIsLoading(true);
    setResult('');

    // Simulate AI generation
    setTimeout(() => {
      const captions = {
        marketing: [
          "🚀 Transform your business today! Limited offer - Don't miss out! #Marketing #BusinessGrowth",
          "💡 Your success starts here. Discover the difference quality makes! #Success #Quality",
          "✨ Elevate your brand with us. Results that speak for themselves! #BrandGrowth #Results",
        ],
        headline: [
          "The Future of Innovation is Here",
          "Transform Your Vision into Reality",
          "Where Excellence Meets Innovation",
        ],
        cta: [
          "Start Your Journey Today →",
          "Get Your Free Quote Now!",
          "Join Thousands of Happy Customers",
        ],
        hashtags: [
          "#Innovation #Growth #Success #Business #Marketing #Digital #Trending #Viral",
          "#Entrepreneur #Startup #GrowthMindset #Success #Motivation",
          "#DigitalMarketing #SocialMedia #Branding #ContentCreation",
        ],
      };

      const typeCaptions = captions[captionType as keyof typeof captions] || captions.marketing;
      const generated = typeCaptions[Math.floor(Math.random() * typeCaptions.length)];
      setResult(generated);

      addAIHistory({
        tool: 'Caption Generator',
        input: captionInput,
        output: generated,
      });

      setIsLoading(false);
    }, 1500);
  };

  const handleGenerateContent = async () => {
    setIsLoading(true);
    setResult('');

    setTimeout(() => {
      const contents = {
        article: `## ${writerInput || 'Your Topic'}\n\nIn today's fast-paced world, understanding the importance of ${writerInput || 'your topic'} is crucial for success. This comprehensive guide will walk you through everything you need to know.\n\n### Key Points:\n\n1. **Understanding the Basics**: Start with a solid foundation\n2. **Best Practices**: Learn from industry experts\n3. **Common Mistakes**: Avoid pitfalls that others fall into\n\n### Conclusion\n\nBy implementing these strategies, you'll be well on your way to mastering ${writerInput || 'this topic'}. Remember, consistency is key!`,
        adCopy: `🎯 ${writerInput || 'Attention'} Grabbers Wanted!\n\nAre you tired of [problem]? We have the solution you've been looking for!\n\n✅ Proven Results\n✅ 24/7 Support\n✅ Satisfaction Guaranteed\n\n👉 Click now to learn more!\n\nLimited time offer - Act fast! 🔥`,
        socialPost: `✨ ${writerInput || 'Your Message'} ✨\n\nHere's something you need to know...\n\n💬 What's your take on this?\n\n👇 Drop a comment below!\n\n#Trending #Viral #MustRead #Engage`,
        productDescription: `## ${writerInput || 'Product Name'}\n\n**Transform your experience with premium quality.**\n\n🌟 Features:\n- Premium materials\n- Expert craftsmanship\n- Satisfaction guaranteed\n\n💰 Special offer available now!\n\nOrder today and experience the difference! 🎁`,
        landingPage: `# ${writerInput || 'Welcome to Excellence'}\n\n## Unlock Your Potential\n\nDiscover the solution that's changing lives...\n\n### Why Choose Us?\n✓ Industry Leading Quality\n✓ 24/7 Customer Support\n✓ Money-Back Guarantee\n\n[Get Started Now] →`,
        websiteContent: `## Welcome to ${writerInput || 'Your Brand'}\n\nWe're passionate about delivering excellence in everything we do.\n\n### Our Services\n- Professional Solutions\n- Expert Guidance\n- 24/7 Support\n\nReady to get started? Contact us today!`,
      };

      const generated = contents[writerType as keyof typeof contents] || contents.article;
      setResult(generated);

      addAIHistory({
        tool: 'Content Writer',
        input: writerInput,
        output: generated,
      });

      setIsLoading(false);
    }, 1500);
  };

  const handleEnhanceImage = async () => {
    setIsLoading(true);
    setResult('');

    setTimeout(() => {
      const enhancements = [
        "✅ Image enhanced successfully!\n\nImprovements applied:\n- Colors: +25% vibrancy\n- Contrast: Optimized\n- Sharpness: Enhanced\n- Resolution: Upscaled to 4K\n\nYour image is ready for download!",
        "✨ Professional enhancement complete!\n\nApplied AI-powered improvements:\n- Noise reduction: 95%\n- Detail enhancement: Active\n- Color correction: Applied\n- Dynamic range: Expanded\n\nReady for professional use!",
      ];

      const generated = enhancements[Math.floor(Math.random() * enhancements.length)];
      setResult(generated);

      addAIHistory({
        tool: 'Image Enhancer',
        input: `Enhancement level: ${enhancementLevel}`,
        output: generated,
      });

      setIsLoading(false);
    }, 2000);
  };

  const handleGenerateMockup = async () => {
    setIsLoading(true);
    setResult('');

    setTimeout(() => {
      const generated = `🎨 Mockup Generated Successfully!\n\nType: ${mockupType}\nStatus: Ready for download\n\nYour design has been applied to a professional ${mockupType.toLowerCase()} mockup.\n\n✅ High-resolution output\n✅ Realistic shadows & lighting\n✅ Commercial use ready\n\nDownload your mockup now!`;

      setResult(generated);

      addAIHistory({
        tool: 'Mockup Generator',
        input: `Mockup type: ${mockupType}`,
        output: generated,
      });

      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="ai-studio" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Creative Tools
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            AI Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Studio</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Harness the power of AI to create stunning content, captions, and mockups in seconds.
          </p>
        </motion.div>

        {/* Tool Selection */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setActiveTool(tool.id);
                  setResult('');
                }}
                className={`p-6 rounded-2xl transition-all ${
                  activeTool === tool.id
                    ? `bg-gradient-to-br ${tool.color} text-white shadow-lg`
                    : 'bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20'
                }`}
              >
                <Icon className="w-8 h-8 mb-3" />
                <span className="font-medium">{tool.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Tool Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            {activeTool === 'caption' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">AI Caption Generator</h3>

                <div>
                  <label className="block text-white/70 mb-2">Caption Type</label>
                  <select
                    value={captionType}
                    onChange={(e) => setCaptionType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="marketing">Marketing Caption</option>
                    <option value="headline">Headline</option>
                    <option value="cta">Call to Action</option>
                    <option value="hashtags">Hashtags</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Language</label>
                  <select
                    value={captionLanguage}
                    onChange={(e) => setCaptionLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Topic (Optional)</label>
                  <input
                    type="text"
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    placeholder="Enter your topic..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  onClick={handleGenerateCaption}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
                  Generate Caption
                </button>
              </div>
            )}

            {activeTool === 'writer' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">AI Content Writer</h3>

                <div>
                  <label className="block text-white/70 mb-2">Content Type</label>
                  <select
                    value={writerType}
                    onChange={(e) => setWriterType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="article">Article</option>
                    <option value="adCopy">Ad Copy</option>
                    <option value="socialPost">Social Media Post</option>
                    <option value="productDescription">Product Description</option>
                    <option value="landingPage">Landing Page</option>
                    <option value="websiteContent">Website Content</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Language</label>
                  <select
                    value={writerLanguage}
                    onChange={(e) => setWriterLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Topic / Subject</label>
                  <textarea
                    value={writerInput}
                    onChange={(e) => setWriterInput(e.target.value)}
                    placeholder="Describe what you want to write about..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerateContent}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5 mr-2" />}
                  Generate Content
                </button>
              </div>
            )}

            {activeTool === 'enhancer' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">AI Image Enhancer</h3>

                <div>
                  <label className="block text-white/70 mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70 mb-2">Drag & drop or click to upload</p>
                    <p className="text-white/40 text-sm">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Enhancement Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['hd', '2k', '4k'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setEnhancementLevel(level)}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          enhancementLevel === level
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {level.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleEnhanceImage}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5 mr-2" />}
                  Enhance Image
                </button>
              </div>
            )}

            {activeTool === 'mockup' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">AI Mockup Generator</h3>

                <div>
                  <label className="block text-white/70 mb-2">Upload Design</label>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70 mb-2">Drag & drop or click to upload</p>
                    <p className="text-white/40 text-sm">PNG with transparent background</p>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Mockup Type</label>
                  <select
                    value={mockupType}
                    onChange={(e) => setMockupType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {mockupTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>{type}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGenerateMockup}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5 mr-2" />}
                  Generate Mockup
                </button>
              </div>
            )}
          </motion.div>

          {/* Result Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Result</h3>
              {result && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-4 py-2 bg-white/10 rounded-lg text-white/70 hover:bg-white/20 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-white/50 animate-spin mx-auto mb-4" />
                  <p className="text-white/70">AI is working its magic...</p>
                </div>
              </div>
            ) : result ? (
              <div className="bg-white/10 rounded-xl p-6">
                <pre className="text-white whitespace-pre-wrap font-sans">{result}</pre>
                <button className="mt-4 flex items-center px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-all">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">Your AI-generated content will appear here</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
