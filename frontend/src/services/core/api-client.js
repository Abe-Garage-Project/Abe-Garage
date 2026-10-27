import { getToken, clearSession } from './session.js';
const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(
  /[/]$/,
  '',
);
export async function apiRequest(
  path,
  { method = 'GET', body, authenticated = true, signal } = {},
) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const token = authenticated ? getToken() : null;
  if (token) headers.Authorization = 'Bearer ' + token;
  const response = await fetch(baseUrl + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && authenticated) {
      clearSession();
      window.dispatchEvent(new Event('abe-garage:session-expired'));
    }
    const error = new Error(payload?.message || 'Request failed');
    error.status = response.status;
    error.data = payload?.data ?? null;
    throw error;
  }
  return payload;
}
