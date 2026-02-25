'use client';
import React from 'react';
import { HeaderAd, SidebarAd, FooterAd, InContentAd } from './AdSense';
import { EmailCapture, InlineEmailCapture } from './EmailCapture';

/**
 * Monetization Wrapper Component
 * Wraps your tool with monetization elements
 * 
 * @param {Object} props
 * @param {string} props.adClient - AdSense publisher ID
 * @param {Object} props.adSlots - Ad slot IDs for different positions
 * @param {boolean} props.showEmailCapture - Whether to show email capture
 * @param {Object} props.emailConfig - Email capture configuration
 * @param {ReactNode} props.children - Your tool content
 * @param {string} props.layout - Layout type ('default', 'sidebar', 'minimal')
 */
export const MonetizationWrapper = ({
  adClient,
  adSlots = {},
  showEmailCapture = true,
  emailConfig = {},
  children,
  layout = 'default'
}) => {
  const {
    headerSlot,
    sidebarSlot,
    footerSlot,
    inContentSlot
  } = adSlots;

  // Minimal layout - just header and footer ads
  if (layout === 'minimal') {
    return (
      <div className="monetization-wrapper minimal-layout">
        {headerSlot && <HeaderAd client={adClient} slot={headerSlot} />}
        
        <main className="tool-content">
          {children}
        </main>
        
        {showEmailCapture && (
          <EmailCapture {...emailConfig} />
        )}
        
        {footerSlot && <FooterAd client={adClient} slot={footerSlot} />}
      </div>
    );
  }

  // Sidebar layout - content with sidebar ads
  if (layout === 'sidebar') {
    return (
      <div className="monetization-wrapper sidebar-layout">
        {headerSlot && <HeaderAd client={adClient} slot={headerSlot} />}
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <main className="tool-content" style={{ flex: 1 }}>
            {children}
            
            {inContentSlot && (
              <InContentAd client={adClient} slot={inContentSlot} />
            )}
          </main>
          
          <aside style={{ width: '300px', flexShrink: 0 }}>
            {sidebarSlot && <SidebarAd client={adClient} slot={sidebarSlot} />}
            
            {showEmailCapture && (
              <EmailCapture {...emailConfig} />
            )}
            
            {sidebarSlot && <SidebarAd client={adClient} slot={sidebarSlot} />}
          </aside>
        </div>
        
        {footerSlot && <FooterAd client={adClient} slot={footerSlot} />}
      </div>
    );
  }

  // Default layout - stacked with all ad positions
  return (
    <div className="monetization-wrapper default-layout">
      {headerSlot && <HeaderAd client={adClient} slot={headerSlot} />}
      
      <main className="tool-content">
        {children}
        
        {inContentSlot && (
          <InContentAd client={adClient} slot={inContentSlot} />
        )}
      </main>
      
      {showEmailCapture && (
        <EmailCapture {...emailConfig} />
      )}
      
      {footerSlot && <FooterAd client={adClient} slot={footerSlot} />}
    </div>
  );
};

/**
 * Premium Feature Teaser Component
 */
export const PremiumTeaser = ({
  title = "Unlock Premium Features",
  features = [],
  ctaText = "Upgrade Now",
  ctaLink = "#",
  price = "$9.99/month",
  className = "",
  style = {}
}) => {
  return (
    <div className={`premium-teaser ${className}`} style={{
      padding: '24px',
      backgroundColor: '#fef3c7',
      border: '2px solid #f59e0b',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '24px 0',
      ...style
    }}>
      <h3 style={{ marginTop: 0, color: '#92400e' }}>{title}</h3>
      
      {features.length > 0 && (
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: '16px 0',
          textAlign: 'left',
          maxWidth: '300px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {features.map((feature, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              ✨ {feature}
            </li>
          ))}
        </ul>
      )}
      
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e', margin: '16px 0' }}>
        {price}
      </p>
      
      <a
        href={ctaLink}
        style={{
          display: 'inline-block',
          padding: '12px 32px',
          backgroundColor: '#f59e0b',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        {ctaText}
      </a>
    </div>
  );
};

/**
 * Affiliate Link Component
 */
export const AffiliateLink = ({
  href,
  children,
  trackingId,
  className = "",
  style = {}
}) => {
  const affiliateUrl = trackingId ? `${href}?ref=${trackingId}` : href;
  
  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`affiliate-link ${className}`}
      style={{
        color: '#3b82f6',
        textDecoration: 'underline',
        ...style
      }}
    >
      {children}
    </a>
  );
};