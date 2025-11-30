'use client';

export function ThemeChips({ themes }: { themes: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => (
        <span
          key={theme}
          className="px-3 py-1.5 bg-white text-kinship-text text-xs font-medium"
          style={{ border: '2px solid #849e74' }}
        >
          {theme}
        </span>
      ))}
    </div>
  );
}