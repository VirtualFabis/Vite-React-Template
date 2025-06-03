import { useAuth } from '@hooks/use-auth';
import { RouterProvider } from '@tanstack/react-router';

export default function App({ router }) {
  const currentUser = useAuth((state) => state.currentUser);
  const isLogged = useAuth((state) => state.isLogged);
  return (
    <RouterProvider
      router={router}
      context={{
        authentication: {
          isLogged,
          currentUser,
        },
      }}
    />
  );
}
