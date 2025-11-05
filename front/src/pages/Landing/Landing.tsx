import { Stack, Typography } from "@mui/material"
import Header from "../../layouts/Header/Header"
import { StyledContainer } from "./landing.styles"
import Preview from "../../features/music/components/Preview/Preview"
import { useState } from "react"
import UploadForm from "../../features/music/components/UploadForm/UploadForm"
import Result from "../../features/music/components/Result/Result"
import musicTypes from "../../shared/constants/musicTypes"

const Landing = () => {
    const [ step, setStep ] = useState(1)
    const [ file, setFile ] = useState<File | null>(null)
    const [ type, setType ] = useState<string | null>(musicTypes[0])

    const addFile = (file: File) => {
        setFile(file)
        setStep(2)
    }

    return (
        <StyledContainer>
            <Header/>
            <Stack className="upload__container">
                { (step === 1) && <UploadForm onChange={addFile} /> }
                { (step === 2) && <Preview file={file} onClose={() => setStep(1)} onLaunch={() => setStep(3)} onTypeChange={setType}/> }
                { (step === 3) && <Result file={file} type={type} onClose={() => setStep(1)}/> }
            </Stack>
            <Typography textAlign="center">Propulsé par Mi-tendry ―― OMR Recognition</Typography>
        </StyledContainer>
    )
}

export default Landing