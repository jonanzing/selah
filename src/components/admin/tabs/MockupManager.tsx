import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';

export const MockupManager: React.FC = () => {
  const [mockups, setMockups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchMockups();
  }, []);

  const fetchMockups = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('mockups').select('*').order('display_order');
    if (!error && data) {
      setMockups(data);
    }
    setLoading(false);
  };

  const addMockup = () => {
    const newMockup = {
      id: crypto.randomUUID(),
      label: 'New Screen',
      url: 'https://picsum.photos/seed/new/800/1600',
      display_order: mockups.length + 1,
      is_active: true
    };
    setMockups([...mockups, newMockup]);
  };

  const removeMockup = (id: string) => {
    setMockups(mockups.filter(m => m.id !== id));
  };

  const updateMockup = (id: string, field: string, value: any) => {
    setMockups(mockups.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const saveMockups = async () => {
    setSaving(true);
    const { error } = await supabase.from('mockups').upsert(
      mockups.map((m, i) => ({
        ...m,
        id: m.id.includes('-') ? m.id : undefined, // Handle temp IDs
        display_order: i + 1
      }))
    );
    
    if (error) {
      setMessage('Error saving mockups');
    } else {
      setMessage('Mockups updated');
      fetchMockups();
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-black/10" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-1">Showcase Mockups</h4>
          <p className="text-[10px] text-black/30 uppercase tracking-widest">Manage the iPhone screens across the site</p>
        </div>
        <div className="flex items-center gap-4">
          {message && <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">{message}</span>}
          <button
            onClick={addMockup}
            className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
            title="Add Mockup"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={saveMockups}
            disabled={saving}
            className="bg-[#1a1a1a] text-[#f5f2ed] px-6 py-2 rounded-full flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            <span className="text-[10px] font-bold uppercase tracking-widest">Save order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockups.map((mockup, idx) => (
          <div key={mockup.id} className="bg-white border border-black/5 rounded-xl p-4 group relative hover:shadow-md transition-all">
            <div className="aspect-[9/19] w-full bg-[#f0f0f0] rounded-lg mb-4 overflow-hidden relative border border-black/5">
              <img src={mockup.url} alt={mockup.label} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-[9px] text-white/80 font-bold uppercase tracking-widest truncate">{mockup.label}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                value={mockup.label}
                onChange={(e) => updateMockup(mockup.id, 'label', e.target.value)}
                placeholder="Screen Label"
                className="w-full text-[10px] font-bold uppercase tracking-widest bg-transparent border-b border-black/5 focus:border-black outline-none py-1"
              />
              <input
                type="text"
                value={mockup.url}
                onChange={(e) => updateMockup(mockup.id, 'url', e.target.value)}
                placeholder="Image URL"
                className="w-full text-[9px] text-black/40 truncate bg-transparent outline-none pb-1"
              />
            </div>

            <button
              onClick={() => removeMockup(mockup.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
