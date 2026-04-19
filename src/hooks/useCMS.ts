import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useCMS() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [metrics, setMetrics] = useState<any[]>([]);
  const [mockups, setMockups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [settingsRes, metricsRes, mockupsRes] = await Promise.all([
        supabase.from('site_settings').select('*'),
        supabase.from('metrics').select('*').order('display_order'),
        supabase.from('mockups').select('*').order('display_order')
      ]);

      if (settingsRes.data) {
        const settingsMap = settingsRes.data.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});
        setContent(settingsMap);
      }

      if (metricsRes.data) {
        setMetrics(metricsRes.data);
      }

      if (mockupsRes.data) {
        setMockups(mockupsRes.data);
      }
      
      setLoading(false);
    }

    fetchData();
  }, []);

  const get = (key: string, fallback: string) => {
    return content[key] || fallback;
  };

  return { get, metrics, mockups, loading };
}
