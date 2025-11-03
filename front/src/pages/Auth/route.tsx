import { PATHS } from '../../app/routes/paths'
import ProtectedRoute from '../../app/routes/ProtectedRoute/ProtectedRoute'
import Auth from './Auth'

const name = "auth"
const path = PATHS.auth
const route = {
    path,
    element: <ProtectedRoute type="reverseAuth">
        <Auth/>
    </ProtectedRoute>
}

export { name, path, route }