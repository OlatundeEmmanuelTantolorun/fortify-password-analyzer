import { useMemo } from "react";
import zxcvbn from "zxcvbn";
import {
  calculateEntropy,
  entropyLabel,
  getPoolBreakdown,
} from "../utils/entropy";
import { estimateCrackTimes } from "../utils/crackTime";
import {
  calculateScore,
  getRating,
  getGrade,
  WEIGHTS,
  PENALTIES,
} from "../utils/securityRating";
import { buildChecklist } from "../utils/helpers";
import { isCommonPassword } from "../utils/commonPasswords";

const EMPTY_RESULT = {
  password: "",
  entropyBits: 0,
  entropyLabel: "Very Weak",
  score: 0,
  grade: "—",
  rating: { label: "Enter a password", color: "muted" },
  crackTimes: { online: "—", offline: "—" },
  checklist: buildChecklist(""),
  pool: getPoolBreakdown(""),
  suggestions: [],
  warning: "",
  isCommon: false,
};

export function useAnalyzer(password) {
  return useMemo(() => {
    if (!password) return EMPTY_RESULT;

    const zx = zxcvbn(password);
    const common = isCommonPassword(password);
    const entropyBits = calculateEntropy(password);
    const checklist = buildChecklist(password);
    checklist.notCommon = { pass: !common };

    const score = calculateScore({
      checklist,
      entropyBits,
      isCommon: common,
      zxcvbnMatches: zx.sequence,
    });

    const suggestions = [];
    const add = (text, points) => suggestions.push({ text, points });

    if (common)
      add(
        "Replace this password — it appears in known breach lists",
        PENALTIES.common,
      );
    if (!checklist.length.minPass)
      add("Use at least 8 characters, ideally 12+", WEIGHTS.length);
    else if (!checklist.length.pass)
      add(
        "Increase length to 12+ characters",
        Math.round(WEIGHTS.length * 0.4),
      );
    if (!checklist.symbol.pass)
      add("Add a symbol like ! @ # or %", WEIGHTS.symbol);
    if (!checklist.upper.pass) add("Add an uppercase letter", WEIGHTS.upper);
    if (!checklist.lower.pass) add("Add a lowercase letter", WEIGHTS.lower);
    if (!checklist.number.pass) add("Add a number", WEIGHTS.number);
    if (!checklist.noSequential.pass)
      add(
        'Avoid sequential or keyboard-walk patterns like "1234" or "qwerty"',
        PENALTIES.sequential,
      );
    if (!checklist.noRepeats.pass)
      add(
        "Avoid repeating the same character three or more times",
        PENALTIES.repeated,
      );

    const hasDictionaryHit = zx.sequence.some(
      (m) => m.pattern === "dictionary",
    );
    if (hasDictionaryHit)
      add(
        "Avoid dictionary words — try unrelated words instead",
        PENALTIES.dictionary,
      );

    const seen = new Set();
    const rankedSuggestions = suggestions
      .filter((s) => (seen.has(s.text) ? false : seen.add(s.text)))
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);

    return {
      password,
      entropyBits,
      entropyLabel: entropyLabel(entropyBits),
      score,
      grade: getGrade(score),
      rating: getRating(score),
      crackTimes: estimateCrackTimes(entropyBits),
      checklist,
      pool: getPoolBreakdown(password),
      suggestions: rankedSuggestions,
      warning: zx.feedback.warning,
      isCommon: common,
      zxcvbnScore: zx.score,
    };
  }, [password]);
}
