import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IPFileUploader } from 'features/ip';
import { IPForm } from 'widgets/ip';
import { IPData, useIPStore } from 'entities/ip';


export const IpPage = () => {
  const { ipData } = useIPStore();

  const handleFormSubmit = async (data: IPData) => {
    console.log('Form submitted:', data);
  };

  return (
    <Box sx={{ margin: '0 auto', maxWidth: '50%' }}>
      <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="h1" variant="h4">Данные ИП</Typography>
        <IPFileUploader />
      </Box>
      <IPForm
        ipData={ipData || undefined}
        onFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};
