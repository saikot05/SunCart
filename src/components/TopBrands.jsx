import { FaMedal, FaCheckCircle } from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";

const TopBrands = async () => {
  const res = await fetch("http://localhost:3000/brands.json");
  const brands = await res.json();

  return (
    <section className="py-14 px-6 bg-white">
      <div className="container mx-auto">

        <div className="text-center mb-10">
          <span className="bg-pink-100 text-pink-500 font-bold text-sm px-4 py-1 rounded-full inline-flex items-center gap-2 mb-3">
            <FaMedal className="text-yellow-400" />
            Trusted Names
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <GiDiamondRing className="text-pink-400" />
            Top Brands
            <GiDiamondRing className="text-pink-400" />
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Explore products from our most trusted and loved beauty & skincare brands this summer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className={`group ${brand.bgLight} border ${brand.borderColor} rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden`}
            >
              <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${brand.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />

              <div className="text-5xl mb-4">{brand.logo}</div>

              <h3 className={`text-xl font-extrabold ${brand.textColor} mb-1`}>
                {brand.name}
              </h3>
              <p className="text-gray-600 text-sm font-medium mb-3">
                {brand.tagline}
              </p>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FaCheckCircle className={brand.textColor} />
                  {brand.since}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <HiSparkles className={brand.textColor} />
                  {brand.products}
                </span>
              </div>

              <p className={`mt-4 text-xs font-bold ${brand.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                Shop Brand →
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopBrands;