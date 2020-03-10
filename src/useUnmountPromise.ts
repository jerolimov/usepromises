import * as React from 'react';

export function useUnmountPromise(promise: Promise<any> | (() => Promise<any>)) {
  React.useEffect(() => {
    return () => {
      try {
        if (typeof promise === 'function') {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          promise = promise();
        }
        promise.then(
          _ => null,
          error => console.warn('useUnmountPromise failed:', error)
        );
      } catch (error) {
        console.warn('useUnmountPromise failed:', error);
      }
    };
  }, []);
}
