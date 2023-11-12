import { Link } from "react-router-dom";
import NotFound from "../assets/images/page-not-found.jpg";
import { useTitle } from "../hooks/useTitle";

export const PageNotFound = () => {
  useTitle("Page not found");
  return (
    <section>
      <p>404 / Page Not Found</p>
      <img src={NotFound} alt="Page Not Found" />
      <Link to="/">
        <button>Back to home</button>
      </Link>
    </section>
  );
};
