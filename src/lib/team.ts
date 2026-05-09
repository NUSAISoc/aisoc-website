import type { CollectionEntry } from "astro:content";

type TeamEntry = CollectionEntry<"team">;

// exco roles that receive fixed ordering, in priority order
const PINNED_ROLES: ReadonlyMap<string, number> = new Map([
  ["president", 0],
  ["vice president", 1],
  ["vice-president", 1],
]);

/**
 * Sorting comparator for team members.
 *
 * For exco: President first, Vice-President second, then lexicographic by name.
 * For everyone else: lexicographic by name.
 */
function pinnedRolePriority(role: string): number {
  return PINNED_ROLES.get(role.toLowerCase()) ?? Infinity;
}

function compareTeamMembers(a: TeamEntry, b: TeamEntry): number {
  const priorityA = pinnedRolePriority(a.data.role);
  const priorityB = pinnedRolePriority(b.data.role);

  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }

  return a.data.name.localeCompare(b.data.name);
}

export function sortTeamMembers(members: TeamEntry[]): TeamEntry[] {
  return [...members].sort(compareTeamMembers);
}
