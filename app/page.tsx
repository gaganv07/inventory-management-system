"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Package, BarChart3, Users, ShieldCheck, Zap, Globe,
  Smartphone, Settings, ChevronDown, ArrowRight, CheckCircle,
  Star, Menu, X, Moon, Sun, LayoutDashboard, Truck,
  FileText, Bell, TrendingUp, Box, QrCode, Download,
  Mail, Phone, Building2, MessageSquare, ChevronRight,
  Factory, Award, Clock, Database
} from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

// Navigation
function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: "blur(20px)", background: "rgba(10,12,28,0.85)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <Factory size={18} color="white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">industrial<span style={{ color: "#6366f1" }}>visit</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "About", "Pricing", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >{item}</a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0" style={{ color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              Sign In
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", boxShadow: "0 4px 15px rgba(99,102,241,0.4)" }}>
              Live Demo →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden px-4 pb-4 space-y-2" style={{ background: "rgba(10,12,28,0.98)" }}>
          {["Features", "About", "Pricing", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="block text-sm font-medium py-3 border-b" style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.06)" }}>{item}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="flex-1 text-center text-sm font-medium py-2 rounded-lg" style={{ color: "white", background: "rgba(255,255,255,0.08)" }}>Sign In</Link>
            <Link href="/dashboard" className="flex-1 text-center text-sm font-semibold py-2 rounded-lg" style={{ background: "#6366f1", color: "white" }}>Live Demo</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #060812 0%, #0a0d1e 50%, #080b18 100%)" }}>
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5" style={{ background: "radial-gradient(circle, #6366f1, transparent 60%)", filter: "blur(80px)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Enterprise Inventory Management
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ color: "white" }}>
              Smart Inventory<br />
              <span style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                for Modern Industries
              </span>
            </h1>

            <p className="text-xl mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.8" }}>
              Track stock, manage suppliers, monitor inventory movement, and make data-driven decisions from one secure cloud platform.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-12">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all whitespace-nowrap flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.4)"; }}>
                Request Demo <ArrowRight size={18} />
              </a>
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all whitespace-nowrap flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                <LayoutDashboard size={18} /> View Live Dashboard
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6">
              {[
                { icon: <ShieldCheck size={16} />, text: "Bank-grade Security" },
                { icon: <Zap size={16} />, text: "Real-time Updates" },
                { icon: <Smartphone size={16} />, text: "Mobile Ready" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span style={{ color: "#6366f1" }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Dashboard Preview */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
              {/* Window bar */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                <div className="flex-1 mx-4">
                  <div className="mx-auto w-48 h-5 rounded-md text-xs flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>
                    app.industrialvisit.com
                  </div>
                </div>
              </div>

              {/* Dashboard mockup content */}
              <div className="p-4 space-y-3">
                {/* KPI row */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Total Products", value: "1,247", color: "#6366f1", icon: "📦" },
                    { label: "Stock Value", value: "₹85.4L", color: "#22c55e", icon: "💰" },
                    { label: "Low Stock", value: "12", color: "#f97316", icon: "⚠️" },
                    { label: "Suppliers", value: "48", color: "#8b5cf6", icon: "🏭" },
                  ].map((kpi, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                      className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-lg mb-1">{kpi.icon}</div>
                      <div className="text-white font-bold text-sm">{kpi.value}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{kpi.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", height: "120px" }}>
                  <div className="text-xs font-medium mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Monthly Stock Movement</div>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 55, 80, 70, 90, 75, 95, 85, 100, 88, 92].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
                        className="flex-1 rounded-sm" style={{ background: i % 2 === 0 ? "rgba(99,102,241,0.7)" : "rgba(139,92,246,0.5)" }} />
                    ))}
                  </div>
                </div>

                {/* Table preview */}
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  {[
                    { name: "Steel Rod 12mm", qty: "500 KG", status: "🟢" },
                    { name: "Industrial Bearings", qty: "8 PCS", status: "🔴" },
                    { name: "Hydraulic Oil 46", qty: "12 LTR", status: "🟡" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 text-xs" style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "", background: "rgba(255,255,255,0.02)" }}>
                      <span style={{ color: "rgba(255,255,255,0.7)" }}>{row.name}</span>
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>{row.qty}</span>
                      <span>{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating notification card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="absolute -bottom-6 -left-6 rounded-xl p-3 flex items-center gap-3 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #1a1f3a, #141729)", border: "1px solid rgba(99,102,241,0.3)", minWidth: "200px" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.2)" }}>
                <Bell size={16} color="#ef4444" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Low Stock Alert</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Bearings 6205 — 8 units left</div>
              </div>
            </motion.div>

            {/* Floating success card */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
              className="absolute -top-4 -right-4 rounded-xl p-3 flex items-center gap-3 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #1a1f3a, #141729)", border: "1px solid rgba(34,197,94,0.3)", minWidth: "180px" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(34,197,94,0.2)" }}>
                <CheckCircle size={16} color="#22c55e" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Stock Updated</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>+200 KG Steel added</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll to explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={20} color="rgba(255,255,255,0.3)" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Stats Section
function Stats() {
  const stats = [
    { value: 500, suffix: "+", label: "Industries Served", icon: <Factory size={24} /> },
    { value: 50000, suffix: "+", label: "Products Tracked", icon: <Package size={24} /> },
    { value: 99.9, suffix: "%", label: "Uptime SLA", icon: <Clock size={24} /> },
    { value: 10, suffix: "M+", label: "Transactions Processed", icon: <Database size={24} /> },
  ];

  return (
    <section className="py-20" style={{ background: "linear-gradient(135deg, #0a0d1e, #0d1025)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: "rgba(99,102,241,0.15)", color: "#6366f1" }}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    { icon: <TrendingUp size={24} />, title: "Real-Time Inventory Tracking", desc: "Monitor stock levels, movements, and valuations in real-time with instant alerts when thresholds are breached.", color: "#6366f1" },
    { icon: <QrCode size={24} />, title: "Barcode & QR Support", desc: "Generate and scan barcodes and QR codes for lightning-fast product identification and stock operations.", color: "#8b5cf6" },
    { icon: <BarChart3 size={24} />, title: "Smart Analytics & Reports", desc: "Generate comprehensive reports — stock, movement, supplier performance — and export to PDF, Excel, or CSV.", color: "#ec4899" },
    { icon: <Truck size={24} />, title: "Supplier Management", desc: "Maintain complete supplier profiles, GST details, track purchase orders, and manage supplier relationships.", color: "#f97316" },
    { icon: <FileText size={24} />, title: "Purchase Order Tracking", desc: "Create, approve, and track purchase orders through their entire lifecycle with automated inventory updates.", color: "#22c55e" },
    { icon: <ShieldCheck size={24} />, title: "Secure Cloud Access", desc: "Role-based access control, encrypted data, audit logs, and enterprise-grade security for peace of mind.", color: "#14b8a6" },
    { icon: <Bell size={24} />, title: "Smart Alerts", desc: "Automated low stock notifications, reorder alerts, and transaction confirmations keep your team informed.", color: "#eab308" },
    { icon: <Download size={24} />, title: "Bulk Import & Export", desc: "Import products via CSV/Excel and export complete inventory data in multiple formats.", color: "#3b82f6" },
  ];

  return (
    <section id="features" className="py-24" style={{ background: "#070a18" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
            ⚡ Powerful Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Everything your factory needs</h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Built specifically for industrial businesses — from small workshops to large-scale manufacturing plants.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl group cursor-default transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}20`, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us
function WhyChooseUs() {
  const reasons = [
    { icon: "🚀", title: "Easy to Use", desc: "Intuitive interface designed for factory workers and managers — no training needed." },
    { icon: "🔒", title: "Enterprise Secure", desc: "Role-based access, encrypted data, and comprehensive audit logs protect your business." },
    { icon: "⚡", title: "Blazing Fast", desc: "Real-time updates and optimized queries ensure zero lag even with thousands of products." },
    { icon: "📈", title: "Infinitely Scalable", desc: "From 100 to 100,000 products — the system scales with your business growth." },
    { icon: "📱", title: "Mobile Friendly", desc: "Fully responsive — use it on the shop floor with your phone or tablet." },
    { icon: "🛠️", title: "Customizable", desc: "White-label ready with custom fields, categories, and workflow configuration." },
  ];

  return (
    <section id="about" className="py-24" style={{ background: "linear-gradient(135deg, #0a0d1e, #060812)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
              Why industrialvisit
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Built for Indian Industrial Businesses</h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              We understand the unique challenges of managing inventory in Indian manufacturing — from GST compliance to multi-location warehouses. industrialvisit was designed from the ground up for your needs.
            </p>
            <div className="space-y-4">
              {["GST-compliant purchase orders", "Multi-unit support (KG, LTR, MTR, PCS, and more)", "Hindi + English interface ready", "Works with existing barcode scanners", "Export-ready for audits and compliance"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={18} color="#22c55e" />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-2xl mb-3">{r.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{r.title}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{r.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const testimonials = [
    { name: "Arvind Mehta", company: "Mehta Steel Fabricators, Rajkot", rating: 5, text: "After 15 years of managing inventory on spreadsheets, industrialvisit transformed our operations. We reduced stock wastage by 40% in the first month.", avatar: "AM" },
    { name: "Kavitha Raghunathan", company: "KR Industrial Supplies, Chennai", rating: 5, text: "The low stock alerts alone saved us from multiple production stoppages. The supplier management feature is exactly what we needed.", avatar: "KR" },
    { name: "Suresh Patel", company: "Patel Engineering Works, Ahmedabad", rating: 5, text: "Our accountant loves the GST-ready purchase orders. The reports are professional enough to show bank managers. Highly recommended!", avatar: "SP" },
  ];

  return (
    <section className="py-24" style={{ background: "#070a18" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
            💬 Client Stories
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by industry leaders</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Join hundreds of industrial businesses across India</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#eab308" color="#eab308" />
                ))}
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{t.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Do I need to install any software?", a: "No. industrialvisit is fully cloud-based. Access it from any browser — desktop, tablet, or mobile. No installation required." },
    { q: "Can I use it without a database server?", a: "The demo version works with mock data out of the box. For production use, you can connect to any PostgreSQL database — including free options like Supabase or Neon." },
    { q: "Is my data secure?", a: "Yes. All data is encrypted in transit and at rest. Role-based access control ensures employees only see what they're authorized to. Full audit logs track every action." },
    { q: "Can I import my existing Excel inventory?", a: "Absolutely. The system supports bulk CSV/Excel import for products, categories, and suppliers. Migration is quick and straightforward." },
    { q: "Does it support multiple warehouses?", a: "Yes. The system supports multiple locations and warehouses with separate stock tracking and consolidated reports." },
    { q: "What reports can I generate?", a: "Stock reports, low stock alerts, product movement history, supplier performance, purchase order summaries, and valuation reports — all exportable to PDF, Excel, or CSV." },
  ];

  return (
    <section id="pricing" className="py-24" style={{ background: "linear-gradient(135deg, #0a0d1e, #060812)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
            ❓ Common Questions
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Frequently asked questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                <span className="font-medium text-white text-sm">{faq.q}</span>
                <ChevronDown size={18} color="rgba(255,255,255,0.4)" style={{ transform: open === i ? "rotate(180deg)" : "", transition: "transform 0.2s" }} />
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 pb-4">
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Form
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24" style={{ background: "#070a18" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
            📬 Get in Touch
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Request a Demo</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>We'll get back to you within 24 hours with a personalized demo</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 rounded-2xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <CheckCircle size={56} color="#22c55e" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Our team will contact you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit}
            className="space-y-4 p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { name: "name", label: "Your Name", type: "text", icon: <Users size={16} />, required: true },
              { name: "company", label: "Company Name", type: "text", icon: <Building2 size={16} />, required: true },
              { name: "phone", label: "Phone Number", type: "tel", icon: <Phone size={16} />, required: true },
              { name: "email", label: "Email Address", type: "email", icon: <Mail size={16} />, required: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>{field.label}</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }}>{field.icon}</div>
                  <input type={field.type} required={field.required} value={(form as Record<string, string>)[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                </div>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>Message</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your business and inventory needs..."
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
            </div>
            <button type="submit" className="w-full py-4 rounded-xl font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 30px rgba(99,102,241,0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(99,102,241,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(99,102,241,0.35)"; }}>
              Send Message <ArrowRight size={18} className="inline ml-2" />
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{ background: "#040609", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                <Factory size={18} color="white" />
              </div>
              <span className="font-bold text-white text-lg">industrial<span style={{ color: "#6366f1" }}>visit</span></span>
            </div>
            <p className="text-sm max-w-xs mb-6" style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}>
              Enterprise inventory management built for manufacturers, warehouses, distributors, and industrial businesses looking to modernize operations.
            </p>
            <div className="flex gap-3">
              {["📧 contact@industrialvisit.com", "📞 +91 98765 43210"].map((item, i) => (
                <span key={i} className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Product</h4>
            <div className="space-y-3">
              {["Dashboard", "Products", "Stock Management", "Reports", "Purchase Orders"].map((item) => (
                <div key={item}><a href="#" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{item}</a></div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Company</h4>
            <div className="space-y-3">
              {["About Us", "Features", "Pricing", "Contact", "Privacy Policy"].map((item) => (
                <div key={item}><a href="#" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{item}</a></div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2024 industrialvisit. All rights reserved. Built for Indian Industrial Businesses.
          </p>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
