import type { PVTProps, UsePasswordVisToggleOptions, UsePasswordVisToggleReturn } from "./usePasswordVisToggle.types"
import PasswordVisToggle from "./PasswordVisToggle/PasswordVisToggle"
import { useState, type FC } from "react"

const usePasswordVisToggle = ({
    texts, variant, isPasswordInput
}: UsePasswordVisToggleOptions): UsePasswordVisToggleReturn => {
    const [ isShown, setIsShown ] = useState(false)

    const PVT: FC<PVTProps> = ({ expectedVariant }) => {
        return isPasswordInput && (variant === expectedVariant)
        && <PasswordVisToggle
            variant={variant}
            isShown={isShown}
            onToggle={()=> setIsShown(v => !v)}
            showText={texts.show}
            hideText={texts.hide}
        />
    }
    return {
        isShown,
        PasswordVisToggle: PVT
    }
}

export default usePasswordVisToggle