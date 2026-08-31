import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../../shared/lib/auth/token";


export default function AuthGuard() {
    const token = getToken();
    
    if (!token) {
        return <Navigate to='/login' replace/>
    } 
    return <Outlet />
}