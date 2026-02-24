export const isSafeUrl = (u: unknown) => {
  if (typeof u !== 'string' || u.trim() === '') return false
  // internal path
  if (u.startsWith('/')) return true
  // only allow http(s)
  return /^https?:\/\//i.test(u)
}

export const isExternalUrl = (u: unknown) => {
  return typeof u === 'string' && /^https?:\/\//i.test(u)
}
