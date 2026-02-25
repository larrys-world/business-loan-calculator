'use client';
import React, { useState } from 'react';

/**
 * Email Capture Component
 * @param {Object} props
 * @param {string} props.title - Form title
 * @param {string} props.description - Form description
 * @param {string} props.buttonText - Submit button text
 * @param {Function} props.onSubmit - Callback function when form is submitted
 * @param {string} props.successMessage - Message to show after successful submission
 * @param {string} props.className - Custom CSS class
 * @param {Object} props.style - Custom styles
 */
export const EmailCapture = ({
  title = "Stay Updated",
  description = "Get notified about new tools and features",
  buttonText = "Subscribe",
  onSubmit,
  successMessage = "Thanks for subscribing!",
  className = "",
  style = {}
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Default behavior: store in localStorage for now
        const subscribers = JSON.parse(localStorage.getItem('email_subscribers') || '[]');
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem('email_subscribers', JSON.stringify(subscribers));
        }
      }
      
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Email capture error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`email-capture-success ${className}`} style={style}>
        <p style={{ color: '#10b981', fontWeight: 'bold' }}>{successMessage}</p>
      </div>
    );
  }

  return (
    <div className={`email-capture ${className}`} style={{
      padding: '24px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      textAlign: 'center',
      ...style
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{title}</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280' }}>{description}</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none'
          }}
        />
        
        {error && (
          <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{error}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '12px 24px',
            backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isSubmitting ? 'Subscribing...' : buttonText}
        </button>
      </form>
      
      <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '12px', marginBottom: 0 }}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

/**
 * Inline Email Capture - Compact version
 */
export const InlineEmailCapture = ({
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  onSubmit,
  className = "",
  style = {}
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        const subscribers = JSON.parse(localStorage.getItem('email_subscribers') || '[]');
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem('email_subscribers', JSON.stringify(subscribers));
        }
      }
      
      setEmail('');
      alert('Thanks for subscribing!');
    } catch (err) {
      console.error('Email capture error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`inline-email-capture ${className}`}
      style={{
        display: 'flex',
        gap: '8px',
        ...style
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        style={{
          flex: 1,
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: '8px 16px',
          backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? '...' : buttonText}
      </button>
    </form>
  );
};