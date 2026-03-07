export interface Fact {
  id: string;
  text: string;
  category: "prenatal" | "0-1" | "1-3" | "general";
}

export const facts: Fact[] = [
  {
    id: "1",
    text: "Talking to your baby in the womb helps them recognize your voice at birth.",
    category: "prenatal",
  },
  {
    id: "2",
    text: "Babies can hear sounds from outside the womb as early as 18 weeks into pregnancy.",
    category: "prenatal",
  },
  {
    id: "3",
    text: "A fetus begins forming memories in the third trimester, especially of sounds and tastes.",
    category: "prenatal",
  },
  {
    id: "4",
    text: "Playing soft music during pregnancy may help soothe your baby after birth.",
    category: "prenatal",
  },
  {
    id: "5",
    text: "Your baby can smell and taste amniotic fluid — flavors from your diet influence their future preferences.",
    category: "prenatal",
  },
  {
    id: "6",
    text: "Newborns recognize their mother's voice and prefer it over all other voices.",
    category: "0-1",
  },
  {
    id: "7",
    text: "Skin-to-skin contact in the first hour after birth significantly reduces a newborn's stress hormones.",
    category: "0-1",
  },
  {
    id: "8",
    text: "Babies are born with the ability to imitate facial expressions within hours of birth.",
    category: "0-1",
  },
  {
    id: "9",
    text: "By 4 months, babies can recognize their own name when spoken aloud.",
    category: "0-1",
  },
  {
    id: "10",
    text: "Reading aloud to your baby from day one builds neural pathways for language, even before they understand words.",
    category: "0-1",
  },
  {
    id: "11",
    text: "A baby's brain doubles in size during the first year of life.",
    category: "0-1",
  },
  {
    id: "12",
    text: "Responsive parenting — reacting to your baby's cues — builds secure attachment that lasts a lifetime.",
    category: "0-1",
  },
  {
    id: "13",
    text: "Babies as young as 6 months old can understand the concept of fairness.",
    category: "0-1",
  },
  {
    id: "14",
    text: "Toddlers learn more vocabulary from live conversation than from screens.",
    category: "1-3",
  },
  {
    id: "15",
    text: "By age 2, a child has already formed 80% of the neural connections they'll have as an adult.",
    category: "1-3",
  },
  {
    id: "16",
    text: "Pretend play helps toddlers develop empathy and emotional regulation.",
    category: "1-3",
  },
  {
    id: "17",
    text: "Naming your child's emotions out loud helps them build emotional intelligence from the earliest age.",
    category: "1-3",
  },
  {
    id: "18",
    text: "Children who are read to daily before age 5 start school with a vocabulary 1,000 words larger than those who aren't.",
    category: "1-3",
  },
  {
    id: "19",
    text: "Consistent bedtime routines improve sleep quality and cognitive development in toddlers.",
    category: "1-3",
  },
  {
    id: "20",
    text: "Toddlers imitate everything they observe — you are their most powerful teacher.",
    category: "1-3",
  },
  {
    id: "21",
    text: "Singing simple songs with your toddler boosts memory, language, and emotional bonding.",
    category: "1-3",
  },
  {
    id: "22",
    text: "Children exposed to a second language before age 3 acquire it with near-native fluency.",
    category: "1-3",
  },
  {
    id: "23",
    text: "The 'serve and return' interaction — responding to a child's sounds and gestures — is the foundation of brain architecture.",
    category: "general",
  },
  {
    id: "24",
    text: "Parental stress is felt by babies and toddlers — your calm is their calm.",
    category: "general",
  },
  {
    id: "25",
    text: "Children who feel securely attached to a parent are more likely to explore the world confidently.",
    category: "general",
  },
  {
    id: "26",
    text: "Outdoor play in natural settings reduces stress and boosts creativity in young children.",
    category: "general",
  },
  {
    id: "27",
    text: "Consistent, warm responses to a child's needs build trust and form the basis of all future relationships.",
    category: "general",
  },
  {
    id: "28",
    text: "A child's emotional vocabulary expands when caregivers regularly discuss feelings during daily routines.",
    category: "general",
  },
  {
    id: "29",
    text: "Laughter shared between parent and child strengthens the bond and reduces cortisol levels in both.",
    category: "general",
  },
  {
    id: "30",
    text: "Unstructured free play is essential for developing problem-solving skills and resilience.",
    category: "general",
  },
];

export function getShuffledFacts(): Fact[] {
  const shuffled = [...facts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
