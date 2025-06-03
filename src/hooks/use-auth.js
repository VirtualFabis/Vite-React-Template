import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Custom hook to manage authentication state using Zustand and persist it in session storage.
 *
 * @returns {AuthStore} The authentication store with the following properties and methods:
 *
 * - `currentUser`: The currently authenticated user.
 * - `isLogged`: Boolean indicating if a user is logged in.
 * - `location`: An object mapping location names to their respective `Location`.
 * - `setCurrentUser`: Function to set the current user and start the session timer.
 * - `signOut`: Function to clear the current user and stop the session timer.
 * - `startSessionTimer`: Function to start a session timer that logs out the user after a specified time.
 *
 * The store is persisted in session storage under the key 'user-storage'.
 */
export const useAuth = create(
  persist(
    (set) => {
      let sessionTimeout;

      const startSessionTimer = (expiresIn) => {
        const expirationTime = new Date(expiresIn).getTime() - new Date().getTime();
        if (sessionTimeout) {
          clearTimeout(sessionTimeout);
        }
        sessionTimeout = setTimeout(() => {
          set({ currentUser: {}, isLogged: false });
        }, expirationTime);
      };

      return {
        currentUser: {},
        isLogged: false,
        location: {
          'Saltillo, Coahuila Mexico': '013',
          Cleveland: '004',
          Portland: '001',
          'Mt Holly': '065',
          Santiago: '065',
          E100: '040',
        },
        setCurrentUser: (user) =>
          set(({ location }) => {
            user.location_code = location[user.location];
            startSessionTimer(user.expires_in);
            return { currentUser: user, isLogged: true };
          }),
        signOut: () => {
          if (sessionTimeout) {
            clearTimeout(sessionTimeout);
          }
          set(() => ({ currentUser: {}, isLogged: false }));
        },
        startSessionTimer,
      };
    },
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
