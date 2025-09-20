import React, { useEffect, useState } from "react";

export default function OrderAll() {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setOrders(cart);

    // Calculate overall total
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const { name, email, phone, address } = userData;
    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Phone must be 10 digits.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format.");
      return;
    }

    const newOrder = {
      products: orders,
      user: userData,
      total: totalAmount,
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    localStorage.removeItem("cart");
    setOrders([]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-100 text-green-800 p-6 rounded-xl max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-2">✅ Your order is placed!</h2>
        <p className="text-gray-700">Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Bulk Order Checkout</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No items to order.</p>
      ) : (
        <div className="max-w-3xl mx-auto text-left">
          {/* Order Summary */}
          <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
            {orders.map((item, i) => (
              <div key={i} className="flex gap-4 items-center bg-white p-4 rounded shadow">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-700">
                    ₹{item.price.toFixed(2)} × {item.quantity}
                  </p>
                  <p className="font-bold text-gray-900">
                    Total: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Total */}
          <div className="text-right mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Grand Total: ₹{totalAmount.toFixed(2)}
            </h3>
          </div>

          {/* User Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={userData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold w-full"
            >
              Place Bulk Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
