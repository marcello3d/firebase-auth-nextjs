import { FormEvent, useCallback, useRef, useState } from 'react';
import styles from './Form.module.css';
import { auth } from '../lib/auth';
import { useDoPromise } from '../hooks/useDoPromise';
import { ActionButton } from './ActionButton';

export function NewPasswordForm({
  oobCode,
  onReset,
}: {
  oobCode: string;
  onReset: () => void;
}) {
  const [doAction, processing, error, setError] = useDoPromise();
  const password = useRef<HTMLInputElement>();
  const password2 = useRef<HTMLInputElement>();

  const changePassword = useCallback(
    (event: FormEvent) => {
      if (password2.current.value !== password.current.value) {
        setError(new Error('PASSWORDS_DO_NOT_MATCH'));
      } else {
        doAction(() =>
          auth.resetPassword(oobCode, password.current.value).then(onReset),
        );
      }
      event.preventDefault();
    },
    [oobCode],
  );

  return (
    <form onSubmit={changePassword} className={styles.loginForm}>
      <div>
        <label>
          New password:{' '}
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
        label="Change password"
        actionLabel="Changing…"
        processing={processing}
        error={error}
      />
    </form>
  );
}
