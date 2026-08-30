export interface PromoCode {
  code: string;
  description: string;
  kind: "percent" | "flat" | "free_delivery";
  value: number;
}

// Demo-only promo codes. Applied purely client-side for display — the backend
// has no coupon/discount concept, so the actual Stripe charge is always the
// real subtotal + delivery fee regardless of what's shown here.
const PROMO_CODES: Record<string, PromoCode> = {
  WELCOME10: {
    code: "WELCOME10",
    description: "10% off your order",
    kind: "percent",
    value: 10,
  },
  FREESHIP: {
    code: "FREESHIP",
    description: "Free delivery",
    kind: "free_delivery",
    value: 0,
  },
  FLAT5: {
    code: "FLAT5",
    description: "$5 off your order",
    kind: "flat",
    value: 5,
  },
};

export function findPromoCode(code: string): PromoCode | null {
  return PROMO_CODES[code.trim().toUpperCase()] ?? null;
}

export function getPromoDiscount(
  promo: PromoCode | null,
  subtotal: number
): number {
  if (!promo) return 0;
  if (promo.kind === "percent") return +(subtotal * (promo.value / 100)).toFixed(2);
  if (promo.kind === "flat") return Math.min(promo.value, subtotal);
  return 0;
}

export function getPromoDeliveryFee(
  promo: PromoCode | null,
  baseDeliveryFee: number
): number {
  if (promo?.kind === "free_delivery") return 0;
  return baseDeliveryFee;
}
