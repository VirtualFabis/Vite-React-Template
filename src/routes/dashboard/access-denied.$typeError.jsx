import AccessDenied from '@components/ui/access-denied';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/access-denied/$typeError')({
  component: AccessDenied,
});
