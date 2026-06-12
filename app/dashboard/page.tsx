"use client";

import { motion } from "framer-motion";
import {
  Package, Tag, Truck, DollarSign, TrendingUp, TrendingDown,
  AlertTriangle, Activity, ArrowUpRight, ArrowDownRight,
  RefreshCw, FileText, Settings
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { formatCurrency, formatNumber, formatDateTime } from "@/lib/utils";
import {
  mockDashboardStats, mockMonthlyStockData, mockCategoryDistribution,
  mockInventoryValueTrend, mockProducts, mockTransactions
} from "@/lib/mock-data";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

// KPI Card Component
function KPICard({
  title, value, subtitle, icon, trend, trendValue, color, delay = 0, isCurrency = false, isPercent = false
}: {
  title: string; value: number; subtitle: string; icon: React.ReactNode;
  trend?: "up" | "down" | "neutral"; trendValue?: string; color: string; delay?: number;
  isCurrency?: boolean; isPercent?: boolean;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
      className="stat-card flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="feature-icon-wrap w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, color }}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${trend === "up" ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50" : trend === "down" ? "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/50" : "text-slate-500 bg-slate-50 dark:text-slate-400 dark:bg-slate-800"}`}>
              {trend === "up" ? <ArrowUpRight size={10} /> : trend === "down" ? <ArrowDownRight size={10} /> : null}
              {trendValue}
            </div>
          )}
        </div>
        <div className="text-xl font-bold mb-1 tracking-tight" style={{ color: "hsl(var(--text-primary))" }}>
          {isCurrency ? (
            <>₹{value.toLocaleString("en-IN")}</>
          ) : isPercent ? (
            <>{value}%</>
          ) : (
            value.toLocaleString("en-IN")
          )}
        </div>
        <div className="text-xs font-semibold mb-0.5" style={{ color: "hsl(var(--text-primary))" }}>{title}</div>
      </div>
      <div className="text-[10px] leading-normal mt-1" style={{ color: "hsl(var(--text-muted))" }}>{subtitle}</div>
    </motion.div>
  );
}

