import { Navigate } from "react-router-dom";
import { getAuthToken } from "../lib/auth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = getAuthToken();

    if (!token) {
        return <Navigate to="/signin" />;
    }

    return children;
};
