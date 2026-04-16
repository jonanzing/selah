import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Users, 
  Flame, 
  ArrowRight, 
  Check, 
  Star, 
  ChevronRight,
  Mic,
  Layout as LayoutIcon,
  Globe
} from 'lucide-react';

// Import local screenshots
import homeImg from '../assets/screenshots/home.png';
import readerImg from '../assets/screenshots/reader.png';
import notesImg from '../assets/screenshots/notes.png';
import socialsImg from '../assets/screenshots/socials.png';
import profileImg from '../assets/screenshots/profile.png';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export const Home = () => {
  const [email, setEmail] = useState('');
  const [wlMsg, setWlMsg] = useState({ text: 'No spam, ever. Just your personal invite when it\'s time.', color: 'dim' });

  const joinList = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const v = email.trim();
    if (!v || !v.includes('@') || !v.includes('.')) {
      setWlMsg({ text: 'Please enter a valid email address.', color: 'red' });
      return;
    }
    setWlMsg({ text: '🙏 You\'re on the list! Watch your inbox — your invite is coming.', color: 'green' });
    setEmail('');
  };

  const screenshots = [
    { url: homeImg, label: 'Home' },
    { url: readerImg, label: 'Bible reader' },
    { url: notesImg, label: 'My notes' },
    { url: socialsImg, label: 'Socials' },
    { url: profileImg, label: 'Profile' }
  ];

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-32 pb-12 relative overflow-hidden gap-12">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-green-dark/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[5%] w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-[560px] shrink-0 text-center lg:text-left z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-green/5 border border-border-green rounded-full px-4 py-1.5 text-[0.7rem] font-medium text-green tracking-widest uppercase mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              Coming soon — limited early access
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="font-serif text-6xl lg:text-[5.5rem] font-normal leading-[1.03] tracking-tight mb-6 text-balance">
              The Word,<br /><em className="italic text-gold">alive in your</em><br />hands.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-text-muted leading-relaxed max-w-[430px] mx-auto lg:mx-0 mb-10">
              Selah is a Bible app built for daily encounter — verse of the day, AI-powered notes, live reading rooms, and a community that prays and grows together.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a href="#waitlist" className="inline-flex items-center gap-2 bg-green text-black px-8 py-3.5 rounded-full font-medium text-base hover:bg-green-light hover:-translate-y-0.5 transition-all active:translate-y-0">
                <ArrowRight className="w-4 h-4 rotate-[-45deg]" />
                Get early access
              </a>
              <a href="#features" className="inline-flex items-center gap-2 text-text-muted px-7 py-3.5 border border-border rounded-full text-base hover:text-text hover:border-text/20 transition-all">
                See features <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex justify-center lg:justify-start gap-10 mt-12 pt-8 border-t border-border">
              <div>
                <div className="font-serif text-4xl font-normal leading-none">5K<em className="italic text-green not-italic">+</em></div>
                <div className="text-[0.7rem] text-text-muted mt-1.5 tracking-wider uppercase">On the waitlist</div>
              </div>
              <div>
                <div className="font-serif text-4xl font-normal leading-none">31<em className="italic text-green not-italic">k</em></div>
                <div className="text-[0.7rem] text-text-muted mt-1.5 tracking-wider uppercase">Verses in the Bible</div>
              </div>
              <div>
                <div className="font-serif text-4xl font-normal leading-none">1<em className="italic text-green not-italic">app</em></div>
                <div className="text-[0.7rem] text-text-muted mt-1.5 tracking-wider uppercase">To do it all</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* PHONE GROUP */}
        <div className="relative shrink-0 w-[280px] h-[500px] lg:w-[420px] lg:h-[600px] mt-12 lg:mt-0">
          <motion.div 
            className="iphone-frame absolute w-[200px] h-[420px] lg:w-[265px] lg:h-[565px] left-0 top-0 z-30"
            animate={{ y: [0, -22, 0], rotate: [-2, -2, -2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={homeImg} alt="Selah home screen" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            className="iphone-frame absolute w-[160px] h-[340px] lg:w-[215px] lg:h-[460px] right-0 top-16 z-20 opacity-90 hidden sm:block"
            animate={{ y: [0, -16, 0], rotate: [3.5, 3.5, 3.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={readerImg} alt="Selah Bible reader" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            className="iphone-frame absolute w-[130px] h-[280px] lg:w-[175px] lg:h-[375px] left-1/2 top-48 -ml-5 z-10 opacity-70 hidden sm:block"
            animate={{ y: [0, -10, 0], rotate: [1, 1, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={notesImg} alt="Selah notes" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-6 border-y border-border bg-surface">
        <div className="marquee-track">
          {[1, 2].map((i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-14 font-serif text-lg italic font-light text-text/30 whitespace-nowrap">
                <div className="w-1 h-1 rounded-full bg-green shrink-0" />
                "The Lord is my shepherd; I shall not want." <span className="not-italic text-xs text-green">Psalm 23:1</span>
              </div>
              <div className="flex items-center gap-14 font-serif text-lg italic font-light text-text/30 whitespace-nowrap">
                <div className="w-1 h-1 rounded-full bg-green shrink-0" />
                "Fear thou not; for I am with thee." <span className="not-italic text-xs text-green">Isaiah 41:10</span>
              </div>
              <div className="flex items-center gap-14 font-serif text-lg italic font-light text-text/30 whitespace-nowrap">
                <div className="w-1 h-1 rounded-full bg-green shrink-0" />
                "In the beginning God created the heaven and the earth." <span className="not-italic text-xs text-green">Genesis 1:1</span>
              </div>
              <div className="flex items-center gap-14 font-serif text-lg italic font-light text-text/30 whitespace-nowrap">
                <div className="w-1 h-1 rounded-full bg-green shrink-0" />
                "I can do all things through Christ..." <span className="not-italic text-xs text-green">Philippians 4:13</span>
              </div>
              <div className="flex items-center gap-14 font-serif text-lg italic font-light text-text/30 whitespace-nowrap">
                <div className="w-1 h-1 rounded-full bg-green shrink-0" />
                "Trust in the LORD with all thine heart." <span className="not-italic text-xs text-green">Proverbs 3:5</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="px-6 lg:px-16 py-24 relative">
        <Reveal>
          <div className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Features</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-5xl lg:text-7xl font-normal leading-tight mb-5 text-balance">
            Everything you need<br />to go deeper.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-text-muted leading-relaxed max-w-[480px]">
            From your first verse of the morning to your last prayer at night — Selah walks with you through the Word, every single day.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mt-16 border border-border rounded-2xl overflow-hidden bg-border">
          {[
            { icon: <BookOpen />, title: "Verse of the day", desc: "A fresh scripture every morning with likes, comments, and AI-generated graphic quotes you can post." },
            { icon: <Users />, title: "Character of the day", desc: "One biblical character, one life lesson. Ruth, David, Esther, Paul — their stories become your guide." },
            { icon: <LayoutIcon />, title: "Full Bible reader", desc: "Multiple translations, highlights, AI explanations on demand, and live reading sessions." },
            { icon: <Mic />, title: "Smart notes", desc: "Sunday sermons, quiet time, journals — speak and AI organises it, or type with Bible passages referenced." },
            { icon: <Globe />, title: "The Commons", desc: "A faith-first social feed. Post verses, prayers, notes. React with Amen, Pray, Thanks, or Truth." },
            { icon: <Flame />, title: "Streaks & coins", desc: "Track your daily reading streak on a fire calendar. Earn coins. Stay consistent. Stay burning." }
          ].map((feat, idx) => (
            <div key={idx} className="bg-surface p-9 hover:bg-surface-2 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-green/10 border border-border-green flex items-center justify-center text-green mb-6 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{feat.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="showcase" className="bg-surface px-6 lg:px-16 py-24 overflow-hidden">
        <div className="text-center mb-16">
          <Reveal>
            <div className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-green mb-4">The app</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-5xl lg:text-7xl font-normal leading-tight mb-4 mx-auto max-w-[600px]">
              Every screen, <em className="italic text-gold">crafted with care.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-text-muted">Clean. Intentional. Built for the Word.</p>
          </Reveal>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mt-14">
          {screenshots.map((screen, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="flex flex-col items-center gap-4">
                <div className="iphone-card">
                  <img src={screen.url} alt={screen.label} className="w-full h-full object-cover object-top" />
                </div>
                <span className="text-[0.7rem] font-medium tracking-widest uppercase text-text-dim">{screen.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SPLIT SECTIONS */}
      <section className="px-6 lg:px-16 py-24 bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div>
              <div className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Bible reader</div>
              <h2 className="font-serif text-5xl lg:text-6xl font-normal leading-tight mb-6">Read together.<br /><em className="italic text-gold">Live.</em></h2>
              <p className="text-lg text-text-muted leading-relaxed mb-8">Open any book. Read with friends in real time. Highlight, take notes, ask AI to explain — then share what moves you as a quote graphic.</p>
              
              <div className="space-y-5">
                {[
                  { t: "Multiple translations", d: "KJV, NIV, NLT and more — switch instantly without losing your place." },
                  { t: "Live reading rooms", d: "See exactly where your friends are on the page. Same verse, same moment." },
                  { t: "AI explanations on tap", d: "Tap any verse for historical context, meaning, and plain-language breakdown." },
                  { t: "Graphic generator", d: "Turn any verse into a beautiful shareable quote graphic in seconds." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-green/10 border border-border-green flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-3 h-3 text-green" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-0.5">{item.t}</div>
                      <div className="text-xs text-text-muted leading-relaxed">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="flex justify-center">
            <Reveal delay={0.2}>
              <div className="screen-phone">
                <img src={readerImg} alt="Bible reader" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section id="community" className="bg-surface px-6 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <Reveal delay={0.2}>
              <div className="screen-phone">
                <img src={socialsImg} alt="Community feed" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-green mb-4">The Commons</div>
              <h2 className="font-serif text-5xl lg:text-6xl font-normal leading-tight mb-6">A community that<br /><em className="italic text-gold">believes together.</em></h2>
              <p className="text-lg text-text-muted leading-relaxed mb-8">Post verses, prayers, notes, and reflections. React with meaning. Join live prayer rooms. Study with hundreds of believers.</p>
              
              <div className="text-sm text-text-muted mb-4">React with more than a heart:</div>
              <div className="flex flex-wrap gap-2 mb-8">
                <div className="px-4 py-1.5 bg-green/10 border border-border-green rounded-full text-sm text-green">🏛 Amen</div>
                <div className="px-4 py-1.5 bg-white/5 border border-border rounded-full text-sm text-text-muted">🙏 Pray</div>
                <div className="px-4 py-1.5 bg-white/5 border border-border rounded-full text-sm text-text-muted">🤲 Thanks</div>
                <div className="px-4 py-1.5 bg-white/5 border border-border rounded-full text-sm text-text-muted">⚡ Truth</div>
              </div>

              <div className="bg-surface-2 border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-green-dark flex items-center justify-center text-xs font-medium text-green-light">M</div>
                  <div>
                    <div className="text-sm font-medium">Mara K. <span className="text-text-muted font-normal">· 1h</span></div>
                    <div className="text-[0.7rem] text-text-muted">Goes to <span className="text-green">Grace Community · Austin</span></div>
                  </div>
                </div>
                <p className="text-sm text-text-muted leading-relaxed mb-4">Lord, give our pastors rest tonight. Guard their minds and knit this city together in peace. Amen.</p>
                <div className="bg-surface-3 border border-border rounded-xl p-4 mb-4">
                  <div className="text-sm font-medium mb-1">Sabbath margin</div>
                  <div className="text-xs text-text-muted leading-relaxed italic">"Sabbath margin isn't laziness; it is making room for God to be God while I remember I am dust..."</div>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-green/10 border border-border-green rounded-full text-[0.7rem] text-green">🏛 48</div>
                  <div className="px-3 py-1 bg-white/5 border border-border rounded-full text-[0.7rem] text-text-muted">🙏 12</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT / MEANING */}
      <div id="about" className="grid grid-cols-1 lg:grid-cols-2 border-t border-border">
        <div className="p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-border">
          <Reveal>
            <div className="font-serif text-7xl lg:text-[7rem] font-light text-text/15 leading-none tracking-tighter mb-2">Se<em className="italic text-gold not-italic">lah.</em></div>
            <div className="text-[0.7rem] text-text-dim tracking-widest mb-8 uppercase">/ ˈsiːlə / · Hebrew · found 74× in the Psalms</div>
            <p className="text-base text-text-muted leading-loose max-w-md">
              A musical and liturgical notation meaning <em className="italic text-gold-light not-italic">"pause and reflect"</em> — a divine instruction to stop, be still, and let the weight of the Word settle in your soul.<br /><br />That's exactly what this app invites you to do. Every single day.
            </p>
          </Reveal>
        </div>
        <div className="p-12 lg:p-24 flex flex-col justify-center">
          <Reveal delay={0.1}>
            <div className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Our mission</div>
            <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-6">Built for a generation<br />that wants depth,<br /><em className="italic text-gold">not just content.</em></h2>
            <p className="text-sm text-text-muted leading-relaxed max-w-md mb-10">Most Bible apps feel like reference tools. Selah is a companion. It remembers your notes, keeps your streak warm, connects you to a reading community, and helps you understand — not just read — the Word.</p>
            
            <div className="flex gap-10 pt-8 border-t border-border">
              <div>
                <div className="font-serif text-4xl font-normal leading-none">74<em className="italic text-green not-italic">×</em></div>
                <div className="text-[0.7rem] text-text-muted mt-1.5 tracking-wider uppercase">Selah in the Psalms</div>
              </div>
              <div>
                <div className="font-serif text-4xl font-normal leading-none">31<em className="italic text-green not-italic">k</em></div>
                <div className="text-[0.7rem] text-text-muted mt-1.5 tracking-wider uppercase">Verses covered</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* WAITLIST */}
      <section id="waitlist" className="bg-black text-center px-6 lg:px-16 py-32">
        <div className="max-w-[580px] mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-gold/5 border border-border-gold rounded-full px-5 py-2 text-[0.7rem] font-medium text-gold tracking-widest uppercase mb-8">
              <Star className="w-3 h-3" />
              Early access — limited spots available
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-normal leading-tight mb-4">Be the first to<br /><em className="italic text-gold">open Selah.</em></h2>
            <p className="text-text-muted text-lg leading-relaxed mb-10">We're dropping early access like an airdrop — but for the Word. Leave your email and we'll reach out when your spot is ready. 🙏</p>
            
            <form onSubmit={joinList} className="flex flex-col sm:flex-row gap-2 max-w-[480px] mx-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-surface border border-border rounded-full px-6 py-3.5 text-text placeholder:text-text-dim outline-none focus:border-green/40 transition-colors" 
                placeholder="your@email.com"
              />
              <button type="submit" className="bg-gold text-black px-7 py-3.5 rounded-full font-medium whitespace-nowrap hover:bg-gold-light hover:scale-105 transition-all active:scale-95">
                Get early access
              </button>
            </form>
            
            <p className={`text-xs mt-4 transition-colors ${wlMsg.color === 'red' ? 'text-red-400' : wlMsg.color === 'green' ? 'text-green' : 'text-text-dim'}`}>
              {wlMsg.text}
            </p>

            <div className="flex items-center justify-center gap-3 mt-12">
              <div className="flex -space-x-2.5">
                {['JK', 'SM', 'MK', 'LM'].map((init, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-surface-2 border-2 border-black flex items-center justify-center text-[0.6rem] font-medium text-text-muted">
                    {init}
                  </div>
                ))}
              </div>
              <div className="text-sm text-text-muted">
                <span className="text-green font-medium">5,000+</span> people are already on the list
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};
