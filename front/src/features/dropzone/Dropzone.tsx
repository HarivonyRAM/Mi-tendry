import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton, Stack, Typography } from '@mui/material';
import { FolderOutlined, CameraAltOutlined } from '@mui/icons-material';
import { StyledContainer } from "./dropzone.styles"

const Dropzone = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const onDrop = useCallback((acceptedFiles: File[]) => {
      console.log('Fichiers importés:', acceptedFiles)
    }, [])
  
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
        <StyledContainer dragactive={isDragActive.toString()}>
            <Stack
                {...getRootProps()}
                className="dropzone"
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
            </Stack>
        </StyledContainer>
    )
}

export default Dropzone
