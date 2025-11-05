import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IP_FORM_LIMITS } from '../const';


export enum IPFormFieldNames {
  NAME = 'name',
  REGISTRATION_ADDRESS = 'registrationAddress',
  ACTUAL_ADDRESS = 'actualAddress',
  EMAIL = 'email',
  PHONE = 'phone',
  INN = 'inn',
  OGRN = 'ogrn',
  BANK_NAME = 'bankName',
  BIK = 'bik',
  CORRESPONDENT_ACCOUNT = 'correspondentAccount',
  CHECKING_ACCOUNT = 'checkingAccount',
  OKVED = 'okved',
  TAX_SYSTEM = 'taxSystem',
  VAT_PAYER = 'vatPayer',
}

const IPSchema = z.object({
  [IPFormFieldNames.NAME]: z
    .string()
    .trim()
    .nonempty('Наименование не может быть пустым')
    .max(IP_FORM_LIMITS.NAME_MAX, `Максимальная длина ${IP_FORM_LIMITS.NAME_MAX} символов`),

  [IPFormFieldNames.REGISTRATION_ADDRESS]: z
    .string()
    .trim()
    .nonempty('Укажите адрес регистрации')
    .max(IP_FORM_LIMITS.ADDRESS_MAX, `Максимальная длина ${IP_FORM_LIMITS.ADDRESS_MAX} символов`),

  [IPFormFieldNames.ACTUAL_ADDRESS]: z
    .string()
    .trim()
    .nonempty('Укажите фактический адрес')
    .max(IP_FORM_LIMITS.ADDRESS_MAX, `Максимальная длина ${IP_FORM_LIMITS.ADDRESS_MAX} символов`),

  [IPFormFieldNames.EMAIL]: z
    .string()
    .trim()
    .email('Некорректный адрес электронной почты')
    .max(IP_FORM_LIMITS.EMAIL_MAX, `Максимальная длина ${IP_FORM_LIMITS.EMAIL_MAX} символов`),

  [IPFormFieldNames.PHONE]: z
    .string()
    .trim()
    .nonempty('Укажите контактный телефон')
    .max(IP_FORM_LIMITS.PHONE_MAX, `Максимальная длина ${IP_FORM_LIMITS.PHONE_MAX} символов`),

  [IPFormFieldNames.INN]: z
    .string()
    .trim()
    .regex(/^\d+$/, 'ИНН должен содержать только цифры')
    .refine(
      (val) => IP_FORM_LIMITS.INN_LENGTHS.includes(val.length),
      `ИНН должен содержать ${IP_FORM_LIMITS.INN_LENGTHS.join(' или ')} цифр`,
    ),

  [IPFormFieldNames.OGRN]: z
    .string()
    .trim()
    .regex(/^\d+$/, 'ОГРНИП/ОГРН должен содержать только цифры')
    .refine(
      (val) =>
        val.length >= IP_FORM_LIMITS.OGRN_MIN
        && val.length <= IP_FORM_LIMITS.OGRN_MAX,
      `ОГРНИП/ОГРН должен содержать от ${IP_FORM_LIMITS.OGRN_MIN} до ${IP_FORM_LIMITS.OGRN_MAX} цифр`,
    ),

  [IPFormFieldNames.BANK_NAME]: z
    .string()
    .trim()
    .nonempty('Укажите наименование банка')
    .max(IP_FORM_LIMITS.BANK_NAME_MAX, `Максимальная длина ${IP_FORM_LIMITS.BANK_NAME_MAX} символов`),

  [IPFormFieldNames.BIK]: z
    .string()
    .trim()
    .regex(/^\d+$/, 'БИК должен содержать только цифры')
    .refine(
      (val) => val.length === IP_FORM_LIMITS.BIK_LENGTH,
      `БИК должен содержать ${IP_FORM_LIMITS.BIK_LENGTH} цифр`,
    ),

  [IPFormFieldNames.CORRESPONDENT_ACCOUNT]: z
    .string()
    .trim()
    .regex(/^\d+$/, 'Корреспондентский счёт должен содержать только цифры')
    .refine(
      (val) => val.length === IP_FORM_LIMITS.ACCOUNT_LENGTH,
      `Корреспондентский счёт должен содержать ${IP_FORM_LIMITS.ACCOUNT_LENGTH} цифр`,
    ),

  [IPFormFieldNames.CHECKING_ACCOUNT]: z
    .string()
    .trim()
    .regex(/^\d+$/, 'Расчётный счёт должен содержать только цифры')
    .refine(
      (val) => val.length === IP_FORM_LIMITS.ACCOUNT_LENGTH,
      `Расчётный счёт должен содержать ${IP_FORM_LIMITS.ACCOUNT_LENGTH} цифр`,
    ),

  [IPFormFieldNames.OKVED]: z
    .string()
    .trim()
    .nonempty('Укажите код(ы) ОКВЭД')
    .max(IP_FORM_LIMITS.OKVED_MAX, `Максимальная длина ${IP_FORM_LIMITS.OKVED_MAX} символов`),

  [IPFormFieldNames.TAX_SYSTEM]: z
    .string()
    .trim()
    .nonempty('Укажите систему налогообложения')
    .max(IP_FORM_LIMITS.TAX_SYSTEM_MAX, `Максимальная длина ${IP_FORM_LIMITS.TAX_SYSTEM_MAX} символов`),

  [IPFormFieldNames.VAT_PAYER]: z.boolean(),
});


export type IPFormType = z.infer<typeof IPSchema>;

export const useIPFormSchema = () => {
  const {
    handleSubmit,
    formState: { isValid, isSubmitting, isDirty, dirtyFields },
    control,
    reset,
    setValue,
  } = useForm<IPFormType>({
    resolver: zodResolver(IPSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  return {
    handleSubmit,
    isValid,
    isSubmitting,
    control,
    reset,
    setValue,
    isDirty,
    dirtyFields,
  };
};
