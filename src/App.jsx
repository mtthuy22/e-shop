import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartContextProvider from "./Components/CartContext";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import ProductDetail from "./Pages/ProductDetail";
import ProductCategory from "./Pages/ProductCategory";
import AllProducts from "./Pages/AllProducts";
import SearchResults from "./Pages/SearchResults";
//import Checkout from "./Pages/Checkout";
import Checkout2 from "./Pages/Checkout2";

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
        {
          path: "/products",
          element: <SearchResults />
        },
        // {
        //   path: "/checkout2",
        //   element: <Checkout />
        // },
        {
          path: "/checkout2",
          element: <Checkout2 />
        }
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
