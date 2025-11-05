import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pigment } from '@pigment-css/vite-plugin';
import { createTheme } from '@mui/material/styles';


const pigmentConfig = {
  transformLibraries: ['@mui/material'],
  theme: createTheme({ cssVariables: true }),
};

export default defineConfig({
  plugins: [
    react(),
    pigment(pigmentConfig),
  ],
  resolve: {
    alias: {
      app: '/src/app',
      entities: '/src/entities',
      features: '/src/features',
      pages: '/src/pages',
      shared: '/src/shared',
      widgets: '/src/widgets',
    },
  },
  publicDir: './public',
});
