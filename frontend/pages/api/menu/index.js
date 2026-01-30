export default function handler(req, res) {
  const menuItems = [
    {
      id: 1,
      name: "Grilled Chicken",
      category: "Mains",
      price: 12,
      rating: 4.5,
      description: "Delicious grilled chicken with herbs",
      
    },
    {
      id: 2,
      name: "Chocolate Dessert",
      category: "Desserts",
      price: 6,
      rating: 4.8,
      description: "Rich chocolate dessert topped with cream.",
      
    },
    {
      id: 3,
      name: "Cappuccino",
      category: "Coffee",
      price: 4,
      rating: 4.6,
      description: "Freshly brewed cappuccino with frothy milk.",
    },
    {
      id: 4,
      name: "malinda ",
      category: "Beverages",
      price: 5,
      rating: 4.4,
    },
  ];

  res.status(200).json(menuItems);
}
