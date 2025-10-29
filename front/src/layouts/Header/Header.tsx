import { Box, Stack, Typography } from "@mui/material"
import Button from "../../shared/components/Button/Button"
import { StyledContainer } from "./header.styles"

const Header = () => {
    return(
        <StyledContainer>
            <Button
                variant="outlined"
            >
                Choisir un template
            </Button>
            <Stack className="logo">
                <Box component="img" src="/logo.jpeg"/>
                <Typography variant="h4" fontWeight="bold">Mi-tendry</Typography>
            </Stack>
            <Button>
                Déconnexion
            </Button>
        </StyledContainer>
    )
}

export default Header