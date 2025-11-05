import { Box, Stack, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material'
import { StyledContainer } from "./result.styles";
import type { ResultComponent } from "./result.types";
import { useEffect, useState } from "react";
import useMusic from "../../hooks/useMusic";
import { BarChart } from '@mui/x-charts/BarChart';

const Result: ResultComponent = ({ file, type, onClose }) => {
    const [ dataset, setDataset ] = useState<any[]>([])
    const { playNew } = useMusic()
    useEffect(() => {
        const init = async () => {
            const list = await playNew(file!, type!)
            setDataset(list)
        }
        init()
    }, [])
    return (
        <StyledContainer>
            <Stack className="wrapper">
                <Stack className="actions">
                    <IconButton onClick={onClose}><Close/></IconButton>
                </Stack>
                <Stack className="result">
                    <Box component="img" src={URL.createObjectURL(file!)}/>
                    <BarChart
                        height={450}
                        width={800}
                        dataset={dataset}
                        layout="horizontal" 
                        series={[
                            {
                                id: "probability",
                                dataKey: "probability",
                            }
                        ]}
                        yAxis={[
                            {
                            scaleType: 'band',
                            dataKey: 'class',
                            width: 140,
                            },
                        ]}
                    />
                </Stack>
            </Stack>
        </StyledContainer>
    )
}

export default Result