import { useEffect, useState } from "react";
import ProductList from "../Components/ProductList";
import Categories from "../Components/Categories";
import { textTransform } from "../Components/helpers";


function Home() {
  const [products, setProducts] = useState([]);
  const productsPerPage = 48;
  const [isLoading, setLoading] = useState(true);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [category, setCategory] = useState("All products");
  // const [searchItem, setSearchItem] = useState("");
  // const [timerId, setTimerId] = useState();

  // function handleSearchInput(e) {
  //   const searchTerm = e.target.value;
  //   setSearchItem(searchTerm);
  //   setLoading(true);
  //   setProducts([]);
  //   setCategory("All products");
  //   setAllProductsLoaded(false);
  // }

  // useEffect(() => {
  //   if (searchItem === "") {
  //     fetchData();
  //   } else {
  //     debounceSearch();
  //     clearTimeout(timerId);
  //   }
  // }, [searchItem]);
  useEffect(() => {
    
      fetchData();
    
  }, []);

  // function debounceSearch() {
  //   let timerId = setTimeout(fetchData, 1000);
  //   setTimerId(timerId);
  // }

  function fetchData() {
    let API_URL = "";

    // if (searchItem !== "") {
    //   API_URL = `https://dummyjson.com/products/search?q=${searchItem}&limit=${productsPerPage}&skip=${products.length}`;
    // } else if (category === "All products") {
    //   API_URL = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${products.length}`;
    // } else {
    //   API_URL = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${products.length}`;
    // }

    if (category === "All products") {
      API_URL = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${products.length}`;
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
    <div className="App">
      <div className="container">
        <div className="row mb-3 row-gap-3">
          <div
            className={`list-group list-group-flush flex-row flex-md-column flex-wrap flex-md-nowrap col-auto`}
          >
            <Categories
              chooseCategory={chooseCategory}
              selectedCategory={category}
            />
          </div>
          <div className="col-12 col-md">
            <h2>
              {textTransform(category)}
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
    </div>
  );
}


export default Home;
