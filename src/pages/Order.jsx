import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Order() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const image = searchParams.get("image");
  const quantity = parseInt(searchParams.get("quantity") || "1", 10);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();

    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const orderData = {
      products: [
        {
          title,
          price,
          image,
          quantity,
        },
      ],
      user: formData,
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, orderData]));
    setOrderPlaced(true);
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 my-4">Order Details</h1>
      {orderPlaced ? (
        <div className="bg-green-100 text-green-800 p-6 rounded-xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2 my-4">✅ Your order is placed!</h2>
          <p className="text-gray-700">Thank you for your purchase.</p>
        </div>
      ) : title && price ? (
        <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-32 h-32 object-cover mx-auto mb-4 rounded-lg"
            />
          )}
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-700 mb-1">
            Quantity: <strong>{quantity}</strong>
          </p>
          <p className="text-gray-700 mb-4">
            Price: <strong>{price}</strong>
          </p>
          <form onSubmit={handleSaveDetails} className="text-left space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold w-full"
            >
              Save Details & Pay Now
            </button>
          </form>
        </div>
      ) : (
        <p className="text-gray-500">No item selected.</p>
      )}
    </div>
  );
}
