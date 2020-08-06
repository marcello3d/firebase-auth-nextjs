import styles from '../styles/Home.module.css';
import { useAuth } from '../hooks/useAuth';
import { PasswordLoginForm } from '../components/PasswordLoginForm';
import { LogoutButton } from '../components/LogoutButton';
import { PasswordSignupForm } from '../components/PasswordSignupForm';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import Head from 'next/head';
import { User } from '../lib/auth';

export default function Home() {
  const user = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Firebase Auth Lite + Next JS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Firebase Auth + Next.js</h1>

        <p className={styles.description}>
          A demo using{' '}
          <a href="https://github.com/samuelgozi/firebase-auth-lite/">
            firebase-auth-lite
          </a>{' '}
          with <a href="https://nextjs.org">Next.js</a>
        </p>

        <div className={styles.grid}>
          {user ? (
            <Authenticated user={user} />
          ) : user === null ? (
            <NoAuth />
          ) : (
            <>Checking auth…</>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/marcello3d/firebase-auth-nextjs">
          Source on Github
        </a>
      </footer>
    </div>
  );
}

function NoAuth() {
  return (
    <>
      <div className={styles.card}>
        <h3>Login with third-party</h3>
        <GoogleLoginButton />
      </div>
      <div className={styles.card}>
        <h3>Create a new demo e-mail account</h3>
        <PasswordSignupForm />
      </div>
      <div className={styles.card}>
        <h3>Login with demo e-mail account</h3>
        <PasswordLoginForm />
      </div>
    </>
  );
}
function Authenticated({ user }: { user: User }) {
  return (
    <>
      <div className={styles.card}>
        <h3>Logged in</h3>
        <p>
          <LogoutButton />
        </p>
      </div>

      <div className={styles.card}>
        <table>
          <tbody>
            <tr>
              <th>Firebase ID</th>
              <td>{user.localId}</td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Photo</th>
              <td>
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt="Profile picture" width={100} />
                ) : (
                  <i>None</i>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.card}>
        <h3>Raw User Data:</h3>
        <textarea
          readOnly={true}
          className={styles.textarea}
          value={JSON.stringify(user, undefined, 2)}
        />
      </div>
    </>
  );
}
