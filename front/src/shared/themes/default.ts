import { createTheme } from "@mui/material/styles";

const primary = "#3ebbab"
const secondary = "#000000"
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