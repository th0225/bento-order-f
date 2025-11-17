const API_BASE = 'http://localhost:5162';

// 儲存Token
export function setToken(token: string) {
  localStorage.setItem('jwt', token);
}

// 取得Token
export function getToken() {
  return localStorage.getItem('jwt');
}

// 刪除Token
export function clearToken() {
  localStorage.removeItem('jwt');
}

// 儲存Auth資訊
export function setAuth(auth: string) {
  localStorage.setItem('auth', auth);
}

// 取得Auth資訊
export function getAuth() {
  return localStorage.getItem('auth');
}

// 刪除Auth資訊
export function clearAuth() {
  localStorage.removeItem('auth');
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  // console.log('Using token:', token);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  // 自動處理 Token 過期
  if (response.status === 401) {
    clearToken();
    throw new Error('未授權或登入已過期，請重新登入');
  }

  // 嘗試解析 JSON
  try {
    return await response.json();
  } catch {
    return null;
  }
}
