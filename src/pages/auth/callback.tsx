import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../lib/auth';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';
import { NewPasswordForm } from '../../components/NewPasswordForm';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<any>(undefined);
  const { mode, oobCode } = router.query;
  const resetPasswordMode = mode === 'resetPassword';
  const onReset = useCallback(() => {
    router.replace('/');
  }, [router]);
  useEffect(() => {
    if (!resetPasswordMode) {
      auth
        .handleSignInRedirect()
        .then(onReset)
        .catch((error) => {
          setError(error);
        });
    }
  }, [resetPasswordMode, onReset]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Firebase Auth Lite + Next JS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Firebase Auth + Next.js</h1>

        {resetPasswordMode && typeof oobCode === 'string' ? (
          <NewPasswordForm oobCode={oobCode} onReset={onReset} />
        ) : (
          <p className={styles.description}>
            {error ? (
              <>Authorization error: {error.message}</>
            ) : (
              <>Authorizing, please wait…</>
            )}
          </p>
        )}
      </main>

      <footer className={styles.footer}>Cool cool cool.</footer>
    </div>
  );
}
