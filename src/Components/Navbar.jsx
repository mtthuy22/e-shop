import OffCanvasComponent from "../Components/OffCanvasComponent";
import Cart from "../Components/Cart";
import SearchInput from "./SearchInput";


const Navbar = () => {
 
    return (
    <nav className="navbar navbar-light bg-light sticky-top justify-content-between mb-2">
      <div className="container-fluid">
        <h1 className="navbar-brand">Products E-shop</h1>
        <SearchInput/>
        <OffCanvasComponent>
          <Cart />
        </OffCanvasComponent>
      </div>
    </nav>
  );
};

export default Navbar