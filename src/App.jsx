import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartContextProvider from "./Components/CartContext";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/error-page";
import ProductDetail from "./Pages/ProductDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/products/:productId",
    element: <ProductDetail/>
  }
],{basename:"/e-shop"});

function App() {
  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  );
}
export default App;
