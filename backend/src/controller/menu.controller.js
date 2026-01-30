import Menu from "../models/menu.model.js";


export const getAllMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu", error: error.message });
  }
};


export const getMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item", error: error.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newItem = new Menu({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create item", error: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.price) updates.price = Number(req.body.price);
if (req.body.stock) updates.stock = Number(req.body.stock);
    if (req.body.category) updates.category = req.body.category;

    
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await Menu.findByIdAndUpdate(itemId, updates, { new: true });

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



export const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message });
  }
};
