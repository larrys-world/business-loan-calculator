'use client';
// Premium Upgrade CTA Components
import React from 'react';

export const PremiumUpgradeBanner = ({
  title = "Upgrade to Premium",
  features = [],
  price = "$9.99/month",
  ctaText = "Upgrade Now",
  onUpgrade,
  className = ''
}) => {
  return (
    <div className={`premium-upgrade-banner ${className}`} style={{
      backgroundColor: '#f8f9fa',
      border: '2px solid #ffc107',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>
            ⭐ {title}
          </h3>
          {features.length > 0 && (
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#666' }}>
              {features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '0.25rem' }}>{feature}</li>
              ))}
            </ul>
          )}
          <p style={{ marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#28a745' }}>
            {price}
          </p>
        </div>
        
        <button
          onClick={onUpgrade}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#ffc107',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ffb300'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export const FeatureLimitWarning = ({
  feature = "calculations",
  used = 5,
  limit = 10,
  upgradeText = "Upgrade for unlimited access",
  onUpgrade,
  className = ''
}) => {
  const percentage = (used / limit) * 100;
  const isNearLimit = percentage >= 80;
  
  return (
    <div className={`feature-limit-warning ${className}`} style={{
      backgroundColor: isNearLimit ? '#fff3cd' : '#e9ecef',
      border: `1px solid ${isNearLimit ? '#ffeeba' : '#dee2e6'}`,
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 'bold' }}>
          {used} of {limit} free {feature} used today
        </span>
      </div>
      
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '0.5rem'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: isNearLimit ? '#ffc107' : '#28a745',
          transition: 'width 0.3s ease'
        }} />
      </div>
      
      {isNearLimit && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#856404' }}>
            {upgradeText}
          </span>
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: '#ffc107',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Upgrade
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const PremiumFeatureTeaser = ({
  title = "Premium Feature",
  description = "This feature is available for premium users",
  icon = "🔒",
  ctaText = "Unlock Now",
  onUnlock,
  className = ''
}) => {
  return (
    <div className={`premium-feature-teaser ${className}`} style={{
      position: 'relative',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      border: '2px dashed #6c757d',
      borderRadius: '8px',
      textAlign: 'center',
      opacity: 0.8
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h4 style={{ marginBottom: '0.5rem' }}>{title}</h4>
      <p style={{ marginBottom: '1rem', color: '#666' }}>{description}</p>
      
      {onUnlock && (
        <button
          onClick={onUnlock}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};