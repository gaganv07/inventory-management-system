"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, Tag, Users, Truck, ArrowDownCircle,
  ArrowUpCircle, ShoppingCart, BarChart3, FileText, UserCog,
  ClipboardList, Settings, ChevronLeft, ChevronRight, Factory,
  Menu, X, Bell, Search, Moon, Sun, LogOut, User, ChevronDown,
  AlertTriangle, TrendingUp
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
      { href: "/dashboard/analytics", icon: <TrendingUp size={18} />, label: "Analytics" },
    ],
  },
  {
    label: "Inventory",
    items: [
      { href: "/dashboard/products", icon: <Package size={18} />, label: "Products" },
      { href: "/dashboard/categories", icon: <Tag size={18} />, label: "Categories" },
      { href: "/dashboard/suppliers", icon: <Truck size={18} />, label: "Suppliers" },
    ],
  },
  {
    label: "Transactions",
    items: [
      { href: "/dashboard/stock-in", icon: <ArrowDownCircle size={18} />, label: "Stock In" },
      { href: "/dashboard/stock-out", icon: <ArrowUpCircle size={18} />, label: "Stock Out" },
      { href: "/dashboard/purchase-orders", icon: <ShoppingCart size={18} />, label: "Purchase Orders" },
    ],
  },
  {
    label: "Reports",
    items: [
      { href: "/dashboard/reports", icon: <BarChart3 size={18} />, label: "Reports" },
      { href: "/dashboard/audit-logs", icon: <ClipboardList size={18} />, label: "Audit Logs" },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/dashboard/users", icon: <UserCog size={18} />, label: "User Management" },
      { href: "/dashboard/profile", icon: <User size={18} />, label: "My Profile" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={onMobileClose} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn("sidebar", collapsed && "collapsed", mobileOpen && "mobile-open")}
        style={{
          background: "var(--sidebar-bg, hsl(var(--surface)))",
          borderRight: "1px solid hsl(var(--border))",
        }}
        animate={{ width: collapsed ? 70 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>

        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4" style={{ height: "64px", borderBottom: "1px solid hsl(var(--border))", flexShrink: 0 }}>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                  <Factory size={17} color="white" />
                </div>
                <span className="font-bold text-sm" style={{ color: "hsl(var(--text-primary))" }}>
                  industrial<span style={{ color: "#6366f1" }}>visit</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <Factory size={17} color="white" />
            </div>
          )}
          {!collapsed && (
            <button onClick={onToggle} className="p-1.5 rounded-lg transition-colors" style={{ color: "hsl(var(--text-muted))" }}
              title="Collapse sidebar">
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              {!collapsed && (
                <div className="px-4 mb-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--text-muted))" }}>
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}
                    className={cn("nav-item", isActive && "active")}
                    title={collapsed ? item.label : undefined}
                    style={collapsed ? { justifyContent: "center", margin: "1px 6px" } : {}}>
                    <span className={cn("flex-shrink-0", isActive ? "" : "")} style={{ color: isActive ? "#6366f1" : "hsl(var(--text-secondary))" }}>
                      {item.icon}
                    </span>
                    {!collapsed && <span className="truncate text-sm">{item.label}</span>}
                  </Link>
                );
              })}
              {!collapsed && <div className="mx-4 mt-3" style={{ borderBottom: "1px solid hsl(var(--border))", opacity: 0.5 }} />}
            </div>
          ))}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <div className="p-3">
            <button onClick={onToggle} className="w-full flex items-center justify-center p-2 rounded-lg transition-colors" style={{ color: "hsl(var(--text-muted))", background: "hsl(var(--surface-2))" }}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Low stock alert */}
        {!collapsed && (
          <div className="m-3 p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} color="#ef4444" />
              <span className="text-xs font-semibold" style={{ color: "#ef4444" }}>5 Low Stock Items</span>
            </div>
            <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Immediate reorder required</p>
            <Link href="/dashboard/reports?type=low-stock" className="text-xs font-medium mt-1 block" style={{ color: "#6366f1" }}>View All →</Link>
          </div>
        )}
      </motion.aside>
    </>
  );
}

