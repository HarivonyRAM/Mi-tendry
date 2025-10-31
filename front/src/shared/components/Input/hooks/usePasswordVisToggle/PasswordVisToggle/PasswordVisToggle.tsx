import type { FC, MouseEvent } from "react";
import type { PasswordVisToggleProps } from "./passwordVisToggle.types";
import { InputAdornment, IconButton, Typography } from "@mui/material";
import { VisibilityOffOutlined as VisOff, VisibilityOutlined as Vis } from "@mui/icons-material"
import { StyledButton } from "./passwordVisToggle.styles";

const PasswordVisToggle: FC<PasswordVisToggleProps> = ({ variant, showText, hideText, isShown, onToggle }) => {
    const handleClick = ((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onToggle(e)
    })
    
    if (variant === "iconbutton") return (
        <InputAdornment position="end">
            <IconButton onClick={handleClick}>{isShown ? <VisOff/> : <Vis/> }</IconButton>    
        </InputAdornment>
    )
    if (variant === "textbutton") return (
        <StyledButton onClick={handleClick}><Typography>{isShown ? hideText : showText}</Typography></StyledButton>
    )
}

export default PasswordVisToggle