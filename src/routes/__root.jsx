import NotFound from '@components/ui/not-found';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const RootComponent = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
    <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' />
  </>
);
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
