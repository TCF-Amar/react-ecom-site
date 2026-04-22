import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthPage from "../../features/auth/pages/AuthPage";
import HomePage from "../../features/home/pages/HomePage";
import ProductPage from "../../features/product/page/ProductPage";
import CategoriesPage from "../../features/product/page/CategoriesPage";
import ProductDetail from "../../features/product/page/ProductDetail";
import CartPage from "../../features/cart/pages/CartPage";
import CheckOutPage from "../../features/checkout/pages/CheckOutPage";
import AdminPage from "../../features/admin/pages/AdminPage";

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
        <Route path="/products" element={<ProductPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:cat" element={<CategoriesPage />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/admin" element={<AdminPage />} />

      </Route>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      ></Route>

      <Route path="*" element={<Navigate to="/" replace />}  />
    </Routes>
  );
}

export default AppRoutes;
