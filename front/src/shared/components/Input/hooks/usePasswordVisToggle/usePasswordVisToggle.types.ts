import type { FC } from "react"
import type { Variant } from "./PasswordVisToggle/passwordVisToggle.types"

export interface PVTProps {
    expectedVariant: Variant
}

export type UsePasswordVisToggleOptions = {
    variant: Variant
    isPasswordInput: boolean
    texts: {
        hide: string,
        show: string
    }
}

export type UsePasswordVisToggleReturn = {
    isShown: boolean
    PasswordVisToggle: FC<PVTProps>
}