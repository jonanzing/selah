import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';

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

export const Blog = () => {
  const { get } = useCMS();
  const [nlEmail, setNlEmail] = useState('');
  const [nlMsg, setNlMsg] = useState({ text: 'Free forever. Unsubscribe any time.', color: 'dim' });

  const nlJoin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const v = nlEmail.trim();
    if (!v || !v.includes('@')) {
      setNlMsg({ text: 'Please enter a valid email.', color: 'red' });
      return;
    }
    setNlMsg({ text: '🙏 You\'re subscribed! First devotional arrives tomorrow morning.', color: 'green' });
    setNlEmail('');
  };

  const categories = [
    "All posts", "Devotionals", "Character spotlight", "Verse deep dive", "Quiet time", "Community stories", "App updates"
  ];

  const posts = [
    {
      cat: "Verse deep dive",
      title: <>"Fear not" — why God says it <em className="italic">365 times.</em></>,
      excerpt: "Is it coincidence that the most repeated command in the Bible matches the number of days in a year? Probably not.",
      read: "5 min read",
      date: "April 13",
      verse: "Fear thou not; for I am with thee.",
      ref: "Isaiah 41:10",
      grad: "bg-[#52B788]/10",
      glow: "rgba(82,183,136,0.2)"
    },
    {
      cat: "Character spotlight",
      title: <>Ruth: the outsider who <em className="italic">chose the covenant.</em></>,
      excerpt: "She had every reason to go back. She had no blood claim, no status, no promise. And yet she stayed. That's the whole sermon.",
      read: "4 min read",
      date: "April 11",
      verse: "And God said, Let there be light: and there was light.",
      ref: "Genesis 1:3",
      grad: "bg-[#C9A84C]/10",
      glow: "rgba(201,168,76,0.15)"
    },
    {
      cat: "Quiet time",
      title: <>What "Selah" actually <em className="italic">sounds like in practice.</em></>,
      excerpt: "We've been told to slow down with scripture. But what does that actually look like at 6am before work?",
      read: "7 min read",
      date: "April 10",
      verse: "I can do all things through Christ which strengtheneth me.",
      ref: "Philippians 4:13",
      grad: "bg-gold/10",
      glow: "rgba(82,82,200,0.1)"
    }
  ];

  return (
    <div className="bg-black">
      {/* HERO */}
      <section className="px-6 lg:px-16 pt-40 pb-20 border-b border-border">
        <div className="max-w-[680px]">
          <Reveal>
            <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Selah Journal</div>
            <h1 className="font-serif text-5xl lg:text-[5.5rem] font-normal leading-[1.04] tracking-tighter mb-5">
              {get('blog_hero_title', 'Words that')}
              <br />
              <em className="italic text-gold">{get('blog_hero_accent', 'make you pause.')}</em>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-[500px]">
              {get('blog_hero_description', 'Devotionals, character spotlights, verse breakdowns, and reflections — written to help you go deeper in the Word, one day at a time.')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FILTERS */}
      <div className="bg-surface border-b border-border sticky top-20 z-[150]">
        <div className="flex overflow-x-auto gap-2 px-6 lg:px-16 py-6 no-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className={`px-4 py-2 rounded-full border text-xs font-medium whitespace-nowrap transition-all ${
                i === 0 ? 'bg-green/10 border-green/20 text-green' : 'border-border text-text-muted hover:border-text/20 hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED POST */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border min-h-[420px]">
        <div className="bg-surface-2 p-12 flex items-center justify-center relative overflow-hidden border-r border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--border-green)_0%,transparent_70%)] opacity-50" />
          <div className="relative z-10 text-center">
            <Reveal>
              <div className="font-serif text-2xl lg:text-3xl italic text-text leading-relaxed mb-4">
                "{get('blog_featured_verse', 'The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures.')}"
              </div>
              <div className="text-xs text-green font-medium tracking-widest uppercase">{get('blog_featured_ref', 'Psalm 23:1–2 · KJV')}</div>
            </Reveal>
          </div>
        </div>
        <div className="bg-surface p-12 flex flex-col justify-center">
          <Reveal delay={0.1}>
            <div className="inline-block bg-green/5 border border-green/20 rounded-full px-4 py-1 text-[0.68rem] font-medium tracking-widest uppercase text-green mb-5">
              Featured · Verse deep dive
            </div>
            <h2 className="font-serif text-3xl lg:text-5xl font-normal leading-tight mb-4">
              {get('blog_featured_title', 'What does it mean')}
              <br />
              to <em className="italic text-gold">{get('blog_featured_accent', 'lack nothing?')}</em>
            </h2>
            <p className="text-base text-text-muted leading-relaxed mb-6">
              {get('blog_featured_description', 'Psalm 23 is one of the most memorised passages in scripture — but how often do we actually sit with what it\'s saying? "I shall not want" is not a prosperity promise. It\'s a relational declaration. Here\'s what it actually means.')}
            </p>
            <div className="flex items-center gap-3 text-xs text-text-dim mb-6">
              <span>Selah Journal</span>
              <div className="w-1 h-1 rounded-full bg-text-dim" />
              <span>6 min read</span>
              <div className="w-1 h-1 rounded-full bg-text-dim" />
              <span>April 14, 2026</span>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-green text-sm font-medium group transition-all">
              Read this reflection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="px-6 lg:px-16 py-20">
        <Reveal>
          <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-2">Latest posts</div>
          <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-12">Fresh from<br />the <em className="italic text-gold">journal.</em></h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-green/20 hover:-translate-y-1 transition-all group">
                <div className={`h-40 ${post.grad} border-b border-border flex items-center justify-center relative overflow-hidden p-6`}>
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse, ${post.glow}, transparent 70%)` }} />
                  <div className="relative z-10 text-center">
                    <div className="font-serif text-lg italic text-text leading-snug mb-2">{post.verse}</div>
                    <div className="text-[0.7rem] text-green font-semibold tracking-widest uppercase">{post.ref}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[0.65rem] font-medium tracking-widest uppercase text-green mb-2">{post.cat}</div>
                  <h3 className="font-serif text-xl font-normal leading-snug mb-3 text-text group-hover:text-green-light transition-colors">{post.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-[0.7rem] text-text-dim">
                    <Clock className="w-3 h-3" /> {post.read}
                    <div className="w-1 h-1 rounded-full bg-text-dim" />
                    <Calendar className="w-3 h-3" /> {post.date}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DEVOTIONALS */}
      <section className="bg-surface border-t border-border px-6 lg:px-16 py-20">
        <Reveal>
          <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-2">Morning devotionals</div>
          <h2 className="font-serif text-3xl lg:text-4xl font-normal leading-tight mb-10">
            {get('devotionals_title', 'Short. Deep.')}
            <em className="italic text-gold italic pl-2">{get('devotionals_accent', 'Daily.')}</em>
          </h2>
        </Reveal>

        <div className="space-y-0">
          {[
            { n: '01', cat: 'Quiet time', title: 'The 5-minute morning Selah — how to start your day in the Word', exc: 'A simple framework for the believer who doesn\'t have an hour but still wants to show up.', read: '3 min', date: 'Apr 12' },
            { n: '02', cat: 'Devotional', title: 'On crying out to God — what the Psalms teach us about prayer', exc: 'David didn\'t filter his prayers. He came as he was — broken, afraid, grateful, confused.', read: '4 min', date: 'Apr 9' },
            { n: '03', cat: 'Verse deep dive', title: 'Why Genesis 1:1 is the most important sentence ever written', exc: 'Everything that follows depends on whether you believe the first sentence.', read: '5 min', date: 'Apr 6' }
          ].map((devo, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid grid-cols-[3rem_1fr_auto] gap-5 items-center py-6 border-b border-border group cursor-pointer">
                <div className="font-serif text-3xl font-light text-text/10 group-hover:text-green/20 transition-colors">{devo.n}</div>
                <div>
                  <div className="text-[0.65rem] font-medium tracking-widest uppercase text-text-dim mb-1">{devo.cat}</div>
                  <div className="text-base font-medium text-text group-hover:text-green-light transition-colors">{devo.title}</div>
                  <div className="text-xs text-text-muted mt-1 line-clamp-1">{devo.exc}</div>
                </div>
                <div className="text-right">
                  <div className="text-[0.72rem] text-text-dim">{devo.read}</div>
                  <div className="text-[0.72rem] text-text-dim mt-1">{devo.date}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CHARACTER SPOTLIGHTS */}
      <section className="px-6 lg:px-16 py-20 border-t border-border">
        <Reveal>
          <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-2">Character spotlights</div>
          <h2 className="font-serif text-3xl lg:text-4xl font-normal leading-tight mb-10">
            {get('spotlight_title', 'Ancient lives.')}
            <br />
            <em className="italic text-gold italic">{get('spotlight_accent', 'Living lessons.')}</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { i: 'R', name: 'Ruth', theme: 'Loyalty', bg: '#1a3020', c: '#74c69d' },
            { i: 'D', name: 'David', theme: 'Courage', bg: '#1a1a3a', c: '#9090ee' },
            { i: 'E', name: 'Esther', theme: 'Boldness', bg: '#2a1d10', c: '#c9a84c' },
            { i: 'P', name: 'Paul', theme: 'Mission', bg: '#2a1010', c: '#ee9090' },
            { i: 'J', name: 'Joseph', theme: 'Faith', bg: '#101a25', c: '#90b4d4' },
            { i: 'M', name: 'Mary', theme: 'Grace', bg: '#1a2a10', c: '#a0d470' },
            { i: 'D', name: 'Deborah', theme: 'Wisdom', bg: '#1a1020', c: '#d490e8' },
            { i: 'N', name: 'Nehemiah', theme: 'Vision', bg: '#201510', c: '#d4a470' }
          ].map((char, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-surface-2 border border-border rounded-2xl p-5 text-center hover:border-green/20 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl mx-auto mb-3" style={{ background: char.bg, color: char.c }}>{char.i}</div>
                <div className="text-sm font-medium text-text mb-1">{char.name}</div>
                <div className="text-[0.65rem] text-green tracking-widest uppercase">{char.theme}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-surface-2 border-y border-border px-6 lg:px-16 py-24 text-center">
        <div className="max-w-[520px] mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-gold mb-4">The Selah newsletter</div>
            <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-4">One devotional.<br /><em className="italic text-gold">Every morning.</em></h2>
            <p className="text-sm text-text-muted leading-relaxed mb-10">A short, scripture-first reflection in your inbox every morning. No fluff. Just the Word, and a moment to sit with it.</p>
            
            <form onSubmit={nlJoin} className="flex flex-col sm:flex-row gap-2 max-w-[420px] mx-auto">
              <input 
                type="email" 
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                className="flex-1 bg-surface border border-border rounded-full px-6 py-3 text-sm outline-none focus:border-green/40 transition-colors" 
                placeholder="your@email.com"
              />
              <button type="submit" className="bg-green text-black px-8 py-3 rounded-full font-medium text-sm hover:bg-green-light transition-all">
                Subscribe
              </button>
            </form>
            <p className={`text-[0.72rem] mt-3 transition-colors ${nlMsg.color === 'red' ? 'text-red-400' : nlMsg.color === 'green' ? 'text-green' : 'text-text-dim'}`}>
              {nlMsg.text}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
