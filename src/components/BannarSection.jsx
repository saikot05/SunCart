import Image from "next/image";
import { FaArrowRight, FaFire, FaShoppingCart } from "react-icons/fa";


const BannarSection = () => {
    return (
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white">
      <div className="container mx-auto flex justify-between flex-col md:flex-row items-center gap-10 py-16 px-6">

    
        <div className="flex-1 text-center md:text-left">
          <span className="bg-white text-pink-500 font-bold text-sm px-4 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1">
            <FaFire className="text-orange-500" /> Hot Deals
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-3">
            Summer Sale <span className="text-yellow-300">50% OFF</span>
          </h1>
          <p className="text-lg mb-6 text-white/90">
            Grab the best deals before they&apos;re gone!
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="bg-white text-pink-500 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
              <FaShoppingCart /> Shop Now
            </button>
            <button className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-pink-500 transition-all inline-flex items-center gap-2">
              Explore <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="relative w-full  md:flex-1">
          <Image
            src="/assets/Bannar.jpg"
            alt="Summer Sale Banner"
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl object-cover"
            priority
          />
        </div>

      </div>
    </div>
    );
};

export default BannarSection;