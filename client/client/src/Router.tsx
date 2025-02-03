import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                {/* Redirect '/' to Login if not authenticated */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Catch-All for Undefined Routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
