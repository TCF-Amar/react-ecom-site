import { Route, Routes } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthPage from "../../features/auth/pages/AuthPage";
import HomePage from "../../features/home/pages/HomePage";
import ProductPage from "../../features/product/page/ProductPage";
import CategoriesPage from "../../features/product/page/CategoriesPage";
import ProductDetail from "../../features/product/page/ProductDetail";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<ProductPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:cat" element={<CategoriesPage />} />
        <Route path="/collections/product/:slug" element={<ProductDetail />} />
        <Route path="/categories/product/:slug" element={<ProductDetail />} />
      </Route>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      ></Route>
    </Routes>
  );
}

export default AppRoutes;
