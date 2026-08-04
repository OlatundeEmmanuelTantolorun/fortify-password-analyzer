const POOLS = {
  lower: { test: /[a-z]/, size: 26 },
  upper: { test: /[A-Z]/, size: 26 },
  number: { test: /[0-9]/, size: 10 },
  symbol: { test: /[^a-zA-Z0-9]/, size: 32 },
};

export function getCharacterPoolSize(password) {
  if (!password) return 0;
  let size = 0;
  for (const key in POOLS) {
    if (POOLS[key].test.test(password)) size += POOLS[key].size;
  }
  return size;
}

export function getPoolBreakdown(password) {
  return {
    lower: POOLS.lower.test.test(password),
    upper: POOLS.upper.test.test(password),
    number: POOLS.number.test.test(password),
    symbol: POOLS.symbol.test.test(password),
  };
}

export function calculateEntropy(password) {
  if (!password) return 0;
  const pool = getCharacterPoolSize(password);
  if (pool === 0) return 0;
  return password.length * Math.log2(pool);
}

export function entropyLabel(bits) {
  if (bits < 35) return "Very Weak";
  if (bits < 60) return "Fair";
  if (bits < 80) return "Strong";
  if (bits < 100) return "Very Strong";
  return "Excellent";
}
