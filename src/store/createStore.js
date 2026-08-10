import { useSyncExternalStore } from "react";

/**
 * Lightweight Zustand-compatible Store Creator built on React 19's useSyncExternalStore.
 * Provides selector-based subscription to prevent unnecessary component re-renders.
 */
export function createStore(initialStateCreator) {
  let state;
  const listeners = new Set();

  const getState = () => state;

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      state = replace
        ? nextState
        : typeof nextState === "object" && nextState !== null
        ? { ...state, ...nextState }
        : nextState;
      listeners.forEach((listener) => listener());
    }
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const store = { getState, setState, subscribe };
  state = initialStateCreator(setState, getState, store);

  const useStore = (selector = (s) => s) => {
    return useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(state)
    );
  };

  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
}

export default createStore;
