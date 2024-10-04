import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons";

interface IProps {
  label: string;
  value: number | string;
  icon: IconType;
}

const UserCountCard: React.FC<IProps> = ({ label, value, icon: Icon }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          {label}
          <Icon className="w-4 h-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[20px] font-[400]">{value}</p>
      </CardContent>
    </Card>
  );
};

export default UserCountCard;