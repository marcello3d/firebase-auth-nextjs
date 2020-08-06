import { useCallback } from 'react';
import { auth } from '../lib/auth';

export function LogoutButton() {
  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return <button onClick={logout}>Logout</button>;
}
