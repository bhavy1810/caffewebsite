import React, { useEffect, useState } from "react";

export default function YourOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const normalizePrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
    }
    return price || 0;
  };

  const handleRemoveOrder = (indexToRemove) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToRemove);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No recent orders found.</p>
    );
  }


  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 my-3">Your Orders</h1>
      <div className="space-y-10">
        {orders.map((order, index) => {
          const products = order.products || [];
          const orderTotal = products.reduce(
            (acc, item) =>
              acc + normalizePrice(item.price) * (item.quantity || 1),
            0
          );
          return (
            <div
              key={index}
              className="relative bg-white shadow p-6 rounded-xl border border-gray-200"
            >
              <button
                onClick={() => handleRemoveOrder(index)}
                className="absolute top-3 right-3 text-gray-800 hover:text-yellow-600 text-xl"
                title="Remove Order"
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-4">Order #{index + 1}</h2>

              {products.length > 0 ? (
                products.map((product, pIndex) => (
                  <div
                    key={pIndex}
                    className="flex items-center gap-4 border-b pb-4 mb-4"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <p className="text-gray-700">
                        Quantity: {product.quantity || 1}
                      </p>
                      <p className="text-gray-700">
                        Price: ₹{normalizePrice(product.price).toFixed(2)}
                      </p>
                      <p className="text-gray-700">
                        Total Price: ₹
                        {(
                          normalizePrice(product.price) *
                          (product.quantity || 1)
                        ).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        Ordered on: {order.date}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No products found in this order.</p>
              )}

             
              {products.length > 1 && (
  <div className="text-right mb-6">
    <h3 className="text-xl font-bold text-gray-800">
      Grand Total: ₹{orderTotal.toFixed(2)}
    </h3>
  </div>
)}
              {/* Customer Info */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Customer Details</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>
                    <strong>Name:</strong> {order.user?.name || "N/A"}
                  </li>
                  <li>
                    <strong>Email:</strong> {order.user?.email || "N/A"}
                  </li>
                  <li>
                    <strong>Phone:</strong> {order.user?.phone || "N/A"}
                  </li>
                  <li>
                    <strong>Address:</strong> {order.user?.address || "N/A"}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
