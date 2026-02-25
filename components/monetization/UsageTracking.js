'use client';
// Usage Tracking Component - Track and limit feature usage
import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'usage_tracking';

export const useUsageTracking = (featureKey, dailyLimit = 10) => {
  const [usage, setUsage] = useState(0);
  const [canUse, setCanUse] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadUsage = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        const today = new Date().toDateString();
        
        if (data.date === today && data[featureKey]) {
          setUsage(data[featureKey]);
          setCanUse(data[featureKey] < dailyLimit);
        } else {
          // Reset for new day
          resetUsage();
        }
      }
    };

    loadUsage();
  }, [featureKey, dailyLimit]);

  const incrementUsage = () => {
    if (!canUse) return false;

    const newUsage = usage + 1;
    const today = new Date().toDateString();
    
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : { date: today };
    
    data.date = today;
    data[featureKey] = newUsage;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    setUsage(newUsage);
    setCanUse(newUsage < dailyLimit);
    
    return newUsage < dailyLimit;
  };

  const resetUsage = () => {
    const today = new Date().toDateString();
    const data = { date: today, [featureKey]: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUsage(0);
    setCanUse(true);
  };

  return {
    usage,
    limit: dailyLimit,
    canUse,
    incrementUsage,
    resetUsage,
    remaining: Math.max(0, dailyLimit - usage)
  };
};

// Usage Tracker Component
export const UsageTracker = ({
  featureKey,
  dailyLimit = 10,
  onLimitReached,
  showWarningAt = 0.8, // Show warning at 80% usage
  children
}) => {
  const { usage, limit, canUse, incrementUsage, remaining } = useUsageTracking(featureKey, dailyLimit);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const percentage = usage / limit;
    setShowWarning(percentage >= showWarningAt && canUse);
    
    if (!canUse && onLimitReached) {
      onLimitReached();
    }
  }, [usage, limit, canUse, showWarningAt, onLimitReached]);

  const handleAction = (callback) => {
    if (canUse) {
      incrementUsage();
      if (callback) callback();
    } else if (onLimitReached) {
      onLimitReached();
    }
  };

  return (
    <>
      {showWarning && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeeba',
          color: '#856404',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '14px'
        }}>
          ⚠️ You have {remaining} free uses remaining today
        </div>
      )}
      
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.props.onClick) {
          return React.cloneElement(child, {
            onClick: () => handleAction(child.props.onClick),
            disabled: !canUse || child.props.disabled
          });
        }
        return child;
      })}
    </>
  );
};

// Analytics Event Tracker
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Custom analytics endpoint
  if (window.ANALYTICS_ENDPOINT) {
    fetch(window.ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
        url: window.location.href
      })
    }).catch(err => console.error('Analytics error:', err));
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Track Event:', eventName, eventData);
  }
};