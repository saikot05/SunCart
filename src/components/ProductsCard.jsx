import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FiTag } from "react-icons/fi";

const ProductsCard = ({ product, highlighted = true }) => {
  return (
    <div
      className={`bg-base-100 border border-base-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group
        ${highlighted ? "scale-[1.02] ring-2 ring-orange-400" : "opacity-60"}`}
    >

      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary badge-lg font-semibold gap-1">
            <FiTag size={12} />
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          <FaStar />
          <span className="text-base-content font-semibold text-sm">
            {product.rating}
          </span>
        </div>

        <p className="text-pink-500 font-extrabold text-xl mb-4">
          ${product.price}
        </p>

        <Link href={`/products/${product.id}`}>
          <button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold py-2 rounded-full hover:scale-105 transition-transform duration-200">
            View Details
          </button>
        </Link>
      </div>

    </div>
  );
};

export default ProductsCard;