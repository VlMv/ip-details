import Box from '@mui/material/Box';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

import { ResizableTextInput } from 'shared/ui/ResizableTextInput';
import { NDSSwitch } from 'features/ip';
import { CancelButton } from 'shared/ui/CancelButton';
import { SaveButton } from 'shared/ui/SaveButton';
import { IPData } from 'entities/ip';

import { IPFormType, useIPFormSchema, IPFormFieldNames } from './hooks/useIPFormSchema';
import { IP_FORM_LIMITS } from './const';


type IPFormProps = {
  ipData?: Partial<IPData>,
  onFormSubmit: (data: IPData) => Promise<void>,
};

export const IPForm = ({
  ipData,
  onFormSubmit,
}: IPFormProps) => {
  const {
    handleSubmit,
    isValid,
    isSubmitting,
    control,
    reset,
    isDirty,
  } = useIPFormSchema();

  const ipDefaultValues = useMemo(() => {
    if (ipData) {
      return { ...ipData };
    }

    return {
      [IPFormFieldNames.NAME]: '',
      [IPFormFieldNames.REGISTRATION_ADDRESS]: '',
      [IPFormFieldNames.ACTUAL_ADDRESS]: '',
      [IPFormFieldNames.EMAIL]: '',
      [IPFormFieldNames.PHONE]: '',
      [IPFormFieldNames.INN]: '',
      [IPFormFieldNames.OGRN]: '',
      [IPFormFieldNames.BANK_NAME]: '',
      [IPFormFieldNames.BIK]: '',
      [IPFormFieldNames.CORRESPONDENT_ACCOUNT]: '',
      [IPFormFieldNames.CHECKING_ACCOUNT]: '',
      [IPFormFieldNames.OKVED]: '',
      [IPFormFieldNames.TAX_SYSTEM]: '',
      [IPFormFieldNames.VAT_PAYER]: false,
    };
  }, [ipData]);

  useEffect(() => {
    reset(
      ipDefaultValues,
      {
        keepValues: false,
        keepDefaultValues: false,
        keepDirty: false,
      },
    );
    return () => reset();
  }, [ipDefaultValues, reset]);

  const onSubmit: SubmitHandler<IPFormType> = async (formData) => {
    await onFormSubmit(formData);
  };

  const cancelCallback = () => reset(ipDefaultValues);
  const isDisabled = isSubmitting || !isValid || !isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Controller
          control={control}
          name={IPFormFieldNames.NAME}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Наименование"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.REGISTRATION_ADDRESS}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Адрес регистрации"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.ACTUAL_ADDRESS}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Фактический адрес"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.EMAIL}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="E-mail"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.PHONE}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={(val) => {
                if (val.length <= IP_FORM_LIMITS.PHONE_MAX) { onChange(val); }
              }}
              onBlur={onBlur}
              value={value}
              label="Телефон"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.INN}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              type="number"
              onChange={(val) => {
                if (val.length <= Math.max(...IP_FORM_LIMITS.INN_LENGTHS)) { onChange(val); }
              }}
              onBlur={onBlur}
              value={value}
              label="ИНН"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.OGRN}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              type="number"
              onChange={(val) => {
                if (val.length <= IP_FORM_LIMITS.OGRN_MAX) { onChange(val); }
              }}
              onBlur={onBlur}
              value={value}
              label="ОГРНИП / ОГРН"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.BANK_NAME}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Наименование банка"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.BIK}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              type="number"
              onChange={(val) => {
                if (val.length <= IP_FORM_LIMITS.BIK_LENGTH) { onChange(val); }
              }}
              onBlur={onBlur}
              value={value}
              label="БИК"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.CORRESPONDENT_ACCOUNT}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              type="number"
              onChange={(val) => {
                if (val.length <= IP_FORM_LIMITS.ACCOUNT_LENGTH) { onChange(val); }
              }}
              onBlur={onBlur}
              value={value}
              label="Корреспондентский счёт"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.CHECKING_ACCOUNT}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              type="number"
              onChange={(val) => {
                if (val.length <= IP_FORM_LIMITS.ACCOUNT_LENGTH) { onChange(val); }
              }}
              onBlur={onBlur}
              value={value}
              label="Расчётный счёт"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.OKVED}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Код(ы) ОКВЭД"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.TAX_SYSTEM}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <ResizableTextInput
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              label="Система налогообложения"
              isInvalid={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              isDisabled={isSubmitting}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name={IPFormFieldNames.VAT_PAYER}
          render={({ field: { onChange, value } }) => (
            <NDSSwitch
              onChange={onChange}
              isChecked={value}
              isDisabled={isSubmitting}
            />
          )}
        />

        <Box sx={{ justifyContent: 'space-between', gap: 2, display: 'flex' }}>
          <CancelButton onClick={cancelCallback} />
          <SaveButton
            isDisabled={isDisabled}
            isLoading={isSubmitting}
            type="submit"
          />
        </Box>
      </Box>
    </form>
  );
};
