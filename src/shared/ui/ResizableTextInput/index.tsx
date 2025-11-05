import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';

import { styles } from './styles';


export type TextInputProps = {
  onChange: (value: string) => void,
  value?: string,
  isDisabled?: boolean,
  isInvalid?: boolean,
  isResizable?: boolean,
  rowsSize?: number,
  placeholder?: string,
  label?: string,
  helperText?: string,
  isRequired?: boolean,
} & Omit<TextFieldProps, 'onChange' | 'value' | 'error' | 'disabled' | 'multiline' | 'rows' | 'label' | 'helperText'>; ;

export const ResizableTextInput = ({
  onChange,
  value = '',
  isDisabled = false,
  isInvalid = false,
  isResizable = false,
  rowsSize = 1,
  placeholder = '',
  label,
  helperText,
  isRequired = false,
  ...props
}: TextInputProps) => {
  return (
    <div>
      {label && <FormLabel required={isRequired} error={isInvalid}>{label}</FormLabel>}
      <TextField
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        error={isInvalid}
        fullWidth={true}
        multiline={isResizable}
        helperText={helperText}
        rows={rowsSize}
        slotProps={
          {
            htmlInput: {
              className: styles.textarea,
              ...props.slotProps?.htmlInput,
            },
          }
        }
        size="small"
        className={styles.root}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
        {...props}
      />
    </div>
  );
};
