import App from './App';
import { StrictMode } from 'react';
import { createTheme } from './theme';
import { routeTree } from './routeTree.gen';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashHistory, createRouter } from '@tanstack/react-router';

const theme = createTheme();
const queryClient = new QueryClient();
const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    authentication: { isLogged: false },
  },
  defaultPreload: 'intent',
  history: hashHistory,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
