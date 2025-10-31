import type { InputCompoonent } from "./input.types";
import { StyledContainer } from "./input.styles";
import { Typography, TextField, Alert, Stack } from "@mui/material";
import usePasswordVisToggle from "./hooks/usePasswordVisToggle/usePasswordVisToggle";
import useHookForm from "./hooks/useHookForm/useHookForm";

/* 
    Required dependencies: @mui/material @emotion/react @emotion/styled react-hook-form
    Required parents: React-hook-form form provider (if controlled)
*/
 
const Input: InputCompoonent = ({
    type="text",
    name, /** If name is provided, the input is assumed to be controlled via react-hook-form */
    required = false,
    label, /** Label inside the input */
    externalLabel, /** Label outside the input, which placement can be customized with externalLabelPlacement prop */
    externalLabelPlacement="top",
    placeholder,
    onChange: externalOnChange=() => {},
    texts={
        "error": {
            "requiredField": "Required field",
            "invalidMail": "Invalid mail",
        },
        "password": {
            "hide": "Hide password",
            "show": "Show password"
        }
    },
    passwordVisibilityToggleVariant: pVTVariant="iconbutton", /** Type of password visibility handler: iconbutton or textbutton */
    ...MuiProps 
}) => {
    const hasInnerLabel = !!label
    const hasOuterLabel = !!externalLabel
    const hasPlaceholder = !!placeholder
    const requiredSign = required ? " *" : ""

    const isPasswordInput = type === "password"
    const { isShown, PasswordVisToggle } = usePasswordVisToggle({ isPasswordInput, variant: pVTVariant, texts: texts.password })
    
    const { error, onChange } = useHookForm({ name, required, externalOnChange, isEmail: type === "email", errorTexts: texts["error"] })

    return (
        <StyledContainer labelplacement={externalLabelPlacement}>
            <Stack className="field-container">
                { hasOuterLabel && <Typography>{externalLabel} {requiredSign}</Typography>}
                <TextField
                    error={!!error}
                    type={ isShown ? "text" : type }
                    autoComplete="off"
                    label={ hasInnerLabel ? (label + requiredSign) : ""}
                    placeholder={ hasPlaceholder ? (placeholder + requiredSign) : ""}
                    onChange={onChange}
                    {...MuiProps}
                    slotProps={{
                        ...MuiProps.slotProps,
                        input: {
                            ...MuiProps.slotProps?.input,
                            endAdornment: isPasswordInput && <PasswordVisToggle expectedVariant="iconbutton"/>
                        }
                    }}
                />
            </Stack>
            {typeof error?.message === "string" && (
                <Alert severity="error">{error.message}</Alert>
            )}
            <PasswordVisToggle expectedVariant="textbutton"/>
        </StyledContainer>
    )
    
}

export default Input