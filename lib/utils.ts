import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateSKU(productName: string): string {
  const prefix = productName
    .split(" ")
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 4);
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
}

export function getStockStatus(quantity: number, reorderLevel: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (quantity === 0) {
    return { label: "Out of Stock", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950" };
  }
  if (quantity <= reorderLevel) {
    return { label: "Low Stock", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950" };
  }
  return { label: "In Stock", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950" };
}

export function getPOStatusConfig(status: string): {
  label: string;
  color: string;
  bg: string;
} {
  const configs: Record<string, { label: string; color: string; bg: string }> = {
    DRAFT: { label: "Draft", color: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-800" },
    PENDING: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950" },
    APPROVED: { label: "Approved", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950" },
    RECEIVED: { label: "Received", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950" },
    CANCELLED: { label: "Cancelled", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950" },
  };
  return configs[status] ?? configs.DRAFT;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export const UNITS = [
  "PCS", "KG", "LTR", "MTR", "BOX", "ROLL", "SET", "PAIR",
  "TON", "DOZEN", "BAG", "DRUM", "BOTTLE", "SHEET", "BUNDLE",
];

export const COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#ef4444",
  "#f97316", "#eab308", "#22c55e", "#14b8a6", "#3b82f6",
];
