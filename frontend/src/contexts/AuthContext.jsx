import { createContext, useContext, useEffect, useState } from 'react';
import { getEmployee, getToken, saveSession, clearSession } from '../services/core/session.js';
import { apiRequest } from '../services/core/api-client.js';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [employee, setEmployee] = useState(getEmployee);
  const [checking, setChecking] = useState(Boolean(getToken()));
  const logout = () => {
    clearSession();
    setEmployee(null);
  };
  useEffect(() => {
    const expire = () => {
      setEmployee(null);
      setChecking(false);
    };
    window.addEventListener('abe-garage:session-expired', expire);
    const abort = new AbortController();
    const restoringToken = getToken();
    if (restoringToken) {
      apiRequest('/profile', { signal: abort.signal })
        .then((result) => {
          if (!abort.signal.aborted && getToken() === restoringToken) {
            saveSession(restoringToken, result.data);
            setEmployee(result.data);
          }
        })
        .catch((error) => {
          if (!abort.signal.aborted && [401, 403].includes(error.status)) logout();
        })
        .finally(() => {
          if (!abort.signal.aborted) setChecking(false);
        });
    }
    return () => {
      abort.abort();
      window.removeEventListener('abe-garage:session-expired', expire);
    };
  }, []);
  const setSession = (token, profile) => {
    saveSession(token, profile);
    setEmployee(profile);
  };
  return (
    <AuthContext.Provider
      value={{
        employee,
        checking,
        isAuthenticated: Boolean(employee && getToken()),
        setSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth requires AuthProvider');
  return context;
}
