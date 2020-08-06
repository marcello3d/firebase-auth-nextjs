import { FormEvent, useCallback, useRef, useState } from 'react';
import styles from './Form.module.css';
import { auth } from '../lib/auth';
import { useDoPromise } from '../hooks/useDoPromise';
import { ActionButton } from './ActionButton';

export function PasswordSignupForm() {
  const [doAction, processing, error, setError] = useDoPromise();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const password2 = useRef<HTMLInputElement>();

  const signupWithEmail = useCallback((event: FormEvent) => {
    if (password2.current.value !== password.current.value) {
      setError(new Error('PASSWORDS_DO_NOT_MATCH'));
    } else {
      doAction(() => auth.signUp(email.current.value, password.current.value));
    }
    event.preventDefault();
  }, []);

  return (
    <form onSubmit={signupWithEmail} className={styles.loginForm}>
      <div>
        <label>
          E-mail:{' '}
          <input type="email" ref={email} name="email" autoComplete="email" />
        </label>
      </div>
      <div>
        <label>
          Password:{' '}
          <input type="password" ref={password} autoComplete="new-password" />
        </label>
      </div>
      <div>
        <label>
          Re-type password:{' '}
          <input type="password" ref={password2} autoComplete="new-password" />
        </label>
      </div>
      <ActionButton
        label="Create Account"
        actionLabel="Creating…"
        processing={processing}
        error={error}
      />
    </form>
  );
}
