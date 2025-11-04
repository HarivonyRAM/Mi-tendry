import { Stack, Typography } from "@mui/material"
import Header from "../../layouts/Header/Header"
import { StyledContainer } from "./landing.styles"
import Preview from "../../features/music/components/Preview/Preview"
import { useState } from "react"
import UploadForm from "../../features/music/components/UploadForm/UploadForm"

const Landing = () => {
    const [ file, setFile ] = useState<File | null>(null)

    return (
        <StyledContainer>
            <Header/>
            <Stack className="upload__container">
                {
                    (!!file)
                    ? <Preview file={file} onClose={() => setFile(null)}/>
                    : <UploadForm onChange={setFile} />
                }
            </Stack>
            <Typography textAlign="center">Propulsé par Mi-tendry ―― OMR Recognition</Typography>
        </StyledContainer>
    )
}

export default Landing