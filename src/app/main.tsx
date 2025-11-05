import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from './App';
import '@pigment-css/react/styles.css';
import '../global.css';


const client = new QueryClient();
const theme = createTheme({ cssVariables: true });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
