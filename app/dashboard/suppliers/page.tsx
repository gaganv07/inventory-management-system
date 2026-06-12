"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, Truck, Phone, Mail, MapPin, Building2 } from "lucide-react";
import { mockSuppliers } from "@/lib/mock-data";
import type { Supplier } from "@/types";
import { toast } from "sonner";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editSup, setEditSup] = useState<Supplier | null>(null);
  const [form, setForm] = useState({ companyName: "", contactPerson: "", phone: "", email: "", gstNumber: "", address: "", notes: "" });

  const filtered = suppliers.filter(s =>
    !search || s.companyName.toLowerCase().includes(search.toLowerCase()) || s.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditSup(null); setForm({ companyName: "", contactPerson: "", phone: "", email: "", gstNumber: "", address: "", notes: "" }); setModalOpen(true); };
  const openEdit = (sup: Supplier) => { setEditSup(sup); setForm({ companyName: sup.companyName, contactPerson: sup.contactPerson, phone: sup.phone, email: sup.email ?? "", gstNumber: sup.gstNumber ?? "", address: sup.address ?? "", notes: sup.notes ?? "" }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editSup) {
      setSuppliers(suppliers.map(s => s.id === editSup.id ? { ...s, ...form } : s));
      toast.success("Supplier updated!");
    } else {
      const newSup: Supplier = { id: `s${Date.now()}`, ...form, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setSuppliers([newSup, ...suppliers]);
      toast.success("Supplier added!");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setSuppliers(suppliers.filter(s => s.id !== id)); toast.success("Supplier removed."); };

  const inputStyle = { background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--text-primary))", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", width: "100%", outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "12px", fontWeight: "600" as const, color: "hsl(var(--text-secondary))", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "6px" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Suppliers</h2>
          <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{suppliers.length} suppliers registered</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          <Plus size={15} /> Add Supplier
        </button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--text-muted))" }} />
          <input className="input pl-10" placeholder="Search suppliers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((sup, i) => (
          <motion.div key={sup.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                  {sup.companyName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: "hsl(var(--text-primary))" }}>{sup.companyName}</h3>
                  <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{sup.contactPerson}</p>
                </div>
              </div>
              <span className={`badge ${sup.isActive ? "badge-success" : "badge-warning"}`}>{sup.isActive ? "Active" : "Inactive"}</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-muted))" }}>
                <Phone size={12} /><span>{sup.phone}</span>
              </div>
              {sup.email && <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-muted))" }}>
                <Mail size={12} /><span>{sup.email}</span>
              </div>}
              {sup.address && <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-muted))" }}>
                <MapPin size={12} /><span>{sup.address}</span>
              </div>}
              {sup.gstNumber && <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-muted))" }}>
                <Building2 size={12} /><span>GST: {sup.gstNumber}</span>
              </div>}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 rounded-lg" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-secondary))" }}>
                {sup._count?.products ?? 0} products
              </span>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(sup)} className="p-1.5 rounded-lg" style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)" }}><Edit size={14} /></button>
                <button onClick={() => handleDelete(sup.id)} className="p-1.5 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }}><Trash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", maxHeight: "90vh", overflowY: "auto" }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                <h2 className="font-bold text-lg" style={{ color: "hsl(var(--text-primary))" }}>{editSup ? "Edit Supplier" : "Add Supplier"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>✕</button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label style={labelStyle}>Company Name *</label><input style={inputStyle} required value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} /></div>
                  <div><label style={labelStyle}>Contact Person *</label><input style={inputStyle} required value={form.contactPerson} onChange={e => setForm({ ...form, contactPerson: e.target.value })} /></div>
                  <div><label style={labelStyle}>Phone *</label><input style={inputStyle} required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                  <div><label style={labelStyle}>Email</label><input type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                  <div><label style={labelStyle}>GST Number</label><input style={inputStyle} value={form.gstNumber} onChange={e => setForm({ ...form, gstNumber: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label style={labelStyle}>Address</label><textarea style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label style={labelStyle}>Notes</label><textarea style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary flex-1">Cancel</button>
                  <button type="submit" className="btn btn-primary flex-1" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
