import { useState, useEffect } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Button from "./Components/Button";
import Categories from "./Components/Categories";
import "./App.css";
import CartContextProvider from "./Components/CartContext";

function App() {
  const [orderComplete, setOrderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const productsPerPage = 48;
  const [isLoading, setLoading] = useState(true);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [allCategories, setAllCategories] = useState(["All products"]);
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
    getCategories();
  }, []);

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
          data.products[0].stock = 0;
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

  function getCategories() {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories([...allCategories, ...data]);
      });
  }

  function chooseCategory(category) {
    setCategory(category);
    setProducts([]);
    setLoading(true);
    setAllProductsLoaded(false);
  }

  function textTransform(str) {
    return (
      str[0].toUpperCase() +
      str.slice(1).replace("-", " ").replace("ens", "en's")
    );
  }

  return (
    <CartContextProvider>
      <div className="App">
        <nav className="navbar navbar-light bg-light justify-content-between">
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
          </div>
        </nav>
        <Cart
          orderComplete={orderComplete}
          setOrderComplete={setOrderComplete}
        />

        {!orderComplete && (
          <div className="container">
            <div className="row mb-3 row-gap-3">
              <div className="col-auto">
                <Categories
                  categories={allCategories}
                  chooseCategory={chooseCategory}
                  selectedCategory={category}
                  display={displayCategories}
                  textTransform={textTransform}
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
                ></ProductList>

                {!allProductsLoaded && (
                  <Button
                    text={
                      isLoading ? "Items are loading..." : "Load more items"
                    }
                    disabled={isLoading || category === ""}
                    btnVariant="btn-primary"
                    onClick={fetchData}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </CartContextProvider>
  );
}

export default App;
