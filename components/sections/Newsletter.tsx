'use client';

import { useState } from 'react';
import { content } from '@/content/copy';
import type { Homepage } from '@/lib/sanity/queries';

interface NewsletterProps {
  sanityData?: Homepage | null;
}

// Fallback values
const defaults = {
  title: 'Join the adventure',
  description: 'Follow us on Instagram and sign-up for our newsletter to get the latest updates, local recommendations and special offers (no spam, we promise!)',
  buttonText: 'Subscribe',
  disclaimer: 'We respect your privacy. Unsubscribe at any time.'
};

export function Newsletter({ sanityData }: NewsletterProps) {
  // Use Sanity data if provided, otherwise use fallback defaults
  const title = sanityData?.newsletterTitle || defaults.title;
  const description = sanityData?.newsletterDescription || defaults.description;
  const buttonText = sanityData?.newsletterButtonText || defaults.buttonText;
  const disclaimer = sanityData?.newsletterDisclaimer || defaults.disclaimer;
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check - bots fill this out, real users don't see it
    if (honeypot) return;

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    // Submit directly to Mailchimp
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Use JSONP approach for Mailchimp (avoids CORS issues)
      const url = 'https://kinshiplanding.us3.list-manage.com/subscribe/post-json?u=db83438a91a22834554fcbf6d&id=010a16ed34';
      const params = new URLSearchParams();
      params.append('EMAIL', email);
      if (firstName) params.append('FNAME', firstName);
      if (lastName) params.append('LNAME', lastName);
      params.append('c', 'mailchimpCallback'); // JSONP callback

      // Create script tag for JSONP
      const script = document.createElement('script');
      script.src = `${url}&${params.toString()}`;

      // Setup callback
      (window as any).mailchimpCallback = (data: any) => {
        if (data.result === 'success') {
          setStatus('success');
          setMessage('Thanks for subscribing! Welcome to the adventure.');
          setEmail('');
          setFirstName('');
          setLastName('');

          // Clear success message after 5 seconds
          setTimeout(() => {
            setStatus('idle');
            setMessage('');
          }, 5000);
        } else {
          setStatus('error');
          setMessage(data.msg || 'Something went wrong. Please try again.');
        }
        setIsLoading(false);
        document.body.removeChild(script);
        delete (window as any).mailchimpCallback;
      };

      document.body.appendChild(script);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className="section-spacing" style={{ backgroundColor: '#aec69a' }}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 text-kinship-slate">
            {title}
          </h2>

          <p className="text-kinship-slate/80 mb-8">
            {description}
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            {/* Mailchimp Honeypot - hidden from real users */}
            <input
              type="text"
              name="b_db83438a91a22834554fcbf6d_010a16ed34"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Name Fields Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="FNAME"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name (optional)"
                className="flex-1 px-4 py-2.5 bg-white text-kinship-slate placeholder-kinship-slate/50 focus:outline-none focus:ring-2 focus:ring-kinship-evergreen/50"
                style={{
                  border: '2px solid #849e74'
                }}
                disabled={isLoading}
                aria-label="First name"
              />

              <input
                type="text"
                name="LNAME"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name (optional)"
                className="flex-1 px-4 py-2.5 bg-white text-kinship-slate placeholder-kinship-slate/50 focus:outline-none focus:ring-2 focus:ring-kinship-evergreen/50"
                style={{
                  border: '2px solid #849e74'
                }}
                disabled={isLoading}
                aria-label="Last name"
              />
            </div>

            {/* Email and Submit Button Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.footer.newsletter.placeholder}
                className="flex-1 px-4 py-2.5 bg-white text-kinship-slate placeholder-kinship-slate/50 focus:outline-none focus:ring-2 focus:ring-kinship-evergreen/50"
                style={{
                  border: '2px solid #849e74'
                }}
                required
                disabled={isLoading}
                aria-label="Email address for newsletter"
              />

              <button
                type="submit"
                className="px-6 py-2.5 font-semibold hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-kinship-evergreen focus:ring-offset-2 focus:ring-offset-[#aec69a] transition-all duration-200 btn-visible-disabled whitespace-nowrap"
                style={{
                  backgroundColor: '#667C58',
                  color: '#ffffff',
                  border: '2px solid #667C58'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#556649';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#667C58';
                }}
                disabled={isLoading || !email}
              >
                {isLoading ? 'Subscribing...' : buttonText}
              </button>
            </div>
          </form>

          {/* Success/Error Messages */}
          {message && (
            <p className={`text-sm mt-4 font-medium ${
              status === 'success'
                ? 'text-kinship-slate'
                : 'text-red-700'
            }`}
              role="alert"
              aria-live="polite"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}

          <p className="text-xs text-kinship-slate/60 mt-4">
            {disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
