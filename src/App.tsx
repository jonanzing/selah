import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Community } from './pages/Community';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { AdminPage } from './pages/Admin';
import { AdminLogin } from './components/admin/AdminLogin';

export default function App() {
  return (
    <Router>
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
  );
}
