/**
 * API client wrapper for the Notes backend.
 * - Base URL resolution order:
 *   REACT_APP_API_BASE -> REACT_APP_BACKEND_URL -> http://localhost:4000
 * - Uses built-in fetch with JSON handling and basic error propagation.
 * - Optional logging via REACT_APP_LOG_LEVEL (debug|info|error).
 * Environment variables are provided via CRA (prefix REACT_APP_). See README and .env.example.
 */

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Resolve API base URL from env with fallback. */
  const base =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    'http://localhost:4000';
  return base.replace(/\/+$/, '');
}

const LOG_LEVEL = (process.env.REACT_APP_LOG_LEVEL || 'error').toLowerCase();
const canLog = (level) => {
  const order = ['debug', 'info', 'error'];
  return order.indexOf(level) >= order.indexOf(LOG_LEVEL);
};

async function handleResponse(res) {
  const text = await res.text();
  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const payload = isJson && text ? JSON.parse(text) : text;

  if (!res.ok) {
    const err = new Error(
      (payload && payload.message) || `Request failed with ${res.status}`
    );
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

async function request(path, options = {}) {
  const base = getApiBase();
  const url = `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  if (canLog('debug')) {
    // eslint-disable-next-line no-console
    console.debug('[api] request', fetchOptions.method, url, fetchOptions.body || '');
  }
  const res = await fetch(url, fetchOptions);
  const data = await handleResponse(res);
  if (canLog('debug')) {
    // eslint-disable-next-line no-console
    console.debug('[api] response', url, data);
  }
  return data;
}

// PUBLIC_INTERFACE
export const api = {
  /** List notes */
  async list() {
    return request('/notes', { method: 'GET' });
  },
  /** Create a new note */
  async create({ title, content }) {
    return request('/notes', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
  },
  /** Update an existing note by id */
  async update(id, { title, content }) {
    return request(`/notes/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
    });
  },
  /** Delete a note by id */
  async remove(id) {
    return request(`/notes/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },
};
