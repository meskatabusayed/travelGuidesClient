import PaymentStatistics from "@/components/sratistics/PaymentStatistics";
import StatisticsHeading from "@/components/sratistics/StatisticsHeading";
import UserStatistics from "@/components/sratistics/UserStatistics";
const StatisticsView = () => {
  return (
    <div className="w-full">
      <StatisticsHeading />
      <div className="flex items-center justify-start  gap-[20px]">
        <PaymentStatistics />
        <UserStatistics />
      </div>
    </div>
  );
};

export default StatisticsView;