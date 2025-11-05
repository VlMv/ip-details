import ClearIcon from '@mui/icons-material/Clear';

import { BaseButton } from '../BaseButton';
import { ButtonProps } from '../BaseButton/types';


export const CancelButton = ({ title, onClick, isDisabled }: ButtonProps) => {
  return (
    <BaseButton
      title={title ?? 'Отмена'}
      icon={<ClearIcon />}
      onClick={onClick}
      disabled={isDisabled}
    />
  );
};
