import { router } from "./app/routes/router"
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "./features/theme/providers/theme.provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
