import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FoodDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/menu/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  const handleAddToCart = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push(`/client/login?redirect=${router.asPath}`);
    return;
  }
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingIndex = cart.findIndex((i) => i.id === item.id);

  if (existingIndex >= 0) {

    cart[existingIndex].quantity += quantity;
  } else {
   
    cart.push({ ...item, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${item.name} x${quantity} added to cart`);
  console.log(cart);
};

  return (
    <div style={{ padding: "80px" }}>
      <img src={item.image} width="400" />
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>⭐ {item.rating}</p>
      <h3>${item.price}</h3>

      <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
