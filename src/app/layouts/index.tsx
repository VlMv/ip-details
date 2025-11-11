import Box from '@mui/material/Box';
import { ReactElement } from 'react';


export const MainLayout = ({ content }: { content: ReactElement }) => {
  return (
    <Box sx={{
      padding: 10,
    }}
    >
      {content}
    </Box>
  );
};