interface HeaderProps {
  onMobileMenuOpen: () => void;
  collapsed: boolean;
}

function Header({ onMobileMenuOpen, collapsed }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/analytics": "Analytics",
    "/dashboard/products": "Products",
    "/dashboard/categories": "Categories",
    "/dashboard/suppliers": "Suppliers",
    "/dashboard/stock-in": "Stock In",
    "/dashboard/stock-out": "Stock Out",
    "/dashboard/purchase-orders": "Purchase Orders",
    "/dashboard/reports": "Reports",
    "/dashboard/users": "User Management",
    "/dashboard/profile": "My Profile",
    "/dashboard/audit-logs": "Audit Logs",
  };
  const title = pageTitles[pathname] ?? "Dashboard";

  const notifications = [
    { icon: "⚠️", text: "Industrial Bearings 6205 is low on stock", time: "2m ago", type: "warning" },
    { icon: "✅", text: "Stock In recorded: +200 KG Steel Rod", time: "1h ago", type: "success" },
    { icon: "📋", text: "PO-2024-0004 approved by Manager", time: "3h ago", type: "info" },
    { icon: "🔔", text: "Monthly report is ready to download", time: "1d ago", type: "info" },
  ];

  return (
    <header className="page-header" style={{ marginLeft: 0 }}>
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 rounded-lg" onClick={onMobileMenuOpen} style={{ color: "hsl(var(--text-secondary))" }}>
          <Menu size={20} />
        </button>

        {/* Breadcrumb / Page title */}
        <div>
          <h1 className="font-semibold text-base" style={{ color: "hsl(var(--text-primary))" }}>{title}</h1>
          <p className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors" style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--text-muted))", minWidth: "200px" }}>
          <Search size={14} />
          <span className="text-xs">Search... </span>
          <kbd className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ background: "hsl(var(--surface-3))", fontFamily: "monospace" }}>⌘K</kbd>
        </button>

        {/* Theme toggle */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg transition-all" style={{ color: "hsl(var(--text-secondary))", background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg transition-all" style={{ color: "hsl(var(--text-secondary))", background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 rounded-xl shadow-xl z-50" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                  <span className="font-semibold text-sm">Notifications</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>4 new</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors" style={{ borderBottom: i < notifications.length - 1 ? "1px solid hsl(var(--border))" : "" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--surface-2))")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                      <span className="text-lg flex-shrink-0">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--text-primary))" }}>{n.text}</p>
                        <p className="text-xs mt-1" style={{ color: "hsl(var(--text-muted))" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3">
                  <button className="w-full text-xs font-medium" style={{ color: "#6366f1" }}>View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="relative">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all" style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              AD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Admin User</div>
              <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Administrator</div>
            </div>
            <ChevronDown size={14} style={{ color: "hsl(var(--text-muted))" }} />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 rounded-xl shadow-xl z-50" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                {[
                  { icon: <User size={15} />, label: "Profile Settings", href: "/dashboard/profile" },
                  { icon: <Settings size={15} />, label: "System Settings", href: "/dashboard/settings" },
                ].map((item, i) => (
                  <Link key={i} href={item.href} onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors"
                    style={{ color: "hsl(var(--text-primary))", borderBottom: "1px solid hsl(var(--border))" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--surface-2))")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                    <span style={{ color: "hsl(var(--text-muted))" }}>{item.icon}</span> {item.label}
                  </Link>
                ))}
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-sm transition-colors" style={{ color: "#ef4444" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  <LogOut size={15} /> Sign Out
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={cn("main-content", collapsed && "sidebar-collapsed")}>
        <Header onMobileMenuOpen={() => setMobileOpen(true)} collapsed={collapsed} />
        <main className="page-body">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
