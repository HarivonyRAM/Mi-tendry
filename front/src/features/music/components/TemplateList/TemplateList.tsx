import { Box, Divider, IconButton, Stack, Typography, } from "@mui/material"
import { useAppSelector } from "../../../../app/store/hooks"
import { StyledItem } from "./templateList.styles"
import { PlayArrow } from '@mui/icons-material'
import Select from "../../../../shared/components/Select/Select"
import musicTypes from "../../../../shared/constants/musicTypes"
import { useEffect, useState } from "react"
import useMusic from "../../hooks/useMusic"

const TemplateList = () => {
    const defaultType = musicTypes[0]
    const list = useAppSelector(state => state.music)
    const { play: playMusic } = useMusic()
    const [ types, setTypes ] = useState<(string | null)[]>([])
    
    useEffect(() => {
        let values: string[] = []
        list.forEach(() => values.push(defaultType))
        setTypes(values)
    }, [list])

    const updateType = (index: number, value: string) => {
        let values = [...types]
        values[index] = value
        setTypes(values)
    }

    const play = async (id: string, index: number) => {
        await playMusic(id, types[index] ?? "")
    }
    
    return list.map((template, index) => (
        <StyledItem key={index}>
            <Stack className="main">
                <Box component="img" src={template.image}/>
                <Typography>{ template.name }</Typography>
                <Select
                    options={musicTypes.map(t => ({ label: t, value: t }))}
                    defaultValue={defaultType}
                    onChange={e => updateType(index, e.target.value as string)}
                />
                <IconButton onClick={() => play(template.id!, index)}><PlayArrow/></IconButton>
            </Stack>
            <Divider orientation="horizontal"/>
        </StyledItem>
    ))
}

export default TemplateList