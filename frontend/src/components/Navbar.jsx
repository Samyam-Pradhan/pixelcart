import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-400">
          PixelCart
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/products" className="text-gray-300 hover:text-white transition">
            Products
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="text-gray-300 hover:text-white transition">
                Orders
              </Link>
              <span className="text-gray-400 text-sm">Hi, {user.username}</span>
              <button
                onClick={logoutUser}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;