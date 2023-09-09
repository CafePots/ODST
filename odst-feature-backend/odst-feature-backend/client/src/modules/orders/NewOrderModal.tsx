/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useDropzone } from 'react-dropzone';

import { Order, OrderStatus } from '../common/types';


interface Props {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (file: File) => void;
}

const modalBoxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#666666',
  border: '2px solid #666666',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const uploadButtonStyle = {
  borderRadius: '10px',
  background: '#343434',
  color: 'white',
  fontSize: '20px',
  marginTop: '24px',
  minWidth: '100px',
  padding: '0px 25px',
};

const modalContentStyle = {
  border: '5px solid #D9D9D9',
  background: '#D9D9D9',
  borderRadius: '10px',
  width: '400px',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '28px',
  color: 'rgb(0, 0, 0, 0.15)',
};

const modalTitleStyle = {
  justifyContent: 'center',
  display: 'flex',
  fontSize: '48px',
  fontFamily: 'Kameron',
  color: 'white',
};

export default function NewOrderModal({ open, onClose, onSubmit }: Props) {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState('');

  const onDrop = React.useCallback((files: any) => {
    if (files.length !== 1) {
      setError('You can only upload exactly 1 file.');
    } else {
      setError('');
      setFile(files[0]);
    }
  }, [setFile]);
  const {
    acceptedFiles, getRootProps, getInputProps, isDragActive,
  } = useDropzone({ onDrop });

  const onUpload = React.useCallback(async () => {
    if (file === null) {
      return;
    }

    onSubmit(file);
    onClose();
  }, [onSubmit, onClose, file]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <Typography
          sx={modalTitleStyle}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          + New Order
        </Typography>
        <Box sx={modalContentStyle} {...getRootProps()}>
          <>
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? acceptedFiles.map((dzFile: any) => (
              <li
                style={{ color: 'black' }}
                key={dzFile.path}
              >
                {dzFile.path}
              </li>
            )) : (
              <>
                Click to Browse
                <br />
                OR
                <br />
                Drag and Drop
              </>
            )}
          </>
        </Box>
        {error && (
          <p>{error}</p>
        )}
        <Button disabled={error !== '' || !file} sx={uploadButtonStyle} onClick={onUpload}>
          Upload
        </Button>
      </Box>
    </Modal>
  );
}
