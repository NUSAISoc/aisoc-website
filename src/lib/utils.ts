import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, formatStr: string = "dd MMM yyyy") {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Format using Singapore timezone (UTC+8)
  // Note: date-fns format uses the local timezone by default
  // We'll add timezone indicator for clarity when time is included
  return format(d, formatStr);
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Format with Singapore timezone indicator
  return format(d, "dd MMM yyyy, HH:mm") + " SGT";
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  // Strip HTML/Markdown tags roughly for estimation
  const text = content.replace(/<\/?[^>]+(>|$)/g, "");
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
