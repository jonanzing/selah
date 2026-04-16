import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ringPos.current.x += (mousePos.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.y - ringPos.current.y) * 0.1;
      
      const ring = document.getElementById('curR');
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos]);

  return (
    <>
      <div 
        className="cursor hidden lg:block" 
        style={{ left: mousePos.x, top: mousePos.y }} 
      />
      <div 
        id="curR" 
        className="cursor-ring hidden lg:block" 
      />
    </>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold/30 selection:text-gold-light transition-colors duration-500">
      <CustomCursor />

      {/* NAV */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[200] px-6 lg:px-16 py-5 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'bg-black/92 backdrop-blur-2xl border-b border-border' : 'bg-black/50 backdrop-blur-xl border-b border-transparent'
        }`}
      >
        <Link to="/" className="font-serif text-2xl font-medium tracking-tight">
          Selah<span className="text-green">.</span>
        </Link>
        <ul className="hidden md:flex items-center gap-10 list-none">
          <li>
            <Link 
              to="/features" 
              className={`text-sm transition-colors ${location.pathname === '/features' ? 'text-text' : 'text-text-muted hover:text-text'}`}
            >
              Features
            </Link>
          </li>
          <li>
            <Link 
              to="/community" 
              className={`text-sm transition-colors ${location.pathname === '/community' ? 'text-text' : 'text-text-muted hover:text-text'}`}
            >
              Community
            </Link>
          </li>
          <li><a href="/#showcase" className="text-sm text-text-muted hover:text-text transition-colors">The app</a></li>
          <li>
            <Link 
              to="/about" 
              className={`text-sm transition-colors ${location.pathname === '/about' ? 'text-text' : 'text-text-muted hover:text-text'}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/blog" 
              className={`text-sm transition-colors ${location.pathname === '/blog' ? 'text-text' : 'text-text-muted hover:text-text'}`}
            >
              Blog
            </Link>
          </li>
          <li className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-text-muted hover:text-text"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link 
              to="/#waitlist" 
              className="bg-green text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-light hover:scale-105 transition-all active:scale-95"
            >
              Join waitlist
            </Link>
          </li>
        </ul>
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 text-text-muted">
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <Link to="/#waitlist" className="bg-green text-black px-4 py-2 rounded-full text-xs font-medium">Join</Link>
        </div>
      </nav>

      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-surface border-t border-border px-6 lg:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="font-serif text-2xl font-medium tracking-tight">
          Selah<span className="text-green">.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link to="/" className="text-xs text-text-dim hover:text-text-muted transition-colors">Home</Link>
          <Link to="/features" className="text-xs text-text-dim hover:text-text-muted transition-colors">Features</Link>
          <Link to="/community" className="text-xs text-text-dim hover:text-text-muted transition-colors">Community</Link>
          <Link to="/about" className="text-xs text-text-dim hover:text-text-muted transition-colors">About</Link>
          <Link to="/blog" className="text-xs text-text-dim hover:text-text-muted transition-colors">Blog</Link>
          <a href="#" className="text-xs text-text-dim hover:text-text-muted transition-colors">Privacy policy</a>
          <a href="#" className="text-xs text-text-dim hover:text-text-muted transition-colors">Terms of use</a>
        </div>
        <div className="text-xs text-text-dim">© 2026 Selah. All rights reserved.</div>
      </footer>
    </div>
  );
};
