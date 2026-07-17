import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";

import CartPage from "./pages/cart/CartPage";
import WishlistPage from "./pages/wishlist/WishlistPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

import OrdersPage from "./pages/orders/OrdersPage";
import OrderDetailPage from "./pages/orders/OrderDetailPage";

import ProfilePage from "./pages/profile/ProfilePage";
import AddressPage from "./pages/address/AddressPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

/* ---------- ADMIN ---------- */

import AdminDashboard from "./pages/admin/pages/AdminDashboard";
import AdminProductsPage from "./pages/admin/pages/AdminProductsPage";
import AddProductPage from "./pages/admin/pages/AddProductPage";
import EditProductPage from "./pages/admin/pages/EditProductPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCustomersPage from "./pages/admin/pages/AdminCustomersPage";
import AdminCategoriesPage from "./pages/admin/pages/AdminCategoriesPage";
import AdminInventoryPage from "./pages/admin/pages/AdminInventoryPage";
import AdminVendorsPage from "./pages/admin/vendors/AdminVendorsPage";
import AdminVendorDetailsPage from "./pages/admin/vendors/AdminVendorDetailsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AIChatPage from "./pages/ai/AIChatPage";
import AICameraPage from "./pages/ai/AICameraPage";
import OrderTrackingPage from "./pages/orders/OrderTrackingPage";


function App() {
  return (
    <CartProvider>
      <WishlistProvider>

        <BrowserRouter>

          <Routes>

            {/* ---------- USER ---------- */}

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />

            <Route
              path="/products"
              element={<ProductsPage />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetailPage />}
            />

            <Route
              path="/cart"
              element={<CartPage />}
            />

            <Route
              path="/wishlist"
              element={<WishlistPage />}
            />
            <Route
  path="/admin/customers"
  element={<AdminCustomersPage />}
/>

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/addresses"
              element={
                <ProtectedRoute>
                  <AddressPage />
                </ProtectedRoute>
              }
            />

            {/* ---------- ADMIN ---------- */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminProductsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products/add"
              element={
                <ProtectedRoute>
                  <AddProductPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProductPage />
                </ProtectedRoute>
              }
            />
            <Route
  path="/admin/orders"
  element={
    <ProtectedRoute>
  <AdminOrdersPage />
  </ProtectedRoute>
}
/>
<Route
  path="/admin/orders"
  element={<AdminOrdersPage />}
/>
<Route
    path="/admin/vendors"
    element={<AdminVendorsPage />}
/>
<Route
  path="/admin/categories"
  element={
    <ProtectedRoute>
      <AdminCategoriesPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/inventory"
  element={
    <ProtectedRoute>
      <AdminInventoryPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/vendors/:id"
  element={<AdminVendorDetailsPage />}
/>
<Route
    path="/admin/analytics"
    element={<AdminAnalyticsPage />}
/>
<Route path="/ai" element={<AIChatPage />} />
<Route
    path="/ai-camera"
    element={<AICameraPage />}
/>
<Route
    path="/tracking/:orderId"
    element={<OrderTrackingPage />}
/>

          </Routes>

        </BrowserRouter>

      </WishlistProvider>
    </CartProvider>
  );
}

export default App;