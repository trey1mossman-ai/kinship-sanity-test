export type TextPart = { text: string; highlight: boolean };

/**
 * Splits a string into parts with highlight flags for the provided keywords.
 * Case-insensitive; preserves original casing.
 */
export function getHighlightedParts(text: string, keywords: string[]): TextPart[] {
  if (!text || !keywords?.length) return [{ text, highlight: false }];

  const escaped = keywords
    .filter(Boolean)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!escaped.length) return [{ text, highlight: false }];

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts: TextPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, start), highlight: false });
    }
    parts.push({ text: text.slice(start, end), highlight: true });
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlight: false });
  }

  return parts;
}

