import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
  const { setIPData, clearIPData } = useIPStore();
  const { mutate: uploadFile, isPending } = useGetIPDataFromFile();

  const handleClearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileName('');
    clearIPData();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    if (isPending) {
      return;
    }

    fileInputRef.current?.click();
  };

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
        setFileName('');
        clearIPData();
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
    });
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={isPending}
        startIcon={isPending ? <CircularProgress size={20} /> : null}
        onClick={handleButtonClick}
      >
        {isPending
          ? (
            'Обработка файла...'
          )
          : fileName
            ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px',
                  }}
                >
                  {fileName}
                </span>
                <IconButton
                  size="small"
                  onClick={handleClearFile}
                  disabled={isPending}
                  sx={{
                    color: 'white',
                  }}
                  component="span"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            )
            : (
              'Загрузить данные ИП из файла'
            )}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={handleFileChange}
        accept={ACCEPTED_FILE_TYPES.join(', ')}
        disabled={isPending}
      />
    </>
  );
};
