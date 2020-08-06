import { FormEvent, useCallback, useRef, useState } from 'react';
import styles from './Form.module.css';
import { auth } from '../lib/auth';
import { useDoPromise } from '../hooks/useDoPromise';
import { ActionButton } from './ActionButton';

export function PasswordLoginForm() {
  const [doAction, processing, error] = useDoPromise();

  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();

  const loginWithEmail = useCallback((event: FormEvent) => {
    event.preventDefault();
    if (email.current && password.current) {
      doAction(() => auth.signIn(email.current.value, password.current.value));
    }
  }, []);

  return (
    <form onSubmit={loginWithEmail} className={styles.loginForm}>
      <div>
        <label>
          E-mail:{' '}
          <input type="email" ref={email} name="email" autoComplete="email" />
        </label>
      </div>
      <div>
        <label>
          Password:{' '}
          <input
            type="password"
            ref={password}
            autoComplete="current-password"
          />
        </label>
      </div>
      <ActionButton
        label="Login"
        actionLabel="Logging in…"
        processing={processing}
        error={error}
      />
    </form>
  );
}
