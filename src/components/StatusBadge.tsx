interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  "Terminé": { bg: "bg-six-custom/10", text: "text-six-custom", dot: "bg-six-custom" },
  "En cours": { bg: "bg-amber-100", text: "text-amber-600", dot: "bg-amber-500" },
  "En attente": { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" },
  "Validé": { bg: "bg-six-custom/10", text: "text-six-custom", dot: "bg-six-custom" },
  "Non valide": { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </div>
  );
};

export default StatusBadge;
