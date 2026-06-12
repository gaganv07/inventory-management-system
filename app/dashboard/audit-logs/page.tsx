"use client";

import { motion } from "framer-motion";
import { ClipboardList, Package, User, LogIn, ShoppingCart } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const auditLogs = [
  { id: "al1", action: "LOGIN", entity: "Auth", entityId: null, user: { name: "Admin User" }, ipAddress: "192.168.1.100", createdAt: new Date().toISOString(), icon: <LogIn size={14} />, color: "#6366f1" },
  { id: "al2", action: "PRODUCT_UPDATED", entity: "Product", entityId: "p1", user: { name: "Admin User" }, ipAddress: "192.168.1.100", createdAt: new Date(Date.now() - 3600000).toISOString(), icon: <Package size={14} />, color: "#22c55e" },
  { id: "al3", action: "STOCK_IN", entity: "StockTransaction", entityId: "t1", user: { name: "Manager User" }, ipAddress: "192.168.1.101", createdAt: new Date(Date.now() - 7200000).toISOString(), icon: <Package size={14} />, color: "#22c55e" },
  { id: "al4", action: "STOCK_OUT", entity: "StockTransaction", entityId: "t2", user: { name: "Employee User" }, ipAddress: "192.168.1.102", createdAt: new Date(Date.now() - 10800000).toISOString(), icon: <Package size={14} />, color: "#ef4444" },
  { id: "al5", action: "PO_APPROVED", entity: "PurchaseOrder", entityId: "po1", user: { name: "Manager User" }, ipAddress: "192.168.1.101", createdAt: new Date(Date.now() - 86400000).toISOString(), icon: <ShoppingCart size={14} />, color: "#8b5cf6" },
  { id: "al6", action: "USER_CREATED", entity: "User", entityId: "u4", user: { name: "Admin User" }, ipAddress: "192.168.1.100", createdAt: new Date(Date.now() - 172800000).toISOString(), icon: <User size={14} />, color: "#f97316" },
];

const ACTION_LABELS: Record<string, string> = {
  LOGIN: "User Login",
  PRODUCT_UPDATED: "Product Updated",
  STOCK_IN: "Stock In Recorded",
  STOCK_OUT: "Stock Out Recorded",
  PO_APPROVED: "Purchase Order Approved",
  USER_CREATED: "New User Created",
};

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>Audit Logs</h2>
        <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>Complete activity trail — all system events are logged</p>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>Action</th><th>Entity</th><th>User</th><th>IP Address</th><th>Timestamp</th></tr>
          </thead>
          <tbody>
            {auditLogs.map((log, i) => (
              <motion.tr key={log.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <td>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${log.color}18`, color: log.color }}>
                      {log.icon}
                    </div>
                    <span className="text-sm font-medium" style={{ color: "hsl(var(--text-primary))" }}>{ACTION_LABELS[log.action] ?? log.action}</span>
                  </div>
                </td>
                <td><code className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-secondary))" }}>{log.entity}{log.entityId ? ` #${log.entityId.slice(-4)}` : ""}</code></td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                      {log.user.name[0]}
                    </div>
                    <span className="text-sm" style={{ color: "hsl(var(--text-secondary))" }}>{log.user.name}</span>
                  </div>
                </td>
                <td><code className="text-xs" style={{ color: "hsl(var(--text-muted))", fontFamily: "monospace" }}>{log.ipAddress}</code></td>
                <td><span className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>{formatDateTime(log.createdAt)}</span></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
