
const COMMON_PASSWORDS = new Set([
  '123456', '123456789', 'qwerty', 'password', '12345', '12345678',
  '111111', '123123', '1234567890', '1234567', 'qwerty123', '000000',
  'abc123', 'password1', 'iloveyou', '1q2w3e4r', 'admin', 'letmein',
  'welcome', 'monkey', 'login', 'starwars', 'dragon', 'passw0rd',
  'master', 'hello', 'freedom', 'whatever', 'qazwsx', 'trustno1',
  'sunshine', 'princess', 'football', 'baseball', 'superman', 'access',
  'shadow', '654321', '123321', 'michael', 'jennifer', 'jordan23',
])

export function isCommonPassword(password) {
  if (!password) return false
  return COMMON_PASSWORDS.has(password.toLowerCase())
}
