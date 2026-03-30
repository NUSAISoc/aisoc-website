export function initEventsReclassification(): void {
  const upcomingGrid = document.getElementById("upcoming-events-grid");
  const pastGrid = document.getElementById("past-events-grid");
  const upcomingEmptyState = document.getElementById("upcoming-events-empty-state");
  const pastEmptyState = document.getElementById("past-events-empty-state");

  if (!upcomingGrid || !pastGrid || !upcomingEmptyState || !pastEmptyState) {
    return;
  }

  const getStartMs = (card: HTMLElement): number => Number(card.dataset.eventStartMs || 0);
  const getEndMs = (card: HTMLElement): number => Number(card.dataset.eventEndMs || 0);

  const setCardState = (card: HTMLElement, upcoming: boolean): void => {
    const cardBody = card.querySelector("[data-event-card]");
    const badge = card.querySelector("[data-event-upcoming-badge]");

    if (!cardBody) {
      return;
    }

    cardBody.classList.toggle("border-primary/20", upcoming);
    cardBody.classList.toggle("border-border", !upcoming);
    cardBody.classList.toggle("opacity-80", !upcoming);
    cardBody.classList.toggle("hover:opacity-100", !upcoming);

    if (badge) {
      badge.classList.toggle("hidden", !upcoming);
    }
  };

  const reclassifyEvents = (): void => {
    const nowMs = Date.now();
    const allCards = Array.from(document.querySelectorAll("[data-event-entry]")) as HTMLElement[];

    const upcomingCards: HTMLElement[] = [];
    const pastCards: HTMLElement[] = [];

    for (const card of allCards) {
      if (getEndMs(card) > nowMs) {
        upcomingCards.push(card);
      } else {
        pastCards.push(card);
      }
    }

    upcomingCards.sort((a, b) => getStartMs(a) - getStartMs(b));
    pastCards.sort((a, b) => getEndMs(b) - getEndMs(a));

    for (const card of upcomingCards) {
      setCardState(card, true);
      upcomingGrid.appendChild(card);
    }

    for (const card of pastCards) {
      setCardState(card, false);
      pastGrid.appendChild(card);
    }

    upcomingEmptyState.classList.toggle("hidden", upcomingCards.length > 0);
    pastEmptyState.classList.toggle("hidden", pastCards.length > 0);
  };

  reclassifyEvents();
  window.setInterval(reclassifyEvents, 60 * 1000);
}
