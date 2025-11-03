import { FormProvider, useForm } from "react-hook-form"
import type { LoginFormComponent, LoginFormData } from "./loginForm.types"
import Input from "../../../../shared/components/Input/Input"
import { Typography } from "@mui/material"
import Button from "../../../../shared/components/Button/Button"
import { StyledContainer } from "./loginForm.styles"
import useAuth from "../../hooks/useAuth"

const LoginForm: LoginFormComponent = () => {
    const methods = useForm<LoginFormData>()
    const { login, error, isLoading } = useAuth()

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data)
            window.location.reload()
        } catch (e) {
            console.error("Login failed:", e)
        }
    }

    return (
        <StyledContainer>
            <FormProvider {...methods}>
                <Typography variant="h5">Se connecter</Typography>
                <Input
                    variant="filled"
                    label="Email"
                    name="email"
                    type="email"
                    required
                />
                <Input
                    variant="filled"
                    label="Mot de passe"
                    name="password"
                    type="password"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={methods.handleSubmit(onSubmit)}
                    loading={isLoading}
                    feedback={error ? { severity: "error", message: "Erreur lors de la connexion" } : undefined}
                >
                    Se connecter
                </Button>
            </FormProvider>
        </StyledContainer>
    )
}

export default LoginForm