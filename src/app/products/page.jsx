import { GiSunflower } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import ProductsCard from "@/components/ProductsCard";

const Products = async () => {
  const res = await fetch("http://localhost:3000/products.json");
  const products = await res.json();

  return (
    <section className="py-14 px-6 bg-base-200 min-h-screen">
      <div className="container mx-auto">

        <div className="text-center mb-10">
          <span className="bg-orange-100 text-orange-500 font-bold text-sm px-4 py-1 rounded-full inline-flex items-center gap-2 mb-3">
            <GiSunflower className="text-yellow-500 text-lg" />
            Summer Collection
          </span>
          <h2 className="text-3xl font-extrabold text-base-content flex items-center justify-center gap-2">
            <FaFire className="text-orange-500" />
            All Products
            <FaFire className="text-orange-500" />
          </h2>
          <p className="text-base-content/60 mt-2">
            Explore our full summer collection : {products.length} products available
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;