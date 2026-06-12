import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Role = 'admin' | 'editor' | 'viewer';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthContextState {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  requireAuth: boolean;
}

const Ctx = createContext<AuthContextState | null>(null);

const KEY = 'ycsos.auth';

// Seed admin: admin@youssef.studio / admin123
// NOTE: In production this uses Supabase Auth with hashed passwords on the server.
// This is a local simulation so the platform runs standalone.
const SEED_USERS = [
  { id: 'u_admin', email: 'admin@youssef.studio', password: 'admin123', name: 'Youssef Admin', role: 'admin' as Role },
  { id: 'u_editor', email: 'editor@youssef.studio', password: 'editor123', name: 'Studio Editor', role: 'editor' as Role },
  { id: 'u_viewer', email: 'viewer@youssef.studio', password: 'viewer123', name: 'Team Viewer', role: 'viewer' as Role },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
  });

  useEffect(() => { if (user) localStorage.setItem(KEY, JSON.stringify(user)); else localStorage.removeItem(KEY); }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 400));
    const match = SEED_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!match) return false;
    setUser({ id: match.id, email: match.email, name: match.name, role: match.role });
    return true;
  };

  const logout = () => setUser(null);

  return <Ctx.Provider value={{ user, login, logout, requireAuth: true }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx); if (!c) throw new Error('useAuth outside provider');
  return c;
}
