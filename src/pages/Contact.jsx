import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    messages.push(formData);
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="px-6 py-12 text-center">
      <h2 className="text-3xl font-bold mb-4 my-3">Contact Us</h2>
      <p className="text-gray-600 mb-6">We’d love to hear from you!</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 text-left"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
          required
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Send
        </button>
      </form>
    </section>
  );
}