// Recent Activity
function RecentActivity() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Recent Activity</h3>
          <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>Latest stock movements</p>
        </div>
        <button className="text-xs font-medium" style={{ color: "#6366f1" }}>View All</button>
      </div>
      <div className="space-y-3">
        {mockTransactions.map((tx, i) => (
          <motion.div key={tx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl transition-colors" style={{ background: "hsl(var(--surface-2))" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: tx.type === "IN" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}>
              {tx.type === "IN" ? <TrendingUp size={16} color="#22c55e" /> : <TrendingDown size={16} color="#ef4444" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "hsl(var(--text-primary))" }}>{tx.product?.name}</p>
              <p className="text-xs truncate" style={{ color: "hsl(var(--text-muted))" }}>
                {tx.type === "IN" ? `From ${tx.supplier?.companyName ?? "Unknown"}` : `To ${tx.customerId ?? "Customer"}`}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold" style={{ color: tx.type === "IN" ? "#22c55e" : "#ef4444" }}>
                {tx.type === "IN" ? "+" : "-"}{tx.quantity} {tx.product?.unit}
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{formatDateTime(tx.date).split(",")[1]?.trim()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Low Stock Alert
function LowStockAlerts() {
  const lowStock = mockProducts.filter(p => p.quantity <= p.reorderLevel);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Low Stock Alerts</h3>
          <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>{lowStock.length} items need attention</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
          <AlertTriangle size={12} /> Critical
        </div>
      </div>
      <div className="space-y-3">
        {lowStock.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "hsl(var(--surface-2))" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)" }}>
              <AlertTriangle size={16} color="#ef4444" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "hsl(var(--text-primary))" }}>{product.name}</p>
              <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>SKU: {product.sku}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold" style={{ color: product.quantity === 0 ? "#ef4444" : "#f97316" }}>
                {product.quantity} {product.unit}
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Min: {product.reorderLevel}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl p-3 shadow-xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "hsl(var(--text-primary))" }}>{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-secondary))" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.name}: <span className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>{formatNumber(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const stats = mockDashboardStats;

  const kpiCards = [
    { title: "Inventory Value", value: stats.totalStockValue, isCurrency: true, subtitle: "Total valuation of stock", icon: <DollarSign size={18} />, trend: "up" as const, trendValue: "+5.8%", color: "#22c55e", delay: 0 },
    { title: "Today's Dispatch", value: stats.todayStockOut, subtitle: "Stock out transactions today", icon: <TrendingDown size={18} />, trend: "up" as const, trendValue: "+12%", color: "#f97316", delay: 0.05 },
    { title: "Today's Receipts", value: stats.todayStockIn, subtitle: "Stock in transactions today", icon: <TrendingUp size={18} />, trend: "up" as const, trendValue: "+15%", color: "#14b8a6", delay: 0.1 },
    { title: "Pending POs", value: 23, subtitle: "POs awaiting approval", icon: <FileText size={18} />, color: "#8b5cf6", delay: 0.15 },
    { title: "Pending Deliveries", value: 5, subtitle: "Shipments in transit", icon: <Truck size={18} />, trend: "up" as const, trendValue: "Due", color: "#3b82f6", delay: 0.2 },
    { title: "Monthly Revenue", value: 4275000, isCurrency: true, subtitle: "Sales volume (Illustrative)", icon: <Activity size={18} />, trend: "up" as const, trendValue: "+14.2%", color: "#6366f1", delay: 0.25 },
    { title: "Monthly Purchases", value: 2980000, isCurrency: true, subtitle: "Procurement value (Illustrative)", icon: <Package size={18} />, trend: "up" as const, trendValue: "+8.5%", color: "#ec4899", delay: 0.3 },
    { title: "Warehouse Util.", value: 78, isPercent: true, subtitle: "Capacity layout usage", icon: <Settings size={18} />, color: "#a855f7", delay: 0.35 },
    { title: "Low Stock Alerts", value: stats.lowStockCount, subtitle: "Products below reorder limit", icon: <AlertTriangle size={18} />, trend: "down" as const, trendValue: "Action", color: "#eab308", delay: 0.4 },
    { title: "Out of Stock Items", value: 20, subtitle: "Products with zero stock", icon: <AlertTriangle size={18} />, trend: "down" as const, trendValue: "Critical", color: "#ef4444", delay: 0.45 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome bar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Good afternoon, Admin 👋</h2>
          <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>Here&apos;s what&apos;s happening with your inventory today.</p>
        </div>
        <button className="btn btn-secondary hidden sm:flex">
          <RefreshCw size={15} /> Refresh
        </button>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiCards.map((card) => (
          <KPICard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Stock Movement — full width left */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Monthly Stock Movement</h3>
              <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>Units in vs out over 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: "#6366f1" }} /> Stock In</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: "#ec4899" }} /> Stock Out</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockMonthlyStockData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="stockIn" name="Stock In" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="stockOut" name="Stock Out" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="card p-6">
          <div className="mb-6">
            <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Category Distribution</h3>
            <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>Products by category</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={mockCategoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {mockCategoryDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {mockCategoryDistribution.slice(0, 4).map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />{cat.name}</span>
                <span className="font-medium" style={{ color: "hsl(var(--text-primary))" }}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inventory Value Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Inventory Value Trend</h3>
              <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>Total stock value over 6 months</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold" style={{ color: "#22c55e" }}>{formatCurrency(mockDashboardStats.totalStockValue)}</div>
              <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Current value</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockInventoryValueTrend}>
              <defs>
                <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [formatCurrency(v), "Stock Value"]} />
              <Area type="monotone" dataKey="value" name="Value" stroke="#22c55e" strokeWidth={2.5} fill="url(#valueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Stats / Top Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="card p-6">
          <div className="mb-6">
            <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Top Products</h3>
            <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>By stock value</p>
          </div>
          <div className="space-y-4">
            {mockProducts.slice(0, 5).map((product, i) => {
              const value = product.quantity * product.sellingPrice;
              const maxValue = mockProducts[0].quantity * mockProducts[0].sellingPrice;
              const pct = Math.round((value / maxValue) * 100);
              return (
                <div key={product.id}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium truncate max-w-[150px]" style={{ color: "hsl(var(--text-primary))" }}>{product.name}</span>
                    <span style={{ color: "hsl(var(--text-muted))" }}>{formatCurrency(value)}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "hsl(var(--surface-3))" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full" style={{ background: `hsl(${231 + i * 20} 98% 62%)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Activity + Low Stock */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentActivity />
        <LowStockAlerts />
      </div>
    </div>
  );
}
