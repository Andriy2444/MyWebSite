import { useEffect, useState } from "react";
import { getCart, addToCart, decreaseFromCart, removeFromCart, clearCart, } from "../../services/api.ts";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await getCart();
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleAdd = async (productId: string) => {
    await addToCart(productId, 1);
    fetchCartItems();
  };

  const handleDecrease = async (productId: string) => {
    await decreaseFromCart(productId);
    fetchCartItems();
  };

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
    fetchCartItems();
  };

  const handleClear = async () => {
    await clearCart();
    fetchCartItems();
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div onClick={() => navigate(`/product/${item.product._id}`)}>
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info" >
                    <h3>{item.product.name}</h3>
                    <p>{item.product.price.toFixed(2)} ₴</p>
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrease(item.product._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAdd(item.product._id)}>+</button>
                </div>
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="remove-btn"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <strong>Total: {totalPrice.toFixed(2)} ₴</strong>
            <button onClick={handleClear} className="clear-btn">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
