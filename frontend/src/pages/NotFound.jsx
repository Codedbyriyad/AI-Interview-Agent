import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-7xl font-black text-blue-600">
        404
      </h1>

      <p className="text-lg text-gray-600">
        Page not found
      </p>

      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Back Home
      </Link>
    </div>
  );
}

export default NotFound;