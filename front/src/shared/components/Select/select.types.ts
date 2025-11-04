import type { SelectProps as NativeProps, SelectChangeEvent } from "@mui/material"
import type { FC } from "react"

export type LabelPlacement = "top" | "bottom" | "left" | "right"

export type Option<
    VK extends string,
    DK extends string
> = {
    [key in VK]: any;
} & {
    [key in DK]: any;
} & {
    [key: string]: any;
}

export type ChangeHandler = ((event: SelectChangeEvent<unknown>) => void)

export type SelectComponent<
    VK extends string,
    DK extends string
> = FC<
    Omit<NativeProps, 'name'> & {
        required?: boolean
        name?: string
        placeholder?: string
        label?: string
        externalLabel?: string
        externalLabelPlacement?: LabelPlacement
        valueKey?: VK
        displayTextKey?: DK
        options?: Option<VK, DK>[]
        requiredFieldErrorText?: string
        onChange?: ChangeHandler
        texts?: { [key: string]: any }
    }
>


export interface ContainerProps {
    labelplacement: LabelPlacement
}