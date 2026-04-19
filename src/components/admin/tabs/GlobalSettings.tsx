import React from 'react';
import { SettingsEditor } from './SettingsEditor';

export const GlobalSettings: React.FC = () => {
  const brandingKeys = [
    { key: 'site_name', label: 'Official Site Name', type: 'text' as const, section: 'Core Identity' },
    { key: 'asset_favicon', label: 'Browser Favicon URL', type: 'image' as const, section: 'Core Identity', helper: 'Shown in browser tabs' },
    { key: 'asset_logo_admin', label: 'Admin Dashboard Logo URL', type: 'image' as const, section: 'Core Identity', helper: 'Shown in this sidebar' },
    
    { key: 'seo_title', label: 'Master Site Title', type: 'text' as const, section: 'Search & Sharing', helper: 'Shown in Google search results' },
    { key: 'seo_description', label: 'Meta Description (SEO)', type: 'textarea' as const, section: 'Search & Sharing' },
    { key: 'seo_og_image', label: 'Social Sharing Image (OG)', type: 'image' as const, section: 'Search & Sharing', helper: 'Shown when sharing links on social media' },
    
    { key: 'btn_waitlist_text', label: 'Waitlist Button Text', type: 'text' as const, section: 'Primary CTA' },
    { key: 'btn_waitlist_url', label: 'Waitlist Target URL', type: 'text' as const, section: 'Primary CTA' },
  ];

  return (
    <SettingsEditor 
      title="Branding & SEO" 
      description="Manage your site's global identity and search visibility"
      keys={brandingKeys}
    />
  );
};
