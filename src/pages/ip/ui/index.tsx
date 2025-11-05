import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IPForm } from 'widgets/ip';


export const IpPage = () => {

  return (
    <Box>
      <Typography component="h1" variant="h4">Данные ИП</Typography>
      <IPForm
        isEditMode={false}
        onFormSubmit={async (data) => console.log(data)}
      />
    </Box>
  );
};
