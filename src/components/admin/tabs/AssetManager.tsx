import React, { useState, useEffect } from 'react';
import { supabase, Asset } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, Link as LinkIcon, ExternalLink, Image as ImageIcon } from 'lucide-react';

export const AssetManager: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('assets').select('*');
    if (!error && data) {
      setAssets(data);
    }
    setLoading(false);
  };

  const handleUpdate = (id: string, field: keyof Asset, value: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const addNewAsset = () => {
    const newAsset: Asset = {
      id: crypto.randomUUID(),
      name: 'New Asset',
      url: '',
      type: 'image'
    };
    setAssets([...assets, newAsset]);
  };

  const deleteAsset = async (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
    await supabase.from('assets').delete().eq('id', id);
  };

  const saveAssets = async () => {
    setSaving(true);
    const { error } = await supabase.from('assets').upsert(assets);
    if (error) {
      setMessage('Error saving assets');
    } else {
      setMessage('Assets updated');
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-black/10" /></div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-black/5 pb-8">
        <div>
          <h3 className="text-xl font-light tracking-tight mb-2 serif">Proprietary Assets</h3>
          <p className="text-xs text-black/40 uppercase tracking-widest font-bold">Screenshot and media URL management</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={addNewAsset} className="p-3 text-black/40 hover:text-black transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={saveAssets}
            disabled={saving}
            className="bg-[#1a1a1a] text-[#f5f2ed] px-8 py-3 rounded-full flex items-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="text-xs font-bold uppercase tracking-widest">Deploy Assets</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white border border-black/5 p-8 rounded-sm shadow-sm flex items-start gap-8 group hover:border-black/20 transition-all">
            <div className="w-32 h-32 bg-black/5 rounded-sm overflow-hidden flex items-center justify-center shrink-0 border border-black/5">
              {asset.url ? (
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <ImageIcon className="w-6 h-6 text-black/10" />
              )}
            </div>
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={asset.name}
                  onChange={(e) => handleUpdate(asset.id, 'name', e.target.value)}
                  placeholder="Asset Name (e.g. Hero_Section_BG)"
                  className="bg-transparent border-b border-black/5 py-1 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-colors w-1/2"
                />
                <button onClick={() => deleteAsset(asset.id)} className="text-black/10 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="relative group/url">
                <LinkIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/20" />
                <input
                  type="text"
                  value={asset.url}
                  onChange={(e) => handleUpdate(asset.id, 'url', e.target.value)}
                  placeholder="Public Image URL"
                  className="w-full bg-transparent border-b border-black/5 pl-8 py-1 text-xs font-medium text-black/60 focus:outline-none focus:border-black transition-colors"
                />
                {asset.url && (
                  <a href={asset.url} target="_blank" rel="noopener noreferrer" className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/url:opacity-100 transition-opacity">
                    <ExternalLink className="w-3.5 h-3.5 text-black/40 hover:text-black" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
