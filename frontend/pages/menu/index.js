import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuHero from "../../src/components/Menu/MenuHero";
import MenuFilters from "../../src/components/Menu/MenuFilters";
import MenuGrid from "../../src/components/Menu/MenuGrid";

export default function MenuPage() {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("All");
  

  // Load menu items
  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  // Filter by category
  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  // Add to cart handler
  const handleAddToCart = (item) => {
    router.push(`/menu/${item.id}`);
  };

  return (
    <>
      <MenuHero />
      <MenuFilters active={category} setActive={setCategory} />

      <MenuGrid items={filteredItems} onAddToCart={handleAddToCart} />
    </>
  );
}
