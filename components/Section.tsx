import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  sandBg?: boolean;
  topBorder?: boolean;
  id?: string;
}

export function Section({ 
  children, 
  className, 
  sandBg = false, 
  topBorder = false,
  id 
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-spacing',
        sandBg && 'bg-sand',
        topBorder && 'border-t border-charcoal/10',
        className
      )}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}