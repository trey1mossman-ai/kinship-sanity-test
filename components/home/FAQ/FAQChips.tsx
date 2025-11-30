'use client';

interface FAQChipsProps {
  chips: string[];
  className?: string;
}

export function FAQChips({ chips, className = '' }: FAQChipsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="list">
      {chips.map((chip, index) => (
        <span
          key={index}
          role="listitem"
          className="px-3 py-1 text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            color: '#4f575c',
            border: '1px solid rgba(132, 158, 116, 0.2)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}