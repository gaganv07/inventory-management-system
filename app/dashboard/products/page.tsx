"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Filter, Download, Edit, Trash2, QrCode,
  Package, ChevronLeft, ChevronRight, Eye, RefreshCw,
  SortAsc, MoreVertical
} from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import { formatCurrency, getStockStatus, generateSKU } from "@/lib/utils";
import type { Product, ProductStatus } from "@/types";
import { toast } from "sonner";

const STATUS_OPTIONS: ProductStatus[] = ["ACTIVE", "INACTIVE", "DISCONTINUED"];
const PAGE_SIZE = 8;

// Product Form Modal
function ProductModal({
  product, onClose, onSave
}: {
  product?: Product | null;
  onClose: () => void;
  onSave: (data: Partial<Product>) => void;
}) {
  const [form, setForm] = useState({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    barcode: product?.barcode ?? "",
    purchasePrice: product?.purchasePrice ?? 0,
    sellingPrice: product?.sellingPrice ?? 0,
    quantity: product?.quantity ?? 0,
    unit: product?.unit ?? "PCS",
    reorderLevel: product?.reorderLevel ?? 10,
    description: product?.description ?? "",
    status: product?.status ?? "ACTIVE" as ProductStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    toast.success(product ? "Product updated successfully!" : "Product added successfully!");
    onClose();
  };

  const inputStyle = {
    background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))",
    color: "hsl(var(--text-primary))", borderRadius: "8px",
    padding: "9px 12px", fontSize: "14px", width: "100%", outline: "none",
    fontFamily: "inherit", transition: "border-color 0.2s",
  };
  const labelStyle = { fontSize: "12px", fontWeight: "600", color: "hsl(var(--text-secondary))", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "6px" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", maxHeight: "90vh", overflowY: "auto" }}>

        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <div>
            <h2 className="font-bold text-lg" style={{ color: "hsl(var(--text-primary))" }}>
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "hsl(var(--text-muted))" }}>Fill in the product details below</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label style={labelStyle}>Product Name *</label>
              <input style={inputStyle} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Steel Rod 12mm" />
            </div>
            <div>
              <label style={labelStyle}>SKU</label>
              <div className="flex gap-2">
                <input style={{ ...inputStyle, flex: 1 }} value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="Auto-generated" />
                <button type="button" onClick={() => setForm({ ...form, sku: generateSKU(form.name || "PROD") })} className="px-3 rounded-lg text-xs font-medium flex-shrink-0" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}>
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Barcode</label>
              <input style={inputStyle} value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })} placeholder="Barcode number" />
            </div>
            <div>
              <label style={labelStyle}>Purchase Price (₹)</label>
              <input type="number" style={inputStyle} required min={0} value={form.purchasePrice} onChange={(e) => setForm({ ...form, purchasePrice: +e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Selling Price (₹)</label>
              <input type="number" style={inputStyle} required min={0} value={form.sellingPrice} onChange={(e) => setForm({ ...form, sellingPrice: +e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Initial Quantity</label>
              <input type="number" style={inputStyle} min={0} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: +e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Unit</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                {["PCS", "KG", "LTR", "MTR", "BOX", "ROLL", "SET", "PAIR", "TON", "DOZEN", "BAG"].map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Reorder Level</label>
              <input type="number" style={inputStyle} min={0} value={form.reorderLevel} onChange={(e) => setForm({ ...form, reorderLevel: +e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional product description" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn btn-primary flex-1" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Delete Confirm Modal
function DeleteModal({ productName, onConfirm, onClose }: { productName: string; onConfirm: () => void; onClose: () => void; }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm p-6 rounded-2xl shadow-2xl text-center" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
        <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
          <Trash2 size={24} color="#ef4444" />
        </div>
        <h3 className="font-bold text-lg mb-2" style={{ color: "hsl(var(--text-primary))" }}>Delete Product?</h3>
        <p className="text-sm mb-6" style={{ color: "hsl(var(--text-muted))" }}>
          Are you sure you want to delete <strong>{productName}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
          <button onClick={onConfirm} className="btn btn-danger flex-1">Delete</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteModal, setDeleteModal] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [products, search, statusFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setDeleteModal(null);
    toast.success("Product deleted successfully.");
  };

  const handleSave = (data: Partial<Product>) => {
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...data } : p));
    } else {
      const newProduct: Product = {
        id: `p${Date.now()}`,
        categoryId: "c1", supplierId: null, image: null, barcode: null,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        ...data,
      } as Product;
      setProducts([newProduct, ...products]);
    }
  };

  const statusConfig = {
    ACTIVE: { label: "Active", className: "badge badge-success" },
    INACTIVE: { label: "Inactive", className: "badge badge-warning" },
    DISCONTINUED: { label: "Discontinued", className: "badge badge-danger" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Products</h2>
          <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{filtered.length} products found</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-secondary" onClick={() => toast.info("Exporting CSV...")}>
            <Download size={15} /> Export
          </button>
          <button className="btn btn-primary" onClick={() => { setEditProduct(null); setModalOpen(true); }}
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--text-muted))" }} />
          <input className="input pl-10" placeholder="Search by product name or SKU..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ALL", "ACTIVE", "INACTIVE", "DISCONTINUED"].map((s) => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: statusFilter === s ? "rgba(99,102,241,0.15)" : "hsl(var(--surface-2))",
                color: statusFilter === s ? "#6366f1" : "hsl(var(--text-secondary))",
                border: statusFilter === s ? "1px solid rgba(99,102,241,0.3)" : "1px solid hsl(var(--border))",
              }}>
              {s === "ALL" ? "All Status" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Purchase Price</th>
              <th>Selling Price</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <Package size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium" style={{ color: "hsl(var(--text-muted))" }}>No products found</p>
                    <p className="text-sm mt-1" style={{ color: "hsl(var(--text-muted))", opacity: 0.7 }}>Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : paginated.map((product, i) => {
                const stockStatus = getStockStatus(product.quantity, product.reorderLevel);
                return (
                  <motion.tr key={product.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.1)" }}>
                          <Package size={16} color="#6366f1" />
                        </div>
                        <div>
                          <p className="font-medium text-sm" style={{ color: "hsl(var(--text-primary))" }}>{product.name}</p>
                          <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{product.category?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td><code className="text-xs px-2 py-1 rounded-lg font-mono" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-secondary))" }}>{product.sku}</code></td>
                    <td><span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{product.category?.name ?? "—"}</span></td>
                    <td>
                      <div>
                        <span className="font-semibold text-sm" style={{ color: "hsl(var(--text-primary))" }}>{product.quantity} {product.unit}</span>
                        <div className="mt-0.5">
                          <span className={`badge ${product.quantity === 0 ? "badge-danger" : product.quantity <= product.reorderLevel ? "badge-warning" : "badge-success"}`} style={{ fontSize: "11px", padding: "1px 7px" }}>
                            {stockStatus.label}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td><span className="text-sm font-medium" style={{ color: "hsl(var(--text-primary))" }}>{formatCurrency(product.purchasePrice)}</span></td>
                    <td><span className="text-sm font-semibold" style={{ color: "#22c55e" }}>{formatCurrency(product.sellingPrice)}</span></td>
                    <td>
                      <span className={`badge ${statusConfig[product.status].className}`} style={{ fontSize: "11px" }}>
                        {statusConfig[product.status].label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 justify-end">
                        <button onClick={() => toast.info(`QR Code for ${product.sku}`)} className="p-1.5 rounded-lg transition-colors" style={{ color: "hsl(var(--text-muted))", background: "hsl(var(--surface-2))" }} title="View QR">
                          <QrCode size={14} />
                        </button>
                        <button onClick={() => { setEditProduct(product); setModalOpen(true); }} className="p-1.5 rounded-lg transition-colors" style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)" }} title="Edit">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => setDeleteModal(product)} className="p-1.5 rounded-lg transition-colors" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid hsl(var(--border))" }}>
            <span className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg disabled:opacity-40 transition-colors" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button key={pageNum} onClick={() => setPage(pageNum)} className="w-8 h-8 rounded-lg text-xs font-medium transition-all"
                    style={{ background: page === pageNum ? "#6366f1" : "hsl(var(--surface-2))", color: page === pageNum ? "white" : "hsl(var(--text-muted))" }}>
                    {pageNum}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg disabled:opacity-40 transition-colors" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {modalOpen && (
          <ProductModal
            product={editProduct}
            onClose={() => { setModalOpen(false); setEditProduct(null); }}
            onSave={handleSave}
          />
        )}
        {deleteModal && (
          <DeleteModal
            productName={deleteModal.name}
            onConfirm={() => handleDelete(deleteModal.id)}
            onClose={() => setDeleteModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
