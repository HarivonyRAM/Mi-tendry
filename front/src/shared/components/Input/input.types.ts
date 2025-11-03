import type{ ChangeEventHandler, FC } from "react"
import type { TextFieldProps } from "@mui/material"
import type { Variant as PVTVariant } from "./hooks/usePasswordVisToggle/PasswordVisToggle/passwordVisToggle.types"

export type InputType = "text" | "number" | "email" | "password"
export type LabelPlacement = "top" | "bottom" | "left" | "right"

export type InputCompoonent = FC<
    Omit<TextFieldProps, 'name'> & {
        required?: boolean
        name?: string
        placeholder?:string
        type?:InputType
        label?:string
        externalLabel?:string
        externalLabelPlacement?: LabelPlacement,
        onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        passwordVisibilityToggleVariant?: PVTVariant
        texts?: { [key: string]: any }
    }
>

export interface ContainerProps {
    labelplacement: LabelPlacement
}