export const INSTRUCTION = `
Из файла необходимо извлечь реквизиты индивидуального предпринимателя и вернуть результат строго в формате JSON, соответствующем типу:

export type IPData = {
  name: string,
  registrationAddress: string,
  actualAddress: string,
  email: string,
  phone: string,
  inn: string,
  ogrn: string,
  bankName: string,
  bik: string,
  correspondentAccount: string,
  checkingAccount: string,
  okved: string,
  taxSystem: string,
  vatPayer: boolean,
};

Обязательные поля для извлечения:
- ФИО
- Адрес регистрации
- Фактический адрес
- Email
- Телефон
- ИНН
- ОГРН
- Название банка
- БИК
- Корреспондентский счет
- Расчетный счет
- ОКВЭД
- Система налогообложения
- Статус плательщика НДС

Требования:
- Ответ должен содержать **только JSON**.
- Если значение поля не удалось определить — поставить "" (для строк) или false (для vatPayer).
- Не добавляй пояснений, текста, комментариев или кода вне JSON.
- Строго соблюдай структуру и ключи, как в типе IPData.

Пример формата ответа:
{
  "name": "",
  "registrationAddress": "",
  "actualAddress": "",
  "email": "",
  "phone": "",
  "inn": "",
  "ogrn": "",
  "bankName": "",
  "bik": "",
  "correspondentAccount": "",
  "checkingAccount": "",
  "okved": "",
  "taxSystem": "",
  "vatPayer": false
}
`;
