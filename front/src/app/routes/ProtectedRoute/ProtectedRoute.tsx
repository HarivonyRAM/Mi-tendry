import { Navigate } from "react-router-dom";
import type { ProtectedRouteComponent } from "./protectedRoute.types";
import useAuth from "../../../features/auth/hooks/useAuth";
import { PATHS } from "../paths";

const ProtectedRoute: ProtectedRouteComponent = ({ children, type="auth" }) => {
    const { user } = useAuth()
    const [ authorized, redirectPath ] = (() => {
        switch (type) {
            case "auth": return [ !!user, PATHS.auth ]
            case "reverseAuth": return [ !user, PATHS.home ]
            default: return [ false, PATHS.unauthorized ]
        }
    })()
    
    return (authorized) ? children : <Navigate to={redirectPath} replace/>
}

export default ProtectedRoute