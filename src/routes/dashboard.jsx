import Layout from '@/layout';
import NotFound from '@components/ui/not-found';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { typesErrorsKeys } from '@utils/constants';

export const Route = createFileRoute('/dashboard')({
  component: Layout,
  notFoundComponent: NotFound,
  onError: (error) => {
    console.error(error);
    throw redirect({
      to: `/dashboard/access-denied/${typesErrorsKeys.InternalServerError}`,
      replace: true,
    });
  },
});
