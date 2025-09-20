import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    const itemsWithQuantity = items.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
      price:
        typeof item.price === "string"
          ? parseInt(item.price.replace(/[^\d]/g, ""), 10)
          : item.price,
    }));
    setCartItems(itemsWithQuantity);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };
  
  const handleOrdernow = (item) => {
    const query = new URLSearchParams({
      title: item.title,
      price: (item.price * item.quantity).toFixed(2),
      image: item.image,
      quantity: item.quantity.toString(),
    }).toString();
    window.open(`/order?${query}`, "_blank");
    removeFromCart(cartItems.indexOf(item));
    updateLocalStorage(cartItems.filter((i) => i !== item));
  };

  const handleOrderAll = () => {
    if (cartItems.length === 0) return;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.open("/order");
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const handleRemoveAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  }

  const changeQuantity = (index, delta) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + delta;
    if (newQuantity < 1) return;
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6 my-3">Your Cart</h1>

      {cartItems.length > 0 ? (
        <>
          <div className="mb-6">
            <button
              onClick={handleOrderAll}
              className="bg-gray-800 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl font-semibold"
            >
              Order All
            </button>
            <button
              onClick={handleRemoveAll}
              className="bg-gray-800 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl font-semibold ml-4"
            >
              Remove All
            </button>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow text-left flex flex-col justify-between"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700 text-sm mb-1">
                  Price: ₹{item.price.toFixed(2)}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 text-sm">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQuantity(index, -1)}
                      className="bg-gray-300 text-black px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(index, 1)}
                      className="bg-gray-300 text-black px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-gray-900 font-bold mb-4">
                  Total: ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="mt-2 space-y-2">
                  <button
                    onClick={() => handleOrdernow(item)}
                    className="w-full bg-gray-800 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Order Now
                  </button>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="w-full bg-gray-800 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
