"use client";

import Link from "next/link";
import { FiArrowLeft, FiTrash2, FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { TbShoppingCartOff } from "react-icons/tb";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

const CartPage = () => {
  const { items, removeFromCart, increaseQty, decreaseQty, clearCart, totalPrice, totalCount } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast.error(`"${item.name}" removed from cart`);
  };

  const handleClear = () => {
    clearCart();
    toast.info("Cart cleared");
  };

  return (
    <section className="py-14 px-6 bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-4xl">

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors mb-8 group"
        >
          <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Products</span>
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-base-content flex items-center gap-2">
            <FiShoppingCart className="text-orange-500" />
            Your Cart
            {totalCount > 0 && (
              <span className="text-lg font-semibold text-base-content/50">({totalCount} items)</span>
            )}
          </h1>
          {items.length > 0 && (
            <button
              onClick={handleClear}
              className="btn btn-outline btn-error btn-sm gap-2"
            >
              <FiTrash2 size={14} />
              Clear All
            </button>
          )}
        </div>

       
        {items.length === 0 ? (
          <div className="text-center py-24 text-base-content/50">
            <TbShoppingCartOff className="text-7xl mx-auto mb-4 text-orange-300" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-sm mt-1 mb-6">Add some products to get started</p>
            <Link
              href="/products"
              className="btn bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 rounded-full"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">

           
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-base-100 rounded-2xl shadow-md p-4 flex items-center gap-4"
              >
               
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base-content line-clamp-1">{item.name}</p>
                  <p className="text-sm text-base-content/50">{item.brand}</p>
                  <p className="text-pink-500 font-extrabold mt-1">${item.price}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="btn btn-ghost btn-xs btn-circle border border-base-300"
                  >
                    <FiMinus size={12} />
                  </button>
                  <span className="font-bold w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="btn btn-ghost btn-xs btn-circle border border-base-300"
                  >
                    <FiPlus size={12} />
                  </button>
                </div>

                <p className="font-extrabold text-base-content w-16 text-right shrink-0">
                  ${(item.price * item.qty).toFixed(2)}
                </p>

               
                <button
                  onClick={() => handleRemove(item)}
                  className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10 shrink-0"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}

            <div className="bg-base-100 rounded-2xl shadow-md p-6 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base-content/60">Items ({totalCount})</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="divider my-2" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-base-content">Total</span>
                <span className="text-2xl font-extrabold text-base-content">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Link href="/checkout" className="btn w-full btn-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold border-0 rounded-full hover:scale-105 transition-transform duration-200">
                Proceed to Checkout
              </Link>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default CartPage;