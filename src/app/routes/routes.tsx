import { Route, Routes } from 'react-router';
import Box from '@mui/material/Box';

import { PATH } from 'shared/paths';


export const RoutesManager = () => {
  return (
    <Routes>
      <Route index path={PATH.root} element={<Box>Не найдено</Box>} />
      <Route path="*" element={<Box>Не найдено</Box>} />
    </Routes>
  );
};
