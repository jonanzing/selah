import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';
import { Lock, User, ArrowRight } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin/settings');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex flex-col items-center justify-center p-4 selection:bg-[#1a1a1a] selection:text-[#f5f2ed]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-sm mb-6 shadow-2xl">
            <span className="text-[#f5f2ed] font-bold text-3xl tracking-tighter">S.</span>
          </div>
          <h1 className="text-sm font-bold tracking-[0.3em] uppercase mb-2">Selah Admin</h1>
          <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-medium text-center">
            Proprietary Content Management System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
            <input
              type="email"
              placeholder="Administrator Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-black/5 rounded-sm h-14 pl-12 pr-4 text-xs font-medium uppercase tracking-widest focus:outline-none focus:border-black/20 transition-all placeholder:text-black/20"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
            <input
              type="password"
              placeholder="Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-black/5 rounded-sm h-14 pl-12 pr-4 text-xs font-medium uppercase tracking-widest focus:outline-none focus:border-black/20 transition-all placeholder:text-black/20"
              required
            />
          </div>

          {error && (
            <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold text-center animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full h-14 bg-[#1a1a1a] text-[#f5f2ed] rounded-sm flex items-center justify-center gap-2 group transition-all duration-500 hover:shadow-xl disabled:opacity-50",
              loading && "cursor-not-allowed opacity-70"
            )}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </span>
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-12 text-[9px] text-black/30 uppercase tracking-[0.2em] text-center font-medium leading-relaxed">
          Authorized personnel only.<br />
          System activity is monitored and logged.
        </p>
      </div>
    </div>
  );
};
