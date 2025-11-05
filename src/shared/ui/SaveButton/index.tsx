import SaveIcon from '@mui/icons-material/Save';

import { BaseButton, ButtonColor } from '../BaseButton';
import { ButtonProps } from '../BaseButton/types';


export const SaveButton = ({ onClick, isDisabled, isLoading, ...props }: ButtonProps) => {
  return (
    <BaseButton
      title="Сохранить изменения"
      color={ButtonColor.PRIMARY}
      icon={<SaveIcon />}
      onClick={onClick}
      disabled={isDisabled}
      loading={isLoading}
      {...props}
    />
  );
};
