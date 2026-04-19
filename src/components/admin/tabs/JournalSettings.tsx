import React from 'react';
import { SettingsEditor } from './SettingsEditor';
import { BlogManager } from './BlogManager';

export const JournalSettings: React.FC = () => {
  const journalKeys = [
    { key: 'blog_hero_title', label: 'Journal Header Title', type: 'text' as const, section: 'Magazine Header' },
    { key: 'blog_hero_accent', label: 'Journal Header Accent', type: 'text' as const, section: 'Magazine Header', helper: 'Displays as golden italic text' },
    { key: 'blog_hero_description', label: 'Journal Subtext', type: 'textarea' as const, section: 'Magazine Header' },
    
    { key: 'blog_featured_title', label: 'Featured Article Title', type: 'text' as const, section: 'Featured Highlight', helper: 'The main article highlighted on the Journal page' },
    { key: 'blog_featured_accent', label: 'Featured Title Accent', type: 'text' as const, section: 'Featured Highlight' },
    { key: 'blog_featured_description', label: 'Featured Article Excerpt', type: 'textarea' as const, section: 'Featured Highlight' },
    
    { key: 'blog_featured_verse', label: 'Featured Section Verse', type: 'textarea' as const, section: 'Scripture Callout' },
    { key: 'blog_featured_ref', label: 'Featured Section Reference', type: 'text' as const, section: 'Scripture Callout', helper: 'e.g., Psalm 23:1' },
    
    { key: 'devotionals_title', label: 'Devotionals Section Title', type: 'text' as const, section: 'Secondary Sections' },
    { key: 'devotionals_accent', label: 'Devotionals Accent', type: 'text' as const, section: 'Secondary Sections' },
    
    { key: 'spotlight_title', label: 'Spotlight Section Title', type: 'text' as const, section: 'Secondary Sections' },
    { key: 'spotlight_accent', label: 'Spotlight Accent', type: 'text' as const, section: 'Secondary Sections' },
  ];

  return (
    <div className="space-y-24">
      <SettingsEditor 
        title="Journal Interface" 
        description="Manage the headers and metadata of the Selah Journal"
        keys={journalKeys}
      />
      
      <div className="pt-24 border-t border-black/5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="mb-12">
          <h3 className="text-2xl font-light tracking-tight mb-2 serif">Journal Article Management</h3>
          <p className="text-xs text-black/40 uppercase tracking-widest font-bold">Write, edit, and publish your stories to the world</p>
        </div>
        <BlogManager />
      </div>
    </div>
  );
};
