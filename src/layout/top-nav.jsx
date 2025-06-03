import BellIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { AccountPopover } from './account-popover';
import user from '@/assets/user-profile-icon.jpg';
import usePopover from '@hooks/use-popover';

const SIDE_NAV_WIDTH = 250;
const TOP_NAV_HEIGHT = 64;

export const TopNav = ({ onNavOpen }) => {
  const accountPopover = usePopover();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  return (
    <>
      <Box
        component='header'
        sx={{
          backdropFilter: 'blur(9px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            xl: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            xl: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems='center' direction='row' spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize='small'>
                  <LogoutIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title='Search'>
              <IconButton>
                <SvgIcon fontSize='small'>
                  <SearchIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack alignItems='center' direction='row' spacing={2}>
            <Tooltip title='Notifications'>
              <IconButton>
                <Badge badgeContent={4} color='success' variant='dot'>
                  <SvgIcon fontSize='small'>
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
              src={user}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};
