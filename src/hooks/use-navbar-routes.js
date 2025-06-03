import { useAuth } from './use-auth';
import { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const ROUTES_PAYLOAD = [
  {
    key: crypto.randomUUID(),
    title: 'Home',
    path: '/dashboard/first',
    roles: [-1], // indicates that the route is public
    icon: HomeIcon,
    disabled: false,
    external: false,
  },
  {
    key: crypto.randomUUID(),
    title: 'Usuarios',
    path: '/dashboard/management-users',
    roles: [1],
    icon: GroupAddIcon,
    disabled: false,
    external: false,
  },
];
export const ROUTES_ACCESS = new Map(ROUTES_PAYLOAD.map((item) => [item.path, item.roles]));

export const useNavbarRoutes = () => {
  const currentUser = useAuth((state) => state.currentUser);
  const isLogged = useAuth((state) => state.isLogged);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes(ROUTES_PAYLOAD.filter((route) => route.roles.includes(-1)));

    if (isLogged) {
      setRoutes((prev) => [
        ...prev,
        ...ROUTES_PAYLOAD.filter((route) => route.roles.includes(currentUser.user_idrole)),
      ]);
    }
  }, [currentUser, isLogged]);

  return routes;
};
