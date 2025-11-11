import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { fetchIPData } from '../ipApi';
import { IPData } from '../../type';


export const useGetIPDataFromFile = () => {
  return useMutation<IPData, Error, File>({
    mutationFn: fetchIPData,
    onSuccess: () => {
      toast.success('Данные ИП успешно загружены');
    },
    onError: (error: Error) => {
      toast.error(`Ошибка при загрузке данных ИП: ${error.message}`);
    },
  });
};
