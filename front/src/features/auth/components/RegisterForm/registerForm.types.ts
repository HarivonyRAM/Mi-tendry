import type { FC } from "react";

export type RegisterFormComponent = FC<
    {}
>

export interface RegisterFormData {
    email: string
    password: string
    confirmPassword: string
}