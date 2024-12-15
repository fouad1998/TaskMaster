export function getOrdinalPosition(position: number): string {
  if (position <= 0) {
    throw new Error("Position must be a positive number.");
  }

  const suffixes = ["th", "st", "nd", "rd"];
  const lastDigit = position % 10;
  const lastTwoDigits = position % 100;

  // Handle special cases like 11th, 12th, 13th
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${position}th`;
  }

  // Assign the correct suffix based on the last digit
  const suffix = suffixes[lastDigit] || "th";
  return `${position}${suffix}`;
}
