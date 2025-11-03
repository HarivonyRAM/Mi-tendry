import { Box, Stack, Typography } from "@mui/material"
import Button from "../../shared/components/Button/Button"
import { StyledContainer } from "./header.styles"
import useAuth from "../../features/auth/hooks/useAuth"

const Header = () => {
    const { logout } = useAuth()
    return(
        <StyledContainer>
            <Button
                variant="outlined"
            >
                Choisir un template
            </Button>
            <Stack className="logo">
                <Box component="img" src="/logo.png"/>
                <Typography variant="h4" fontWeight="bold">Mi-tendry</Typography>
            </Stack>
            <Button onClick={logout}>
                Déconnexion
            </Button>
        </StyledContainer>
    )
}

export default Header