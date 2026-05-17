import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAllProducts, getProductsByCategory } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = category
          ? await getProductsByCategory(category)
          : await getAllProducts();
        setProducts(res.data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-white">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "All Products"}
          </h1>
          <div className="flex gap-3">
            {["all", "games", "consoles", "accessories"].map((cat) => (
              <Link
                key={cat}
                to={cat === "all" ? "/products" : `/products?category=${cat}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  (cat === "all" && !category) || cat === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition group"
              >
                <div className="bg-gray-800 rounded-lg h-48 mb-4 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-5xl">🎮</span>
                  )}
                </div>
                <span className="text-xs text-purple-400 uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-white font-semibold mt-1 mb-2 group-hover:text-purple-400 transition">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold text-lg">
                    ${product.price}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-green-900/30 text-green-400"
                      : "bg-red-900/30 text-red-400"
                  }`}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;