"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell
} from "recharts";
import { mockMonthlyStockData, mockCategoryDistribution, mockInventoryValueTrend } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const topProducts = [
  { name: "Steel Rod 12mm", value: 510000, change: +12 },
  { name: "PVC Pipe 2 inch", value: 90000, change: +8 },
  { name: "Cardboard Box", value: 48000, change: -3 },
  { name: "Safety Helmet ISI", value: 12600, change: +5 },
  { name: "Hydraulic Oil 46", value: 7440, change: -1 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Analytics</h2>
        <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>Deep insights into your inventory performance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inventory Value Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
          <h3 className="font-semibold mb-1" style={{ color: "hsl(var(--text-primary))" }}>Inventory Value Trend</h3>
          <p className="text-xs mb-5" style={{ color: "hsl(var(--text-muted))" }}>6-month rolling stock valuation</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockInventoryValueTrend}>
              <defs>
                <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [formatCurrency(v), "Value"]} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#vGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Movement */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
          <h3 className="font-semibold mb-1" style={{ color: "hsl(var(--text-primary))" }}>Monthly Movement</h3>
          <p className="text-xs mb-5" style={{ color: "hsl(var(--text-muted))" }}>Units in vs out</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockMonthlyStockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="stockIn" name="In" fill="#22c55e" radius={[3, 3, 0, 0]} />
              <Bar dataKey="stockOut" name="Out" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
          <h3 className="font-semibold mb-1" style={{ color: "hsl(var(--text-primary))" }}>Category Distribution</h3>
          <p className="text-xs mb-5" style={{ color: "hsl(var(--text-muted))" }}>Products split by category</p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <RechartsPie>
                <Pie data={mockCategoryDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {mockCategoryDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </RechartsPie>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {mockCategoryDistribution.map((cat, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />{cat.name}</span>
                  <span className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
          <h3 className="font-semibold mb-1" style={{ color: "hsl(var(--text-primary))" }}>Top Products by Value</h3>
          <p className="text-xs mb-5" style={{ color: "hsl(var(--text-muted))" }}>Highest value items in stock</p>
          <div className="space-y-4">
            {topProducts.map((p, i) => {
              const pct = Math.round((p.value / topProducts[0].value) * 100);
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium" style={{ color: "hsl(var(--text-primary))" }}>{p.name}</span>
                    <div className="flex items-center gap-3">
                      <span style={{ color: p.change >= 0 ? "#22c55e" : "#ef4444" }}>{p.change >= 0 ? "+" : ""}{p.change}%</span>
                      <span style={{ color: "hsl(var(--text-muted))" }}>{formatCurrency(p.value)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "hsl(var(--surface-3))" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full" style={{ background: `hsl(${231 + i * 25} 90% 60%)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
