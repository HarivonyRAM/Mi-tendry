import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton, Stack, Typography } from '@mui/material';
import { FolderOutlined, CameraAltOutlined } from '@mui/icons-material';
import { StyledContainer } from "./uploadForm.styles"
import type { UploadFormComponent } from './uploadForm.types';

const UploadForm: UploadFormComponent = ({ onChange }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const onDrop = useCallback((files: File[]) => onChange(files[0]), [])
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    })

    const handleFileButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleCameraButtonClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.setAttribute('capture', 'environment')
          fileInputRef.current.click()
        }
    }

    return (
        <StyledContainer
            className="dropzone"
            {...getRootProps()}
            dragactive={isDragActive.toString()}
        >      
            <input
                {...getInputProps()}
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
            />
            <Typography variant="h4">
                {
                    isDragActive
                        ? 'Déposez l\'image'
                        : 'Déposez une image ici ou prenez une photo'
                }
            </Typography>
            <Stack className='options_container'>
                <IconButton onClick={handleFileButtonClick}><FolderOutlined/></IconButton>
                <IconButton onClick={handleCameraButtonClick}><CameraAltOutlined/></IconButton>
            </Stack>
        </StyledContainer>
    )
}

export default UploadForm