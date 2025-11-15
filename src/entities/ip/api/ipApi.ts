import { IPData } from '../type';
import { apiClient } from '../../../shared/ApiClient/ApiClient';


export const fetchIPData = async (file: File): Promise<IPData> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<IPData>(
    '/fetchIPData',
    formData,
    {},
    { isFile: true },
  );
  return response.data.data;
};
