import type { FC } from "react";

export type LoginFormComponent = FC<
    {}
>

export interface LoginFormData {
    email: string
    password: string
}