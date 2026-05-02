import { GiSunflower } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import ProductsCard from "@/components/ProductsCard";
import SearchFilter from "@/components/SearchFilter";
import products from "../../../public/products.json";
const Products = async ({ searchParams }) => {
  // const res = await fetch(`${process.env.BETTER_AUTH_URL}/products.json`);
  // const products = await res.json();

  const { q, category: selectedCategory = "" } = await searchParams; 
  const query = q?.toLowerCase() ?? "";                               

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  const afterSearch = products.filter((p) => {
    if (!query) return true;
    return (
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    );
  });

  const sorted = [...afterSearch].sort((a, b) => {
    if (!selectedCategory) return 0;
    return (a.category === selectedCategory ? -1 : 1) - (b.category === selectedCategory ? -1 : 1);
  });

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

        <SearchFilter categories={categories} />

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {sorted.map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
              highlighted={!selectedCategory || product.category === selectedCategory}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;