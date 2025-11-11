import { IPData } from '../type';

// Mock data for development
const MOCK_IP_DATA: IPData = {
  name: 'ИП Иванов Иван Иванович',
  registrationAddress: 'г. Москва, ул. Примерная, д. 1, кв. 1',
  actualAddress: 'г. Москва, ул. Примерная, д. 1, кв. 1',
  email: 'example@mail.ru',
  phone: '+7 (999) 123-45-67',
  inn: '123456789012',
  ogrn: '1234567890123',
  bankName: 'ПАО Сбербанк',
  bik: '044525225',
  correspondentAccount: '30101810400000000225',
  checkingAccount: '40802810200000012345',
  okved: '62.01',
  taxSystem: 'УСН (доходы-расходы 15%)',
  vatPayer: false,
};

export const fetchIPData = async (file: File): Promise<IPData> => {
  // The file parameter is not used in the mock implementation
  // but is kept for API consistency with the real implementation
  void file; // Mark as used to avoid lint warning
  // In a real application, you would make an API call here
  // For example:
  // const formData = new FormData();
  // formData.append('file', file);
  // const response = await fetch('/api/ip-data', {
  //   method: 'POST',
  //   body: formData,
  // });
  // return response.json();

  // Mock implementation
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(MOCK_IP_DATA);
    }, 1000);
  });
};
