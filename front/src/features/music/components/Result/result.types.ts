import type { FC } from "react";

export type ResultComponent = FC<{
    file?: File | null
    type?: string | null
    onClose: () => void
}>