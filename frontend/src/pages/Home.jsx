import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to <span className="text-purple-400">PixelCart</span>
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl">
          Your one-stop shop for games, consoles, and accessories. Level up your gaming experience.
        </p>
        <div className="flex gap-4">
          <Link
            to="/products"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Shop Now
          </Link>
          <Link
            to="/signup"
            className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/products?category=games"
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-purple-500 transition group"
          >
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">
              Games
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Latest titles across all platforms
            </p>
          </Link>

          <Link
            to="/products?category=consoles"
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-purple-500 transition group"
          >
            <div className="text-5xl mb-4">🕹️</div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">
              Consoles
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              PS5, Xbox, Nintendo and more
            </p>
          </Link>

          <Link
            to="/products?category=accessories"
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-purple-500 transition group"
          >
            <div className="text-5xl mb-4">🎧</div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">
              Accessories
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Controllers, headsets, and more
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;