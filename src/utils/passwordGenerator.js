const CHARSETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  number: "23456789",
  symbol: "!@#$%^&*()-_=+[]{}",
};

export function generatePassword({
  length = 16,
  upper = true,
  lower = true,
  number = true,
  symbol = true,
}) {
  const active = [];
  if (lower) active.push(CHARSETS.lower);
  if (upper) active.push(CHARSETS.upper);
  if (number) active.push(CHARSETS.number);
  if (symbol) active.push(CHARSETS.symbol);

  if (active.length === 0) return "";

  const pool = active.join("");
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = active.map(
    (set) =>
      set[
        Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) *
            set.length,
        )
      ],
  );

  for (let i = result.length; i < length; i++) {
    result.push(pool[Math.floor((randomValues[i] / 2 ** 32) * pool.length)]);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor((randomValues[i] / 2 ** 32) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("").slice(0, length);
}
