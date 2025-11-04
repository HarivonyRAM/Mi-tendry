import type { FC } from "react"

export type PreviewComponent = FC<{
    file: File | null
    onClose: () => void
}>