import { Link } from "react-router-dom";

function GlobalNoRoute() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default GlobalNoRoute;
