import { useEffect, useState } from 'react';
import { auth, User } from '../lib/auth';

export function useAuth(): User | undefined | null {
  const [user, setUser] = useState(auth?.user);

  useEffect(() => auth.listen(setUser));

  return user;
}
