import { FormProvider, useForm } from "react-hook-form"
import Input from "../../../../shared/components/Input/Input"
import { Typography } from "@mui/material"
import Button from "../../../../shared/components/Button/Button"
import { StyledContainer } from "./registerForm.styles"
import useAuth from "../../hooks/useAuth"
import type { RegisterFormComponent, RegisterFormData } from "./registerForm.types"

const RegisterForm: RegisterFormComponent = () => {
    const methods = useForm<RegisterFormData>()
    const { register, registerError, isLoadingRegister } = useAuth()

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await register(data)
            window.location.reload()
        } catch (e) {
            console.error("Register failed:", e)
        }
    }

    return (
        <StyledContainer>
            <FormProvider {...methods}>
                <Typography variant="h5">S'inscrire</Typography>
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
                <Input
                    variant="filled"
                    label="Confirmer mot de passe"
                    name="confirmPassword"
                    type="password"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={methods.handleSubmit(onSubmit)}
                    loading={isLoadingRegister}
                    feedback={registerError ? { severity: "error", message: "Erreur lors de l'inscription" } : undefined}
                >
                    S'inscrire
                </Button>
            </FormProvider>
        </StyledContainer>
    )
}

export default RegisterForm