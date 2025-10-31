import type { ChangeEventHandler } from "react"
import type { ChangeHandler, FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

export type UseHookFormOptions = {
    name?: string
    isEmail: boolean
    externalOnChange: ChangeEventHandler<Element>
    required: boolean
    errorTexts: {
        requiredField: string
        invalidMail: string
    }
}

export type UseHookFormReturn = {
    onChange: ChangeHandler
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}