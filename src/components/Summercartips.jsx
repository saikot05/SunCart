import { FaTint, FaSun, FaLeaf, FaAppleAlt, FaBed, FaUmbrella, FaRegSun } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";

const tips = [
  {
    id: 1,
    icon: <GiWaterDrop className="text-3xl text-blue-400" />,
    title: "Stay Hydrated",
    description:
      "Drink at least 8–10 glasses of water daily. Add lemon, cucumber, or mint for a refreshing twist that boosts electrolytes.",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: 2,
    icon: <FaSun className="text-3xl text-yellow-400" />,
    title: "Apply Sunscreen Daily",
    description:
      "Use SPF 30+ sunscreen every morning, even on cloudy days. Reapply every 2 hours when outdoors for maximum protection.",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  {
    id: 3,
    icon: <FaLeaf className="text-3xl text-green-400" />,
    title: "Lightweight Skincare",
    description:
      "Switch to gel-based or water-based moisturizers. Swap heavy creams for serums to avoid clogged pores in the heat.",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    id: 4,
    icon: <FaAppleAlt className="text-3xl text-red-400" />,
    title: "Eat Seasonal Fruits",
    description:
      "Load up on watermelon, mangoes, and berries. These hydrating, antioxidant-rich fruits keep your skin glowing all summer.",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    id: 5,
    icon: <FaUmbrella className="text-3xl text-purple-400" />,
    title: "Seek Shade Wisely",
    description:
      "Avoid direct sun exposure between 10 AM–4 PM. Use hats, sunglasses, and umbrellas to shield yourself outdoors.",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    id: 6,
    icon: <FaBed className="text-3xl text-pink-400" />,
    title: "Night Recovery Routine",
    description:
      "Use aloe vera gel or a light night cream after sun exposure. Let your skin repair overnight with proper cleansing.",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
];

const SummerCareTips = () => {
  return (
    <section className="py-14 px-6 bg-white">
      <div className="container mx-auto">

        <div className="text-center mb-10">
          <span className="bg-green-100 text-green-600 font-bold text-sm px-4 py-1 rounded-full inline-flex items-center gap-2 mb-3">
            <FaTint className="text-blue-400" />
            Expert Advice
          </span>

          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2 ">
              <FaRegSun className="text-orange-400" /> Summer Care Tips <FaRegSun className="text-orange-400" />
          </h2>

          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Keep your skin healthy, glowing, and protected all season long with
            these easy-to-follow summer essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`${tip.bg} border ${tip.border} rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="mb-3">{tip.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SummerCareTips;