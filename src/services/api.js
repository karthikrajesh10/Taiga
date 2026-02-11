const API_BASE = "http://127.0.0.1:8000/api";

export function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
}
