"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton", className)}
      style={{ minHeight: "1rem", ...style }}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-4">
        <Skeleton style={{ width: 52, height: 52, borderRadius: 14 }} />
        <Skeleton style={{ width: 60, height: 24, borderRadius: 100 }} />
      </div>
      <Skeleton style={{ width: 80, height: 28, marginBottom: 8 }} />
      <Skeleton style={{ width: 120, height: 16, marginBottom: 6 }} />
      <Skeleton style={{ width: 90, height: 14 }} />
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton style={{ height: 16, width: i === 0 ? 160 : 80 + i * 10 }} />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-5">
      <Skeleton style={{ width: 44, height: 44, borderRadius: 14, marginBottom: 16 }} />
      <Skeleton style={{ width: "70%", height: 18, marginBottom: 8 }} />
      <Skeleton style={{ width: "100%", height: 14, marginBottom: 4 }} />
      <Skeleton style={{ width: "85%", height: 14 }} />
    </div>
  );
}

export function ChartSkeleton({ height = 240 }: { height?: number }) {
  return (
    <div className="card p-6">
      <Skeleton style={{ width: 160, height: 20, marginBottom: 8 }} />
      <Skeleton style={{ width: 200, height: 14, marginBottom: 24 }} />
      <Skeleton style={{ width: "100%", height }} />
    </div>
  );
}
