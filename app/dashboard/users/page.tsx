"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, UserCog, Shield, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { mockUsers } from "@/lib/mock-data";
import type { User, Role } from "@/types";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

const ROLE_CONFIG: Record<Role, { label: string; color: string; bg: string }> = {
  ADMIN: { label: "Admin", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  MANAGER: { label: "Manager", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  EMPLOYEE: { label: "Employee", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EMPLOYEE" as Role, isActive: true });

  const openAdd = () => { setEditUser(null); setForm({ name: "", email: "", password: "", role: "EMPLOYEE", isActive: true }); setModalOpen(true); };
  const openEdit = (user: User) => { setEditUser(user); setForm({ name: user.name, email: user.email, password: "", role: user.role, isActive: user.isActive }); setModalOpen(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u));
      toast.success("User updated!");
    } else {
      const newUser: User = { id: `u${Date.now()}`, ...form, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setUsers([...users, newUser]);
      toast.success("User created!");
    }
    setModalOpen(false);
  };

  const handleToggle = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
    const user = users.find(u => u.id === id);
    toast.success(`${user?.name} ${user?.isActive ? "disabled" : "enabled"}`);
  };

  const handleDelete = (id: string) => {
    const user = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    toast.success(`${user?.name} deleted.`);
  };

  const inputStyle = { background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--text-primary))", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", width: "100%", outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "12px", fontWeight: "600" as const, color: "hsl(var(--text-secondary))", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "6px" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>User Management</h2>
          <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{users.length} users in the system</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          <Plus size={15} /> Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(["ADMIN", "MANAGER", "EMPLOYEE"] as Role[]).map(role => {
          const count = users.filter(u => u.role === role).length;
          const conf = ROLE_CONFIG[role];
          return (
            <motion.div key={role} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-4 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: conf.bg }}>
                <Shield size={18} style={{ color: conf.color }} />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: "hsl(var(--text-primary))" }}>{count}</div>
              <div className="text-xs font-medium" style={{ color: conf.color }}>{conf.label}s</div>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th><th className="text-right">Actions</th></tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              const conf = ROLE_CONFIG[user.role];
              const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
              return (
                <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                        {initials}
                      </div>
                      <span className="font-medium text-sm" style={{ color: "hsl(var(--text-primary))" }}>{user.name}</span>
                    </div>
                  </td>
                  <td><span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{user.email}</span></td>
                  <td>
                    <span className="badge text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: conf.bg, color: conf.color }}>
                      {conf.label}
                    </span>
                  </td>
                  <td><span className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{formatDate(user.createdAt)}</span></td>
                  <td>
                    <span className={`badge ${user.isActive ? "badge-success" : "badge-danger"}`} style={{ fontSize: "11px" }}>
                      {user.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 justify-end">
                      <button onClick={() => handleToggle(user.id)} className="p-1.5 rounded-lg" style={{ color: user.isActive ? "#f97316" : "#22c55e", background: user.isActive ? "rgba(249,115,22,0.1)" : "rgba(34,197,94,0.1)" }}
                        title={user.isActive ? "Disable" : "Enable"}>
                        {user.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => openEdit(user)} className="p-1.5 rounded-lg" style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)" }}><Edit size={14} /></button>
                      <button onClick={() => handleDelete(user.id)} className="p-1.5 rounded-lg" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl shadow-2xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                <h2 className="font-bold text-lg" style={{ color: "hsl(var(--text-primary))" }}>{editUser ? "Edit User" : "Create User"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>✕</button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div><label style={labelStyle}>Full Name *</label><input style={inputStyle} required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label style={labelStyle}>Email *</label><input type="email" style={inputStyle} required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                {!editUser && <div><label style={labelStyle}>Password *</label><input type="password" style={inputStyle} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" /></div>}
                <div>
                  <label style={labelStyle}>Role</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.role} onChange={e => setForm({ ...form, role: e.target.value as Role })}>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="userActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ accentColor: "#6366f1", width: "16px", height: "16px" }} />
                  <label htmlFor="userActive" className="text-sm" style={{ color: "hsl(var(--text-primary))" }}>Account Active</label>
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
