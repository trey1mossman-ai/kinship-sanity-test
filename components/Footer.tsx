'use client';

import Link from 'next/link';
import { SiteSettings } from '@/lib/sanity/getSiteData';

interface FooterProps {
  variant?: 'default' | 'homa';
  siteSettings?: SiteSettings;
}

// Default site settings for backward compatibility (if Sanity data not passed)
const defaultSettings: SiteSettings = {
  siteName: 'Kinship Landing',
  tagline: 'Stay. Gather. Explore.',
  phone: '(719) 203-9309',
  email: 'hello@kinshiplanding.com',
  address: {
    street: '415 S Nevada Ave',
    city: 'Colorado Springs',
    state: 'CO',
    zip: '80903'
  },
  googleMapsUrl: 'https://www.google.com/maps/place/Kinship+Landing/@38.8284,-104.8253,17z',
  instagramUrl: 'https://www.instagram.com/kinshiplanding/',
  facebookUrl: 'https://www.facebook.com/kinshiplanding',
  bookingUrl: 'https://hotels.cloudbeds.com/en/reservation/BPdPxa',
  eventInquiryUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',
  groupBookingUrl: 'https://kinshiplanding.tripleseat.com/booking_request/42351',
  homaPhone: '(719) 245-0046',
  homaEmail: 'homa@kinshiplanding.com',
  homaHours: '7am - 10pm Daily',
  homaInstagramUrl: 'https://www.instagram.com/homacafebar',
  homaFacebookUrl: 'https://www.facebook.com/Homa-Cafe-Bar'
};

// Default footer links (used if not provided from Sanity)
const defaultFooterLinks = [
  { title: 'Home', url: '/' },
  { title: 'Rooms', url: '/rooms' },
  { title: 'Events', url: '/events' },
  { title: 'HOMA Café + Bar', url: '/homa' },
  { title: 'Explore', url: '/explore' },
  { title: 'Gallery', url: '/gallery' },
  { title: 'About', url: '/about' },
  { title: 'Hotel Policies', url: '/policies' },
  { title: 'Privacy Policy', url: '/privacy' },
  { title: 'Accessibility', url: '/accessibility' },
  { title: 'Careers', url: '/careers' },
  { title: 'Event Inquiry', url: 'https://kinshiplanding.tripleseat.com/booking_request/42351', external: true },
  { title: 'Group Bookings', url: 'https://kinshiplanding.tripleseat.com/booking_request/42351', external: true },
  { title: 'Parking Info', url: '/policies#parking' }
];

