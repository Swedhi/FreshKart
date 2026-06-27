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

import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import AddressPage from "./pages/address/AddressPage";
import OrderDetailPage from "./pages/orders/OrderDetailPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";

import {
  CartProvider,
} from "./context/CartContext";

import {
  WishlistProvider,
} from "./context/WishlistContext";

function App() {

  return (

    <CartProvider>

      <WishlistProvider>

        <BrowserRouter>

          <Routes>

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
<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetailPage />
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

          </Routes>

        </BrowserRouter>

      </WishlistProvider>

    </CartProvider>

  );

}

export default App;