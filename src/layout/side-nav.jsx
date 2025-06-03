import { SideNavItem } from './side-nav-item';
import { useMatchRoute } from '@tanstack/react-router';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Scrollbar from '@components/ui/scroll-bar';
import logo from '@/assets/offline-logo.png';
import Div from '@components/ui/div';
import { Box, Divider, Drawer, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { useNavbarRoutes } from '@hooks/use-navbar-routes';

export const SideNav = ({ open, onClose }) => {
  const matchRoute = useMatchRoute();

  const routes = useNavbarRoutes();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        overflow: 'hidden',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px',
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                height: 25,
                width: 25,
              }}
            >
              <img src={logo} alt='logo' height={25} width={80} />
            </Box>
            <Div>
              <Typography color='inherit' variant='subtitle1'>
                Offline Hub
              </Typography>
            </Div>
            <SvgIcon fontSize='small' sx={{ color: 'neutral.500' }} as={ExpandLessIcon} />
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component='nav'
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component='ul'
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {routes.map((item) => {
              const active = matchRoute({ to: item.path, pending: false });
              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.key}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 250,
          },
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 250,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
};
