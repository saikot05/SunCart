import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";

const SummerCareTips = async () => {
  const res = await fetch(`${process.env.BETTER_AUTH_URL}/tips.json`);
  const tips = await res.json();

  return (
    <section className="py-14 px-6 bg-white">
      <div className="container mx-auto">

        <div className="text-center mb-10">
          <span className="bg-green-100 text-green-600 font-bold text-sm px-4 py-1 rounded-full inline-flex items-center gap-2 mb-3">
            <FaIcons.FaTint className="text-blue-400" />
            Expert Advice
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <FaIcons.FaRegSun className="text-orange-400" />
            Summer Care Tips
            <FaIcons.FaRegSun className="text-orange-400" />
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Keep your skin healthy, glowing, and protected all season long with
            these easy-to-follow summer essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => {
            const IconComponent = FaIcons[tip.iconName] || GiIcons[tip.iconName];

            return (
              <div
                key={tip.id}
                className={`${tip.bg} border ${tip.border} rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}
              >
                {IconComponent && (
                  <IconComponent className={`text-3xl ${tip.iconColor} mb-3`} />
                )}
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SummerCareTips;