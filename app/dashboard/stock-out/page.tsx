"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpCircle, Minus, AlertTriangle } from "lucide-react";
import { mockProducts, mockTransactions } from "@/lib/mock-data";
import type { StockTransaction } from "@/types";
import { toast } from "sonner";
import { formatDateTime, formatCurrency } from "@/lib/utils";

export default function StockOutPage() {
  const [transactions, setTransactions] = useState<StockTransaction[]>(
    mockTransactions.filter(t => t.type === "OUT")
  );
  const [form, setForm] = useState({
    productId: "", quantity: 1, customerId: "", date: new Date().toISOString().split("T")[0], remarks: "",
  });
  const [loading, setLoading] = useState(false);

  const inputStyle = { background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--text-primary))", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", width: "100%", outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "12px", fontWeight: "600" as const, color: "hsl(var(--text-secondary))", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "6px" };

  const selectedProduct = mockProducts.find(p => p.id === form.productId);
  const isInsufficient = selectedProduct && form.quantity > selectedProduct.quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productId || form.quantity < 1 || isInsufficient) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    const product = selectedProduct;
    const newTx: StockTransaction = {
      id: `t${Date.now()}`, type: "OUT", productId: form.productId, quantity: form.quantity,
      price: product?.sellingPrice ?? 0, customerId: form.customerId || null, remarks: form.remarks || null,
      date: new Date(form.date).toISOString(), createdAt: new Date().toISOString(), product,
    };

    setTransactions([newTx, ...transactions]);
    setForm({ productId: "", quantity: 1, customerId: "", date: new Date().toISOString().split("T")[0], remarks: "" });
    setLoading(false);
    toast.success(`Stock Out recorded: -${form.quantity} units of ${product?.name}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Stock Out</h2>
        <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>Record outgoing inventory to customers</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
              <ArrowUpCircle size={20} color="#ef4444" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>New Dispatch Entry</h3>
              <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Issue inventory to customers</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={labelStyle}>Product *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} required value={form.productId} onChange={e => setForm({ ...form, productId: e.target.value, quantity: 1 })}>
                <option value="">Select Product</option>
                {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name} (Available: {p.quantity} {p.unit})</option>)}
              </select>
            </div>

            {selectedProduct && (
              <div className="p-3 rounded-xl text-xs" style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
                Available: <span className="font-bold" style={{ color: selectedProduct.quantity > selectedProduct.reorderLevel ? "#22c55e" : "#f97316" }}>{selectedProduct.quantity} {selectedProduct.unit}</span>
              </div>
            )}

            <div>
              <label style={labelStyle}>Quantity *</label>
              <input type="number" style={{ ...inputStyle, borderColor: isInsufficient ? "#ef4444" : undefined }} required min={1} value={form.quantity} onChange={e => setForm({ ...form, quantity: +e.target.value })} />
              {isInsufficient && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: "#ef4444" }}>
                  <AlertTriangle size={12} /> Insufficient stock! Only {selectedProduct?.quantity} available.
                </div>
              )}
            </div>
            <div>
              <label style={labelStyle}>Customer / Reference</label>
              <input style={inputStyle} value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })} placeholder="Customer name or order ref" />
            </div>
            <div>
              <label style={labelStyle}>Date *</label>
              <input type="date" style={inputStyle} required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Remarks</label>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }} value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} placeholder="Optional notes..." />
            </div>

            <button type="submit" disabled={loading || !!isInsufficient} className="btn w-full justify-center font-semibold text-white disabled:opacity-60" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
              {loading ? "Recording..." : <><Minus size={16} /> Record Stock Out</>}
            </button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card lg:col-span-2">
          <div className="px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Recent Dispatch Records</h3>
            <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>{transactions.length} records</p>
          </div>
          <div className="overflow-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Customer</th>
                  <th>Remarks</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                          <ArrowUpCircle size={14} color="#ef4444" />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "hsl(var(--text-primary))" }}>{tx.product?.name ?? "—"}</span>
                      </div>
                    </td>
                    <td><span className="text-sm font-semibold" style={{ color: "#ef4444" }}>-{tx.quantity} {tx.product?.unit}</span></td>
                    <td><span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{tx.customerId ?? "—"}</span></td>
                    <td><span className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{tx.remarks ?? "—"}</span></td>
                    <td><span className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{formatDateTime(tx.date)}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
