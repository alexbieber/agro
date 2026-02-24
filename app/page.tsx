import HeroSection from "@/components/home/HeroSection";
import OurCollections from "@/components/home/OurCollections";
import CategoryGrid from "@/components/home/CategoryGrid";
import FlashDeals from "@/components/home/FlashDeals";
import TopSelling from "@/components/home/TopSelling";
import OurVideos from "@/components/home/OurVideos";
import DistributorCTA from "@/components/home/DistributorCTA";
import WhyChoose from "@/components/home/WhyChoose";
import SubscribeSection from "@/components/home/SubscribeSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OurCollections />
      <CategoryGrid />
      <FlashDeals />
      <TopSelling />
      <OurVideos />
      <DistributorCTA />
      <WhyChoose />
      <SubscribeSection />
    </>
  );
}
