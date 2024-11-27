import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartContextProvider from "./Components/CartContext";
import FormContextProvider from "./Components/FormContext";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import ProductDetail from "./Pages/ProductDetail";
import ProductCategory from "./Pages/ProductCategory";
import AllProducts from "./Pages/AllProducts";
import SearchResults from "./Pages/SearchResults";
import Checkout2 from "./Pages/Checkout2";
import CartPage from "./Pages/CartPage";
import Summary from "./Pages/Summary";
import OrderFinished from "./Pages/OrderFinished";

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
          element: <SearchResults />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout2",
          element: <Checkout2 />,
        },
        {
          path: "/order-summary",
          element: <Summary />,
        },
        {
          path: "/order-finished",
          element: <OrderFinished />,
        },
      ],
    },
  ],
  { basename: "/e-shop" }
);

function App() {
  return (
    <CartContextProvider>
      <FormContextProvider>
        <RouterProvider router={router} />
      </FormContextProvider>
    </CartContextProvider>
  );
}
export default App;
