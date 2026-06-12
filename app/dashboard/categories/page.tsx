"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";
import { mockCategories } from "@/lib/mock-data";
import type { Category } from "@/types";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "", isActive: true });

  const filtered = categories.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditCat(null); setForm({ name: "", description: "", isActive: true }); setModalOpen(true); };
  const openEdit = (cat: Category) => { setEditCat(cat); setForm({ name: cat.name, description: cat.description ?? "", isActive: cat.isActive }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCat) {
      setCategories(categories.map(c => c.id === editCat.id ? { ...c, ...form } : c));
      toast.success("Category updated!");
    } else {
      const newCat: Category = { id: `c${Date.now()}`, ...form, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), _count: { products: 0 } };
      setCategories([newCat, ...categories]);
      toast.success("Category added!");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    toast.success("Category deleted.");
  };

  const inputStyle = { background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--text-primary))", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", width: "100%", outline: "none", fontFamily: "inherit" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Categories</h2>
          <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{categories.length} categories</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          <Plus size={15} /> Add Category
        </button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--text-muted))" }} />
          <input className="input pl-10" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card p-5 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
                <Tag size={20} color="#6366f1" />
              </div>
              <span className={`badge ${cat.isActive ? "badge-success" : "badge-warning"}`}>{cat.isActive ? "Active" : "Inactive"}</span>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: "hsl(var(--text-primary))" }}>{cat.name}</h3>
            <p className="text-xs mb-4" style={{ color: "hsl(var(--text-muted))" }}>{cat.description ?? "No description"}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 rounded-lg" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-secondary))" }}>
                {cat._count?.products ?? 0} products
              </span>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg" style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)" }}><Edit size={14} /></button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }}><Trash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl shadow-2xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                <h2 className="font-bold text-lg" style={{ color: "hsl(var(--text-primary))" }}>{editCat ? "Edit Category" : "Add Category"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>✕</button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--text-secondary))" }}>Category Name *</label>
                  <input style={inputStyle} required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g., Raw Materials" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--text-secondary))" }}>Description</label>
                  <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Optional description" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="catActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ accentColor: "#6366f1", width: "16px", height: "16px" }} />
                  <label htmlFor="catActive" className="text-sm" style={{ color: "hsl(var(--text-primary))" }}>Active</label>
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
