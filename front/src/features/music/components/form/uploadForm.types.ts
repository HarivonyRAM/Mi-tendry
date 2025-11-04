import type { FC } from "react"

export type UploadFormComponent = FC<{
    onChange: (file: File) => void
}>

export interface ContainerProps {
    dragactive: string
}
