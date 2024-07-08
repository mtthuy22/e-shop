import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartContextProvider from "./Components/CartContext";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import ProductDetail from "./Pages/ProductDetail";
import ProductCategory from "./Pages/ProductCategory";
import Navbar from "./Components/Navbar";
import AllProducts from "./Pages/AllProducts";

const router = createBrowserRouter(
  [
    {
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/products/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/categories/:categoryId",
          element: <ProductCategory />,
        },
        {
          path: "/",
          element: <AllProducts />,
        },
      ],
    },
  ],
  { basename: "/e-shop" }
);

function App() {
  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  );
}
export default App;
