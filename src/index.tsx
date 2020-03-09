import * as React from 'react';

export type PromiseResult<Resolved, Rejected> =
  | { status: 'PENDING' }
  | { status: 'FULFILLED'; resolved: Resolved }
  | { status: 'REJECTED'; rejected: Rejected };

/*
export type PromiseResult2<Resolved, Rejected> =
  { isPending: true } |
  { isResolved: true, value: Resolved } |
  { isRejected: true, error: Rejected };
*/

type PromiseAction<Resolved, Rejected> =
  | { type: 'FULFILLED'; resolved: Resolved }
  | { type: 'REJECTED'; rejected: Rejected };

type Reducer<Resolved, Rejected> = React.Reducer<
  PromiseResult<Resolved, Rejected>,
  PromiseAction<Resolved, Rejected>
>;

function defaultReducer<Resolved, Rejected>(
  prevState: PromiseResult<Resolved, Rejected>,
  action: PromiseAction<Resolved, Rejected>
) {
  switch (action.type) {
    case 'FULFILLED':
      return { status: action.type, resolved: action.resolved };
    case 'REJECTED':
      return { status: action.type, rejected: action.rejected };
    default:
      return prevState;
  }
}

const initialState: { status: 'PENDING' } = { status: 'PENDING' };

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
        value => dispatch({ type: 'FULFILLED', resolved: value }),
        error => dispatch({ type: 'REJECTED', rejected: error })
      );
    } catch (error) {
      dispatch({ type: 'REJECTED', rejected: error });
    }
  }, deps);

  return state;
}
