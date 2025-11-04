import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import type { ChangeHandler } from "../../select.types"

export type UseHookFormOptions = {
    name?: string
    externalOnChange: ChangeHandler
    required: boolean
    errorTexts: {
        requiredField: string
    }
}

export type UseHookFormReturn = {
    onChange: ChangeHandler
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}