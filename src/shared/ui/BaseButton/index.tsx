import Button from '@mui/material/Button';

import { BaseButtonProps } from './types';


export const enum ButtonColor {
  PRIMARY = 'primary',
  COMMON = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}

export const BaseButton = (props: BaseButtonProps) => {
  const {
    color = ButtonColor.COMMON,
    icon,
    title,
    ...restProps
  } = props;
  return (
    <Button
      variant="contained"
      startIcon={icon ?? null}
      color={color}
      {...restProps}
    >
      {title}
    </Button>
  );
};
