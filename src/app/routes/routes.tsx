import { Route, Routes } from 'react-router';
import Box from '@mui/material/Box';

import { PATH } from 'shared/paths';
import { IpPage } from 'pages/ip';


export const RoutesManager = () => {
  return (
    <Routes>
      <Route index path={PATH.root} element={<IpPage />} />
      <Route path="*" element={<Box>Не найдено</Box>} />
    </Routes>
  );
};
