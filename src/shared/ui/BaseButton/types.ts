import { ReactElement } from 'react';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';


export type BaseButtonProps = {
  icon?: ReactElement,
  title: string,
} & MUIButtonProps;

export type ButtonProps = MUIButtonProps & {
  onClick?: () => void,
  isDisabled?: boolean,
  isLoading?: boolean,
  title?: string,
};
