import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

// Import local screenshots for the hero
import homeImg from '../screenshots/home.png.jpg';
import socialsImg from '../screenshots/socials.png.jpg';

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

export const Community = () => {
  return (
    <div className="bg-black">
      {/* HERO */}
      <section className="min-h-[60vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 pt-40 pb-20 relative overflow-hidden gap-12">
        <div className="absolute top-[-100px] right-[-100px] w-[550px] h-[400px] rounded-full bg-green-dark/8 blur-[110px] pointer-events-none" />
        
        <div className="max-w-[580px] shrink-0 text-center lg:text-left z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-green/5 border border-border-green rounded-full px-4 py-1.5 text-[0.72rem] font-medium text-green tracking-widest uppercase mb-7">
              The Commons · Live now
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl lg:text-[5.5rem] font-normal leading-[1.04] tracking-tight mb-6">
              Pray together.<br />Read together.<br /><em className="italic text-gold">Grow together.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-text-muted leading-relaxed max-w-[460px] mx-auto lg:mx-0">
              The Selah community is built around the Word — not content. Every post is rooted in scripture, every reaction is meaningful, every room is a space of real faith.
            </p>
          </Reveal>
        </div>

        {/* LIVE PHONES */}
        <div className="flex gap-6 items-start shrink-0">
          <Reveal delay={0.3}>
            <div className="lp w-[185px] rounded-[36px] overflow-hidden shadow-2xl relative">
              <img src={homeImg} alt="Selah home" className="w-full block" />
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="lp main w-[210px] -mt-5 rounded-[36px] overflow-hidden shadow-2xl relative">
              <img src={socialsImg} alt="Selah socials" className="w-full block" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* REACTIONS */}
      <section className="bg-surface border-t border-border px-6 lg:px-16 py-24 text-center">
        <Reveal>
          <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-4">How you react</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-4 mx-auto max-w-[600px]">
            Not a heart.<br /><em className="italic text-gold">A real response.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-sm text-text-muted leading-relaxed max-w-[480px] mx-auto mb-12">
            We removed the generic heart and replaced it with four reactions that mean something — because faith deserves better than a double-tap.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🏛", name: "Amen", desc: "I agree. I receive this. Let it be so in my life too.", count: "48K" },
            { icon: "🙏", name: "Pray", desc: "I'm standing in prayer with you on this.", count: "31K" },
            { icon: "🤲", name: "Thanks", desc: "This was exactly what I needed to read today.", count: "22K" },
            { icon: "⚡", name: "Truth", desc: "This is real. This is accurate. This is the Word.", count: "18K" }
          ].map((react, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-surface-2 border border-border rounded-[20px] p-8 hover:border-green/20 hover:-translate-y-1 transition-all group">
                <div className="text-4xl mb-4">{react.icon}</div>
                <div className="text-lg font-medium mb-2">{react.name}</div>
                <p className="text-xs text-text-muted leading-relaxed mb-4">{react.desc}</p>
                <div className="font-serif text-3xl text-green">{react.count}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEED & ROOMS */}
      <section className="px-6 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <Reveal>
            <div>
              <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-4">From the commons</div>
              <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-8">A feed that<br /><em className="italic text-gold">feeds your soul.</em></h2>
              
              <div className="space-y-4 max-w-[520px]">
                {[
                  {
                    init: 'M', bg: '#1a3020', color: '#74c69d', name: 'Mara K.', time: '1h',
                    body: 'Lord, give our pastors rest tonight. Guard their minds and knit this city together in peace. Amen.',
                    inner: { t: 'Sabbath margin', b: '"Sabbath margin isn\'t laziness; it is making room for God to be God while I remember I am dust..."'},
                    rx: '🏛 Amen 48'
                  },
                  {
                    init: 'S', bg: '#1a1a3a', color: '#9090ee', name: 'Sarah M.', time: '25m',
                    body: 'Slow read through Romans — this chapter keeps stopping me.',
                    inner: { t: 'Margins in Romans 8', b: "I'm opening Romans slowly this month — one paragraph at a time, pen in hand, no skipping to the \"famous\" verses."},
                    rx: '🏛 Amen 21'
                  }
                ].map((post, i) => (
                  <div key={i} className="bg-surface-2 border border-border rounded-[18px] p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-xs font-medium" style={{ background: post.bg, color: post.color }}>{post.init}</div>
                      <div>
                        <div className="text-sm font-medium">{post.name} <span className="text-text-muted font-normal text-xs">· {post.time}</span></div>
                        <div className="text-[0.75rem] text-text-muted">Goes to <span className="text-green">Grace Community · Austin</span></div>
                      </div>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed mb-4">{post.body}</p>
                    <div className="bg-surface-3 border border-border rounded-xl p-4 mb-4">
                      <div className="text-sm font-medium mb-1">{post.inner.t}</div>
                      <div className="text-[0.78rem] text-text-muted leading-relaxed italic">{post.inner.b}</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="inline-flex items-center gap-1.5 bg-green/10 border border-border-green rounded-full px-3 py-1 text-[0.75rem] text-green">{post.rx}</div>
                      <div className="inline-flex items-center gap-1.5 bg-white/5 border border-border rounded-full px-3 py-1 text-[0.75rem] text-text-muted">🙏 Pray</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Live reading rooms</div>
              <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-6">Read the same<br /><em className="italic text-gold">verse, together.</em></h2>
              <p className="text-base text-text-muted leading-relaxed mb-8">Join a live room and open scripture alongside dozens of other believers — in real time. See who else is on the same verse. Read at the same pace. Pray at the end.</p>
              
              <div className="space-y-4">
                <div className="bg-surface border border-border rounded-[18px] p-6 hover:border-green/20 transition-colors">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 text-[0.68rem] text-red-400 font-medium mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE · 14 MIN
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-dark/20 flex items-center justify-center text-[0.7rem] font-medium text-green">M</div>
                    <div>
                      <div className="text-sm font-medium">Mara K.</div>
                      <div className="text-[0.75rem] text-text-muted">Hosting · 128 reading along</div>
                    </div>
                  </div>
                  <div className="text-base font-medium mb-1">Evening Psalms</div>
                  <div className="text-[0.78rem] text-text-muted mb-3">Tonight · Psalm 4 & 91</div>
                  <div className="font-serif text-2xl text-green">128 <span className="text-[0.7rem] text-text-dim not-italic">reading along</span></div>
                </div>

                <div className="bg-surface border border-border rounded-[18px] p-6 hover:border-green/20 transition-colors">
                  <div className="inline-flex items-center gap-2 bg-gold/10 border border-border-gold rounded-full px-3 py-1 text-[0.68rem] text-gold font-medium mb-4">
                    Starting in 20 min
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[0.7rem] font-medium text-blue-400">D</div>
                    <div>
                      <div className="text-sm font-medium">Daniel O.</div>
                      <div className="text-[0.75rem] text-text-muted">Hosting · 45 signed up</div>
                    </div>
                  </div>
                  <div className="text-base font-medium mb-1">Romans Deep Dive</div>
                  <div className="text-[0.78rem] text-text-muted mb-3">Romans 8 · Full chapter</div>
                  <div className="font-serif text-2xl text-green">45 <span className="text-[0.7rem] text-text-dim not-italic">signed up</span></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRENDING */}
      <section className="bg-surface border-t border-border px-6 lg:px-16 py-24">
        <Reveal>
          <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Verses trending this week</div>
          <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-10 max-w-[500px]">What the community<br />is <em className="italic text-gold">reflecting on.</em></h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee; be not dismayed; for I am thy God...", fill: "88%", count: "2,840 reflections", fire: true },
            { ref: "Psalm 23:1–2", text: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures...", fill: "74%", count: "2,410 reflections", fire: true },
            { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me.", fill: "61%", count: "1,920 reflections", fire: false },
            { ref: "Romans 8:28", text: "And we know that all things work together for good to them that love God...", fill: "55%", count: "1,740 reflections", fire: false }
          ].map((tv, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-surface-2 border border-border rounded-2xl p-6">
                <div className="text-base font-medium mb-1">{tv.ref}</div>
                <p className="text-sm text-text-muted leading-relaxed mb-4 h-10 overflow-hidden line-clamp-2">{tv.text}</p>
                <div className="h-[3px] bg-surface-3 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-green rounded-full" style={{ width: tv.fill }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] text-text-dim">{tv.count} this week</span>
                  {tv.fire && <span className="text-base">🔥</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-center px-6 lg:px-16 py-32 border-t border-border">
        <div className="max-w-[520px] mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Join the community</div>
            <h2 className="font-serif text-5xl lg:text-6xl font-normal leading-tight mb-6">Your people are<br /><em className="italic text-gold">already inside.</em></h2>
            <p className="text-lg text-text-muted leading-relaxed mb-10">Get early access and be part of the founding community of Selah — the believers who show up before the doors open.</p>
            <div className="flex justify-center">
              <a href="/#waitlist" className="inline-flex items-center gap-2 bg-green text-black px-8 py-4 rounded-full font-medium text-base hover:bg-green-light hover:-translate-y-0.5 transition-all active:translate-y-0">
                Get early access <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
