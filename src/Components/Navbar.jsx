import OffCanvasComponent from "../Components/OffCanvasComponent";
import Cart from "../Components/Cart";
import { useEffect, useState } from "react";


const Navbar = ({fetchData, handleSearchInput, searchItem }) => {
  // const [timerId, setTimerId] = useState();
  
  //   useEffect(() => {
  //     if (searchItem === "") {
  //       fetchData();
  //     } else {
  //       debounceSearch();
  //       clearTimeout(timerId);
  //     }
  //   }, [searchItem]);

  //   function debounceSearch() {
  //     let timerId = setTimeout(fetchData, 1000);
  //     setTimerId(timerId);
  //   }
  
 
 
    return (
    <nav className="navbar navbar-light bg-light justify-content-between mb-2">
      <div className="container-fluid">
        <h1 className="navbar-brand">Products E-shop</h1>
        {/* <form className="form-inline" role="search">
          <input
            value={searchItem}
            onChange={(e) => handleSearchInput(e)}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form> */}
        <OffCanvasComponent>
          <Cart />
        </OffCanvasComponent>
      </div>
    </nav>
  );
};

export default Navbar