import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FoodDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/menu/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: "80px" }}>
      <img src={item.image} width="400" />
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>⭐ {item.rating}</p>
      <h3>${item.price}</h3>

      <button>Add to Cart</button>
    </div>
  );
}
