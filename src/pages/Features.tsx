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

export const Features = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const featureBlocks = [
    {
      id: 'f1',
      num: '01',
      label: 'Verse of the day',
      title: <>Scripture that<br /><em>meets you every morning.</em></>,
      body: 'Every day opens with a handpicked verse — presented beautifully against a full photo background. Not just to read, but to feel. Like, comment, share, take notes, or go deeper into the full chapter.',
      list: [
        'Like and comment with your community',
        'Share as a text post or generate a quote graphic with your name',
        'AI-generates a beautiful image of the verse for social media',
        'One tap to open the full chapter in the Bible reader',
        'Take a personal note directly linked to that verse'
      ],
      img: 'https://picsum.photos/seed/feat1/600/1200'
    },
    {
      id: 'f2',
      num: '02',
      label: 'Character of the day',
      title: <>Ancient lives.<br /><em>Living lessons.</em></>,
      body: "Each day, one biblical character steps forward — their story, their struggle, their faithfulness. Ruth's loyalty. David's courage. Esther's boldness. These aren't history lessons. They're mirrors.",
      list: [
        'A different Bible character every single day',
        'Their story told as inspiration, not just biography',
        'Theme tag: loyalty, courage, redemption, faith, wisdom',
        'Like, comment, share, and take notes on each character',
        'Share the character as a beautifully designed post'
      ],
      img: 'https://picsum.photos/seed/feat2/600/1200'
    },
    {
      id: 'f3',
      num: '03',
      label: 'Bible reader',
      title: <>The full Word.<br /><em>Beautifully readable.</em></>,
      body: 'A full Bible reading experience built for depth — not just speed-reading. Highlight verses, take margin notes, switch translations, and read alongside others in real time.',
      list: [
        'Multiple translations: KJV, NIV, NLT, ESV and more',
        'Personal highlights saved and colour-coded',
        'Tap any verse for an AI explanation — history, context, meaning',
        'Live reading rooms: see where your friends are on the page',
        'Generate a shareable verse graphic with your name on it'
      ],
      img: 'https://picsum.photos/seed/feat3/600/1200'
    },
    {
      id: 'f4',
      num: '04',
      label: 'Smart notes',
      title: <>Your thoughts,<br /><em>never lost again.</em></>,
      body: 'Selah Notes is where your spiritual life gets organised. Sunday sermons, quiet time reflections, prayer journals, random insights — all searchable, categorised, and tied to scripture.',
      list: [
        'Speak and let AI transcribe and organise your thoughts',
        'Categories: Favourites, Sunday Sermons, Quiet Time, Small Group, Journal',
        'Every note links directly to its Bible passage',
        'Search across all notes, sermons, journals and verses at once',
        'Post any note directly to The Commons'
      ],
      img: 'https://picsum.photos/seed/feat4/600/1200'
    },
    {
      id: 'f5',
      num: '05',
      label: 'The commons',
      title: <>A social feed<br /><em>built for believers.</em></>,
      body: "The Commons is not like any social feed you've been on. Every post is faith-rooted — verses, prayers, notes, reflections. And the reactions? Not just a heart. Amen. Pray. Thanks. Truth.",
      list: [
        'Post a verse, a note, a prayer, or a character — directly from your content',
        '4 unique reactions: Amen, Pray, Thanks, Truth',
        'Join live prayer rooms and read-together sessions',
        'See trending verses across the whole community',
        'Church community tags — see where people worship'
      ],
      img: 'https://picsum.photos/seed/feat5/600/1200'
    },
    {
      id: 'f6',
      num: '06',
      label: 'Streaks & coins',
      title: <>Keep the<br /><em>flame burning.</em></>,
      body: "Consistency is the most powerful spiritual discipline. Selah gamifies your daily faithfulness in a way that feels intentional — not gimmicky. Fire emojis on a calendar hit different when it's your walk with God.",
      list: [
        'Daily streak tracked on a beautiful fire calendar',
        'Streak count visible at the top of your home screen every day',
        'Earn coins for reading, noting, and engaging',
        'Streak notifications and gentle reminders to open the Word',
        'Your longest streak is always remembered'
      ],
      img: 'https://picsum.photos/seed/feat6/600/1200'
    }
  ];

  return (
    <div className="bg-black">
      {/* PAGE HERO */}
      <div className="min-h-[52vh] flex flex-col items-center justify-center text-center px-6 lg:px-16 pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-green-dark/7 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[10%] w-[300px] h-[300px] rounded-full bg-gold/4 blur-[100px] pointer-events-none" />
        
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-green/5 border border-border-green rounded-full px-4 py-1.5 text-[0.72rem] font-medium text-green tracking-widest uppercase mb-7">
            <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            Six features. One purpose.
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <h1 className="font-serif text-6xl lg:text-[6.5rem] font-normal leading-[1.03] tracking-tight mb-6">
            Built for the<br /><em className="italic text-gold">whole journey.</em>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-text-muted leading-relaxed max-w-[520px] mx-auto">
            Every feature in Selah was designed around one question: what does a believer actually need to go deeper in the Word, every day?
          </p>
        </Reveal>
      </div>

      {/* TABS */}
      <div className="bg-surface border-y border-border sticky top-20 z-[150]">
        <div className="flex overflow-x-auto gap-0 px-6 lg:px-16 no-scrollbar">
          {featureBlocks.map((f) => (
            <motion.button 
              key={f.id}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              className="px-7 py-4.5 text-[0.85rem] font-medium text-text-muted border-b-2 border-transparent whitespace-nowrap transition-all hover:text-text active:text-green focus:text-green focus:border-green"
              onClick={() => scrollTo(f.id)}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* FEATURE DETAIL BLOCKS */}
      <div className="space-y-0">
        {featureBlocks.map((f, idx) => (
          <div 
            key={f.id} 
            id={f.id} 
            className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-6 lg:px-16 py-20 border-b border-border last:border-none ${idx % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
          >
            <div className={idx % 2 !== 0 ? 'lg:direction-ltr' : ''}>
              <Reveal>
                <div className="font-serif text-[5rem] font-light text-text/5 leading-none -mb-2">{f.num}</div>
                <div className="text-[0.7rem] font-medium tracking-[0.1em] uppercase text-green mb-3">{f.label}</div>
                <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-4">{f.title}</h2>
                <p className="text-base text-text-muted leading-loose mb-6">{f.body}</p>
                <ul className="space-y-3 list-none">
                  {f.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-green mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className={`flex justify-center ${idx % 2 !== 0 ? 'lg:direction-ltr' : ''}`}>
              {/* Image removed as requested */}
            </div>
          </div>
        ))}
      </div>

      {/* CTA BAND */}
      <div className="bg-surface border-t border-border text-center px-6 lg:px-16 py-24">
        <div className="max-w-[560px] mx-auto">
          <Reveal>
            <div className="text-[0.68rem] font-medium tracking-[0.12em] uppercase text-green mb-4">Ready?</div>
            <h2 className="font-serif text-4xl lg:text-5xl font-normal leading-tight mb-4">Six features.<br /><em className="italic text-gold">One daily habit.</em></h2>
            <p className="text-base text-text-muted leading-relaxed mb-8 max-w-[420px] mx-auto">Selah brings everything you need into one place — and makes opening your Bible the best part of your day.</p>
            <div className="flex justify-center">
              <motion.a 
                href="/#waitlist" 
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-green text-black px-8 py-4 rounded-full font-medium text-base hover:bg-green-light transition-all"
              >
                Get early access <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
