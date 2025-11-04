import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Close, PlayArrow } from '@mui/icons-material'
import { StyledContainer } from "./preview.styles"
import type { PreviewComponent } from './preview.types';
import Select from '../../../../shared/components/Select/Select';
import { useState } from 'react';

const Preview: PreviewComponent = ({ file, onClose }) => {
    const options = [
        { value: "Gospel", label: "Gospel" }
    ]
    const defaultType = options[0].value
    const [ type, setType ] = useState<string | null>(defaultType)

    const play = () => {

    }

    return (
        <StyledContainer>
            <Stack className='head'>
                <Typography>Prévisualisation</Typography>
                <IconButton onClick={onClose}><Close/></IconButton>
            </Stack>
            <Stack className='body'>
                <Box component="img" src={URL.createObjectURL(file!)}/>
                <Select
                    options={options}
                    defaultValue={defaultType}
                    onChange={e => setType(e.target.value as string)}
                />
                <IconButton onClick={play}><PlayArrow/></IconButton>
            </Stack>
        </StyledContainer>
    )
}

export default Preview
