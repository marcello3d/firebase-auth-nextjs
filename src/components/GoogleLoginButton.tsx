import { useCallback, useState } from 'react';
import { auth } from '../lib/auth';
import { ActionButton } from './ActionButton';
import { useDoPromise } from '../hooks/useDoPromise';

export function GoogleLoginButton({
  children = 'Login with Google',
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [doAction, processing, error] = useDoPromise(false);

  const loginWithGoogle = useCallback(() => {
    doAction(() => auth.signInWithProvider('google.com'));
  }, []);

  return (
    <ActionButton
      label="Login with Google"
      actionLabel="Redirecting to Google…"
      onClick={loginWithGoogle}
      processing={processing}
      error={error}
    />
  );
}
