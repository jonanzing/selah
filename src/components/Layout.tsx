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
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-medium tracking-tight group">
          <div className="w-8 h-8 transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M12.2031 1.09025C12.0738 1.03279 11.9262 1.03279 11.7969 1.09025L3.29693 4.86803C3.11637 4.94828 3 5.12734 3 5.32494V11C3 16.4571 6.74101 21.6189 11.8787 22.9689C11.9581 22.9898 12.0419 22.9898 12.1213 22.9689C17.259 21.6189 21 16.4571 21 11V5.32494C21 5.12734 20.8836 4.94828 20.7031 4.86803L12.2031 1.09025ZM16 9.5C16 9.77614 15.7761 10 15.5 10H13.5C13.2239 10 13 10.2239 13 10.5V17.5C13 17.7761 12.7761 18 12.5 18H11.5C11.2239 18 11 17.7761 11 17.5V10.5C11 10.2239 10.7761 10 10.5 10H8.5C8.22386 10 8 9.77614 8 9.5V8.5C8 8.22386 8.22386 8 8.5 8H10.5C10.7761 8 11 7.77614 11 7.5V5.5C11 5.22386 11.2239 5 11.5 5H12.5C12.7761 5 13 5.22386 13 5.5V7.5C13 7.77614 13.2239 8 13.5 8H15.5C15.7761 8 16 8.22386 16 8.5V9.5Z" fill="url(#nav_paint0_linear)"/>
              <defs>
                <linearGradient id="nav_paint0_linear" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
                  <stop offset="0.0144231" stop-color="#02C1A8"/>
                  <stop offset="0.456731" stop-color="#0AB916"/>
                  <stop offset="1" stop-color="#002445"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Selah<span className="text-green">.</span></span>
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
            <a 
              href="/#waitlist" 
              className="bg-green text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-light hover:scale-105 transition-all active:scale-95"
            >
              Join waitlist
            </a>
          </li>
        </ul>
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 text-text-muted">
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <a href="/#waitlist" className="bg-green text-black px-4 py-2 rounded-full text-xs font-medium">Join</a>
        </div>
      </nav>

      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-surface border-t border-border px-6 lg:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2 font-serif text-2xl font-medium tracking-tight">
          <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
              <path d="M12.2031 1.09025C12.0738 1.03279 11.9262 1.03279 11.7969 1.09025L3.29693 4.86803C3.11637 4.94828 3 5.12734 3 5.32494V11C3 16.4571 6.74101 21.6189 11.8787 22.9689C11.9581 22.9898 12.0419 22.9898 12.1213 22.9689C17.259 21.6189 21 16.4571 21 11V5.32494C21 5.12734 20.8836 4.94828 20.7031 4.86803L12.2031 1.09025ZM16 9.5C16 9.77614 15.7761 10 15.5 10H13.5C13.2239 10 13 10.2239 13 10.5V17.5C13 17.7761 12.7761 18 12.5 18H11.5C11.2239 18 11 17.7761 11 17.5V10.5C11 10.2239 10.7761 10 10.5 10H8.5C8.22386 10 8 9.77614 8 9.5V8.5C8 8.22386 8.22386 8 8.5 8H10.5C10.7761 8 11 7.77614 11 7.5V5.5C11 5.22386 11.2239 5 11.5 5H12.5C12.7761 5 13 5.22386 13 5.5V7.5C13 7.77614 13.2239 8 13.5 8H15.5C15.7761 8 16 8.22386 16 8.5V9.5Z" fill="url(#footer_paint0_linear)"/>
              <defs>
                <linearGradient id="footer_paint0_linear" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
                  <stop offset="0.0144231" stop-color="#02C1A8"/>
                  <stop offset="0.456731" stop-color="#0AB916"/>
                  <stop offset="1" stop-color="#002445"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Selah<span className="text-green">.</span></span>
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
