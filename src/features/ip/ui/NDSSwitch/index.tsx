import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

import { styles } from './styles';


type Props = {
  isDisabled?: boolean,
  isChecked: boolean,
  onChange: (isChecked: boolean) => void,
};

export const NDSSwitch = ({
  isDisabled = false,
  isChecked,
  onChange,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Box>
      <FormLabel>Уплата НДС</FormLabel>
      <Box>
        <Switch
          checked={isChecked}
          onChange={handleChange}
          disabled={isDisabled}
        />
      </Box>
      <FormHelperText className={styles.additionalLabel}>
        Отметьте, если организация является плательщиком НДС
      </FormHelperText>
    </Box>
  );
};
