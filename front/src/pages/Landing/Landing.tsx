import { Typography } from "@mui/material"
import Header from "../../layouts/Header/Header"
import { StyledContainer } from "./landing.styles"
import Dropzone from "../../features/dropzone/Dropzone"

const Landing = () => {
    return (
        <StyledContainer>
            <Header/>
            <Dropzone/>
            <Typography textAlign="center">Propulsé par Mi-tendry ―― OMR Recognition</Typography>
        </StyledContainer>
    )
}

export default Landing