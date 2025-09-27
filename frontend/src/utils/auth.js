// Placeholder for future JWT/session logic in frontend
export function isAuthenticated() {
  return !!document.cookie.match(/connect\.sid/);
}