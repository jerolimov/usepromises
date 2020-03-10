import * as React from 'react';

export type PromiseResult<Resolved, Rejected> =
  | { isPending: true; isResolved: false; isRejected: false }
  | { isPending: false; isResolved: true; isRejected: false; value: Resolved }
  | { isPending: false; isResolved: false; isRejected: true; error: Rejected };

type PromiseAction<Resolved, Rejected> =
  | { type: 'RESOLVED'; value: Resolved }
  | { type: 'REJECTED'; error: Rejected };

type Reducer<Resolved, Rejected> = React.Reducer<
  PromiseResult<Resolved, Rejected>,
  PromiseAction<Resolved, Rejected>
>;

function defaultReducer<Resolved, Rejected>(
  prevState: PromiseResult<Resolved, Rejected>,
  action: PromiseAction<Resolved, Rejected>
): PromiseResult<Resolved, Rejected> {
  switch (action.type) {
    case 'RESOLVED':
      return { isPending: false, isResolved: true, isRejected: false, value: action.value };
    case 'REJECTED':
      return { isPending: false, isResolved: false, isRejected: true, error: action.error };
    default:
      return prevState;
  }
}

const initialState: { isPending: true; isResolved: false; isRejected: false } = {
  isPending: true,
  isResolved: false,
  isRejected: false,
};

export function usePromise<Resolved, Rejected = Error>(
  promise: Promise<Resolved> | (() => Promise<Resolved>),
  deps?: React.DependencyList
): PromiseResult<Resolved, Rejected> {
  const [state, dispatch] = React.useReducer<Reducer<Resolved, Rejected>>(
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
