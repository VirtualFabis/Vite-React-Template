/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/material/styles';
import { useCallback, useLayoutEffect, useState } from 'react';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import nProgress from 'nprogress';
import { Outlet, useLocation, useRouterState } from '@tanstack/react-router';
import { capitalizeFirstLetter } from '@utils/case-converters';

const SIDE_NAV_WIDTH = 250;
const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('xl')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

const Layout = () => {
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const status = useRouterState({ select: (s) => s.status });

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useLayoutEffect(() => {
    handlePathnameChange();
    document.title = capitalizeFirstLetter(location.pathname.split('/')[2]);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const handleRouteChange = () => {
      if (status === 'pending') nProgress.start();
      else if (status === 'idle') nProgress.done();
    };
    handleRouteChange();
  }, [status]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};

export default Layout;
