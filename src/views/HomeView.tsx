// import ContentBar from "@/components/feed/ContentBar";
import FeedContent from "@/components/feed/FeedContent";
import FilterBar from "@/components/feed/FilterBar";
import HeroSection from "@/components/feed/HeroSection"

const HomeView = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <FilterBar/>
     
      <div
    style={{
      width: '50%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
    }}
  >
    <FeedContent />
  </div>

      {/* <ContentBar /> */}
    </div>
  );
};

export default HomeView;