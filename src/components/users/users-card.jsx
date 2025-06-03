import { Box, Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import React from 'react';
import UserAccessModal from './user-access-modal';
import UsersTable from './users-table';
import { getADUsers, getRoles } from '@services/users-service';
import { useQueries } from '@tanstack/react-query';
import AlertError from '@components/ui/alert-error';

export default function UsersCard() {
  return (
    <Box sx={{ p: 2 }}>
      <Card>
        <CardHeader
          sx={{ background: '#4E5DB8', color: 'white' }}
          title='Gestión de usuarios'
          action={<UserAccessModal />}
        />
        <CardContent>
          <PrependComponent />
        </CardContent>
      </Card>
    </Box>
  );
}

const PrependComponent = () => {
  const queryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  };
  const [{ data, isLoading, isError, error }, { data: roles }] = useQueries({
    queries: [
      {
        queryKey: ['GetADUsers'],
        queryFn: getADUsers,
        ...queryOptions,
        select: (data) =>
          data.filter((x) => x.USER_IDROLE !== 5).map((x) => ({ guid: crypto.randomUUID(), ...x })),
      },
      {
        queryKey: ['GetRoles'],
        queryFn: getRoles,
        ...queryOptions,
        select: (data) => new Map(data.map((item) => [item.Role, item.IdRole])),
      },
    ],
  });

  if (isLoading) return <Skeleton variant='rounded' width='100%' height='700px' />;
  if (isError) return <AlertError message={error.message} />;

  return <UsersTable initialState={data} roles={roles} />;
};
