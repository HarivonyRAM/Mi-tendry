import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: typeof import('./theme').customTheme
  }

  interface ThemeOptions {
    custom?: typeof import('./theme').customTheme
  }
}
