"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Download, Filter, FileText, TrendingDown, AlertTriangle, Package, Truck } from "lucide-react";
import { mockProducts, mockTransactions, mockSuppliers } from "@/lib/mock-data";
import { formatCurrency, formatDate, getStockStatus } from "@/lib/utils";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

type ReportType = "stock" | "low-stock" | "movement" | "supplier";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportType>("stock");

  const reports = [
    { id: "stock" as ReportType, label: "Stock Report", icon: <Package size={18} />, desc: "Current inventory levels", color: "#6366f1" },
    { id: "low-stock" as ReportType, label: "Low Stock", icon: <AlertTriangle size={18} />, desc: "Items needing reorder", color: "#ef4444" },
    { id: "movement" as ReportType, label: "Movement Report", icon: <TrendingDown size={18} />, desc: "Stock in/out history", color: "#22c55e" },
    { id: "supplier" as ReportType, label: "Supplier Report", icon: <Truck size={18} />, desc: "Supplier performance", color: "#f97316" },
  ];

  const lowStockItems = mockProducts.filter(p => p.quantity <= p.reorderLevel);
  const movementData = [
    { name: "Jan", in: 4200, out: 2800 }, { name: "Feb", in: 3800, out: 3200 },
    { name: "Mar", in: 5100, out: 3900 }, { name: "Apr", in: 4600, out: 4100 },
    { name: "May", in: 5800, out: 4500 }, { name: "Jun", in: 6200, out: 5100 },
  ];

  const handleExport = (format: string) => {
    toast.success(`Exporting ${activeReport} report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Reports</h2>
          <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>Generate and export inventory reports</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["PDF", "Excel", "CSV"].map(fmt => (
            <button key={fmt} onClick={() => handleExport(fmt)} className="btn btn-secondary" style={{ fontSize: "13px", padding: "7px 14px" }}>
              <Download size={14} /> {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Report type selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {reports.map(r => (
          <button key={r.id} onClick={() => setActiveReport(r.id)}
            className="p-4 rounded-xl text-left transition-all" style={{
              background: activeReport === r.id ? `${r.color}15` : "hsl(var(--surface))",
              border: activeReport === r.id ? `1px solid ${r.color}40` : "1px solid hsl(var(--border))",
            }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${r.color}18`, color: r.color }}>
              {r.icon}
            </div>
            <div className="font-semibold text-sm" style={{ color: activeReport === r.id ? r.color : "hsl(var(--text-primary))" }}>{r.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>{r.desc}</div>
          </button>
        ))}
      </div>

      {/* Report content */}
      <motion.div key={activeReport} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
        {activeReport === "stock" && (
          <>
            <div className="px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Current Stock Report</h3>
              <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>As of {formatDate(new Date().toISOString())}</p>
            </div>
            <div className="overflow-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th><th>SKU</th><th>Category</th><th>Quantity</th><th>Unit</th><th>Value</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((p, i) => {
                    const status = getStockStatus(p.quantity, p.reorderLevel);
                    return (
                      <tr key={p.id}>
                        <td className="font-medium text-sm" style={{ color: "hsl(var(--text-primary))" }}>{p.name}</td>
                        <td><code className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(var(--surface-2))" }}>{p.sku}</code></td>
                        <td className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{p.category?.name}</td>
                        <td className="text-sm font-semibold" style={{ color: "hsl(var(--text-primary))" }}>{p.quantity}</td>
                        <td className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{p.unit}</td>
                        <td className="text-sm font-medium" style={{ color: "hsl(var(--text-primary))" }}>{formatCurrency(p.quantity * p.sellingPrice)}</td>
                        <td><span className={`badge ${p.quantity === 0 ? "badge-danger" : p.quantity <= p.reorderLevel ? "badge-warning" : "badge-success"}`} style={{ fontSize: "11px" }}>{status.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: "2px solid hsl(var(--border))" }}>
                    <td colSpan={5} className="px-4 py-3 font-bold text-sm" style={{ color: "hsl(var(--text-primary))" }}>Total Stock Value</td>
                    <td className="px-4 py-3 font-bold text-sm" style={{ color: "#22c55e" }}>{formatCurrency(mockProducts.reduce((acc, p) => acc + p.quantity * p.sellingPrice, 0))}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}

        {activeReport === "low-stock" && (
          <>
            <div className="px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Low Stock Alert Report</h3>
              <p className="text-xs mt-0.5" style={{ color: "#ef4444" }}>{lowStockItems.length} items require immediate attention</p>
            </div>
            <div className="overflow-auto">
              <table className="table">
                <thead>
                  <tr><th>Product</th><th>SKU</th><th>Current Qty</th><th>Reorder Level</th><th>Shortage</th><th>Supplier</th></tr>
                </thead>
                <tbody>
                  {lowStockItems.map(p => (
                    <tr key={p.id}>
                      <td className="font-medium text-sm" style={{ color: "hsl(var(--text-primary))" }}>{p.name}</td>
                      <td><code className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(var(--surface-2))" }}>{p.sku}</code></td>
                      <td><span className="font-bold text-sm" style={{ color: p.quantity === 0 ? "#ef4444" : "#f97316" }}>{p.quantity} {p.unit}</span></td>
                      <td className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{p.reorderLevel} {p.unit}</td>
                      <td><span className="font-semibold text-sm" style={{ color: "#ef4444" }}>{Math.max(0, p.reorderLevel - p.quantity)} {p.unit}</span></td>
                      <td className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{p.supplier?.companyName ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeReport === "movement" && (
          <>
            <div className="px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Stock Movement Report</h3>
              <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>Monthly comparison of inbound vs outbound stock</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={movementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--text-muted))" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="in" name="Stock In" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="out" name="Stock Out" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="px-6 pb-6">
              <table className="table">
                <thead>
                  <tr><th>Date</th><th>Product</th><th>Type</th><th>Quantity</th><th>Reference</th></tr>
                </thead>
                <tbody>
                  {mockTransactions.map(tx => (
                    <tr key={tx.id}>
                      <td className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{formatDate(tx.date)}</td>
                      <td className="text-sm" style={{ color: "hsl(var(--text-primary))" }}>{tx.product?.name}</td>
                      <td><span className={`badge ${tx.type === "IN" ? "badge-success" : "badge-danger"}`} style={{ fontSize: "11px" }}>{tx.type}</span></td>
                      <td className="text-sm font-medium" style={{ color: tx.type === "IN" ? "#22c55e" : "#ef4444" }}>
                        {tx.type === "IN" ? "+" : "-"}{tx.quantity} {tx.product?.unit}
                      </td>
                      <td className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{tx.invoiceNumber ?? tx.customerId ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeReport === "supplier" && (
          <>
            <div className="px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Supplier Performance Report</h3>
            </div>
            <div className="overflow-auto">
              <table className="table">
                <thead>
                  <tr><th>Company</th><th>Contact</th><th>Phone</th><th>GST Number</th><th>Products</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {mockSuppliers.map(s => (
                    <tr key={s.id}>
                      <td className="font-medium text-sm" style={{ color: "hsl(var(--text-primary))" }}>{s.companyName}</td>
                      <td className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{s.contactPerson}</td>
                      <td className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{s.phone}</td>
                      <td><code className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(var(--surface-2))" }}>{s.gstNumber ?? "—"}</code></td>
                      <td className="text-sm font-semibold" style={{ color: "hsl(var(--text-primary))" }}>{s._count?.products ?? 0}</td>
                      <td><span className={`badge ${s.isActive ? "badge-success" : "badge-warning"}`} style={{ fontSize: "11px" }}>{s.isActive ? "Active" : "Inactive"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
