import React, { useState, useEffect } from 'react';
import { supabase, BibleContent } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, Calendar, Book } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const BibleManager: React.FC = () => {
  const [entries, setEntries] = useState<BibleContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('bible_content').select('*').order('date', { ascending: false });
    if (!error && data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const addEntry = () => {
    const newEntry: Partial<BibleContent> = {
      id: crypto.randomUUID(),
      reference: 'John 3:16',
      text: 'For God so loved the world...',
      type: 'verse_of_day',
      date: new Date().toISOString().split('T')[0]
    };
    setEntries([newEntry as BibleContent, ...entries]);
  };

  const handleUpdate = (id: string, field: keyof BibleContent, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const deleteEntry = async (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    await supabase.from('bible_content').delete().eq('id', id);
  };

  const saveEntries = async () => {
    setSaving(true);
    const { error } = await supabase.from('bible_content').upsert(entries);
    if (error) {
      setMessage('Error saving content');
    } else {
      setMessage('Content updated');
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-black/10" /></div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-black/5 pb-8">
        <div>
          <h3 className="text-xl font-light tracking-tight mb-2 serif">Scripture & Devotionals</h3>
          <p className="text-xs text-black/40 uppercase tracking-widest font-bold">Manage verses and daily reading</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={addEntry} className="p-3 text-black/40 hover:text-black transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={saveEntries}
            disabled={saving}
            className="bg-[#1a1a1a] text-[#f5f2ed] px-8 py-3 rounded-full flex items-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="text-xs font-bold uppercase tracking-widest">Publish Content</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white border border-black/5 p-8 rounded-sm shadow-sm group hover:border-black/20 transition-all flex items-start gap-8">
            <div className="w-48 space-y-4">
               <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold text-black/30 mb-2">Reference</label>
                <input
                  type="text"
                  value={entry.reference}
                  onChange={(e) => handleUpdate(entry.id, 'reference', e.target.value)}
                  className="w-full bg-transparent border-b border-black/5 py-1 text-sm font-bold focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold text-black/30 mb-2">Display Date</label>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => handleUpdate(entry.id, 'date', e.target.value)}
                  className="w-full bg-transparent border-b border-black/5 py-1 text-xs focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-[9px] uppercase tracking-widest font-bold text-black/30 mb-2">Scripture Text</label>
              <textarea
                value={entry.text}
                onChange={(e) => handleUpdate(entry.id, 'text', e.target.value)}
                rows={3}
                className="w-full bg-transparent border border-black/5 p-4 text-sm leading-relaxed focus:outline-none focus:border-black transition-all resize-none shadow-inner"
              />
            </div>

            <div className="flex flex-col items-end justify-between h-full pt-6">
               <button onClick={() => deleteEntry(entry.id)} className="text-black/10 hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="flex gap-2">
                <span className={cn(
                  "px-2 py-0.5 rounded-[2px] text-[8px] font-bold uppercase tracking-widest",
                  entry.type === 'verse_of_day' ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                )}>
                  {entry.type.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
