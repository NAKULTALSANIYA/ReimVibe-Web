import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
      <p className="text-gray-600 text-lg mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
