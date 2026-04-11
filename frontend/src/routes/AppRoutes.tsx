import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Blog } from "../pages/Blog";
import { Blogs } from "../pages/Blogs";
import { Publish } from "../pages/Publish";
import { Signin } from "../pages/Singin";
import { Signup } from "../pages/Signup";
import { getAuthToken } from "../lib/auth";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={getAuthToken() ? <Navigate to="/blogs" replace /> : <Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
            <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
            <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/blogs" replace />} />
        </Routes>
    );
};
