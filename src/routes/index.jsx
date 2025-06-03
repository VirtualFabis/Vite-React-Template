import { createFileRoute } from '@tanstack/react-router';
import Login from '@/components/Authenticate/login';

export const Route = createFileRoute('/')({
  component: Login,
});
