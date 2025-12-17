'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import Link from 'next/link';

// Type for Portable Text blocks
type PortableTextBlock = {
  _type: string;
  _key?: string;
  children?: any[];
  style?: string;
  listItem?: string;
  markDefs?: any[];
};

interface RichTextRendererProps {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
}

// Custom components for rendering Portable Text
const components: PortableTextComponents = {
  block: {
    // Heading styles
    h2: ({ children }) => (
      <h2 className="text-2xl font-display font-semibold text-kinship-darkbrown mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-display font-semibold text-kinship-darkbrown mt-5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-display font-medium text-kinship-darkbrown mt-4 mb-2">
        {children}
      </h4>
    ),
    // Normal paragraph
    normal: ({ children }) => (
      <p className="text-kinship-darkbrown/80 leading-relaxed mb-4">
        {children}
      </p>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-kinship-green pl-4 my-4 italic text-kinship-darkbrown/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Bullet list
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-kinship-darkbrown/80">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-kinship-darkbrown/80">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    // Bold
    strong: ({ children }) => (
      <strong className="font-semibold text-kinship-darkbrown">{children}</strong>
    ),
    // Italic
    em: ({ children }) => <em className="italic">{children}</em>,
    // Underline
    underline: ({ children }) => <span className="underline">{children}</span>,
    // Links
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');
      const openInNewTab = value?.openInNewTab || isExternal;

      if (isExternal) {
        return (
          <a
            href={href}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
            className="text-kinship-green hover:text-kinship-green/80 underline transition-colors"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-kinship-green hover:text-kinship-green/80 underline transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};

export function RichTextRenderer({ value, className = '' }: RichTextRendererProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className={`rich-text-content ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}

// Utility to convert plain text to Portable Text block format (for fallbacks)
export function textToPortableText(text: string): PortableTextBlock[] {
  if (!text) return [];

  return text.split('\n\n').map((paragraph, index) => ({
    _type: 'block',
    _key: `fallback-${index}`,
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: `span-${index}`,
        text: paragraph,
        marks: [],
      },
    ],
    markDefs: [],
  }));
}
