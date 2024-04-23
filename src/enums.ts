export const GENDERS = ["Male", "Female"] as const;
export type Gender = (typeof GENDERS)[number];

export const CATEGORY = ["General", "OBC", "SC", "ST"] as const;
export type Category = (typeof CATEGORY)[number];

export const POSTS = ["Teacher", "Director"] as const;
export type Post = (typeof POSTS)[number];

export const CLASSES = [
  "LKG",
  "UKG",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
] as const;
export type Class = (typeof CLASSES)[number];
