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
  const productsPerPage = 40;
  const [isLoading, setLoading] = useState(true);
  const [cartIsLoading, setCartIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(false);
  //const user = Math.floor(Math.random() * 20 + 1);
  const user = 10;
  const [allCategories, setAllCategories] = useState(["All products"]);
  const [category, setCategory] = useState("All products");
  const [searchItem, setSearchItem] = useState("");
  let displayCategories = searchItem === "";

  function handleSearchInput(e) {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    setProducts([]);
    setCategory("All products");
  }

  useEffect(() => {
    //setTimeout(getCartData, 5000);
    getCartData();
    getCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, [category, searchItem]);

  function fetchData() {
    let API_URL = "";

    //API_URL =  `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${products.length}`
    //API_URL = `https://dummyjson.com/products/search?q=${searchItem}`

    if (searchItem !== "") {
      API_URL = `https://dummyjson.com/products/search?q=${searchItem}&limit=${productsPerPage}&skip=${products.length}`;
    } else if (category === "All products") {
      API_URL = `https://dummyjson.com/products/?limit=${productsPerPage}&skip=${products.length}`;
    } else
      API_URL = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${products.length}`;

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

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-start">Products store</h1>
        <input
          type="search"
          placeholder="Type to search"
          value={searchItem}
          onChange={(e) => handleSearchInput(e)}
        />
      </div>
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
            />
          </div>
          <div className="col-12 col-md">
            <h2>{searchItem !== "" ? "Search results" : category}</h2>
            <ProductList
              products={products}
              addToCart={addToCart}
              isInCart={isInCart}
              orderComplete={orderComplete}
            ></ProductList>
            <Button
              text={isLoading ? "Items are loading..." : "Load more items"}
              disabled={allProducts || isLoading || category === ""}
              btnColor={allProducts ? "primary-outline" : "primary"}
              onClick={fetchData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
