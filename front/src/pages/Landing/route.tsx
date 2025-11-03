import { PATHS } from '../../app/routes/paths'
import ProtectedRoute from '../../app/routes/ProtectedRoute/ProtectedRoute'
import Landing from './Landing'

const name = "home"
const path = PATHS.home
const route = {
    path,
    element: <ProtectedRoute type="auth">
        <Landing/>
    </ProtectedRoute>
}

export { name, path, route }