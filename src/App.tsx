import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Community } from './pages/Community';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { AdminPage } from './pages/Admin';
import { AdminLogin } from './components/admin/AdminLogin';
import { useCMS } from './hooks/useCMS';

export default function App() {
  const { get } = useCMS();

  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <title>{get('seo_title', 'Selah')}</title>
          <meta name="description" content={get('seo_description', 'Selah is a Bible app built for daily encounter.')} />
          <link rel="icon" type="image/svg+xml" href={get('asset_favicon', '/favicon.svg')} />
          
          <meta property="og:title" content={get('seo_title', 'Selah')} />
          <meta property="og:description" content={get('seo_description', 'Selah is a Bible app built for daily encounter.')} />
          <meta property="og:image" content={get('seo_og_image', 'https://ais-dev-5sgmr5ia7jlsawyqzjlg3s-675890169892.europe-west2.run.app/share-preview.svg')} />
        </Helmet>

        <Routes>
          {/* Public Site */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />

          {/* Admin CMS */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
