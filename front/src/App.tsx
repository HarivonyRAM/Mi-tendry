import { router } from "./app/routes/router"
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "./features/theme/providers/theme.provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { store } from "./app/store"

const queryClient = new QueryClient()

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