export function Footer({ variant = 'default', siteSettings }: FooterProps) {
  // Merge provided settings with defaults
  const settings = { ...defaultSettings, ...siteSettings };

  const {
    phone,
    email,
    address,
    siteName,
    instagramUrl,
    facebookUrl,
    eventInquiryUrl,
    groupBookingUrl,
    homaPhone,
    homaEmail,
    homaHours,
    homaInstagramUrl,
    homaFacebookUrl,
    footerLinks
  } = settings;

  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  // Use Sanity footer links if available, otherwise use defaults
  const links = footerLinks && footerLinks.length > 0 ? footerLinks : defaultFooterLinks;

  // Split links into two columns
  const midpoint = Math.ceil(links.length / 2);
  const leftColumnLinks = links.slice(0, midpoint);
  const rightColumnLinks = links.slice(midpoint);

  // Helper to render a link (internal vs external)
  const renderLink = (link: { title: string; url: string; external?: boolean }, index: number) => {
    const isExternal = link.url.startsWith('http') || link.url.startsWith('//');

    if (isExternal) {
      return (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:brightness-110 transition-colors"
        >
          {link.title}
        </a>
      );
    }

    return (
      <Link key={index} href={link.url} className="block hover:brightness-110 transition-colors">
        {link.title}
      </Link>
    );
  };

  return (
    <footer className="text-kinship-slate" style={{ backgroundColor: '#f5f8f3' }}>
      {/* LOCATION SECTION - Different per variant */}
      {variant === 'homa' ? (
        // HOMA PAGE ONLY: Hours & Location with Map
        <div id="hours" className="py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ color: '#667C58' }}>
              Hours & Location
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Map */}
              <div className="relative h-[400px] overflow-hidden border-2" style={{ borderColor: '#667C58' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.7776892857796!2d-104.8242378!3d38.8273544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713451f8479c989%3A0xc76c7cb641b1997a!2sKinship%20Landing!5e0!3m2!1sen!2sus!4v1693234567890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kinship Landing Location"
                  className="w-full h-full"
                />
              </div>

              {/* HOMA Hours Only */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 uppercase" style={{ color: '#667C58' }}>
                    Hours
                  </h3>
                  <div className="space-y-2 text-sm" style={{ color: '#849e74' }}>
                    <p><strong>Seven Days a Week</strong></p>
                    <p>{homaHours}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 uppercase" style={{ color: '#667C58' }}>
                    Happy Hour
                  </h3>
                  <div className="space-y-2 text-sm" style={{ color: '#849e74' }}>
                    <p>Monday - Friday, 3pm - 6pm</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 uppercase" style={{ color: '#667C58' }}>
                    Sunday Brunch
                  </h3>
                  <div className="space-y-2 text-sm" style={{ color: '#849e74' }}>
                    <p>Brunch menu served 8am - 2pm</p>
                    <p>Regular menu served 3pm - 10pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Footer Content - Restored professional styling */}
      <div className="py-16 md:py-20 border-t" style={{ borderColor: 'rgba(174, 198, 154, 0.3)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* 3-Column Layout: Kinship | Navigation Links | HOMA - Bottom Aligned via Social Icons */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-12 md:gap-16 lg:gap-20">

            {/* Column 1: Kinship */}
            <div className="text-center md:text-left flex flex-col justify-end">
              <div>
              <Link href="/" className="inline-block transition-opacity hover:opacity-80 mb-6">
                <img
                  src="/brand/KL-Values-Badge-GREEN.webp" width={160} height={161}
                  alt="Kinship Landing"
                  className="w-40 h-auto object-contain mx-auto md:mx-0"
                />
              </Link>
              <div className="space-y-2 text-base" style={{ color: '#4f575c' }}>
                <p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:brightness-110 transition-colors"
                  >
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}
                  </a>
                </p>
                <p>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:brightness-110 transition-colors">
                    {phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${email}`} className="hover:brightness-110 transition-colors">
                    {email}
                  </a>
                </p>
              </div>
              {/* Kinship Social */}
              <div className="flex gap-3 justify-center md:justify-start mt-6">
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    style={{ border: '1px solid rgba(132, 158, 116, 0.3)' }}
                    aria-label="Follow Kinship Landing on Instagram"
                  >
                    <svg className="w-5 h-5" style={{ fill: '#849e74' }} viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                )}
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    style={{ border: '1px solid rgba(132, 158, 116, 0.3)' }}
                    aria-label="Follow Kinship Landing on Facebook"
                  >
                    <svg className="w-5 h-5" style={{ fill: '#849e74' }} viewBox="0 0 320 512">
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                    </svg>
                  </a>
                )}
              </div>
              </div>
            </div>

            {/* Column 2: All Navigation Links - Bottom aligned with social icons */}
            <div className="text-center md:text-left flex flex-col justify-end">
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-base" style={{ color: '#4f575c' }}>
                {/* Left column of links */}
                <div className="space-y-2">
                  {leftColumnLinks.map((link, index) => renderLink(link, index))}
                </div>
                {/* Right column of links */}
                <div className="space-y-2">
                  {rightColumnLinks.map((link, index) => renderLink(link, index + midpoint))}
                </div>
              </div>
            </div>

            {/* Column 3: HOMA - Pushed down to align social icons with Kinship */}
            <div className="text-center md:text-left flex flex-col justify-end">
              <div>
              <Link href="/homa" className="inline-block transition-opacity hover:opacity-80 mb-6">
                <img
                  src="/brand/HOMA-at-Kinship-BLACK.webp" width={160} height={66}
                  alt="HOMA Café + Bar"
                  className="w-40 h-auto object-contain mx-auto md:mx-0"
                />
              </Link>
              <div className="space-y-2 text-base" style={{ color: '#4f575c' }}>
                <p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:brightness-110 transition-colors"
                  >
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}
                  </a>
                </p>
                {homaPhone && (
                  <p>
                    <a href={`tel:${homaPhone.replace(/[^0-9+]/g, '')}`} className="hover:brightness-110 transition-colors">
                      {homaPhone}
                    </a>
                  </p>
                )}
                {homaEmail && (
                  <p>
                    <a href={`mailto:${homaEmail}`} className="hover:brightness-110 transition-colors">
                      {homaEmail}
                    </a>
                  </p>
                )}
              </div>
              {/* HOMA Hours */}
              {homaHours && (
                <div className="mt-4 text-sm" style={{ color: '#4f575c' }}>
                  <p className="font-semibold" style={{ color: '#667C58' }}>Hours</p>
                  <p>{homaHours}</p>
                </div>
              )}
              {/* HOMA Social - Perfectly aligned with Kinship at bottom */}
              <div className="flex gap-3 justify-center md:justify-start mt-6">
                {homaInstagramUrl && (
                  <a
                    href={homaInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-black/10"
                    aria-label="Follow HOMA on Instagram"
                  >
                    <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                )}
                {homaFacebookUrl && (
                  <a
                    href={homaFacebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-black/10"
                    aria-label="Follow HOMA on Facebook"
                  >
                    <svg className="w-5 h-5 fill-black" viewBox="0 0 320 512">
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                    </svg>
                  </a>
                )}
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t" style={{ borderColor: 'rgba(174, 198, 154, 0.3)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-center">
              <p style={{ color: '#aec69a' }}>
                © {new Date().getFullYear()} {siteName}. All rights reserved.
              </p>
              <p style={{ color: '#aec69a' }}>
                Crafted with care in Colorado Springs by{' '}
                <a
                  href="https://voxeai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:brightness-110 transition-colors underline underline-offset-2"
                >
                  voxeai
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
