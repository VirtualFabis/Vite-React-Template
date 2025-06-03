import UsersCard from '@components/users/users-card';
import { ROUTES_ACCESS } from '@hooks/use-navbar-routes';
import { redirect, createFileRoute } from '@tanstack/react-router';
import { typesErrorsKeys } from '@utils/constants';

export const Route = createFileRoute('/dashboard/management-users')({
  component: UsersCard,
  beforeLoad: ({ context, location }) => {
    const access = ROUTES_ACCESS.get(location.pathname);

    if (!context.authentication.isLogged && !access.includes(-1))
      throw redirect({
        to: `/dashboard/access-denied/${typesErrorsKeys.SessionExpired}`,
        replace: true,
      });
    if (!access.includes(context.authentication.currentUser.user_idrole) && !access.includes(-1))
      throw redirect({
        to: `/dashboard/access-denied/${typesErrorsKeys.Unauthorized}`,
        replace: true,
      });
  },
});
