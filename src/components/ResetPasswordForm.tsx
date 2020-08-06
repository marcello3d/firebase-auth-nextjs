import { FormEvent, useCallback, useRef, useState } from 'react';
import styles from './Form.module.css';
import { auth } from '../lib/auth';
import { useDoPromise } from '../hooks/useDoPromise';
import { ActionButton } from './ActionButton';

export function ResetPasswordForm() {
  const [doAction, processing, error] = useDoPromise();
  const [done, setDone] = useState(false);

  const email = useRef<HTMLInputElement>();

  const resetPassword = useCallback((event: FormEvent) => {
    event.preventDefault();
    if (email.current) {
      doAction(() =>
        auth
          .sendOobCode('PASSWORD_RESET', email.current.value)
          .then(() => setDone(true)),
      );
    }
  }, []);

  if (done) {
    return <div>Check your e-mail for password reset instructions.</div>;
  }

  return (
    <form onSubmit={resetPassword} className={styles.loginForm}>
      <div>
        <label>
          E-mail:{' '}
          <input type="email" ref={email} name="email" autoComplete="email" />
        </label>
      </div>
      <ActionButton
        label="Reset Password"
        actionLabel="Processing…"
        processing={processing}
        error={error}
      />
    </form>
  );
}
