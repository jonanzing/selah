import React, { useState, useEffect } from 'react';
import { supabase, SiteSetting } from '../../../lib/supabase';
import { Save, Loader2, RotateCcw, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface SettingsEditorProps {
  title: string;
  description: string;
  keys: { 
    key: string; 
    label: string; 
    type?: 'text' | 'textarea' | 'image';
    section?: string;
    helper?: string;
  }[];
  category?: string;
}

export const SettingsEditor: React.FC<SettingsEditorProps> = ({ title, description, keys }) => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [originalSettings, setOriginalSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .in('key', keys.map(k => k.key));
    
    if (!error && data) {
      const map = data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
      setSettings(map);
      setOriginalSettings(map);
    } else if (error) {
      setMessage('Failed to fetch settings');
      setIsError(true);
    }
    setLoading(false);
  };

  const handleUpdate = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

  const saveSettings = async () => {
    setSaving(true);
    setMessage(null);
    setIsError(false);
    
    const updates = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from('site_settings').upsert(updates);
    
    if (error) {
      setMessage('Error saving changes');
      setIsError(true);
    } else {
      setMessage('Changes deployed successfully');
      setIsError(false);
      setOriginalSettings(settings);
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-black/10" /></div>;

  // Group keys by section
  const sections: Record<string, typeof keys> = keys.reduce((acc, curr) => {
    const sectionName = curr.section || 'General';
    if (!acc[sectionName]) acc[sectionName] = [];
    acc[sectionName].push(curr);
    return acc;
  }, {} as Record<string, typeof keys>);

  return (
    <div className="space-y-24 mb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-black/5 pb-8">
        <div>
          <h3 className="text-2xl font-light tracking-tight mb-2 serif">{title}</h3>
          <p className="text-xs text-black/40 uppercase tracking-widest font-bold">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchSettings}
            className="p-3 text-black/40 hover:text-black transition-colors"
            title="Refresh settings"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-20">
        {Object.entries(sections).map(([sectionName, sectionKeys]) => (
          <div key={sectionName} className="space-y-12">
            <div className="flex items-center gap-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-black/20 whitespace-nowrap">{sectionName}</h4>
              <div className="h-px bg-black/5 w-full" />
            </div>
            
            <div className="grid grid-cols-1 gap-12 lg:pl-12">
              {sectionKeys.map((config) => {
                const value = settings[config.key] || '';
                const isMissing = !settings.hasOwnProperty(config.key);

                return (
                  <div key={config.key} className="group relative">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 group-focus-within:text-black transition-colors">
                          {config.label}
                        </label>
                        {config.helper && <p className="text-[9px] text-black/30 mt-1 italic">{config.helper}</p>}
                      </div>
                      {isMissing && (
                        <div className="flex items-center gap-1 text-[9px] text-amber-600 font-bold uppercase tracking-widest">
                          <AlertTriangle className="w-3 h-3" />
                          Needs Initialization
                        </div>
                      )}
                    </div>

                    {config.type === 'textarea' ? (
                      <textarea
                        value={value}
                        onChange={(e) => handleUpdate(config.key, e.target.value)}
                        placeholder={isMissing ? "Enter text here..." : ""}
                        rows={4}
                        className="w-full bg-white border border-black/5 rounded-sm p-6 text-sm leading-relaxed focus:outline-none focus:border-black/20 transition-all resize-none shadow-sm group-hover:border-black/10"
                      />
                    ) : config.type === 'image' ? (
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleUpdate(config.key, e.target.value)}
                          placeholder="Image URL..."
                          className="w-full bg-white border border-black/5 rounded-sm h-14 px-6 text-sm font-medium focus:outline-none focus:border-black/20 transition-all shadow-sm group-hover:border-black/10"
                        />
                        <div className="w-14 h-14 rounded-sm border border-black/5 overflow-hidden bg-[#f0f0f0] shrink-0">
                          {value ? (
                            <img src={value} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-black/10"><Loader2 className="w-4 h-4" /></div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleUpdate(config.key, e.target.value)}
                        placeholder={isMissing ? "Enter text here..." : ""}
                        className="w-full bg-white border border-black/5 rounded-sm h-14 px-6 text-sm font-medium focus:outline-none focus:border-black/20 transition-all shadow-sm group-hover:border-black/10"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* STICKY SAVE BAR */}
      <div className={cn(
        "fixed bottom-8 left-[calc(280px+2rem)] right-8 z-[300] transition-all duration-500 transform",
        hasChanges ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      )}>
        <div className="bg-[#1a1a1a] text-[#f5f2ed] p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/5 backdrop-blur-xl bg-opacity-95">
          <div className="flex items-center gap-4 px-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest leading-none">Unsaved Changes</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Reflect your edits on the live site</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {message && (
              <span className={cn(
                "text-[10px] uppercase tracking-widest font-bold",
                isError ? "text-red-400" : "text-emerald-400"
              )}>
                {message}
              </span>
            )}
            <button
              onClick={() => setSettings(originalSettings)}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              Discard
            </button>
            <button
              onClick={saveSettings}
              disabled={saving}
              className="bg-white text-black px-10 py-3 rounded-xl flex items-center gap-3 hover:bg-gold hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="text-xs font-bold uppercase tracking-widest">Deploy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
