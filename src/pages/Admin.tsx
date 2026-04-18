import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AdminLayout } from '../components/admin/AdminLayout';
import { GlobalSettings } from '../components/admin/tabs/GlobalSettings';
import { MetricsManager } from '../components/admin/tabs/MetricsManager';
import { AssetManager } from '../components/admin/tabs/AssetManager';
import { BlogManager } from '../components/admin/tabs/BlogManager';
import { BibleManager } from '../components/admin/tabs/BibleManager';
import { Loader2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate('/admin/login');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen bg-[#f5f2ed] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black/10" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" />;

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="settings" />} />
        <Route path="settings" element={<GlobalSettings />} />
        <Route path="metrics" element={<MetricsManager />} />
        <Route path="assets" element={<AssetManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="bible" element={<BibleManager />} />
      </Routes>
    </AdminLayout>
  );
};
