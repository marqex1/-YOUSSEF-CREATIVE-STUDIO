import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { StoreProvider, useStore } from './store/StoreContext';
import { AuthProvider } from './store/AuthContext';
import { Header, Footer } from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import { PortfolioPage, ProjectDetailPage } from './pages/PortfolioPages';
import CaseStudiesPage from './pages/CaseStudiesPage';
import { BlogPage, BlogPostPage } from './pages/BlogPages';
import ContactPage from './pages/ContactPage';
import AIStudioPage from './pages/AIStudioPage';
import AuditPage from './pages/AuditPage';
import AdminPage from './pages/AdminPage';
import { Button } from './components/ui/DesignSystem';
import { Link } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);
  return null;
}

function Tracking() {
  const { pathname } = useLocation();
  const { track } = useStore();
  useEffect(() => { track('pageview', pathname); }, [pathname]);
  return null;
}

function Page404() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-neutral-900">404</div>
        <p className="mt-2 text-neutral-600">The page you're looking for does not exist or is not published yet.</p>
        <div className="mt-6"><Link to="/"><Button>Back to home</Button></Link></div>
      </div>
    </div>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (<><Header /><main>{children}</main><Footer /></>);
}

function AppInner() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Tracking />
      <Routes>
        <Route path="/admin/*" element={<AuthProvider><AdminPage /></AuthProvider>} />
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><PortfolioPage /></PublicLayout>} />
        <Route path="/portfolio/:slug" element={<PublicLayout><ProjectDetailPage /></PublicLayout>} />
        <Route path="/case-studies" element={<PublicLayout><CaseStudiesPage /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/ai-studio" element={<PublicLayout><AIStudioPage /></PublicLayout>} />
        <Route path="/audit" element={<PublicLayout><AuditPage /></PublicLayout>} />
        <Route path="*" element={<PublicLayout><Page404 /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return <StoreProvider><AppInner /></StoreProvider>;
}
