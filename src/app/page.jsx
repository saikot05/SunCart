import BannarSection from "@/components/BannarSection";
import PopularProducts from "@/components/PopularProducts";
import SummerCareTips from "@/components/Summercartips";
import TopBrands from "@/components/TopBrands";


export default function Home() {
  return (
      <div>
            <BannarSection />
            <PopularProducts />
            <SummerCareTips />
            <TopBrands />
      </div> 
    );
}