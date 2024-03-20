import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Pages */
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Protected from "./features/auth/Protected";
import Unprotected from "./features/auth/Unprotected";
import ProtectedAdmin from "./features/auth/ProtectedAdmin";
import Logout from "./features/auth/Logout";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrderPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminOrderPage from "./pages/AdminOrderPage";
import AdminAddProductFormPage from "./pages/AdminAddProductFormPage";
import AdminProductEditForm from "./pages/AdminProductEditFormPage";
import PaymentPage from "./pages/PaymentPage";
import OrderFailedPage from "./pages/OrderFailedPage";
import PageNotFound from "./pages/404"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage></HomePage>
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Unprotected>
        <SignUpPage></SignUpPage>
      </Unprotected>
    ),
  },
  {
    path: "/login",
    element: (
      <Unprotected>
        <LoginPage></LoginPage>
      </Unprotected>
    ),
  },
  {
    path: "/forgot-password",
    element: (
        <ForgotPasswordPage></ForgotPasswordPage>
    ),
  },
  {
    path: "/reset-password",
    element: (
        <ResetPasswordPage></ResetPasswordPage>
    ),
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>{" "}
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/order-failed/:id",
    element: (
      <Protected>
        <OrderFailedPage></OrderFailedPage>
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage></AdminHomePage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminAddProductFormPage></AdminAddProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage></AdminOrderPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductEditForm></AdminProductEditForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/razorpay-checkout",
    element: (
      <Protected>
        <PaymentPage></PaymentPage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound>
      </PageNotFound>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
