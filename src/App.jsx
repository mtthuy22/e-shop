import { useState, useEffect } from "react";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Button from "./Components/Button";
import Categories from "./Components/Categories";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const productsPerPage = 48;
  const [isLoading, setLoading] = useState(true);
  const [cartIsLoading, setCartIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(false);
  //const user = Math.floor(Math.random() * 20 + 1);
  const user = 10;
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
    getCartData();
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

  function updateCart(product, number) {
    fetch(`https://dummyjson.com/carts/${user}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: [
          {
            id: product.id,
            quantity: number,
          },
        ],
      }),
    })
      .then((res) => res.json)
      .then(console.log);
  }

  function getCartData() {
    try {
      setCartIsLoading(true);
      fetch(`https://dummyjson.com/carts/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setCart((cart) =>
            [...data.products, ...cart].filter(
              (product, index, array) =>
                array.findIndex((p) => p.id === product.id) === index
            )
          );
          setCartIsLoading(false);
        });
    } catch (err) {
      setCartIsLoading(false);
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
  }

  function addToCart(product) {
    setCart([...cart, product]);
    updateCart(product, 1);
  }

  function isInCart(product) {
    return cart.some((cartItem) => cartItem.id === product.id);
  }

  function removeFromCart(product) {
    setCart(cart.filter((item) => item !== product));
    updateCart(product, 0);
  }

  function textTransform(str) {
    return (
      str[0].toUpperCase() +
      str.slice(1).replace("-", " ").replace("ens", "en's")
    );
  }

  return (
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
        cart={cart}
        removeFromCart={removeFromCart}
        orderComplete={orderComplete}
        setOrderComplete={setOrderComplete}
        resetCart={() => setCart([])}
        cartIsLoading={cartIsLoading}
      />
      <div className="container">
        <div className="row mb-3 row-gap-3">
          <div className="col-auto">
            <Categories
              categories={allCategories}
              chooseCategory={chooseCategory}
              selectedCategory={category}
              display={displayCategories}
              textTransform = {textTransform}
            />
          </div>
          <div className="col-12 col-md">
            <h2>
              {searchItem !== "" ? "Search results" : textTransform(category)}
            </h2>
            <ProductList
              products={products}
              addToCart={addToCart}
              isInCart={isInCart}
              orderComplete={orderComplete}
            ></ProductList>
            <Button
              text={isLoading ? "Items are loading..." : "Load more items"}
              disabled={allProducts || isLoading || category === ""}
              btnColor={allProducts ? "primary d-none" : "primary"}
              onClick={fetchData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
