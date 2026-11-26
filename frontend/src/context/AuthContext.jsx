// Phụ trách: Thiều Tiến Dũng (cập nhật lưu phiên đăng nhập cho phân quyền Admin / Khách vãng lai)
import { createContext, useContext, useState } from "react";

const AUTH_STORAGE_KEY = "barberhub_auth_user_v1";

function loadSavedUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(loadSavedUser);

  const setUser = (nextUser) => {
    setUserState(nextUser);
    try {
      if (nextUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  };

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
