import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Settings2, 
  Image as ImageIcon, 
  BookOpen, 
  Database, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { id: 'global', label: 'Global Settings', icon: Settings2, path: '/admin/settings' },
  { id: 'metrics', label: 'Metrics & Waitlist', icon: BarChart3, path: '/admin/metrics' },
  { id: 'assets', label: 'Asset Manager', icon: ImageIcon, path: '/admin/assets' },
  { id: 'blog', label: 'Blog Manager', icon: BookOpen, path: '/admin/blog' },
  { id: 'bible', label: 'Bible & Content', icon: Database, path: '/admin/bible' },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#f5f2ed] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-[#f5f2ed]">
      {/* Sidebar */}
      <aside className="w-72 border-r border-black/5 flex flex-col bg-white/50 backdrop-blur-sm">
        <div className="p-8 border-bottom border-black/5">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center rounded-sm">
              <span className="text-[#f5f2ed] font-bold text-xl tracking-tighter">S.</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-widest uppercase">Selah.</h1>
              <p className="text-[10px] text-black/40 uppercase tracking-widest">Administrator</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-sm transition-all duration-300 group",
                      isActive 
                        ? "bg-[#1a1a1a] text-[#f5f2ed]" 
                        : "hover:bg-black/5 text-black/60 hover:text-black"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3 h-3 opacity-50" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-8 border-t border-black/5">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-black/40 hover:text-red-500 transition-colors duration-300 group"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest leading-none pt-0.5">Logout</span>
          </button>
        </div>
      </aside>

      {/* Content area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <header className="h-20 border-b border-black/5 flex items-center justify-between px-12 sticky top-0 bg-[#f5f2ed]/80 backdrop-blur-md z-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
            {menuItems.find(m => m.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-black/40 font-bold">
            <span>Status: Operational</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12">
          {children}
        </div>
      </main>
    </div>
  );
};
