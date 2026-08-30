import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToastStore, type ToastVariant } from "@/store/useToastStore";
import { cn } from "@/lib/utils";

const ICONS: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const STYLES: Record<ToastVariant, string> = {
  success: "border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 [&_svg]:text-green-500",
  error: "border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 [&_svg]:text-red-500",
  info: "border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 [&_svg]:text-blue-500",
};

export default function Toaster() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      {toasts.map((t) => {
        const Icon = ICONS[t.variant];
        return (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto glass-card bg-white dark:bg-slate-900 border rounded-2xl px-4 py-3 shadow-lg flex items-start gap-3 animate-fade-in-up",
              STYLES[t.variant]
            )}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex-1">
              {t.message}
            </p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
