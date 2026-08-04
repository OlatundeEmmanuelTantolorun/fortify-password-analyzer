export const ATTACK_SPEEDS = {
  online: { label: "Online (throttled)", guessesPerSecond: 100 },
  offline: { label: "Offline (GPU cluster)", guessesPerSecond: 1e10 },
};

export function secondsToCrack(entropyBits, guessesPerSecond) {
  if (entropyBits <= 0) return 0;
  const exponent = entropyBits - Math.log2(guessesPerSecond);
  if (exponent > 1000) return Number.POSITIVE_INFINITY;
  return Math.pow(2, exponent);
}

const UNITS = [
  { label: "centuries", seconds: 60 * 60 * 24 * 365 * 100 },
  { label: "years", seconds: 60 * 60 * 24 * 365 },
  { label: "months", seconds: 60 * 60 * 24 * 30 },
  { label: "days", seconds: 60 * 60 * 24 },
  { label: "hours", seconds: 60 * 60 },
  { label: "minutes", seconds: 60 },
  { label: "seconds", seconds: 1 },
];

export function formatCrackTime(seconds) {
  if (!isFinite(seconds)) return "Millennia+";
  if (seconds < 1) return "Instantly";

  for (const unit of UNITS) {
    if (seconds >= unit.seconds) {
      const value = seconds / unit.seconds;
      if (unit.label === "centuries" && value > 1000) return "Millennia+";
      const rounded =
        value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
      return `${rounded.toLocaleString()} ${rounded === 1 ? unit.label.replace(/s$/, "") : unit.label}`;
    }
  }
  return "Instantly";
}

export function estimateCrackTimes(entropyBits) {
  return {
    online: formatCrackTime(
      secondsToCrack(entropyBits, ATTACK_SPEEDS.online.guessesPerSecond),
    ),
    offline: formatCrackTime(
      secondsToCrack(entropyBits, ATTACK_SPEEDS.offline.guessesPerSecond),
    ),
  };
}
