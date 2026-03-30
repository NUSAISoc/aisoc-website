export interface EventWithWindow {
  data: {
    startDate: string | Date;
    endDate: string | Date;
  };
}

export function getEventStartDate(event: EventWithWindow): Date {
  return typeof event.data.startDate === "string" ? new Date(event.data.startDate) : event.data.startDate;
}

export function getEventEndDate(event: EventWithWindow): Date {
  return typeof event.data.endDate === "string" ? new Date(event.data.endDate) : event.data.endDate;
}

export function isEventNow(event: EventWithWindow, now: Date = new Date()): boolean {
  const nowMs = now.getTime();
  return getEventStartDate(event).getTime() <= nowMs && nowMs < getEventEndDate(event).getTime();
}

export function isEventPast(event: EventWithWindow, now: Date = new Date()): boolean {
  return getEventEndDate(event).getTime() <= now.getTime();
}

export function isEventUpcoming(event: EventWithWindow, now: Date = new Date()): boolean {
  return !isEventPast(event, now);
}

export function formatEventTimeRange(startDate: Date, endDate: Date): string {
  const formatter = new Intl.DateTimeFormat("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Singapore",
  });

  return `${formatter.format(startDate)} - ${formatter.format(endDate)} SGT`;
}
