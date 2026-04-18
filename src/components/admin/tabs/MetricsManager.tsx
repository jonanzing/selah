import React, { useState, useEffect } from 'react';
import { supabase, Metric } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

export const MetricsManager: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('metrics').select('*').order('display_order');
    if (!error && data) {
      setMetrics(data);
    }
    setLoading(false);
  };

  const handleUpdate = (id: string, field: keyof Metric, value: string) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addNewMetric = () => {
    const newMetric: Metric = {
      id: crypto.randomUUID(),
      label: 'New Stat',
      value: '0',
      suffix: '+'
    };
    setMetrics([...metrics, newMetric]);
  };

  const deleteMetric = async (id: string) => {
    setMetrics(prev => prev.filter(m => m.id !== id));
    await supabase.from('metrics').delete().eq('id', id);
  };

  const saveMetrics = async () => {
    setSaving(true);
    const { error } = await supabase.from('metrics').upsert(metrics);
    if (error) {
      setMessage('Error saving metrics');
    } else {
      setMessage('Metrics updated successfully');
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-black/10" /></div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-black/5 pb-8">
        <div>
          <h3 className="text-xl font-light tracking-tight mb-2 serif">Public Real-Time Data</h3>
          <p className="text-xs text-black/40 uppercase tracking-widest font-bold">Waitlist stats and app metrics</p>
        </div>
        <div className="flex items-center gap-4">
          {message && <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">{message}</span>}
          <button
            onClick={addNewMetric}
            className="p-3 text-black/40 hover:text-black transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={saveMetrics}
            disabled={saving}
            className="bg-[#1a1a1a] text-[#f5f2ed] px-8 py-3 rounded-full flex items-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="text-xs font-bold uppercase tracking-widest">Update Stats</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white border border-black/5 p-8 rounded-sm shadow-sm relative group hover:border-black/20 transition-all">
            <button
              onClick={() => deleteMetric(metric.id)}
              className="absolute top-4 right-4 text-black/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold text-black/30 mb-2">Display Label</label>
                <input
                  type="text"
                  value={metric.label}
                  onChange={(e) => handleUpdate(metric.id, 'label', e.target.value)}
                  className="w-full bg-transparent border-b border-black/5 py-1 text-sm font-bold focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-black/30 mb-2">Value</label>
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => handleUpdate(metric.id, 'value', e.target.value)}
                    className="w-full bg-transparent border-b border-black/5 py-1 text-2xl font-light serif focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="w-16">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-black/30 mb-2">Suffix</label>
                  <input
                    type="text"
                    value={metric.suffix || ''}
                    onChange={(e) => handleUpdate(metric.id, 'suffix', e.target.value)}
                    className="w-full bg-transparent border-b border-black/5 py-1 text-2xl font-light serif focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
