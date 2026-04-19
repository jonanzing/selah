import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';
import { Lock, User, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isSupabaseConfigured = 
      import.meta.env.VITE_SUPABASE_URL && 
      import.meta.env.VITE_SUPABASE_ANON_KEY && 
      !import.meta.env.VITE_SUPABASE_URL.includes('placeholder');

    if (!isSupabaseConfigured) {
      setError('System Error: Database connection not established. Please configure Supabase keys in Project Settings.');
      return;
    }

    setLoading(true);

    // Strict Admin Email Check
    if (email.toLowerCase() !== 'nanzingj@gmail.com') {
      setError('Access Denied: Administrative privileges required.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(`${error.message}. Ensure you have registered this account in the Supabase Auth dashboard.`);
      } else {
        navigate('/admin/settings');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet or Supabase status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex flex-col items-center justify-center p-4 selection:bg-[#1a1a1a] selection:text-[#f5f2ed] relative">
      {/* Return to Site Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors group"
      >
        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
        Return to site
      </Link>

      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-white border border-black/10 flex items-center justify-center rounded-sm mb-6 shadow-xl p-2.5">
            <img src="/favicon.svg" alt="Selah Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-sm font-bold tracking-[0.3em] uppercase mb-2">Selah Admin</h1>
          <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-medium text-center">
            Proprietary Content Management System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 group-focus-within:text-black transition-colors" />
            <input
              type="email"
              placeholder="Administrator Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              className="w-full bg-white border border-black/20 rounded-sm h-14 pl-12 pr-4 text-xs font-bold text-black tracking-widest focus:outline-none focus:border-black transition-all placeholder:text-black/40"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 group-focus-within:text-black transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-black/20 rounded-sm h-14 pl-12 pr-12 text-xs font-bold text-black tracking-widest focus:outline-none focus:border-black transition-all placeholder:text-black/40"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
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
              {loading ? 'Verifying credentials...' : 'Access Dashboard'}
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
