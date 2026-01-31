import { format } from "date-fns"

const DEFAULT_DATE_FORMAT = "dd MMM yyyy"
const WORDS_PER_MINUTE = 200

/**
 * Formats a date string or Date object using date-fns.
 * Uses Singapore timezone context (SGT).
 */
export function formatDate(date: string | Date, formatString: string = DEFAULT_DATE_FORMAT) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, formatString);
}

/**
 * Formats a date with time and Singapore timezone indicator.
 */
export function formatDateTime(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, "dd MMM yyyy, HH:mm") + " SGT";
}

/**
 * Estimates reading time based on word count.
 * Strips HTML/Markdown tags before counting for accurate estimation.
 */
export function calculateReadingTime(content: string): string {
  // Strip HTML/Markdown tags for accurate word count estimation
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
  const wordCount = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return `${minutes} min read`;
}
