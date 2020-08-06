import { useCallback, useState } from 'react';

export function useDoPromise(
  clearProcessingAfterResolved: boolean = true,
): [
  (action: () => Promise<unknown>) => void,
  boolean,
  Error | undefined,
  (error: Error) => void,
] {
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const doPromise = useCallback(
    (action: () => Promise<unknown>) => {
      setProcessing(true);
      setError(undefined);
      action()
        .then(() => {
          if (clearProcessingAfterResolved) {
            setProcessing(false);
          }
        })
        .catch((error) => {
          setProcessing(false);
          setError(error);
        });
    },
    [clearProcessingAfterResolved],
  );
  return [doPromise, processing, error, setError];
}
