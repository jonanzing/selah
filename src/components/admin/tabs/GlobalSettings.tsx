import React, { useState, useEffect } from 'react';
import { supabase, SiteSetting } from '../../../lib/supabase';
import { Save, Loader2, RotateCcw } from 'lucide-react';

export const GlobalSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (!error && data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleUpdate = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  };

  const saveSettings = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert(settings);
    if (error) {
      setMessage('Error saving settings');
    } else {
      setMessage('Settings updated successfully');
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-black/10" /></div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-black/5 pb-8">
        <div>
          <h3 className="text-xl font-light tracking-tight mb-2 serif">Global Interface</h3>
          <p className="text-xs text-black/40 uppercase tracking-widest font-bold">Primary site text and naming</p>
        </div>
        <div className="flex items-center gap-4">
          {message && <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">{message}</span>}
          <button
            onClick={fetchSettings}
            className="p-3 text-black/40 hover:text-black transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-[#1a1a1a] text-[#f5f2ed] px-8 py-3 rounded-full flex items-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="text-xs font-bold uppercase tracking-widest">Deploy Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {settings.length === 0 ? (
          <div className="p-12 border border-dashed border-black/10 rounded-sm text-center">
            <p className="text-xs text-black/30 uppercase tracking-widest font-bold">No settings found. Run the SQL schema to initialize.</p>
          </div>
        ) : (
          settings.map((setting) => (
            <div key={setting.key} className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 group-focus-within:text-black transition-colors">
                {setting.key.replace(/_/g, ' ')}
              </label>
              {setting.value.length > 100 ? (
                <textarea
                  value={setting.value}
                  onChange={(e) => handleUpdate(setting.key, e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-black/5 rounded-sm p-6 text-sm leading-relaxed focus:outline-none focus:border-black/20 transition-all resize-none shadow-sm"
                />
              ) : (
                <input
                  type="text"
                  value={setting.value}
                  onChange={(e) => handleUpdate(setting.key, e.target.value)}
                  className="w-full bg-white border border-black/5 rounded-sm h-14 px-6 text-sm font-medium focus:outline-none focus:border-black/20 transition-all shadow-sm"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
