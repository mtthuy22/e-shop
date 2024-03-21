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
  const [allProducts, setAllProducts] = useState(false);
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
          console.log(data);
          setProducts([...products, ...data.products]);
          if ([...products, ...data.products].length === data.total) {
            setAllProducts(true);
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
    setAllProducts(false);
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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <h1 className="navbar-brand">Products E-shop</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <form className="d-flex" role="search">
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
          </div>
        </nav>
        <Cart
          orderComplete={orderComplete}
          setOrderComplete={setOrderComplete}
        />
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
                {searchItem !== "" ? "Search results" : textTransform(category)}
              </h2>
          
              <ProductList
                products={products}
                orderComplete={orderComplete}
              ></ProductList>

              {!allProducts && (
                <Button
                  text={isLoading ? "Items are loading..." : "Load more items"}
                  disabled={isLoading || category === ""}
                  btnVariant="btn-primary"
                  onClick={fetchData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </CartContextProvider>
  );
}

export default App;
