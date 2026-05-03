import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>

      <p className="price">₹ {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: ⭐ {product.rating}</p>
      <p>Stock: {product.count}</p>

      {product.count === 0 ? (
        <button className="btn" disabled>
          Out of Stock
        </button>
      ) : (
        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;