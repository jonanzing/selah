import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

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

export const About = () => {
  return (
    <div className="bg-black">
      {/* WORD HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 lg:px-16 pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-green-dark/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-200px] right-0 w-[400px] h-[400px] rounded-full bg-gold/4 blur-[120px] pointer-events-none" />
        
        <div className="font-serif text-[clamp(6rem,14vw,14rem)] font-light leading-[0.9] tracking-tighter text-text/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0">
          Se<em className="italic text-gold/10 not-italic">lah.</em>
        </div>

        <div className="relative z-10 max-w-[680px]">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-gold/5 border border-border-gold rounded-full px-4 py-1.5 text-[0.72rem] font-medium text-gold tracking-widest uppercase mb-8">
              The story behind the name
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl lg:text-[7rem] font-normal leading-[1.0] tracking-tighter mb-6">
              One word.<br /><em className="italic text-gold">74 times.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-text-muted leading-relaxed mb-10">
              Found 74 times across the Psalms, Selah is a Hebrew word that stops you mid-verse — not to confuse, but to invite. Pause. Sit with this. Let it settle. That's the entire heart of this app.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex justify-center">
              <a href="/#waitlist" className="inline-flex items-center gap-2 bg-green text-black px-8 py-4 rounded-full font-medium text-base hover:bg-green-light hover:-translate-y-0.5 transition-all active:translate-y-0">
                Join the waitlist <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEFINITION SECTION */}
      <section className="border-t border-border grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        <div className="p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-center">
          <Reveal>
            <div className="font-serif text-[clamp(4rem,9vw,9rem)] font-light leading-[0.9] tracking-tighter text-text/10 mb-2">
              Se<em className="italic text-gold/20 not-italic">lah.</em>
            </div>
            <div className="text-xs text-text-dim tracking-widest italic mb-10 uppercase">/ ˈsiːlə / &nbsp; Hebrew &nbsp; סֶלָה</div>
            
            <div className="space-y-8">
              <div className="pl-5 border-l-2 border-green/20">
                <div className="text-[0.68rem] font-medium tracking-widest uppercase text-green mb-1.5">Musical notation</div>
                <p className="text-base text-text-muted leading-relaxed">A direction in ancient Hebrew liturgy — likely meaning <em className="italic text-gold-light not-italic">"pause and lift up"</em> — an instruction to stop, be still, and let the music and the Word breathe together.</p>
              </div>
              <div className="pl-5 border-l-2 border-green/20">
                <div className="text-[0.68rem] font-medium tracking-widest uppercase text-green mb-1.5">Spiritual instruction</div>
                <p className="text-base text-text-muted leading-relaxed">Used at climactic moments in the Psalms — after a declaration of truth, a cry of desperation, or a shout of praise. God is saying: <em className="italic text-gold-light not-italic">stop. feel this. don't rush past it.</em></p>
              </div>
              <div className="pl-5 border-l-2 border-green/20">
                <div className="text-[0.68rem] font-medium tracking-widest uppercase text-green mb-1.5">Our purpose</div>
                <p className="text-base text-text-muted leading-relaxed">In a world of infinite scroll and instant everything, Selah is a daily invitation to slow down, open the Word, and <em className="italic text-gold-light not-italic">actually encounter it.</em></p>
              </div>
            </div>
          </Reveal>
        </div>
        
        <div className="p-12 lg:p-24 flex flex-col justify-center gap-12">
          <Reveal delay={0.1}>
            <div>
              <div className="text-[0.68rem] font-medium tracking-widest uppercase text-green mb-4">Where it appears</div>
              <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-4">The Psalms are full<br />of <em className="italic text-gold">Selah moments.</em></h2>
              <p className="text-base text-text-muted leading-relaxed">Psalm 3, 4, 7, 9, 24, 32, 46, 47, 48, 50... 74 times across the most honest book in the Bible. Each one is a divine comma. A breath. A moment where God says — don't gloss over this.</p>
            </div>
            
            <div className="bg-surface-2 border border-border-gold/30 rounded-2xl p-8">
              <div className="text-[0.68rem] font-medium tracking-widest uppercase text-gold mb-4">Psalm 46:1, 3</div>
              <div className="font-serif text-2xl italic text-text leading-relaxed mb-3">"God is our refuge and strength, a very present help in trouble... Though the mountains be carried into the midst of the sea; Though the waters thereof roar... <em className="not-italic text-gold">Selah.</em>"</div>
              <div className="text-xs text-text-dim">After the storm. After the chaos. That's where Selah lands.</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-surface border-t border-border px-6 lg:px-16 py-24">
        <div className="max-w-[720px] mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-medium tracking-widest uppercase text-green mb-6">Our manifesto</div>
            <h2 className="font-serif text-4xl lg:text-6xl font-normal leading-tight mb-8">We built this for<br /><em className="italic text-gold">depth, not distraction.</em></h2>
            <div className="space-y-5 text-lg text-text-muted leading-loose">
              <p>Most Bible apps were built like reference libraries. You go in, search a verse, copy it, leave. <strong className="text-text font-medium">We think that's the wrong approach entirely.</strong></p>
              <p>The Bible is not a search engine. It is a living document — one that rewards slowness, repetition, community, and daily faithfulness. It was meant to be read together, reflected on deeply, and applied to real life. <strong className="text-text font-medium">Selah is built around that conviction.</strong></p>
              <div className="border-l-2 border-gold pl-6 my-10 font-serif text-2xl italic text-gold-light leading-relaxed">
                "The goal is not to get through the Bible. The goal is to let the Bible get through you."
              </div>
              <p>That's why we built verse of the day — not as a notification, but as a moment. That's why notes are tied to scripture. That's why the reactions in our social feed say Amen and Pray instead of 👍. <strong className="text-text font-medium">Everything in Selah is intentional.</strong></p>
              <p>We're not the biggest Bible app. We don't want to be. We want to be the most meaningful one — the one you actually open every morning, the one you use to pray, to study, to share what God is doing in your life. <strong className="text-text font-medium">That's what Selah is for.</strong></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 lg:px-16 py-24 border-t border-border">
        <Reveal>
          <div className="text-[0.68rem] font-medium tracking-widest uppercase text-green mb-4">Our values</div>
          <h2 className="font-serif text-4xl lg:text-6xl font-normal leading-tight mb-12 max-w-[500px]">Everything we build is<br /><em className="italic text-gold">rooted in these.</em></h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Depth over volume", body: "We'd rather help you read one verse deeply than rush through ten. Slowness is a feature, not a bug." },
            { num: "02", title: "Community over audience", body: "The Commons is not a broadcast platform. It's a gathering. A table. A place where believers meet around scripture." },
            { num: "03", title: "Faithfulness over streaks", body: "The fire calendar is fun, but the real goal is daily faithfulness — not a number. Missing a day doesn't break your walk." },
            { num: "04", title: "Beauty as worship", body: "We believe good design honours God. Every screen was built with care — because the Word deserves a beautiful home." },
            { num: "05", title: "AI as a tool, not a teacher", body: "Our AI features help you understand context and organise thoughts. The Holy Spirit is still the real teacher." },
            { num: "06", title: "Built for this generation", body: "Gen Z and millennials love God deeply. They just need tools that match how they actually live and learn." }
          ].map((val, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-surface border border-border rounded-2xl p-8 hover:border-green/20 transition-colors">
                <div className="font-serif text-5xl font-light text-text/5 leading-none mb-4">{val.num}</div>
                <div className="text-lg font-medium mb-2">{val.title}</div>
                <p className="text-sm text-text-muted leading-relaxed">{val.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-surface-2 border-y border-border px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: "74×", lab: "Selah in the Psalms" },
            { val: "31k", lab: "Bible verses covered" },
            { val: "5k+", lab: "Early access signups" },
            { val: "1app", lab: "To bring it all together" }
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div className="font-serif text-5xl lg:text-6xl font-light text-text mb-2">{stat.val.replace('×', '')}<em className="not-italic text-green">{stat.val.includes('×') ? '×' : ''}</em></div>
                <div className="text-[0.7rem] text-text-muted tracking-widest uppercase">{stat.lab}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black text-center px-6 lg:px-16 py-32">
        <div className="max-w-[520px] mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-medium tracking-widest uppercase text-gold mb-6">Are you ready?</div>
            <h2 className="font-serif text-5xl lg:text-[4.5rem] font-normal leading-[1.05] mb-6">This is your<br /><em className="italic text-gold">Selah moment.</em></h2>
            <p className="text-lg text-text-muted leading-relaxed mb-10">Stop scrolling. Open the Word. Let it settle. That's all we're asking.</p>
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
