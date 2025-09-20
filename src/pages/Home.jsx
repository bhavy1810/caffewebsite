import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

export default function ClassicHome() {
  const slides = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?w=600&auto=format&fit=crop&q=60",
      caption: "Freshly Brewed Coffee",
    },
    {
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      caption: "Delicious Burgers",
    },
    {
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=60",
      caption: "Frosty Cold Drinks",
    },
  ];

  const defaultReviews = [
    {
      name: "Anjali S.",
      message: "Absolutely love the ambiance and the food quality. Highly recommended!",
    },
    {
      name: "Ravi K.",
      message: "The burger was juicy and fresh. Best café in town!",
    },
    {
      name: "Priya M.",
      message: "Friendly staff and cozy atmosphere. Will visit again!",
    },
    {
      name: "Aman T.",
      message: "Great coffee and even better service. A perfect spot to relax and work.",
    },
    {
      name: "Sneha R.",
      message: "Loved the variety on the menu. Everything we tried was delicious!",
    },
    {
      name: "Karan V.",
      message: "A hidden gem! Clean, comfortable, and the desserts are to die for.",
    },
  ];

  const [reviews, setReviews] = useState(defaultReviews);
  const [yourReview, setYourReview] = useState({ name: "", message: "" });

  useEffect(() => {
    const storedReview = JSON.parse(localStorage.getItem("yourReview"));
    if (storedReview) {
      setReviews((prev) => [...prev, storedReview]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYourReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!yourReview.name.trim() || !yourReview.message.trim()) return;
    localStorage.setItem("yourReview", JSON.stringify(yourReview));
    setReviews((prev) => [...prev, yourReview]);
    setYourReview({ name: "", message: "" });
  };

  const handleDeleteReview = () => {
    localStorage.removeItem("yourReview");
    setReviews((prev) =>
      prev.filter((rev) => rev.name !== JSON.parse(localStorage.getItem("yourReview"))?.name)
    );
    window.location.reload();
  };

  const hasYourReview = localStorage.getItem("yourReview");

  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Swiper Section */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-[450px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.caption}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <motion.h2
                  key={slide.caption}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-white text-3xl font-bold drop-shadow-lg text-center"
                >
                  {slide.caption}
                </motion.h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Welcome Section with Parallax Effect */}
      <motion.div
        className="text-center p-10"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-4xl font-bold mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          Welcome to Classic Café
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-xl mx-auto"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Enjoy the finest selection of freshly prepared food and beverages. Visit us for a delightful experience!
        </motion.p>
      </motion.div>

      {/* Review Section */}
      <div className="bg-gray-100 py-10 px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Our Customers Say
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-xl shadow p-6 max-w-xs text-center relative hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
              <p className="text-gray-600 text-sm">{review.message}</p>
              {hasYourReview &&
                review.name === JSON.parse(localStorage.getItem("yourReview"))?.name && (
                  <button
                    onClick={handleDeleteReview}
                    className="absolute top-2 right-2 text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                )}
            </motion.div>
          ))}
        </motion.div>

        {/* Add Review Form */}
        {!hasYourReview && (
          <motion.form
            onSubmit={handleReviewSubmit}
            className="bg-white max-w-md mx-auto p-6 rounded-xl shadow space-y-4"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Add Your Review</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={yourReview.name}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Your Experience"
              value={yourReview.message}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <motion.button
              type="submit"
              className="bg-gray-800 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold w-full"
              whileTap={{ scale: 0.95 }}
            >
              Submit Review
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}
