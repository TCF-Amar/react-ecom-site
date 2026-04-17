import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../../features/auth/pages/LoginPage";
import HomePage from "../../features/home/pages/HomePage";
import ProductPage from "../../features/product/page/ProductPage";
import CategoriesPage from "../../features/product/page/CategoriesPage";

function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage/>} />
        <Route path="/collections" element={<ProductPage/>} />
        <Route path="/categories" element={<CategoriesPage/>} />
      </Route>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      >
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
