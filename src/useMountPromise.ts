import * as React from 'react';

export function useMountPromise(promise: Promise<any> | (() => Promise<any>)) {
  React.useEffect(() => {
    try {
      if (typeof promise === 'function') {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        promise = promise();
      }
      promise.then(
        _ => null,
        error => console.warn('useMountPromise failed:', error)
      );
    } catch (error) {
      console.warn('useMountPromise failed:', error);
    }
  }, []);
}
