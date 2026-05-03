import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
    totalPrice,
  } = useCart();

  return (
    <div className="container">
      <h1 className="title">Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div>
                <h3>{item.title}</h3>
                <p>Price: ₹ {item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <div className="actions">
                  <button
                    className="btn btn-green"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>

                  <button
                    className="btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="summary">
            <h2>Cart Summary</h2>
            <p>Total Unique Items: {cartItems.length}</p>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ₹ {totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;