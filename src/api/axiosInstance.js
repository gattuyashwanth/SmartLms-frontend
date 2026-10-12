import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://smartlms-backend-2miu.onrender.com/api'
    : 'http://localhost:8008/api');

// Base backend URL without trailing '/api'
export const BACKEND_SERVER_URL = API_BASE_URL.replace(/\/api\/?$/, '');

/**
 * Returns full URL for files served by backend (assignments, chat attachments, avatars)
 */
export const getFileUrl = (relativeUrl) => {
  if (!relativeUrl) return '';
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl;
  }
  const cleanPath = relativeUrl.startsWith('/') ? relativeUrl : `/${relativeUrl}`;
  return `${BACKEND_SERVER_URL}${cleanPath}`;
};

/**
 * Returns WebSocket URL pointing to the active backend (ws:// or wss://)
 */
export const getWebSocketUrl = (path = '/ws/chat') => {
  const token = localStorage.getItem('token');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  try {
    const url = new URL(BACKEND_SERVER_URL);
    const wsProto = url.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${wsProto}//${url.host}${cleanPath}${token ? `?token=${encodeURIComponent(token)}` : ''}`;
  } catch (e) {
    const wsProto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${wsProto}//${window.location.hostname}:8008${cleanPath}${token ? `?token=${encodeURIComponent(token)}` : ''}`;
  }
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor: attach JWT ────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 ───────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint =
      error.config?.url?.includes('/auth/login') ||
      error.config?.url?.includes('/auth/register');

    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

