import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Close, PlayArrow } from '@mui/icons-material'
import { StyledContainer } from "./preview.styles"
import type { PreviewComponent } from './preview.types';
import Select from '../../../../shared/components/Select/Select';
import musicTypes from '../../../../shared/constants/musicTypes';

const Preview: PreviewComponent = ({ file, onClose, onLaunch , onTypeChange}) => {

    return (
        <StyledContainer>
            <Stack className='head'>
                <Typography>Prévisualisation</Typography>
                <IconButton onClick={onClose}><Close/></IconButton>
            </Stack>
            <Stack className='body'>
                <Box component="img" src={URL.createObjectURL(file!)}/>
                <Select
                    options={musicTypes.map(t => ({ label: t, value: t }))}
                    defaultValue={musicTypes[0]}
                    onChange={e => onTypeChange(e.target.value as string)}
                />
                <IconButton onClick={onLaunch}><PlayArrow/></IconButton>
            </Stack>
        </StyledContainer>
    )
}

export default Preview
