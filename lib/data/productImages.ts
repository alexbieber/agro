/**
 * Premium Unsplash images for Nandi Agrotech.
 * All from Unsplash (unsplash.com) — free to use.
 */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fit=crop`;

export const productImages: Record<string, string> = {
  "irr-001": u("1558618666-fcd25c85cd64"),     // irrigation
  "irr-002": u("1581092160562-40aa08e78837"),  // pipes
  "irr-003": u("1560493676-04071c5f467b"),     // water
  "irr-004": u("1581092160562-40aa08e78837"),  // pump
  "irr-005": u("1560493676-04071c5f467b"),     // sprinkler
  "mach-001": u("1504328345606-18bbc8c9d7d1"), // tractor
  "mach-002": u("1574943320219-553eb213f72d"), // tractor field
  "mach-003": u("1504328345606-18bbc8c9d7d1"), // equipment
  "mach-004": u("1504328345606-18bbc8c9d7d1"), // equipment
  "mach-005": u("1574943320219-553eb213f72d"), // farm
  "mach-006": u("1574943320219-553eb213f72d"), // farm
};

export const heroImages = {
  irrigation: u("1558618666-fcd25c85cd64", 1400),
  machinery: u("1504328345606-18bbc8c9d7d1", 1400),
};

export const categoryImages = {
  irrigation: u("1560493676-04071c5f467b", 600),
  machinery: u("1574943320219-553eb213f72d", 600),
};
