import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../lib/auth';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<any>(undefined);
  useEffect(() => {
    auth
      .handleSignInRedirect()
      .then(() => {
        router.replace('/');
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Firebase Auth Lite + Next JS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Firebase Auth + Next.js</h1>

        <p className={styles.description}>
          {error ? (
            <>Authorization error: {error.message}</>
          ) : (
            <>Authorizing, please wait…</>
          )}
        </p>
      </main>

      <footer className={styles.footer}>Cool cool cool.</footer>
    </div>
  );
}
