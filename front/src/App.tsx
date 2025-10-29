import Landing from "./pages/Landing/Landing"
import { ThemeProvider } from "./features/theme/providers/theme.provider"

const App = () => {
  return (
    <ThemeProvider>
      <Landing/>
    </ThemeProvider>
  )
}

export default App
