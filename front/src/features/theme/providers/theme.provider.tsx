import { useMemo } from "react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import type { ThemeProviderType } from "../types"
import defaultTheme from "../../../shared/themes/default"

const ThemeProvider: ThemeProviderType = ({ children }) => {

    const muiTheme = useMemo(() => {
        return createTheme(defaultTheme)
    }, [defaultTheme])

    return (
        <MuiThemeProvider theme={muiTheme}>
            {children}
        </MuiThemeProvider>
    )
}

export { ThemeProvider }
