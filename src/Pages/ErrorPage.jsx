import { useRouteError, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container m-auto">
      <div className="col-md-12 text-center">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Button variant="primary">
          <Link to="/" className="text-white text-decoration-none">
            Go back to shop
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
