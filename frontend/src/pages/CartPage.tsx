import { useCart } from "../contexts/Cart/CartContext";

export default function CartPage() {
  const { cartItems, totalAmount } = useCart();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.map((item) => (
        <div key={item.productId}>
          <h2>{item.title}</h2>
        </div>  
      ))}
      <h1>Total: ${totalAmount}</h1>
    </div>
  );
}
