import { Box, ButtonBase, SvgIcon } from '@mui/material';
import { Link } from '@tanstack/react-router';

export const SideNavItem = ({ active = false, disabled, icon, path, title, external }) => {
  const getTypeLink = (path, external) => {
    if (external) {
      return {
        component: 'a',
        href: path,
        target: '_blank',
      };
    } else {
      return {
        component: Link,
        to: path,
      };
    }
  };
  const linkProps = getTypeLink(path, external) || {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component='span'
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main',
              }),
            }}
          >
            <SvgIcon fontSize='small' component={icon} />
          </Box>
        )}
        <Box
          component='span'
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white',
            }),
            ...(disabled && {
              color: 'neutral.500',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
