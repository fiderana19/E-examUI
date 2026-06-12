import { AlertTriangle, Eye, Ban, Monitor, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const warnings = [
  {
    icon: Eye,
    title: "Surveillance de l'activité",
    desc: "Tout changement d'onglet ou de fenêtre est détecté et enregistré.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  {
    icon: Ban,
    title: "Clic droit désactivé",
    desc: "Le menu contextuel est bloqué pendant toute la durée du test.",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-500/10",
    border: "border-red-200 dark:border-red-500/20",
  },
  {
    icon: Monitor,
    title: "Session surveillée",
    desc: "Toute tentative de triche entraîne la soumission automatique de votre copie.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
    border: "border-purple-200 dark:border-purple-500/20",
  },
];

export function CheatWarningBanner() {
  return (
    <div className="space-y-2 mb-4">
      {warnings.map((w, i) => (
        <div
          key={i}
          className={cn(
            "flex items-start gap-3 p-3 rounded-lg border text-sm",
            w.bg, w.border,
          )}
        >
          <w.icon className={cn("w-5 h-5 mt-0.5 shrink-0", w.color)} />
          <div>
            <p className="font-semibold text-foreground text-xs uppercase tracking-wide">{w.title}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{w.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CheatWarningModal({
  open,
  violationCount,
  onAcknowledge,
}: {
  open: boolean;
  violationCount: number;
  onAcknowledge: () => void;
}) {
  if (!open) return null;

  const remaining = 2 - violationCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-xl border border-destructive/30 shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-destructive/10 px-6 py-5 flex items-start gap-4">
          <div className="bg-destructive/20 p-2.5 rounded-full shrink-0">
            <ShieldAlert className="w-7 h-7 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Alerte de sécurité</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Vous avez changé d'onglet ou de fenêtre pendant le test.
            </p>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg p-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
              {remaining > 0
                ? `Il vous reste ${remaining} avertissement${remaining > 1 ? "s" : ""} avant la soumission automatique.`
                : "Vous avez épuisé tous vos avertissements."}
            </p>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-destructive font-bold leading-none mt-0.5">•</span>
              <span>Ne changez plus d'onglet ni de fenêtre.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive font-bold leading-none mt-0.5">•</span>
              <span>Ne copiez pas de texte depuis l'extérieur.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive font-bold leading-none mt-0.5">•</span>
              <span>Toute nouvelle infraction soumettra automatiquement votre copie.</span>
            </li>
          </ul>
        </div>

        <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end">
          <button
            onClick={onAcknowledge}
            className="inline-flex items-center justify-center rounded-lg bg-destructive text-destructive-foreground px-5 py-2 text-sm font-semibold shadow hover:bg-destructive/90 transition-colors"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
}
