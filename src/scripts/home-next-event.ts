interface HomeEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  description: string;
}

type FeaturedState = "now" | "upcoming";

function formatTimeRange(startDate: Date, endDate: Date): string {
  const formatter = new Intl.DateTimeFormat("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Singapore",
  });

  return `${formatter.format(startDate)} - ${formatter.format(endDate)} SGT`;
}

export function initHomeNextEvent(): void {
  const eventsDataElement = document.getElementById("home-events-data");
  const heroSlot = document.getElementById("home-hero-slot");
  const nextEventSlot = document.getElementById("home-next-event-slot");

  if (!eventsDataElement || !heroSlot || !nextEventSlot) {
    return;
  }

  const events = JSON.parse(eventsDataElement.textContent || "[]") as HomeEvent[];

  const getFeaturedEvent = (): { event: HomeEvent; state: FeaturedState } | undefined => {
    const nowMs = Date.now();
    const oneWeekFromNowMs = nowMs + 7 * 24 * 60 * 60 * 1000;

    const currentEvents = events
      .filter((event) => {
        const startMs = new Date(event.startDate).getTime();
        const endMs = new Date(event.endDate).getTime();
        return startMs <= nowMs && nowMs < endMs;
      })
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

    if (currentEvents[0]) {
      return { event: currentEvents[0], state: "now" };
    }

    const nextWeekEvents = events
      .filter((event) => {
        const startMs = new Date(event.startDate).getTime();
        return nowMs < startMs && startMs <= oneWeekFromNowMs;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    if (nextWeekEvents[0]) {
      return { event: nextWeekEvents[0], state: "upcoming" };
    }

    return undefined;
  };

  const dateFormatter = new Intl.DateTimeFormat("en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Singapore",
  });

  const renderNextEvent = () => {
    const featured = getFeaturedEvent();

    if (!featured) {
      nextEventSlot.classList.add("hidden");
      heroSlot.classList.remove("lg:col-span-8");
      heroSlot.classList.add("lg:col-span-12");
      return;
    }

    const { event, state } = featured;

    heroSlot.classList.remove("lg:col-span-12");
    heroSlot.classList.add("lg:col-span-8");
    nextEventSlot.classList.remove("hidden");

    const dateElement = document.getElementById("home-next-event-date");
    const stateElement = document.getElementById("home-next-event-state");
    const titleElement = document.getElementById("home-next-event-title");
    const timeElement = document.getElementById("home-next-event-time");
    const locationElement = document.getElementById("home-next-event-location");
    const descriptionElement = document.getElementById("home-next-event-description");
    const linkElement = document.getElementById("home-next-event-link");
    const imageWrapElement = document.getElementById("home-next-event-image-wrap");
    const imageElement = document.getElementById("home-next-event-image") as HTMLImageElement | null;

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (dateElement) dateElement.textContent = dateFormatter.format(startDate);
    if (titleElement) titleElement.textContent = event.title;
    if (timeElement) timeElement.textContent = formatTimeRange(startDate, endDate);
    if (locationElement) locationElement.textContent = event.location;
    if (linkElement) linkElement.setAttribute("href", `/events/${event.id}`);

    if (stateElement) {
      stateElement.textContent = state === "now" ? "NOW" : "NEXT UP";
      stateElement.classList.toggle("bg-emerald-500/20", state === "now");
      stateElement.classList.toggle("text-emerald-300", state === "now");
      stateElement.classList.toggle("border-emerald-400/30", state === "now");
      stateElement.classList.toggle("bg-primary/20", state !== "now");
      stateElement.classList.toggle("text-primary", state !== "now");
      stateElement.classList.toggle("border-primary/20", state !== "now");
    }

    if (descriptionElement) {
      if (event.description) {
        descriptionElement.textContent = event.description;
        descriptionElement.classList.remove("hidden");
      } else {
        descriptionElement.textContent = "";
        descriptionElement.classList.add("hidden");
      }
    }

    if (imageWrapElement && imageElement) {
      if (event.image) {
        imageElement.setAttribute("src", event.image);
        imageElement.setAttribute("alt", event.title);
        imageWrapElement.classList.remove("hidden");
      } else {
        imageWrapElement.classList.add("hidden");
      }
    }
  };

  renderNextEvent();
  window.setInterval(renderNextEvent, 60 * 1000);
}
