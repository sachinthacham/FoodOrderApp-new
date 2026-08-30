import type { Order } from "@/features/orders/services/orderService";
import { Check } from "lucide-react";

interface OrderTrackingProps {
  order: Order;
}

const ORDER_STATUSES = [
  { value: "PLACED", label: "Placed", icon: "📝" },
  { value: "CONFIRMED", label: "Confirmed", icon: "✅" },
  { value: "PREPARING", label: "Preparing", icon: "👨‍🍳" },
  { value: "READY", label: "Ready", icon: "🍽️" },
  { value: "PICKED_UP", label: "Picked Up", icon: "📦" },
  { value: "ON_THE_WAY", label: "On The Way", icon: "🚗" },
  { value: "DELIVERED", label: "Delivered", icon: "🎉" },
];

export default function OrderTracking({ order }: OrderTrackingProps) {
  const currentStatusIndex = ORDER_STATUSES.findIndex(
    (status) => status.value === order.status.toUpperCase()
  );

  return (
    <div>
      <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
        Order Tracking
      </h4>
      <div className="overflow-x-auto -mx-1 px-1">
      <div className="flex items-start min-w-[640px] sm:min-w-0">
        {ORDER_STATUSES.map((status, index) => {
          const isCompleted = index < currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const isLast = index === ORDER_STATUSES.length - 1;

          return (
            <div key={status.value} className="flex-1 flex flex-col items-center relative">
              {!isLast && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 ${
                    isCompleted ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              )}

              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-red-500 text-white animate-pulse ring-4 ring-red-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : status.icon}
              </div>

              <span
                className={`mt-2 text-[11px] font-bold uppercase tracking-wide text-center px-1 ${
                  isCurrent
                    ? "text-red-500"
                    : isCompleted
                    ? "text-green-600 dark:text-green-400"
                    : "text-slate-400 dark:text-slate-600"
                }`}
              >
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
