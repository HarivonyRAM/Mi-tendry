import type { FC, ReactNode } from "react";

type ProtectectionType = "auth" | "reverseAuth"

export type ProtectedRouteComponent = FC<
    {
        type?: ProtectectionType
        children: ReactNode
    }
>