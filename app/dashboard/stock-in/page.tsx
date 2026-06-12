"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, Plus, CheckCircle } from "lucide-react";
import { mockProducts, mockSuppliers, mockTransactions } from "@/lib/mock-data";
import type { StockTransaction } from "@/types";
import { toast } from "sonner";
import { formatDateTime, formatCurrency } from "@/lib/utils";

export default function StockInPage() {
  const [transactions, setTransactions] = useState<StockTransaction[]>(
    mockTransactions.filter(t => t.type === "IN")
  );
  const [form, setForm] = useState({
    productId: "", supplierId: "", quantity: 1, price: 0, invoiceNumber: "", date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);

  const inputStyle = { background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--text-primary))", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", width: "100%", outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "12px", fontWeight: "600" as const, color: "hsl(var(--text-secondary))", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "6px" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productId || form.quantity < 1) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    const product = mockProducts.find(p => p.id === form.productId);
    const supplier = mockSuppliers.find(s => s.id === form.supplierId);
    const newTx: StockTransaction = {
      id: `t${Date.now()}`, type: "IN", productId: form.productId, quantity: form.quantity,
      price: form.price, invoiceNumber: form.invoiceNumber, supplierId: form.supplierId || null,
      date: new Date(form.date).toISOString(), createdAt: new Date().toISOString(),
      product, supplier: supplier ?? null,
    };

    setTransactions([newTx, ...transactions]);
    setForm({ productId: "", supplierId: "", quantity: 1, price: 0, invoiceNumber: "", date: new Date().toISOString().split("T")[0] });
    setLoading(false);
    toast.success(`Stock In recorded: +${form.quantity} units of ${product?.name}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Stock In</h2>
        <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>Record incoming inventory from suppliers</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)" }}>
              <ArrowDownCircle size={20} color="#22c55e" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>New Stock Entry</h3>
              <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Fill all required fields</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={labelStyle}>Product *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} required value={form.productId} onChange={e => {
                const prod = mockProducts.find(p => p.id === e.target.value);
                setForm({ ...form, productId: e.target.value, price: prod?.purchasePrice ?? 0 });
              }}>
                <option value="">Select Product</option>
                {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.unit})</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Supplier</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.supplierId} onChange={e => setForm({ ...form, supplierId: e.target.value })}>
                <option value="">Select Supplier (optional)</option>
                {mockSuppliers.map(s => <option key={s.id} value={s.id}>{s.companyName}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Quantity *</label>
              <input type="number" style={inputStyle} required min={1} value={form.quantity} onChange={e => setForm({ ...form, quantity: +e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Purchase Price (₹)</label>
              <input type="number" style={inputStyle} min={0} step={0.01} value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Invoice Number</label>
              <input style={inputStyle} value={form.invoiceNumber} onChange={e => setForm({ ...form, invoiceNumber: e.target.value })} placeholder="INV-2024-001" />
            </div>
            <div>
              <label style={labelStyle}>Date *</label>
              <input type="date" style={inputStyle} required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>

            {form.productId && form.quantity > 0 && (
              <div className="p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <div className="text-xs font-medium" style={{ color: "#22c55e" }}>Entry Summary</div>
                <div className="text-sm font-semibold mt-1" style={{ color: "hsl(var(--text-primary))" }}>
                  {form.quantity} units × {formatCurrency(form.price)} = {formatCurrency(form.quantity * form.price)}
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
              {loading ? "Recording..." : <><Plus size={16} /> Record Stock In</>}
            </button>
          </form>
        </motion.div>

        {/* History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card lg:col-span-2">
          <div className="px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
            <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Recent Stock In Entries</h3>
            <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>{transactions.length} records</p>
          </div>
          <div className="overflow-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Supplier</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)" }}>
                          <CheckCircle size={14} color="#22c55e" />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "hsl(var(--text-primary))" }}>{tx.product?.name ?? "—"}</span>
                      </div>
                    </td>
                    <td><span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{tx.supplier?.companyName ?? "—"}</span></td>
                    <td><span className="text-sm font-semibold" style={{ color: "#22c55e" }}>+{tx.quantity}</span></td>
                    <td><span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{formatCurrency(tx.price)}</span></td>
                    <td><code className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(var(--surface-2))" }}>{tx.invoiceNumber ?? "—"}</code></td>
                    <td><span className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{formatDateTime(tx.date)}</span></td>
                    <td><span className="text-sm font-medium" style={{ color: "hsl(var(--text-primary))" }}>{formatCurrency(tx.quantity * tx.price)}</span></td>
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
