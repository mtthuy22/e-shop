import { Outlet } from "react-router-dom";
import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar";
import ContactFormToggle from "../Components/ContactFormToggle";
import ContactForm from "../Components/ContactForm";

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
      <footer className="fixed-bottom bg-light p-2">
        <div className="text-end">
          <ContactFormToggle>
            {(handleClose)=> <ContactForm onFormSubmit={handleClose}/>}
          </ContactFormToggle>
        </div>  
      </footer>
    </div>
  );
};

export default Home;
