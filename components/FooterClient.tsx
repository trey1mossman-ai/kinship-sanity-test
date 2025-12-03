'use client';

import Link from 'next/link';
import { SiteSettings } from '@/lib/sanity/getSiteData';

interface FooterClientProps {
  variant?: 'default' | 'homa';
  siteSettings: SiteSettings;
}

export function FooterClient({ variant = 'default', siteSettings }: FooterClientProps) {
  const { phone, email, address } = siteSettings;
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

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
                    <p>7am - 10pm</p>
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
                  src="/brand/KL-Values-Badge-GREEN.webp"
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
                <a
                  href="https://www.instagram.com/kinshiplanding/"
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
                <a
                  href="https://www.facebook.com/kinshiplanding"
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
              </div>
              </div>
            </div>

            {/* Column 2: All Navigation Links - Bottom aligned with social icons */}
            <div className="text-center md:text-left flex flex-col justify-end">
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-base" style={{ color: '#4f575c' }}>
                {/* Left column of links */}
                <div className="space-y-2">
                  <Link href="/" className="block hover:brightness-110 transition-colors">Home</Link>
                  <Link href="/rooms" className="block hover:brightness-110 transition-colors">Rooms</Link>
                  <Link href="/events" className="block hover:brightness-110 transition-colors">Events</Link>
                  <Link href="/homa" className="block hover:brightness-110 transition-colors">HOMA Café + Bar</Link>
                  <Link href="/explore" className="block hover:brightness-110 transition-colors">Explore</Link>
                  <Link href="/gallery" className="block hover:brightness-110 transition-colors">Gallery</Link>
                  <Link href="/about" className="block hover:brightness-110 transition-colors">About</Link>
                </div>
                {/* Right column of links */}
                <div className="space-y-2">
                  <Link href="/policies" className="block hover:brightness-110 transition-colors">Hotel Policies</Link>
                  <Link href="/privacy" className="block hover:brightness-110 transition-colors">Privacy Policy</Link>
                  <Link href="/accessibility" className="block hover:brightness-110 transition-colors">Accessibility</Link>
                  <Link href="/careers" className="block hover:brightness-110 transition-colors">Careers</Link>
                  <a href="https://kinshiplanding.tripleseat.com/booking_request/42351" target="_blank" rel="noopener noreferrer" className="block hover:brightness-110 transition-colors">Event Inquiry</a>
                  <a href="https://kinshiplanding.tripleseat.com/booking_request/42351" target="_blank" rel="noopener noreferrer" className="block hover:brightness-110 transition-colors">Group Bookings</a>
                  <Link href="/policies#parking" className="block hover:brightness-110 transition-colors">Parking Info</Link>
                </div>
              </div>
            </div>

            {/* Column 3: HOMA - Pushed down to align social icons with Kinship */}
            <div className="text-center md:text-left flex flex-col justify-end">
              <div>
              <Link href="/homa" className="inline-block transition-opacity hover:opacity-80 mb-6">
                <img
                  src="/brand/HOMA-at-Kinship-BLACK.webp"
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
                <p>
                  <a href="tel:+17192450046" className="hover:brightness-110 transition-colors">
                    (719) 245-0046
                  </a>
                </p>
                <p>
                  <a href="mailto:homa@kinshiplanding.com" className="hover:brightness-110 transition-colors">
                    homa@kinshiplanding.com
                  </a>
                </p>
              </div>
              {/* HOMA Social - Perfectly aligned with Kinship at bottom */}
              <div className="flex gap-3 justify-center md:justify-start mt-6">
                <a
                  href="https://www.instagram.com/homacafebar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-black/10"
                  aria-label="Follow HOMA on Instagram"
                >
                  <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/Homa-Cafe-Bar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-black/10"
                  aria-label="Follow HOMA on Facebook"
                >
                  <svg className="w-5 h-5 fill-black" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </a>
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
                © {new Date().getFullYear()} {siteSettings.siteName}. All rights reserved.
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
