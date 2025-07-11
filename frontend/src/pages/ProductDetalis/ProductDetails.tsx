import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import API, { addToCart } from "../../services/api";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      alert("Product added to cart!");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details-container">
      <div className="cart-view-btn-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>
      <img src={product.image_url} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong>{product.price} ₴</strong>
        <br />
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
      <div>
        <Link to="/cart" className="view-cart-btn">
          View Cart
        </Link>
      </div>
    </div>
  );
}
