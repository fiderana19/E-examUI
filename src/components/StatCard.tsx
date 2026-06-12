import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "accent" | "destructive" | "amber";
  trend?: { value: string; positive: boolean };
}

const colorMap = {
  primary: "bg-primary-custom/10 text-primary-custom",
  accent: "bg-six-custom/10 text-six-custom",
  destructive: "bg-destructive/10 text-destructive",
  amber: "bg-amber-100 text-amber-600",
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color = "primary", trend }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-hover">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={`text-xs font-medium flex items-center gap-1 ${trend.positive ? "text-six-custom" : "text-destructive"}`}>
              <span>{trend.positive ? "↑" : "↓"}</span>
              {trend.value}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colorMap[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
