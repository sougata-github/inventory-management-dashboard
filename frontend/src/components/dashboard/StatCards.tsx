import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statCardsData } from "@/constants";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCardsData.map((card) => (
        <StatCard
          key={card.title}
          {...card}
          icon={<card.icon className="h-4 w-4 text-muted-foreground" />}
        />
      ))}
    </div>
  );
}
