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
    <div style={{ padding: "30px" }}>
      <h2>Cart Page</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                width="100"
                height="100"
              />

              <h3>{item.title}</h3>
              <p>Price: ₹ {item.price}</p>
              <p>Quantity: {item.quantity}</p>

              <button onClick={() => increaseQuantity(item.id)}>+</button>

              <button onClick={() => decreaseQuantity(item.id)}>-</button>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <h3>Cart Summary</h3>
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