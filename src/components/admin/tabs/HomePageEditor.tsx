import React from 'react';
import { SettingsEditor } from './SettingsEditor';
import { MockupManager } from './MockupManager';

export const HomePageEditor: React.FC = () => {
  const homeKeys = [
    { key: 'hero_title_part_1', label: 'Hero Title (Part 1)', type: 'text' as const, section: 'Hero Section' },
    { key: 'hero_title_accent', label: 'Hero Title Accent (Italic)', type: 'text' as const, section: 'Hero Section', helper: 'Displays in golden italic font' },
    { key: 'hero_title_part_2', label: 'Hero Title (Part 2)', type: 'text' as const, section: 'Hero Section' },
    { key: 'hero_description', label: 'Hero Subtext', type: 'textarea' as const, section: 'Hero Section' },
    
    { key: 'features_title', label: 'Features Section Title', type: 'text' as const, section: 'Features Section' },
    { key: 'features_description', label: 'Features Section Subtext', type: 'textarea' as const, section: 'Features Section' },
    
    { key: 'community_title', label: 'Community Title', type: 'text' as const, section: 'Community Section' },
    { key: 'community_accent', label: 'Community Accent', type: 'text' as const, section: 'Community Section' },
    { key: 'community_description', label: 'Community Description', type: 'textarea' as const, section: 'Community Section' },
    
    { key: 'about_title', label: 'About Section Title', type: 'text' as const, section: 'Meaning of Selah' },
    { key: 'about_description', label: 'About Section Body', type: 'textarea' as const, section: 'Meaning of Selah' },
    
    { key: 'mission_title', label: 'Mission Title', type: 'text' as const, section: 'Our Mission' },
    { key: 'mission_accent', label: 'Mission Accent', type: 'text' as const, section: 'Our Mission' },
    { key: 'mission_description', label: 'Mission Description', type: 'textarea' as const, section: 'Our Mission' },
  ];

  return (
    <div className="space-y-24">
      <SettingsEditor 
        title="Home Page Editor" 
        description="Manage the layout and messaging of your landing page"
        keys={homeKeys}
      />
      
      <div className="pt-24 border-t border-black/5">
        <MockupManager />
      </div>
    </div>
  );
};
