import type { AuthComponent } from "./auth.types"
import { StyledContainer } from "./auth.styles"
import { useState } from "react"
import LoginForm from "../../features/auth/components/LoginForm/LoginForm"
import RegisterForm from "../../features/auth/components/RegisterForm/RegisterForm"
import Button from "../../shared/components/Button/Button"

const Auth: AuthComponent = () => {
    const [ isLogin, setIsLogin ] = useState(true)

    return (
        <StyledContainer>
            { isLogin ? <LoginForm/> : <RegisterForm/>}
            <Button onClick={() => setIsLogin(v => !v)}>
                {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
            </Button>
        </StyledContainer>
    )
}

export default Auth