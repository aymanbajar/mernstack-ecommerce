import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext' // Adjust the import path as necessary
export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth(); // Assume useAuth is a custom hook that provides authentication status
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}