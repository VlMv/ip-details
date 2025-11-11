import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

import { useGetIPDataFromFile, useIPStore } from 'entities/ip';


const ACCEPTED_FILE_TYPES = [
  '.jpeg',
  '.jpg',
  '.png',
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.odt',
  '.ods',
];

export const IPFileUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const { setIPData } = useIPStore();
  const { mutate: uploadFile, isPending } = useGetIPDataFromFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);

    uploadFile(file, {
      onSuccess: (data) => {
        setIPData(data);
      },
      onError: () => {
        // Error is already handled by the toast in useGetIPDataFromFile
        setFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
    });
  };

  return (
    <Button
      variant="contained"
      component="label"
      disabled={isPending}
      startIcon={isPending ? <CircularProgress size={20} /> : null}
    >
      {isPending ? 'Обработка файла...' : fileName || 'Загрузить данные ИП из файла'}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={handleFileChange}
        accept={ACCEPTED_FILE_TYPES.join(', ')}
        disabled={isPending}
      />
    </Button>
  );
};
