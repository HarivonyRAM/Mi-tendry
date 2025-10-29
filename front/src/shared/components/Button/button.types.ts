import type { ButtonProps as NativeProps } from "@mui/material"
import type { ReactNode } from "react"

export type FeedbackPlacement = "bottom" | "top" | "left" | "right"  | "inner"

export interface ContainerProps {
    feedbackplacement: FeedbackPlacement
}

export interface ButtonProps extends Omit<NativeProps, 'name'> {
    children: ReactNode,
    feedback?: {
        severity: "success" | "error",
        message: string,
        placement?: FeedbackPlacement
    }
}