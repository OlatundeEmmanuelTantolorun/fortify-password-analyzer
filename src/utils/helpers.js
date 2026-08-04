export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function hasRepeatedChars(password) {
  return /(.)\1{2,}/.test(password);
}

export function hasSequentialChars(password) {
  if (!password || password.length < 3) return false;
  const lower = password.toLowerCase();
  for (let i = 0; i < lower.length - 2; i++) {
    const a = lower.charCodeAt(i);
    const b = lower.charCodeAt(i + 1);
    const c = lower.charCodeAt(i + 2);
    if (b - a === 1 && c - b === 1) return true;
    if (a - b === 1 && b - c === 1) return true;
  }
  return false;
}

const KEYBOARD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm", "1234567890"];

export function hasKeyboardPattern(password) {
  if (!password || password.length < 3) return false;
  const lower = password.toLowerCase();
  return KEYBOARD_ROWS.some((row) => {
    for (let i = 0; i <= row.length - 3; i++) {
      if (lower.includes(row.slice(i, i + 3))) return true;
    }
    return false;
  });
}

export function buildChecklist(password) {
  const length = password.length;
  return {
    length: {
      pass: length >= 12,
      value: length,
      target: 12,
      minPass: length >= 8,
    },
    upper: { pass: /[A-Z]/.test(password) },
    lower: { pass: /[a-z]/.test(password) },
    number: { pass: /[0-9]/.test(password) },
    symbol: { pass: /[^a-zA-Z0-9]/.test(password) },
    noRepeats: { pass: !hasRepeatedChars(password) },
    noSequential: {
      pass: !hasSequentialChars(password) && !hasKeyboardPattern(password),
    },
    notCommon: { pass: true },
  };
}
