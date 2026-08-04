const WEIGHTS = {
  length: 30,
  upper: 10,
  lower: 10,
  number: 10,
  symbol: 15,
  entropy: 20,
};

const PENALTIES = {
  common: 40,
  repeated: 15,
  sequential: 15,
  dictionary: 20,
};

export function calculateScore({
  checklist,
  entropyBits,
  isCommon,
  zxcvbnMatches = [],
}) {
  if (!checklist) return 0;

  let score = 0;
  score += checklist.length.pass
    ? WEIGHTS.length
    : (checklist.length.value / checklist.length.target) * WEIGHTS.length;
  score += checklist.upper.pass ? WEIGHTS.upper : 0;
  score += checklist.lower.pass ? WEIGHTS.lower : 0;
  score += checklist.number.pass ? WEIGHTS.number : 0;
  score += checklist.symbol.pass ? WEIGHTS.symbol : 0;

  score += Math.min(entropyBits / 100, 1) * WEIGHTS.entropy;

  if (isCommon) score -= PENALTIES.common;
  if (!checklist.noRepeats.pass) score -= PENALTIES.repeated;
  if (!checklist.noSequential.pass) score -= PENALTIES.sequential;

  const hasDictionaryHit = zxcvbnMatches.some(
    (m) => m.pattern === "dictionary",
  );
  if (hasDictionaryHit) score -= PENALTIES.dictionary;

  return Math.max(0, Math.min(100, Math.round(score)));
}

const RATINGS = [
  { max: 20, label: "Very Weak", color: "danger" },
  { max: 40, label: "Weak", color: "danger" },
  { max: 60, label: "Fair", color: "warning" },
  { max: 80, label: "Strong", color: "success" },
  { max: 101, label: "Excellent", color: "primary" },
];

export function getRating(score) {
  return RATINGS.find((r) => score < r.max) ?? RATINGS[RATINGS.length - 1];
}

export function getGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

export { WEIGHTS, PENALTIES };
