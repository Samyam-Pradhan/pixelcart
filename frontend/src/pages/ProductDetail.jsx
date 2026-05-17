import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { createOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data.product);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setOrdering(true);
    setError("");
    try {
      await createOrder(
        {
          items: [
            {
              productId: product._id,
              name: product.name,
              price: product.price,
              quantity,
              image: product.image,
            },
          ],
          shippingAddress: {
            street: "123 Main St",
            city: "Kathmandu",
            country: "Nepal",
            zipCode: "44600",
          },
        },
        token
      );
      setSuccess("Order placed successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-red-400">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl h-80 flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-8xl">🎮</span>
            )}
          </div>

          <div>
            <span className="text-xs text-purple-400 uppercase tracking-wider">
              {product.category} · {product.platform}
            </span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-400 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-purple-400">
                ${product.price}
              </span>
              <span className={`text-sm px-3 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-900/30 text-green-400"
                  : "bg-red-900/30 text-red-400"
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg mb-4 text-sm">
                {success}
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <label className="text-gray-400 text-sm">Quantity:</label>
              <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-400 hover:text-white transition"
                >
                  −
                </button>
                <span className="text-white w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="text-gray-400 hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={ordering || product.stock === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {ordering ? "Placing Order..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;