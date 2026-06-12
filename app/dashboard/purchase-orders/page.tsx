"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, ShoppingCart, Eye, Printer } from "lucide-react";
import { mockPurchaseOrders } from "@/lib/mock-data";
import type { PurchaseOrder } from "@/types";
import { toast } from "sonner";
import { formatDate, formatCurrency, getPOStatusConfig } from "@/lib/utils";

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.poNumber.toLowerCase().includes(search.toLowerCase()) || o.supplier?.companyName?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, newStatus: PurchaseOrder["status"]) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
    toast.success("Purchase order deleted.");
  };

  const statusOptions = ["ALL", "DRAFT", "PENDING", "APPROVED", "RECEIVED", "CANCELLED"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Purchase Orders</h2>
          <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{filtered.length} orders</p>
        </div>
        <button onClick={() => toast.info("PO creation form coming soon")} className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          <Plus size={15} /> Create PO
        </button>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--text-muted))" }} />
          <input className="input pl-10" placeholder="Search by PO number or supplier..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: statusFilter === s ? "rgba(99,102,241,0.15)" : "hsl(var(--surface-2))",
                color: statusFilter === s ? "#6366f1" : "hsl(var(--text-secondary))",
                border: statusFilter === s ? "1px solid rgba(99,102,241,0.3)" : "1px solid hsl(var(--border))",
              }}>
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Supplier</th>
              <th>Order Date</th>
              <th>Expected Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => {
              const statusConf = getPOStatusConfig(order.status);
              return (
                <motion.tr key={order.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                        <ShoppingCart size={14} color="#6366f1" />
                      </div>
                      <span className="font-mono font-medium text-sm" style={{ color: "hsl(var(--text-primary))" }}>{order.poNumber}</span>
                    </div>
                  </td>
                  <td><span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{order.supplier?.companyName ?? "—"}</span></td>
                  <td><span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(order.orderDate)}</span></td>
                  <td><span className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{order.expectedDate ? formatDate(order.expectedDate) : "—"}</span></td>
                  <td><span className="text-sm font-semibold" style={{ color: "hsl(var(--text-primary))" }}>{formatCurrency(order.totalAmount)}</span></td>
                  <td>
                    <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value as PurchaseOrder["status"])}
                      className={`badge cursor-pointer outline-none ${statusConf.bg}`} style={{ color: statusConf.color.replace("text-", ""), border: "none", padding: "3px 8px", borderRadius: "100px", fontSize: "12px", fontWeight: "500" }}>
                      {["DRAFT", "PENDING", "APPROVED", "RECEIVED", "CANCELLED"].map(s => (
                        <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 justify-end">
                      <button onClick={() => toast.info(`Printing PO: ${order.poNumber}`)} className="p-1.5 rounded-lg" style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)" }} title="Print"><Printer size={14} /></button>
                      <button onClick={() => handleDelete(order.id)} className="p-1.5 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
