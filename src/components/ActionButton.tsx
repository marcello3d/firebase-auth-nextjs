import styles from './Form.module.css';

export function ActionButton({
  onClick,
  label,
  actionLabel,
  processing,
  error,
}: {
  label: string;
  actionLabel: string;
  processing: boolean;
  error: Error | undefined;
  onClick?: () => void;
}) {
  return (
    <>
      <button onClick={onClick} disabled={processing}>
        {label}
      </button>{' '}
      {processing && actionLabel}
      {error && <span className={styles.error}>Error: {error.message}</span>}
    </>
  );
}
