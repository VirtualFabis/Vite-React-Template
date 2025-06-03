import { Alert } from '@mui/material';

export default function AlertError({ message }) {
  const reload = () => window.location.reload();
  return (
    <Alert severity='error' onClick={reload}>
      {message}
    </Alert>
  );
}
