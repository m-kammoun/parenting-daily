export interface Fact {
  id: string;
  text: string;
  category: "prenatal" | "0-1" | "1-3";
}

/**
 * One hardcoded seed insight per age category.
 * This is the very first fact a user sees right after the welcome card,
 * before any push notifications have been delivered.
 */
export const SEED_FACTS: Record<Fact["category"], Fact> = {
  prenatal: {
    id: "seed-prenatal",
    text: "Talking or singing to your bump helps your baby recognise your voice at birth.",
    category: "prenatal",
  },
  "0-1": {
    id: "seed-0-1",
    text: "Skin-to-skin contact in the first hour after birth significantly reduces a newborn's stress hormones.",
    category: "0-1",
  },
  "1-3": {
    id: "seed-1-3",
    text: "Toddlers imitate everything they observe — you are their most powerful teacher.",
    category: "1-3",
  },
};
