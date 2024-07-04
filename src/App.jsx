import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartContextProvider from "./Components/CartContext";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import ProductDetail from "./Pages/ProductDetail";
import ProductCategory from "./Pages/ProductCategory";
import Categories from "./Components/Categories";
import Navbar from "./Components/Navbar";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/products/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/categories/:categoryId",
      element: <ProductCategory />,
    },
  ],
  { basename: "/e-shop" }
);

function App() {
  return (
    <CartContextProvider>
      <Navbar />
      <Categories/>
      <RouterProvider router={router} />
    </CartContextProvider>
  );
}
export default App;
