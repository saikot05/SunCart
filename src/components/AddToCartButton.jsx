"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

const AddToCartButton = ({ product, disabled }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`"${product.name}" added to cart!`);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className="btn w-full btn-lg gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold py-2 rounded-full hover:scale-105 transition-transform duration-200"
    >
      <FiShoppingCart size={20} />
      {disabled ? "Out of Stock" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;