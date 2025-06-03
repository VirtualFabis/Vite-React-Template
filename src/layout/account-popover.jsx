import { useCallback } from 'react';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@hooks/use-auth';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);
  const isLogged = useAuth((state) => state.isLogged);
  const signOut = useAuth((state) => state.signOut);

  const handleSignOut = useCallback(() => {
    onClose?.();
    signOut();
    navigate({ to: '/' });
  }, [onClose, signOut, navigate]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: 200 } } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant='overline'>Cuenta</Typography>
        <Typography color='text.secondary' variant='body2'>
          {isLogged ? `${currentUser.wiw}, Rol: ${currentUser.user_role}` : 'No Autenticado'}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        {isLogged ? (
          <MenuItem onClick={handleSignOut}>Desconectar</MenuItem>
        ) : (
          <MenuItem onClick={handleSignOut}>Conectar</MenuItem>
        )}
      </MenuList>
    </Popover>
  );
};
