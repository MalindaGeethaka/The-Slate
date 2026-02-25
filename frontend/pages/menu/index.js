import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuHero from "../../src/components/Menu/MenuHero";
import MenuFilters from "../../src/components/Menu/MenuFilters";
import MenuGrid from "../../src/components/Menu/MenuGrid";

export default function MenuPage() {
  const router = useRouter();

  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("All");
  

  
  useEffect(() => {
    fetch("http://localhost:5005/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);


  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  
  const handleAddToCart = (item) => {
  const itemId = item._id || item.id;
  router.push(`/menu/${itemId}`);
};

  return (
    <>
      <MenuHero />
      <MenuFilters active={category} setActive={setCategory} />

      <MenuGrid items={filteredItems} onAddToCart={handleAddToCart} />
    </>
  );
}
