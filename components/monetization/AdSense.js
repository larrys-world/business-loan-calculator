'use client';
import React, { useEffect } from 'react';

/**
 * Google AdSense Ad Component
 * @param {Object} props
 * @param {string} props.client - AdSense publisher ID (e.g., 'ca-pub-XXXXXXXXXXXXXXXX')
 * @param {string} props.slot - Ad unit ID
 * @param {string} props.format - Ad format ('auto', 'fluid', 'rectangle', etc.)
 * @param {boolean} props.responsive - Whether the ad should be responsive
 * @param {Object} props.style - Custom styles for the ad container
 * @param {string} props.className - Custom CSS class
 */
export const AdSenseAd = ({ 
  client, 
  slot, 
  format = 'auto', 
  responsive = true,
  style = {},
  className = ''
}) => {
  useEffect(() => {
    try {
      // Push ads when component mounts
      if (window.adsbygoogle && client && slot && !client.includes('XXXX')) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [client, slot]);

  // Show placeholder when AdSense is not configured
  if (!client || !slot || client.includes('XXXX') || slot.includes('XXXX')) {
    return (
      <div className={`adsense-placeholder ${className}`} style={style}>
        <div 
          style={{
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            padding: '20px',
            margin: '20px 0',
            borderRadius: '8px',
            minHeight: style.minHeight || '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#6c757d',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ marginBottom: '8px', fontWeight: '600' }}>
              Advertisement Space
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              AdSense will appear here once configured
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

/**
 * Header Ad Component - Full width banner
 */
export const HeaderAd = ({ client, slot, ...props }) => (
  <AdSenseAd
    client={client}
    slot={slot}
    format="horizontal"
    className="header-ad"
    style={{ minHeight: '90px', marginBottom: '20px' }}
    {...props}
  />
);

/**
 * Sidebar Ad Component - Vertical rectangle
 */
export const SidebarAd = ({ client, slot, ...props }) => (
  <AdSenseAd
    client={client}
    slot={slot}
    format="rectangle"
    className="sidebar-ad"
    style={{ minHeight: '250px', marginBottom: '20px' }}
    {...props}
  />
);

/**
 * Footer Ad Component - Full width banner
 */
export const FooterAd = ({ client, slot, ...props }) => (
  <AdSenseAd
    client={client}
    slot={slot}
    format="horizontal"
    className="footer-ad"
    style={{ minHeight: '90px', marginTop: '40px' }}
    {...props}
  />
);

/**
 * In-Content Ad Component - Responsive rectangle
 */
export const InContentAd = ({ client, slot, ...props }) => (
  <AdSenseAd
    client={client}
    slot={slot}
    format="fluid"
    className="in-content-ad"
    style={{ margin: '20px 0' }}
    {...props}
  />
);