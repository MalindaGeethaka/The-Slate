import { useEffect, useState } from "react";
import AdminLayout from "../admin/AdminLayout";
import axios from "axios";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/menu");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const resetForm = () => {
  setForm({
    id: "",            // reset id (for editing)
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "All",   
    image: null,       
  });
  setIsEditing(false); 
};

  // Add new menu item
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataObj = new FormData();
    formDataObj.append("name", form.name);
    formDataObj.append("description", form.description);
    formDataObj.append("price", form.price);
    formDataObj.append("stock", form.stock);
    formDataObj.append("category", form.category);
    if (form.image) formDataObj.append("image", form.image);

    if (isEditing) {
      await axios.put(`http://localhost:5005/api/menu/${form.id}`, formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
    } else {
      
      await axios.post("http://localhost:5005/api/menu", formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    fetchMenu(); // refresh table
    resetForm();
  } catch (err) {
    console.error(err);
    alert("Failed to save item");
  }
};


  //Edit item
  const handleEdit = (item) => {
  setForm({
    id: item._id,
    name: item.name,
    description: item.description,
    price: item.price,
    stock: item.stock,
    category: item.category,
    image: null, 
  });
  setIsEditing(true); 
};



  // Delete item
  const deleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5005/api/menu/${id}`, {
        headers: { Authorization: token },
      });
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  return (
    <AdminLayout>
      <h1>Menu Management</h1>

     
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Mains">Mains</option>
          <option value="Beverages">Beverages</option>
          <option value="Desserts">Desserts</option>
          <option value="Coffee">Coffee</option>
          <option value="Snacks">Snacks</option>
        </select>
       
       <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />

        <button type="submit">{isEditing ? "Update Item" : "Add Item"}</button>
      </form>

      {/* Menu Table */}
      <table
        style={{
          width: "100%",
          marginTop: "30px",
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>Rs. {item.price}</td>
              <td>{item.stock}</td>
              <td>{item.category}</td>
              <td>{item.rating}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
