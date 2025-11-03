import type { AuthComponent } from "./auth.types"
import { StyledContainer } from "./auth.styles"
import { useState } from "react"
import LoginForm from "../../features/auth/components/LoginForm/LoginForm"
import RegisterForm from "../../features/auth/components/RegisterForm/RegisterForm"
import Button from "../../shared/components/Button/Button"
import { Box, Stack, Typography } from "@mui/material"

const Auth: AuthComponent = () => {
    const [ isLogin, setIsLogin ] = useState(true)

    return (
        <StyledContainer>
            <Stack className="forms_container">
                <Stack className="logo_container">
                    <Box component="img" src="/logo.png"/>
                    <Typography variant="h4">Mi-tendry</Typography>
                </Stack>
                { isLogin ? <LoginForm/> : <RegisterForm/>}
                <Button onClick={() => setIsLogin(v => !v)}>
                    {isLogin ? "Créer un compte" : "Se connecter"}
                </Button>
            </Stack>
        </StyledContainer>
    )
}

export default Auth