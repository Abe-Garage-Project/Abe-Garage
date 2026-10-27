const TOKEN_KEY = 'abe_garage_access_token';
const EMPLOYEE_KEY = 'abe_garage_employee';
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getEmployee() {
  try {
    return JSON.parse(localStorage.getItem(EMPLOYEE_KEY) || 'null');
  } catch {
    return null;
  }
}
export function saveSession(accessToken, employee) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employee));
}
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMPLOYEE_KEY);
}
// Frontend storage is a UI convenience, never server authorization evidence.
