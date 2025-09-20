import React, { useState } from "react";

export default function Menu() {
  const [messageItem, setMessageItem] = useState(null);

  const normalizePrice = (priceValue) => {
    return typeof priceValue === "string"
      ? parseInt(priceValue.replace(/[^\d]/g, ""), 10)
      : priceValue;
  };

  const handleAddToCart = (item) => {
    const cleanItem = { ...item, price: normalizePrice(item.price) };
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemExists = currentCart.some(
      (cartItem) => cartItem.title === cleanItem.title
    );

    if (itemExists) {
      setMessageItem({ ...cleanItem, alreadyInCart: true });
      setTimeout(() => setMessageItem(null), 3000);
      return;
    }

    localStorage.setItem("cart", JSON.stringify([...currentCart, cleanItem]));
    setMessageItem({ ...cleanItem, alreadyInCart: false });
    setTimeout(() => setMessageItem(null), 3000);
  };

  const items = [
    {
      title: "Coffee",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
      description: "Freshly brewed aromatic coffee.",
      price: "₹120",
    },
    {
      title: "Burger",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      description: "Juicy, gourmet-style burgers.",
      price: "₹220",
    },
    {
      title: "Cold Drinks",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMGRyaW5rc3xlbnwwfHwwfHx8MA%3D%3D",
      description: "Chilled and fizzy cold drinks.",
      price: "₹90",
    },
    {
      title: "Pizza",
      image: "https://media.istockphoto.com/id/187248625/photo/pepperoni-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=clncU414Y_vfH-OoUqiwy5AnZRwBpeSehVqJkD9SvKU=",
      description: "Hot and cheesy Italian pizza.",
      price: "₹350",
    },
    {
      title: "Pasta",
      image: "https://media.istockphoto.com/id/482964545/photo/arrabiata-pasta.webp?a=1&b=1&s=612x612&w=0&k=20&c=WgBDLDed6qro4H1gamjxl5hWALBdXm6T0UGSU3d6TRo=",
      description: "Classic creamy pasta dishes.",
      price: "₹280",
    },
    {
      title: "Sandwich",
      image: "https://media.istockphoto.com/id/1328164559/photo/veg-grilled-sandwich.webp?a=1&b=1&s=612x612&w=0&k=20&c=IBfcvfvBp6KnM0eOmhvDCOJVeRjx7tXgXQ8VYFWxou0=",
      description: "Fresh and tasty sandwiches.",
      price: "₹160",
    },
    {
      title: "Donuts",
      image: "https://media.istockphoto.com/id/465529983/photo/field-of-different-types-of-donuts.webp?a=1&b=1&s=612x612&w=0&k=20&c=uSJi2YzX0ioiD2s50dyBxnhV1UJqN6oeAuwGT5ZuQ9Y=",
      description: "Sweet and colorful donuts.",
      price: "₹100",
    },
    {
      title: "Ice Cream",
      image: "https://media.istockphoto.com/id/1456234806/photo/mango-ice-cream-served-in-cup-isolated-on-grey-background-top-view-of-indian-and-bangladesh.webp?a=1&b=1&s=612x612&w=0&k=20&c=-AMw3wM-DpIdEPuS58ZqV4BAd-VKTmN6tFUtmo1degg=",
      description: "Delicious and creamy ice cream.",
      price: "₹90",
    },
    {
      title: "French Fries",
      image: "https://media.istockphoto.com/id/1218213212/photo/homemade-french-fries-with-ketchup-and-mayonnaise-on-rustic-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=QYwXP0-whoz7Cni7CXNfIyT_pOcRpZUYHqkTYH4MEhA=",
      description: "Crispy golden french fries.",
      price: "₹130",
    },
    {
      title: "Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      description: "Rich and moist layered cakes.",
      price: "₹300",
    },
    {
      title: "Smoothie",
      image: "https://media.istockphoto.com/id/1305291791/photo/mixed-berries-smoothie-bowl-on-rustic-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=UmKQRxqZYvK0LCyxe-gEAaAmcplrfxjLzZOphyJnqFY=",
      description: "Healthy and fruity smoothies.",
      price: "₹140",
    },
    {
      title: "Tea",
      image: "https://media.istockphoto.com/id/1336601313/photo/top-view-of-indian-herbal-masala-chai-or-traditional-beverage-tea-with-milk-and-spices-kerala.webp?a=1&b=1&s=612x612&w=0&k=20&c=MbKwu6EcL6HdYiE-yVYC6th6VW1p48fXxnun13yQw6E=",
      description: "Relaxing herbal and milk teas.",
      price: "₹80",
    },
  ];

  return (
    <div className="text-center p-10">
      {messageItem && (
        <div className="fixed top-5 right-5 bg-yellow-600 text-black px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50">
          <img
            src={messageItem.image}
            alt={messageItem.title}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <p className="font-semibold">{messageItem.title}</p>
            {messageItem.alreadyInCart ? (
              <p className="text-sm text-red-800">Already in cart</p>
            ) : (
              <p className="text-sm">Added to cart</p>
            )}
          </div>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8 my-3">Menu</h1>
      <p className="text-gray-600 mb-10">Enjoy our finest brews and treats.</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:shadow-color-800 hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 text-left">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-gray-800 font-bold mb-4">{item.price}</p>
              <button
                onClick={() =>
                  window.open("/order").focus()
                }
                className="bg-gray-800 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold w-full"
              >
                Order Now
              </button>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-gray-800 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold w-full mt-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}