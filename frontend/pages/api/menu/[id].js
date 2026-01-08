const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken",
    category: "Mains",
    price: 12,
    rating: 4.5,
    image: "/images/menu1.jpg",
    description: "Juicy grilled chicken served with herbs and spices.",
  },
  {
    id: 2,
    name: "Chocolate Dessert",
    category: "Desserts",
    price: 6,
    rating: 4.8,
    image: "/images/menu2.jpg",
    description: "Rich chocolate dessert topped with cream.",
  },
  {id: 4,
      name: "malinda ",
      category: "Beverages",
      price: 5,
      rating: 4.4,}
];

export default function handler(req, res) {
  const { id } = req.query;
  const item = menuItems.find((i) => i.id === Number(id));

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
}
