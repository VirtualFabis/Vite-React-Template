import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/first')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /dashboard/first!';
}
