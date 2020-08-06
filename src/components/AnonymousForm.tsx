import { FormEvent, useCallback } from 'react';
import styles from './Form.module.css';
import { auth } from '../lib/auth';
import { useDoPromise } from '../hooks/useDoPromise';
import { ActionButton } from './ActionButton';

export function AnonymousForm() {
  const [doAction, processing, error] = useDoPromise();

  const anonymousSignup = useCallback((event: FormEvent) => {
    event.preventDefault();
    doAction(() => auth.signUp());
  }, []);

  return (
    <form onSubmit={anonymousSignup} className={styles.loginForm}>
      <ActionButton
        label="Create Anonymous Account"
        actionLabel="Creating…"
        processing={processing}
        error={error}
      />
    </form>
  );
}
