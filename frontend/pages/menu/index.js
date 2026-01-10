import { useEffect, useState } from "react";
import MenuHero from "../../src/components/Menu/MenuHero";
import MenuFilters from "../../src/components/Menu/MenuFilters";
import MenuGrid from "../../src/components/Menu/MenuGrid";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  return (
    <>
      <MenuHero />
      <MenuFilters active={category} setActive={setCategory} />
      <MenuGrid items={filteredItems} />
      
    </>
  );
}