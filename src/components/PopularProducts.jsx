import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaFire } from "react-icons/fa";
import { GiSunflower } from "react-icons/gi";
import ProductsCard from "./ProductsCard";
import products from "../../public/products.json";
const PopularProducts = async () => {
  // const res = await fetch(`${process.env.BETTER_AUTH_URL}/products.json`);
  // const products = await res.json();
  const featured = products.slice(0, 3);

  return (
    <section className="py-14 px-6 bg-base-200">
      <div className="container mx-auto">

        <div className="text-center mb-10">
          <span className="bg-orange-100 text-orange-500 font-bold text-sm px-4 py-1 rounded-full inline-flex items-center gap-2 mb-3">
            <GiSunflower className="text-yellow-500 text-lg" />
            Summer Collection
          </span>
          <h2 className="text-3xl font-extrabold text-base-content flex items-center justify-center gap-2">
            <FaFire className="text-orange-500" />
            Popular Products
            <FaFire className="text-orange-500" />
          </h2>
          <p className="text-base-content/60 mt-2">Top picks just for you this summer</p>
          <Link href="/products">
            <button className="mt-4 inline-flex items-center gap-2 text-pink-500 font-semibold hover:gap-3 transition-all">
              See All Products <FaArrowRight />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => <ProductsCard key={product.id} product={product} />       
        )}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;