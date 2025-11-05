import Box from '@mui/material/Box';
import { ReactElement } from 'react';


export const MainLayout = ({ content }: { content: ReactElement }) => {
  return (
    <Box sx={{
      paddingInline: 1,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <Box sx={{ flexGrow: 5 }}>
        {content}
      </Box>
    </Box>
  );
};
