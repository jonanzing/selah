import React, { useState, useEffect } from 'react';
import { supabase, BlogPost } from '../../../lib/supabase';
import { Save, Loader2, Plus, Trash2, Edit3, Eye, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setPosts(data as BlogPost[]);
    }
    setLoading(false);
  };

  const createPost = () => {
    const newPost: BlogPost = {
      id: crypto.randomUUID(),
      title: 'Untilted Journey',
      slug: `journey-${Date.now()}`,
      content: '',
      excerpt: '',
      cover_image: '',
      status: 'draft',
      created_at: new Date().toISOString()
    };
    setEditingPost(newPost);
  };

  const savePost = async () => {
    if (!editingPost) return;
    setSaving(true);
    const { error } = await supabase.from('blog_posts').upsert(editingPost);
    if (!error) {
      await fetchPosts();
      setEditingPost(null);
    }
    setSaving(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you certain you wish to remove this journey?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-black/10" /></div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-black/5 pb-8">
        <div>
          <h3 className="text-xl font-light tracking-tight mb-2 serif">Journeys & Stories</h3>
          <p className="text-xs text-black/40 uppercase tracking-widest font-bold">Editorial content and community blogs</p>
        </div>
        <button
          onClick={createPost}
          className="bg-[#1a1a1a] text-[#f5f2ed] px-8 py-3 rounded-full flex items-center gap-2 hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Write New</span>
        </button>
      </div>

      {editingPost ? (
        <div className="bg-white border border-black/5 p-12 rounded-sm space-y-12 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between gap-4">
             <button
              onClick={() => setEditingPost(null)}
              className="text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={savePost}
              disabled={saving}
              className="bg-[#1a1a1a] text-[#f5f2ed] px-8 py-3 rounded-full flex items-center gap-2 hover:shadow-xl transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span className="text-xs font-bold uppercase tracking-widest">Publish Post</span>
            </button>
          </div>

          <div className="space-y-8 max-w-2xl mx-auto">
            <input
              type="text"
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              placeholder="Post Title"
              className="w-full text-4xl font-light serif bg-transparent border-none focus:outline-none placeholder:text-black/5"
            />
            
            <div className="space-y-4">
              <label className="text-[9px] uppercase tracking-widest font-bold text-black/30">Slug (URL)</label>
              <input
                type="text"
                value={editingPost.slug}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                className="w-full bg-black/5 rounded-sm p-4 text-xs font-medium focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[9px] uppercase tracking-widest font-bold text-black/30">Cover Image URL</label>
              <input
                type="text"
                value={editingPost.cover_image}
                onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                className="w-full bg-black/5 rounded-sm p-4 text-xs font-medium focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[9px] uppercase tracking-widest font-bold text-black/30">Content (Markdown)</label>
              <textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                rows={15}
                className="w-full bg-transparent border-t border-black/5 pt-8 text-base leading-relaxed focus:outline-none resize-none"
                placeholder="Once upon a time..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-black/5 p-6 rounded-sm flex items-center justify-between group hover:border-black/20 transition-all shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-black/5 rounded-sm overflow-hidden shrink-0 border border-black/5">
                  {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight mb-1">{post.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-black/40 font-medium uppercase tracking-widest">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-[2px] text-[8px] font-bold uppercase tracking-widest",
                      post.status === 'published' ? "bg-emerald-50 text-emerald-700" : "bg-black/5 text-black/40"
                    )}>
                      {post.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-3 text-black/40 hover:text-black transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-3 text-black/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
