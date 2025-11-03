import type { ChangeEvent } from "react"
import type { UseHookFormOptions, UseHookFormReturn } from "./useHookForm.types"
import { useController, useFormContext, type ChangeHandler } from "react-hook-form"

const useHookForm = ({
    name, isEmail, externalOnChange, required, errorTexts: { invalidMail, requiredField }
}: UseHookFormOptions): UseHookFormReturn => {
    const isControlled = !!name

    if (!isControlled) {
        return {
            onChange: externalOnChange as ChangeHandler,
            error: undefined
        }
    }

    const { control } = useFormContext()
    const { field, fieldState } = useController({
        name: name ?? "",
        control,
        rules: {
            required: required && requiredField,
            ...(isEmail && {
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: invalidMail
                }
            })
        }
    })

    const onChange: ChangeHandler = ((e: ChangeEvent<HTMLInputElement>) => {
        field.onChange(e)
        externalOnChange(e)
    }) as ChangeHandler

    return {
        error: fieldState.error,
        onChange,
    }
}

export default useHookForm