import { useState, useEffect } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Categories from "./Components/Categories";
import CartContextProvider from "./Components/CartContext";
import { textTransform } from "./Components/helpers";
import OffCanvasComponent from "./Components/OffCanvasComponent";


function App() {
  const [orderComplete, setOrderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const productsPerPage = 48;
  const [isLoading, setLoading] = useState(true);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [category, setCategory] = useState("All products");
  const [searchItem, setSearchItem] = useState("");
  let displayCategories = searchItem === "";
  const [timerId, setTimerId] = useState();

  function handleSearchInput(e) {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    setLoading(true);
    setProducts([]);
    setCategory("All products");
    setAllProductsLoaded(false);
  }

  useEffect(() => {
    if (searchItem === "") {
      fetchData();
    } else {
      debounceSearch();
      clearTimeout(timerId);
    }
  }, [category, searchItem]);

  function debounceSearch() {
    let timerId = setTimeout(fetchData, 1000);
    setTimerId(timerId);
  }

  function fetchData() {
    let API_URL = "";

    if (searchItem !== "") {
      API_URL = `https://dummyjson.com/products/search?q=${searchItem}&limit=${productsPerPage}&skip=${products.length}`;
    } else if (category === "All products") {
      API_URL = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${products.length}`;
    } else {
      API_URL = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${products.length}`;
    }

    try {
      setLoading(true);

      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setProducts([...products, ...data.products]);
          if ([...products, ...data.products].length === data.total) {
            setAllProductsLoaded(true);
          }
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function chooseCategory(category) {
    setCategory(category);
    setProducts([]);
    setLoading(true);
    setAllProductsLoaded(false);
  }

  return (
    <CartContextProvider>
      <div className="App">
        <nav className="navbar navbar-light bg-light justify-content-between mb-2">
          <div className="container-fluid">
            <h1 className="navbar-brand">Products E-shop</h1>
            <form className="form-inline" role="search">
              <input
                value={searchItem}
                onChange={(e) => handleSearchInput(e)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <OffCanvasComponent>
              <Cart
                orderComplete={orderComplete}
                setOrderComplete={setOrderComplete}
              />
            </OffCanvasComponent>
          </div>
        </nav>

        {!orderComplete && (
          <div className="container">
            <div className="row mb-3 row-gap-3">
              <div
                className={`${
                  !displayCategories && "d-none"
                } list-group list-group-flush flex-row flex-md-column flex-wrap flex-md-nowrap col-auto`}
              >
                <Categories
                  chooseCategory={chooseCategory}
                  selectedCategory={category}
                />
              </div>
              <div className="col-12 col-md">
                <h2>
                  {searchItem !== ""
                    ? "Search results"
                    : textTransform(category)}
                </h2>

                <ProductList
                  products={products}
                  isLoading={isLoading}
                  allProductsLoaded={allProductsLoaded}
                  onLoadMore={fetchData}
                ></ProductList>
              </div>
            </div>
          </div>
        )}
      </div>
    </CartContextProvider>
  );
}

export default App;
