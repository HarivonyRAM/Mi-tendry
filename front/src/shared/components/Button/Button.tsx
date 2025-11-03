import type { FC } from "react"
import { StyledContainer } from "./button.styles"
import { Button as MuiButton, Alert } from "@mui/material"
import type { ButtonProps } from "./button.types"

/* 
    Required dependencies: @mui/material @emotion/react @emotion/styled
    Stories dependecies: @mui/icons-material
*/
/** MuiButton variants: text, outlined, contained */

const Button: FC<ButtonProps> = ({
    children,
    feedback, /** Feedback object: { severity, message, placement } */
    ...MuiProps
}) => {
    const hasInnerFeedback = feedback?.placement === "inner"
    return (
        <StyledContainer feedbackplacement={feedback?.placement ?? "bottom"} className="button_container">
            <MuiButton {...MuiProps}>
                {(!!feedback && hasInnerFeedback) ? feedback.message :  children}
            </MuiButton>
            {
                feedback && (!hasInnerFeedback) && <Alert severity={feedback.severity}>{feedback.message}</Alert>
            }
        </StyledContainer>
    )
}

export default Button