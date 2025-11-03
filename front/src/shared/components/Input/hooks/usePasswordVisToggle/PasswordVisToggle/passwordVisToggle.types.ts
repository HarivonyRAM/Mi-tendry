import type { MouseEvent } from "react"

export type Variant = "iconbutton" | "textbutton"

export interface PasswordVisToggleProps {
    variant: Variant
    showText: string
    hideText: string
    isShown: boolean
    onToggle: (e: MouseEvent<HTMLButtonElement>) => void
}