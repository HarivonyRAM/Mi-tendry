import { MenuItem, InputLabel, Select as MuiSelect, Alert, FormControl, Typography, Chip, Stack } from "@mui/material";
import { StyledContainer } from "./select.styles";
import type { SelectComponent } from "./select.types";
import type { ReactNode } from "react";
import useHookForm from "./hooks/useHookForm/useHookForm";

/* 
    Required dependencies: @mui/material @emotion/react @emotion/styled react-hook-form
    Required parents: React-hook-form form provider (if controlled)
*/

const Select: SelectComponent<string, string> = ({
    name, /** If name is provided, the input is assumed to be controlled via react-hook-form */
    required = false,
    label, /** Label inside the input */
    externalLabel, /** Label outside the input, which placement can be customized with externalLabelPlacement prop */
    externalLabelPlacement="top",
    placeholder,
    /** tab of Object containing value (key: [valueKey], content: [displayTextKey], and all MuiRadio props [...rest])  */
    /** By default, options has the form { value: string, label: string }[]. Customize keys by changing props valueKey & displayTextKey */
    options = [], 
    valueKey="value",
    displayTextKey="label",
    texts={
        "error": {
            "requiredField": "Required field",
        },
    },
    onChange: externalOnChange=()=> {},
    ...MuiProps
}) => {
    const hasInnerLabel = !!label
    const hasOuterLabel = !!externalLabel
    const hasPlaceholder = !!placeholder
    const requiredSign = required ? " *" : ""

    const getRenderValue = (selected: unknown): ReactNode => {
        const find = (val: string) => { return options.find(opt => opt[valueKey] === val)?.[displayTextKey] ?? val }
        if (!selected && hasPlaceholder) return placeholder + requiredSign
        if (typeof selected === "string") return find(selected)
        if (Array.isArray(selected)) return selected.map((val: string) => <Chip key={val} label={find(val)} />)
        return ""
    }

    const { error, onChange } = useHookForm({ name, required, externalOnChange, errorTexts: texts["error"] })

    return (
        <StyledContainer labelplacement={externalLabelPlacement}>
            <Stack className="field-container">
                { hasOuterLabel && <Typography>{externalLabel} {requiredSign}</Typography>}
                <FormControl error={!!error}>
                    { hasInnerLabel && <InputLabel variant={MuiProps.variant} required={required}>{label}</InputLabel>}
                    <MuiSelect
                        {...(hasPlaceholder && { displayEmpty: true })}
                        renderValue={getRenderValue}
                        defaultValue={ MuiProps.multiple ? [] : ""}
                        label={ hasInnerLabel ? (label + requiredSign) : undefined}
                        onChange={onChange}
                        {...MuiProps}
                    >
                        {options.map(({
                            [valueKey]: value,
                            [displayTextKey]: displayText,
                            ...rest
                        }) => (
                            <MenuItem key={value} value={value} {...rest}>
                                {displayText}
                            </MenuItem>
                        ))}
                    </MuiSelect>
                </FormControl>
            </Stack>
            {typeof error?.message === "string" && (
                <Alert severity="error">{error.message}</Alert>
            )}
        </StyledContainer>
    )
}

export default Select