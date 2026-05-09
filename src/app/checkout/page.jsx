"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiShoppingBag, FiCheck, FiLock } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, totalPrice, totalCount, clearCart } = useCart();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderId] = useState(() =>
    `SC-${Date.now().toString(36).toUpperCase()}`
  );

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.zip.trim()) newErrors.zip = "Required";
    if (!form.country.trim()) newErrors.country = "Required";
    if (form.paymentMethod === "card") {
      if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, "").length < 16)
        newErrors.cardNumber = "Valid 16-digit card number required";
      if (!form.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(form.cardExpiry))
        newErrors.cardExpiry = "MM/YY format required";
      if (!form.cardCVC.trim() || form.cardCVC.length < 3)
        newErrors.cardCVC = "Valid CVC required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before placing your order.");
      return;
    }
    setLoading(true);
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    setOrdered(true);
    setLoading(false);
  };

  const formatCard = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  // ─── Success Screen ────────────────────────────────────────────────────────
  if (ordered) {
    return (
      <section className="min-h-screen bg-base-200 flex items-center justify-center py-20 px-6">
        <div className="bg-base-100 rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-base-content mb-2">Order Placed! 🎉</h1>
          <p className="text-base-content/60 mb-1">Thank you for shopping with SunCart.</p>
          <p className="text-base-content/50 text-sm mb-6">
            Your order <span className="font-bold text-orange-500">{orderId}</span> has been
            confirmed and will be shipped soon.
          </p>
          <div className="bg-base-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <MdOutlineLocalShipping size={28} className="text-orange-400 shrink-0" />
            <p className="text-sm text-base-content/70 text-left">
              Estimated delivery: <span className="font-semibold text-base-content">3–5 business days</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/products"
              className="btn btn-lg w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 rounded-full font-bold"
            >
              Continue Shopping
            </Link>
            <Link href="/" className="btn btn-ghost btn-lg w-full rounded-full">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ─── Empty Cart Guard ──────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-base-200 flex items-center justify-center py-20 px-6">
        <div className="bg-base-100 rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <FiShoppingBag size={64} className="mx-auto mb-4 text-orange-300" />
          <h1 className="text-2xl font-extrabold mb-2 text-base-content">Nothing to checkout</h1>
          <p className="text-base-content/50 mb-6">Add items to your cart first.</p>
          <Link
            href="/products"
            className="btn btn-lg w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 rounded-full font-bold"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  // ─── Main Checkout ─────────────────────────────────────────────────────────
  return (
    <section className="py-14 px-6 bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-6xl">

        {/* Back link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors mb-8 group"
        >
          <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Cart</span>
        </Link>

        <h1 className="text-3xl font-extrabold text-base-content mb-8 flex items-center gap-2">
          <FiShoppingBag className="text-orange-500" /> Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left: Shipping + Payment ────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Shipping Info */}
              <div className="bg-base-100 rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                  <MdOutlineLocalShipping className="text-orange-500" size={22} />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={`input input-bordered w-full rounded-xl ${errors.firstName ? "input-error" : ""}`}
                    />
                    {errors.firstName && (
                      <p className="text-error text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={`input input-bordered w-full rounded-xl ${errors.lastName ? "input-error" : ""}`}
                    />
                    {errors.lastName && (
                      <p className="text-error text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`input input-bordered w-full rounded-xl ${errors.email ? "input-error" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-error text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 555 000 0000"
                      className={`input input-bordered w-full rounded-xl ${errors.phone ? "input-error" : ""}`}
                    />
                    {errors.phone && (
                      <p className="text-error text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address (full width) */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St, Apt 4B"
                      className={`input input-bordered w-full rounded-xl ${errors.address ? "input-error" : ""}`}
                    />
                    {errors.address && (
                      <p className="text-error text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className={`input input-bordered w-full rounded-xl ${errors.city ? "input-error" : ""}`}
                    />
                    {errors.city && (
                      <p className="text-error text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* ZIP */}
                  <div>
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      className={`input input-bordered w-full rounded-xl ${errors.zip ? "input-error" : ""}`}
                    />
                    {errors.zip && (
                      <p className="text-error text-xs mt-1">{errors.zip}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-base-content/70 mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className={`select select-bordered w-full rounded-xl ${errors.country ? "select-error" : ""}`}
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="BD">Bangladesh</option>
                      <option value="IN">India</option>
                      <option value="PK">Pakistan</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.country && (
                      <p className="text-error text-xs mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-base-100 rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                  <FiLock className="text-orange-500" size={18} />
                  Payment Method
                </h2>

                {/* Method toggle */}
                <div className="flex gap-3 mb-5">
                  {["card", "paypal", "cod"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, paymentMethod: method }))}
                      className={`btn btn-sm rounded-full font-semibold capitalize transition-all ${
                        form.paymentMethod === method
                          ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0"
                          : "btn-outline"
                      }`}
                    >
                      {method === "cod" ? "Cash on Delivery" : method === "paypal" ? "PayPal" : "Credit / Debit Card"}
                    </button>
                  ))}
                </div>

                {/* Card Fields */}
                {form.paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-base-content/70 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, cardNumber: formatCard(e.target.value) }))
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`input input-bordered w-full rounded-xl font-mono tracking-widest ${
                          errors.cardNumber ? "input-error" : ""
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-error text-xs mt-1">{errors.cardNumber}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-base-content/70 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={form.cardExpiry}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, cardExpiry: formatExpiry(e.target.value) }))
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`input input-bordered w-full rounded-xl font-mono ${
                            errors.cardExpiry ? "input-error" : ""
                          }`}
                        />
                        {errors.cardExpiry && (
                          <p className="text-error text-xs mt-1">{errors.cardExpiry}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-base-content/70 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCVC"
                          value={form.cardCVC}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              cardCVC: e.target.value.replace(/\D/g, "").slice(0, 4),
                            }))
                          }
                          placeholder="123"
                          maxLength={4}
                          className={`input input-bordered w-full rounded-xl font-mono ${
                            errors.cardCVC ? "input-error" : ""
                          }`}
                        />
                        {errors.cardCVC && (
                          <p className="text-error text-xs mt-1">{errors.cardCVC}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {form.paymentMethod === "paypal" && (
                  <div className="bg-base-200 rounded-xl p-5 text-center text-base-content/60 text-sm">
                    You will be redirected to PayPal to complete payment after placing the order.
                  </div>
                )}

                {form.paymentMethod === "cod" && (
                  <div className="bg-base-200 rounded-xl p-5 text-center text-base-content/60 text-sm">
                    Pay with cash when your order is delivered to your door.
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Order Summary ─────────────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="bg-base-100 rounded-2xl shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-bold text-base-content mb-4">Order Summary</h2>

                {/* Items list */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-base-content line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-base-content/50">Qty: {item.qty}</p>
                      </div>
                      <p className="text-xs font-bold text-base-content shrink-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="divider my-2" />

                {/* Price breakdown */}
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-base-content/60">
                    <span>Subtotal ({totalCount} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base-content/60">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-success font-semibold" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base-content/60">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                {totalPrice < 50 && (
                  <p className="text-xs text-orange-500 mb-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg p-2 text-center">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}

                <div className="divider my-2" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-base-content">Total</span>
                  <span className="text-2xl font-extrabold text-base-content">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-full btn-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold border-0 rounded-full hover:scale-105 transition-transform duration-200 disabled:opacity-70 disabled:scale-100"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <FiLock size={16} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-base-content/40 mt-3 flex items-center justify-center gap-1">
                  <FiLock size={11} /> Secured with SSL encryption
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
