import React, { useState, useEffect } from 'react';

interface UseLocalStorageStateProps<T> {
  storageKey: string;
  initialState: T;
}

/**
 * Custom hook to persist any state in the browser's local storage.
 * This hook can be used to persist state across different user sessions.
 *
 * @param {Object} params - An object containing the necessary properties for the hook.
 * @param {string} params.storageKey - The key under which the state will be stored in local storage.
 * @param {T} params.initialState - The initial state for the hook.
 *
 * @returns {Array} An array with two elements: the current state and a function to update the state.
 * The current state is of the type passed as parameter `T` to the hook.
 * The function to update the state is a React dispatch function that accepts a React state action.
 *
 * @template T - The type of state to be persisted. This should be a type that can be serialized to JSON.
 *
 * @example
 * const [userPreferences, setUserPreferences] = useLocalStorageState({
 *   storageKey: 'app.user.preferences',
 *   initialState: {},
 * });
 */
export const useLocalStorageState = <T>({
  storageKey,
  initialState,
}: UseLocalStorageStateProps<T>): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const localStorageState = localStorage.getItem(storageKey);
      return localStorageState ? JSON.parse(localStorageState) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [storageKey, state]);

  return [state, setState];
};
