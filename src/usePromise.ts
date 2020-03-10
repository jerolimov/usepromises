import * as React from 'react';

import { PromiseResult, PromiseReducer } from './types';
import { defaultReducer, initialState } from './reducer';

export function usePromise<Resolved, Rejected = Error>(
  promise: Promise<Resolved> | (() => Promise<Resolved>),
  deps?: React.DependencyList
): PromiseResult<Resolved, Rejected> {
  const [state, dispatch] = React.useReducer<PromiseReducer<Resolved, Rejected>>(
    defaultReducer,
    initialState
  );

  React.useEffect(() => {
    try {
      if (typeof promise === 'function') {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        promise = promise();
      }
      promise.then(
        value => dispatch({ type: 'RESOLVED', value }),
        error => dispatch({ type: 'REJECTED', error })
      );
    } catch (error) {
      dispatch({ type: 'REJECTED', error });
    }
  }, deps);

  return state;
}
