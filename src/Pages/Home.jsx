import Categories from "../Components/Categories";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row mb-3 row-gap-3">
          <div
            className={`list-group list-group-flush flex-row flex-md-column flex-wrap flex-md-nowrap col-auto`}
          >
            <Categories />
          </div>
          <div className="col-12 col-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
