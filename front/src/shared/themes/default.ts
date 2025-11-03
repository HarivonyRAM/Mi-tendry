import { createTheme } from "@mui/material/styles";

const primary = "#00af84"
const secondary = "#0a4469"
const text = "#333333"
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: { root: { color: text } }
        }
    },
    custom: {
        text
    }
})

export default defaultTheme