import ContentBar from "@/components/feed/ContentBar";
import FeedContent from "@/components/feed/FeedContent";
import FilterBar from "@/components/feed/FilterBar";
import HeroSection from "@/components/feed/HeroSection"

const HomeView = () => {
  return (
    <div className="w-full h-[calc(100vh-107px)] flex ">
      <HeroSection />
      <FilterBar />
      <FeedContent />
      <ContentBar />
    </div>
  );
};

export default HomeView;