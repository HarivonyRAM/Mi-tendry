import type { ChangeEvent } from "react"
import type { UseHookFormOptions, UseHookFormReturn } from "./useHookForm.types"
import { useController, useFormContext, type ChangeHandler } from "react-hook-form"

const useHookForm = ({
    name, externalOnChange, required, errorTexts: { requiredField }
}: UseHookFormOptions): UseHookFormReturn => {
    const isControlled = !!name

    if (!isControlled) {
        return {
            onChange: externalOnChange,
            error: undefined
        }
    }

    const { control } = useFormContext()
    const { field, fieldState } = useController({
        name: name ?? "",
        control: control,
        rules: { required: required && requiredField }
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