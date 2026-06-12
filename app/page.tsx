"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  Package, BarChart3, Users, ShieldCheck, Zap, Globe,
  Smartphone, Settings, ChevronDown, ArrowRight, CheckCircle,
  Star, Menu, X, LayoutDashboard, Truck,
  FileText, Bell, TrendingUp, Box, QrCode, Download,
  Mail, Phone, Building2, MessageSquare, ChevronRight,
  Factory, Award, Clock, Database, Shield, Lock, Clipboard,
  Check, FileSpreadsheet, Eye, Play, DollarSign, HelpCircle,
  Briefcase
} from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { toast } from "sonner";

// Professional company logo
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 4px 12px rgba(79,70,229,0.3)" }}>
        <Factory size={20} color="white" />
      </div>
      <span className="font-bold text-white text-xl tracking-tight">
        Indus<span style={{ color: "#818cf8" }}>Track</span>
      </span>
    </div>
  );
}

// Navigation
function Navbar({ onDemoScroll }: { onDemoScroll: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ backdropFilter: "blur(24px)", background: "rgba(8,10,24,0.85)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Solutions", href: "#solutions" },
              { label: "Features", href: "#features" },
              { label: "Why IndusTrack", href: "#why-us" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQs", href: "#faq" }
            ].map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200">
                {item.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <button onClick={onDemoScroll} className="text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all duration-200">
              Book Free Demo
            </button>
            <Link href="/login" className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all duration-200" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 4px 15px rgba(79,70,229,0.35)" }}>
              View Live Demo →
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
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden px-4 pb-6 space-y-3" style={{ background: "rgba(8,10,24,0.98)" }}>
          {[
            { label: "Solutions", href: "#solutions" },
            { label: "Features", href: "#features" },
            { label: "Why IndusTrack", href: "#why-us" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQs", href: "#faq" }
          ].map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block text-base font-semibold py-3 border-b border-white/5 text-gray-300 hover:text-white">
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-3">
            <button onClick={() => { setOpen(false); onDemoScroll(); }} className="w-full text-center text-sm font-semibold py-3 rounded-xl border border-white/10 text-white bg-white/5">
              Book Free Demo
            </button>
            <Link href="/login" className="w-full text-center text-sm font-semibold py-3 rounded-xl text-white" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
              View Live Demo
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// Hero Section
function Hero({ onDemoScroll }: { onDemoScroll: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24" style={{ background: "radial-gradient(circle at top, #0d0e23 0%, #060713 100%)" }}>
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #4f46e5, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", filter: "blur(60px)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-indigo-500/20 text-indigo-300" style={{ background: "rgba(79,70,229,0.1)" }}>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Enterprise Grade B2B SaaS
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white">
                Enterprise Inventory Management Platform for <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">Manufacturers & Industrial Businesses</span>
              </h1>

              <p className="text-lg sm:text-xl mb-10 text-gray-400 leading-relaxed max-w-2xl">
                Track inventory, automate warehouse operations, manage suppliers, monitor stock movement, and generate real-time business insights from one secure cloud platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={onDemoScroll} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-300" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 8px 30px rgba(79,70,229,0.4)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}>
                  Book Free Demo <ArrowRight size={18} />
                </button>
                <Link href="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/10 hover:bg-white/5 transition-all duration-300"
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}>
                  <LayoutDashboard size={18} /> View Live Demo
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5 text-gray-500">
                {[
                  { icon: <ShieldCheck size={16} />, text: "AES-256 Encrypted" },
                  { icon: <Zap size={16} />, text: "GST & Tax Compliant" },
                  { icon: <Smartphone size={16} />, text: "Desktop & Mobile Sync" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <span className="text-indigo-400">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard Preview */}
          <div className="lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-2xl" style={{ backdropFilter: "blur(20px)" }}>
                {/* Window header */}
                <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/5 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <div className="flex-1 text-center text-xs font-mono text-gray-500 select-none">
                    app.industrack.in
                  </div>
                </div>

                {/* Simulated Screen Dashboard UI */}
                <div className="p-4 space-y-4 bg-slate-950/80">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white tracking-wide uppercase">⚙️ LIVE MONITOR</div>
                    <div className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">CONNECTED</div>
                  </div>

                  {/* Grid cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Total Stock Value</div>
                      <div className="text-lg font-extrabold text-white mt-1">₹1.87 Cr</div>
                      <div className="text-[9px] text-emerald-400 mt-1">↑ 14.2% Growth</div>
                    </div>
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Today's Dispatch</div>
                      <div className="text-lg font-extrabold text-white mt-1">42 Orders</div>
                      <div className="text-[9px] text-indigo-300 mt-1">100% On Time</div>
                    </div>
                  </div>

                  {/* Graph */}
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Weekly Warehouse Utilization</div>
                    <div className="flex items-end gap-2 h-16 pt-2">
                      {[35, 60, 45, 80, 55, 90, 78].map((val, idx) => (
                        <div key={idx} className="flex-1 rounded-t-md transition-all duration-500" style={{ height: `${val}%`, background: idx === 6 ? "linear-gradient(to top, #4f46e5, #818cf8)" : "rgba(255,255,255,0.06)" }} />
                      ))}
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-500 mt-2 font-mono">
                      <span>Mon</span><span>Wed</span><span>Sun (78%)</span>
                    </div>
                  </div>

                  {/* Alert notification block inside preview */}
                  <div className="flex items-center justify-between p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Bell size={12} className="text-amber-400" />
                      <span className="text-[10px] text-gray-300 font-medium">12 SKUs breached reorder level</span>
                    </div>
                    <span className="text-[9px] text-amber-300 font-bold font-mono">RESOLVE</span>
                  </div>
                </div>
              </div>

              {/* Floating micro indicators */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 p-3 bg-indigo-950/90 border border-indigo-500/30 rounded-xl shadow-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-indigo-200 font-bold">GST Invoicing</div>
                  <div className="text-[9px] text-gray-400">Automated HSN codes</div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -right-6 p-3 bg-emerald-950/90 border border-emerald-500/30 rounded-xl shadow-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-200 font-bold">Security Compliance</div>
                  <div className="text-[9px] text-gray-400">SOC2 Type II Certified</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Trust Signals
function TrustSignals() {
  const stats = [
    { value: 99.9, suffix: "%", label: "System Uptime SLA", icon: <Clock size={20} /> },
    { value: 10000, suffix: "+", label: "Products & SKUs Managed", icon: <Package size={20} /> },
    { value: 500000, suffix: "+", label: "Inventory Transactions Logs", icon: <Database size={20} /> },
    { value: 100, suffix: "+", label: "Industrial Businesses Active", icon: <Building2 size={20} /> },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">PROVEN PERFORMANCE</div>
          <h3 className="text-xl font-semibold text-gray-300">Supported by State-of-the-Art Operations & Architecture</h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 text-indigo-400 bg-indigo-500/10">
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Tags for security/trust */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 pt-8 border-t border-white/5">
          {["AES-256 Secure Infrastructure", "Cloud Hosted on Premium Servers", "Daily Automated Backups", "GST Invoice Format Ready", "Role-Based Access Control", "Encrypted Database Storage", "Fully Responsive Interface"].map((tag, idx) => (
            <span key={idx} className="text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-white/5 text-gray-400 flex items-center gap-1.5">
              <CheckCircle size={12} className="text-indigo-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Screenshot Showcase
function Showcase() {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "products", label: "Product Management" },
    { id: "reports", label: "Inventory Reports" },
    { id: "analytics", label: "Analytics View" },
    { id: "suppliers", label: "Supplier Portal" },
    { id: "purchase", label: "Purchase Orders" },
    { id: "sales", label: "Sales Orders" }
  ];

  const [activeTab, setActiveTab] = useState("dashboard");

  // Render dynamic interactive mockup mock preview
  const renderMockup = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-white uppercase">📦 Operational Overview</span>
              <span className="text-xs text-gray-400">Updated: Just now</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase">Inventory Value</div>
                <div className="text-2xl font-bold text-indigo-400 mt-1">₹1,87,40,000</div>
                <div className="text-[10px] text-emerald-400 mt-1">✓ Complete Valuation</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase">Low Stock Alerts</div>
                <div className="text-2xl font-bold text-amber-500 mt-1">50 Products</div>
                <div className="text-[10px] text-amber-400 mt-1">⚠️ Action Required</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase">Out of Stock</div>
                <div className="text-2xl font-bold text-rose-500 mt-1">20 Products</div>
                <div className="text-[10px] text-rose-400 mt-1">🔴 Production Halted</div>
              </div>
            </div>
            {/* Chart Area */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="text-xs font-semibold text-gray-300 mb-2">Annual Dispatch vs Receipts Volume</div>
              <div className="h-32 flex items-end gap-3 pt-4 border-b border-white/5">
                {[120, 200, 150, 300, 250, 420, 310, 500, 480, 550, 600, 710].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full">
                    <div className="w-full rounded-t-sm" style={{ height: `${v / 8}%`, background: "linear-gradient(to top, #4f46e5, #818cf8)" }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-gray-500 mt-2 font-mono">
                <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-white uppercase">📋 Product Catalog</span>
              <div className="text-xs px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg">500 SKUs Registered</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 bg-white/5">
                    <th className="p-2.5 font-semibold">SKU / Code</th>
                    <th className="p-2.5 font-semibold">Product Name</th>
                    <th className="p-2.5 font-semibold">Category</th>
                    <th className="p-2.5 font-semibold">Stock Qty</th>
                    <th className="p-2.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {[
                    { sku: "INV-ELC-0001", name: "Siemens PLC Module S7-1200", cat: "Automation & PLCs", qty: "45 PCS", status: "In Stock", sColor: "text-emerald-400 bg-emerald-500/10" },
                    { sku: "INV-RAW-0240", name: "Stainless Steel Sheet 2mm", cat: "Raw Materials", qty: "1,200 KG", status: "In Stock", sColor: "text-emerald-400 bg-emerald-500/10" },
                    { sku: "INV-BRG-0102", name: "SKF Ball Bearing 6205-2RS", cat: "Bearings", qty: "8 PCS", status: "Low Stock", sColor: "text-amber-400 bg-amber-500/10" },
                    { sku: "INV-MAC-0410", name: "Hydraulic Pump Gasket Kit", cat: "Machine Accessories", qty: "0 PCS", status: "Out of Stock", sColor: "text-rose-400 bg-rose-500/10" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-2.5 font-mono text-gray-400">{row.sku}</td>
                      <td className="p-2.5 font-semibold text-white">{row.name}</td>
                      <td className="p-2.5">{row.cat}</td>
                      <td className="p-2.5 font-medium">{row.qty}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${row.sColor}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-white uppercase">📊 Consolidated Reports</span>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white cursor-pointer flex items-center gap-1.5">
                  <Download size={12} /> Export CSV
                </span>
                <span className="text-xs px-2.5 py-1 bg-indigo-500/15 border border-indigo-500/25 rounded-lg text-indigo-300 hover:text-white cursor-pointer flex items-center gap-1.5">
                  <FileText size={12} /> Export PDF
                </span>
              </div>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Inventory Valuation Summary:</span>
                <span className="font-bold text-white">₹1,87,40,000 (INR)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Purchase Value (Last 24M):</span>
                <span className="font-bold text-white">₹2,98,00,000</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Sales Turnover (Last 24M):</span>
                <span className="font-bold text-white">₹4,27,50,000</span>
              </div>
            </div>
            <div className="text-[10px] text-gray-500 italic mt-2">
              * Report filters apply: Date (Last 24 months), Supplier (All), Warehouse (All Locations), Status (Completed)
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-white uppercase">📈 Warehouse Utilization Analytics</span>
              <span className="text-xs text-indigo-400 font-bold">Optimized Output</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col justify-between">
                <div className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Category Asset Distribution</div>
                <div className="space-y-2">
                  {[
                    { name: "Raw Materials", value: 38, color: "bg-indigo-500" },
                    { name: "Electrical & PLCs", value: 24, color: "bg-purple-500" },
                    { name: "Fasteners & Bearings", value: 18, color: "bg-pink-500" },
                    { name: "Tools & Accessories", value: 20, color: "bg-amber-500" }
                  ].map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-300 font-medium">{cat.name}</span>
                        <span className="text-white font-bold">{cat.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="text-[10px] text-gray-400 uppercase font-semibold mb-3">Supplier Lead Time vs Accuracy</div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-300">JSW Steel Ltd:</span>
                    <span className="font-bold text-emerald-400">98% Accuracy (4.2d)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Havells India:</span>
                    <span className="font-bold text-emerald-400">96% Accuracy (3.0d)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">SKF India Bearings:</span>
                    <span className="font-bold text-amber-400">89% Accuracy (5.5d)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Polycab Wires:</span>
                    <span className="font-bold text-emerald-400">99% Accuracy (2.5d)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "suppliers":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-white uppercase">🏭 Supplier Directory</span>
              <span className="text-xs text-gray-400">40 Registered Suppliers</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "Tata Steel Ltd", person: "Ramesh Kumar", phone: "+91 98450 12345", gst: "29AABCT1234F1Z0" },
                { name: "Havells India Ltd", person: "Anitha Sharma", phone: "+91 98450 54321", gst: "29BBCHV4321D2Z5" },
                { name: "SKF India Bearings", person: "Kiran Rao", phone: "+91 98450 98765", gst: "29CCKSK9876S3Z8" }
              ].map((sup, idx) => (
                <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{sup.name}</div>
                    <div className="text-[10px] text-gray-400 mt-1">SPOC: {sup.person} | {sup.phone}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">GSTIN: {sup.gst}</div>
                    <span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20 font-bold mt-1 inline-block">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "purchase":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-white uppercase">📥 Procurement Orders (PO)</span>
              <span className="text-xs text-indigo-400 font-bold">200 POs Logged</span>
            </div>
            <div className="space-y-2.5">
              {[
                { id: "PO-2026-059", supplier: "Tata Steel Ltd", total: "₹4,50,000", status: "RECEIVED", date: "2026-06-10", sColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { id: "PO-2026-060", supplier: "Siemens India PLCs", total: "₹8,20,000", status: "PENDING", date: "2026-06-12", sColor: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                { id: "PO-2026-061", supplier: "Godrej Tooling", total: "₹1,20,000", status: "APPROVED", date: "2026-06-11", sColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" }
              ].map((po, idx) => (
                <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{po.id}</div>
                    <div className="text-[10px] text-gray-400 mt-1">To: {po.supplier} | Dated: {po.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-300">{po.total}</div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${po.sColor} mt-1.5 inline-block`}>{po.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "sales":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-sm font-bold text-white uppercase">📤 Sales Invoices & Dispatch</span>
              <span className="text-xs text-indigo-400 font-bold">300 Sales Logged</span>
            </div>
            <div className="space-y-2.5">
              {[
                { id: "SO-2026-104", customer: "Mehta Engineering Works", amount: "₹6,80,000", date: "2026-06-12", status: "DISPATCHED", sColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { id: "SO-2026-105", customer: "Patel Manufacturing Pvt Ltd", amount: "₹12,40,000", date: "2026-06-11", status: "PROCESSING", sColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
                { id: "SO-2026-106", customer: "Kirloskar Dealers Bengaluru", amount: "₹3,90,000", date: "2026-06-10", status: "COMPLETED", sColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" }
              ].map((so, idx) => (
                <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{so.id}</div>
                    <div className="text-[10px] text-gray-400 mt-1">Client: {so.customer} | Date: {so.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-300">{so.amount}</div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${so.sColor} mt-1.5 inline-block`}>{so.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-[#090b16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">PRODUCT INTERACTION</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Interactive Product Showcase</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Click through the tabs below to explore real-time modules of the IndusTrack software engine.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-slate-900/60 p-2 rounded-2xl border border-white/5 max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-gray-400 hover:text-white"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Visual Mockup Area */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-slate-950/80 shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <div className="flex-1 text-center text-[10px] font-mono text-gray-500 select-none">
              app.industrack.in/dashboard/{activeTab}
            </div>
          </div>
          <div className="p-6 sm:p-8 min-h-[340px]">
            {renderMockup()}
          </div>
        </div>
      </div>
    </section>
  );
}

// Industry Solutions
function IndustrySolutions() {
  const industries = [
    { title: "Manufacturing", desc: "Automate parts tracking, monitor raw materials, compile BOM (Bill of Materials) valuation, and manage scrap rates on the shop floor.", icon: "🏭", badge: "Production Optimization" },
    { title: "Warehousing", desc: "Manage multi-location layout maps, rack bin coordinates, check-in receipts, and dispatch flows with barcoding.", icon: "📦", badge: "Space Planning" },
    { title: "Industrial Supplies", desc: "Coordinate supply chains, manage HSN codes, track fast-moving electrical parts, and maintain stable distribution.", icon: "⚙️", badge: "Bulk Management" },
    { title: "Wholesale Distribution", desc: "Track bulk buyer accounts, generate GST compliance purchase records, and monitor logistics timelines.", icon: "🚛", badge: "Tax Compliant" },
    { title: "Retail Chains", desc: "Keep multi-store stock counts consolidated in a single dashboard to prevent stockouts of high-demand goods.", icon: "🏪", badge: "Real-Time Sync" },
    { title: "Logistics", desc: "Coordinate stock movement logs, trace delivery notes, track driver details, and manage receipt signatures.", icon: "🛣️", badge: "Transit Logs" }
  ];

  return (
    <section id="solutions" className="py-24 bg-[#060710]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">VERTICAL DEPLOYMENTS</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Engineered for Your Industry</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Custom industrial settings designed specifically to solve complex enterprise problems.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.02] transition-all duration-300 group">
              <div className="text-3xl mb-4 bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-indigo-500/20">{ind.icon}</div>
              <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">{ind.badge}</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">{ind.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    { icon: <TrendingUp size={20} />, title: "Real-Time Inventory Tracking", desc: "Trace items dynamically. Get alerted on low stock, reorders, and stock levels immediately.", color: "text-indigo-400 bg-indigo-500/10" },
    { icon: <Users size={20} />, title: "Supplier Management", desc: "Create supplier profiles, trace purchase history logs, ratings, and contact info.", color: "text-purple-400 bg-purple-500/10" },
    { icon: <Truck size={20} />, title: "Purchase Management", desc: "Automate PO generation, track approvals, and update warehouse stocks on arrival.", color: "text-pink-400 bg-pink-500/10" },
    { icon: <FileText size={20} />, title: "Sales Tracking", desc: "Log dispatch records, track invoices, client invoices, and billing histories.", color: "text-emerald-400 bg-emerald-500/10" },
    { icon: <Bell size={20} />, title: "Low Stock Alerts", desc: "Set thresholds per product and receive daily automated summaries of critical stock levels.", color: "text-amber-400 bg-amber-500/10" },
    { icon: <QrCode size={20} />, title: "Barcode Support", desc: "Compatible with handheld barcode scanners. Quick-generate barcodes inside catalog.", color: "text-sky-400 bg-sky-500/10" },
    { icon: <QrCode size={20} />, title: "QR Code Support", desc: "Visual QR codes generated for every SKU product card for mobile scanning on the shop floor.", color: "text-rose-400 bg-rose-500/10" },
    { icon: <Building2 size={20} />, title: "Warehouse Management", desc: "Map rack-bin coordinates to physical coordinates inside warehouses for faster picking.", color: "text-indigo-400 bg-indigo-500/10" },
    { icon: <BarChart3 size={20} />, title: "Analytics Dashboard", desc: "Interactive growth indicators, supplier performance stats, and product category charts.", color: "text-teal-400 bg-teal-500/10" },
    { icon: <Lock size={20} />, title: "Role-Based Access", desc: "Grant specific permissions for Super Admins, Admins, Managers, and Warehouse Operators.", color: "text-indigo-400 bg-indigo-500/10" },
    { icon: <Download size={20} />, title: "Export Reports", desc: "One-click downloads for PDF, CSV, Excel sheets, and clean printer layouts.", color: "text-purple-400 bg-purple-500/10" },
    { icon: <Globe size={20} />, title: "Cloud Access", desc: "Access the inventory from any device globally with high speed and zero hardware costs.", color: "text-emerald-400 bg-emerald-500/10" },
    { icon: <Award size={20} />, title: "GST Ready", desc: "Automated GST percentage billing, HSN code tagging, and CGST/SGST/IGST breakdowns.", color: "text-sky-400 bg-sky-500/10" },
    { icon: <Users size={20} />, title: "Multi-User Support", desc: "Concurrent edits supported with real-time audit logs tracking modifications.", color: "text-rose-400 bg-rose-500/10" },
    { icon: <Settings size={20} />, title: "Dark Mode Included", desc: "Premium dark UI aesthetics protect warehouse operators' eyes during night shifts.", color: "text-amber-400 bg-amber-500/10" }
  ];

  return (
    <section id="features" className="py-24 bg-[#080916]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">PREMIUM FEATURES</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Enterprise Components Built to Scale</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Everything you need to modernize warehouse inventory systems in a single dashboard.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-indigo-500/25 transition-all duration-300 flex gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${feat.color}`}>
                {feat.icon}
              </div>
              <div>
                <h3 className="font-bold text-white mb-1.5 text-sm">{feat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us (Comparison)
function WhyChooseUs() {
  const comparisons = [
    { label: "Inventory Record Method", trad: "Manual registers or slow paper diaries", platform: "Automated real-time stock registers" },
    { label: "Data Sheets", trad: "Excel sheets with broken cell formulas", platform: "Unified database with zero sync errors" },
    { label: "Reporting Speeds", trad: "Delayed monthly accounts, manually aggregated", platform: "Instant one-click exports (PDF, Excel, Print)" },
    { label: "Data Quality", trad: "Human typos, lost invoices, stock miscounts", platform: "Automated calculations, item lookup & scanner support" },
    { label: "Stock Visibility", trad: "Frequent stock mismatches and assembly delays", platform: "Automated low-stock alerts prevent outages" },
    { label: "Security & Auditing", trad: "No access control, files can be deleted", platform: "Role permissions & secure audit log tracing" }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#060710]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">SYSTEM ADVANTAGE</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Why Businesses Upgrade</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Compare traditional spreadsheets against the power of the IndusTrack engine.</p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950/40 shadow-2xl">
          <div className="grid grid-cols-3 p-4 bg-white/5 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400 text-left">
            <div>Comparison Metrics</div>
            <div>Traditional Systems</div>
            <div className="text-indigo-400">IndusTrack SaaS</div>
          </div>
          <div className="divide-y divide-white/5">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 text-xs hover:bg-white/[0.01] transition-colors items-center">
                <div className="font-semibold text-white">{row.label}</div>
                <div className="text-gray-500 pr-4">{row.trad}</div>
                <div className="text-indigo-300 font-medium">{row.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const testimonials = [
    { name: "Arvind Mehta", role: "Factory Owner", company: "Mehta Steel Fabrications, Rajkot", text: "Before switching to IndusTrack, our raw steel counts were calculated manually, resulting in stockouts. Now we run a 100% automated shop floor with zero production delays.", avatar: "AM" },
    { name: "Kavitha Raghunathan", role: "Warehouse Manager", company: "KR Industrial Supplies, Chennai", text: "Mapping our warehouse rack bin coordinates directly in the catalog reduced parts-picking time by 50%. The low stock alerts alone save us hours every week.", avatar: "KR" },
    { name: "Suresh Patel", role: "Industrial Distributor", company: "Patel Engineering Works, Ahmedabad", text: "The GST invoices and automated HSN code formatting are exactly what our accountants wanted. Exports to Excel take just one click. Brilliant software!", avatar: "SP" },
    { name: "Vikram Deshmukh", role: "Manufacturing Supervisor", company: "Deshmukh Auto Components, Pune", text: "With 15 employees logging stock transactions concurrently, the role-based access keeps the database clean. We can trace edits instantly via audit logs.", avatar: "VD" }
  ];

  return (
    <section className="py-24 bg-[#080916]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">SUCCESS STORIES</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Trusted by Industry Experts</h2>
          <p className="text-gray-400 max-w-xl mx-auto">See how manufacturers, warehouse operators, and industrial distributors rate our SaaS platform.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-6">"{test.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                  {test.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{test.name}</div>
                  <div className="text-[10px] text-gray-500">{test.role} • {test.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Video Demo Section
function VideoDemo() {
  return (
    <section className="py-24 bg-[#060710] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">WALKTHROUGH PREVIEW</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Watch the Platform in Action</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Take a quick 2-minute tour of how to register products, scan barcodes, and generate invoices.</p>
        </div>

        {/* Video Player Mockup */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-slate-950 flex items-center justify-center group shadow-2xl">
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950 group-hover:opacity-90 transition-opacity" />
          
          <div className="relative z-10 text-center px-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => toast.info("Demo video playback is simulated. Click 'View Live Demo' to explore directly!")}
              className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center mx-auto mb-4 cursor-pointer shadow-lg shadow-indigo-600/30">
              <Play size={24} fill="currentColor" className="ml-1" />
            </motion.button>
            <div className="text-sm font-semibold text-white">IndusTrack Core Features Walkthrough</div>
            <div className="text-xs text-gray-500 mt-1">Duration: 2 mins 45 seconds</div>
          </div>

          {/* Background decoration representing a video screenshot */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col justify-around p-8">
            <div className="h-4 w-48 bg-white/10 rounded" />
            <div className="flex gap-4">
              <div className="h-20 w-32 bg-white/5 rounded border border-white/10" />
              <div className="h-20 w-32 bg-white/5 rounded border border-white/10" />
              <div className="h-20 w-32 bg-white/5 rounded border border-white/10" />
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing Page
function Pricing() {
  const plans = [
    {
      name: "Starter Plan",
      price: "₹15,000",
      period: "per year",
      desc: "Perfect for single-location manufacturing workshops.",
      features: [
        "Up to 2,000 Products & SKUs",
        "GST Invoice Generator",
        "Basic Reports Export (PDF/CSV)",
        "Single Warehouse Location",
        "Email Support (24hr response)"
      ],
      recommended: false,
      btnText: "Get Started"
    },
    {
      name: "Professional Plan",
      price: "₹30,000",
      period: "per year",
      desc: "Ideal for growing industrial businesses and warehouses.",
      features: [
        "Unlimited Products & SKUs",
        "Multi-User Concurrent Access",
        "Multiple Warehouse Locations",
        "Advanced Supplier Management",
        "Automated Low-Stock Email Alerts",
        "Comprehensive Excel/Print Exports",
        "Priority Support (under 4 hours)"
      ],
      recommended: true,
      btnText: "Choose Professional"
    },
    {
      name: "Enterprise Plan",
      price: "Custom Quote",
      period: "configured",
      desc: "For multi-city logistics and complex factory integrations.",
      features: [
        "Unlimited Multi-Warehouse Nodes",
        "Dedicated Server Instance",
        "Automated ERP & API Syncing",
        "White-label Custom Domains",
        "24/7 Phone & Account Manager Support",
        "SOC2 Compliance Verification Logs",
        "Custom Feature Development Modules"
      ],
      recommended: false,
      btnText: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#080916] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">SIMPLE PRICING PLANS</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Transparent Pricing for Growing Firms</h2>
          <p className="text-gray-400 max-w-xl mx-auto">No hidden fees. Select a package that matches your manufacturing operation size.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative border ${plan.recommended ? "bg-slate-900 border-indigo-500 shadow-indigo-600/10 shadow-2xl scale-105 z-10" : "bg-white/[0.01] border-white/5 hover:border-white/10"}`}>
              {plan.recommended && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                  RECOMMENDED
                </span>
              )}
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-gray-500 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-gray-500">/ {plan.period}</span>
                </div>
                
                <ul className="space-y-4">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/login" className={`mt-8 w-full text-center py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${plan.recommended ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg" : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"}`}>
                {plan.btnText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Is our business data secure on the cloud?", a: "Yes. All inventory values, suppliers, and transaction records are encrypted using AES-256 protocols. We run SOC2-compliant network systems with automated daily backups so your business data is never compromised." },
    { q: "Can we manage multiple physical warehouses concurrently?", a: "Absolutely. Our Professional and Enterprise packages support multi-warehouse deployment. You can track stocks separately in individual units and consolidate valuations under a single dashboard." },
    { q: "Does the invoicing engine support Indian GST billing formats?", a: "Yes. The platform is designed from the ground up for Indian manufacturing operations. It features automated HSN code mapping, and separate CGST, SGST, and IGST calculation matrices for compliance." },
    { q: "Can we export records for audits and tax compliance?", a: "Yes. Every report card can be exported instantly to PDF format, high-fidelity Excel sheets, bulk CSV layouts, or directly sent to a printer queue." },
    { q: "Can custom modules or barcode types be added?", a: "Yes. The system automatically reads standard barcode and QR code standards (including EAN, UPC, and Code 128). Custom APIs and custom fields can be configured under the Enterprise plan." },
    { q: "Does the interface render clearly on mobile phones and tablets?", a: "Yes. The layout is optimized to be fully responsive. Warehouse supervisors can check stocks, log receipts, or issue dispatches directly from their mobile web browser on the shop floor." }
  ];

  return (
    <section id="faq" className="py-24 bg-[#060710]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">COMMON QUESTIONS</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors cursor-pointer">
                <span className="font-semibold text-white text-sm">{faq.q}</span>
                <ChevronDown size={18} className="text-gray-500 transition-transform duration-200" style={{ transform: open === i ? "rotate(180deg)" : "" }} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 pt-1">
                  <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact({ formRef }: { formRef: React.RefObject<HTMLFormElement | null> }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Demo request submitted! We will contact you soon.");
  };

  return (
    <section id="contact" className="py-24 bg-[#080916] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">SCHEDULE A DEMO</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Get in Touch with our Technical Specialists</h2>
              <p className="text-xs text-gray-400 leading-relaxed">Let us know about your warehouse capacities and product catalogue size. We will configure a custom demo workspace for your factory operations.</p>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="font-semibold text-white">Call Sales</div>
                  <div className="text-[10px] text-gray-500">+91 80 4910 2345 (Bengaluru Corporate Office)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="font-semibold text-white">Technical Support & General Enquiries</div>
                  <div className="text-[10px] text-gray-500">sales@industrack.in / info@industrack.in</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <Building2 size={16} />
                </div>
                <div>
                  <div className="font-semibold text-white">Office Address</div>
                  <div className="text-[10px] text-gray-500">12th Floor, Peenya Industrial Complex Tower, Bommasandra Suburb, Bengaluru, KA - 560058</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="font-semibold text-white">Working Hours</div>
                  <div className="text-[10px] text-gray-500">Monday - Saturday (09:00 AM - 07:00 PM IST)</div>
                </div>
              </div>
            </div>

            {/* Simulated Google Map Link/Preview */}
            <div className="p-4 rounded-xl border border-white/5 bg-slate-950/80 text-[10px] text-gray-500 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>Google Maps Coordinates: 12.9716° N, 77.5946° E</span>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-bold hover:underline">OPEN MAP</a>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4">
                <CheckCircle size={48} className="text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Request Received!</h3>
                <p className="text-xs text-gray-400">Our senior enterprise systems designer will coordinate an introduction meeting and mail login keys within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-4 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-2">Book Your Product Walkthrough</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Your Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Company Name</label>
                    <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Phone Number</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Email Address</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Message / Requirements</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details about your approximate catalogue count or current warehouse setup..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-indigo-500 resize-none" />
                </div>

                <button type="submit" className="w-full py-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer shadow-lg shadow-indigo-600/20">
                  Send Demo Request
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// Try Demo logins section
function DemoLoginsSection() {
  const accounts = [
    { role: "Admin", email: "admin@demo.com", password: "Admin@123", color: "border-indigo-500 text-indigo-400 bg-indigo-500/5", label: "ADMIN" },
    { role: "Manager", email: "manager@demo.com", password: "Manager@123", color: "border-purple-500 text-purple-400 bg-purple-500/5", label: "MANAGER" },
    { role: "Employee", email: "employee@demo.com", password: "Employee@123", color: "border-emerald-500 text-emerald-400 bg-emerald-500/5", label: "EMPLOYEE" }
  ];

  const [copiedKey, setCopiedKey] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    toast.success("Credential copied to clipboard!");
    setTimeout(() => setCopiedKey(""), 2000);
  };

  return (
    <section className="py-24 bg-[#060710] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">LIVE TEST RIG</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Try the Live Interactive Sandbox</h2>
          <p className="text-gray-400 max-w-xl mx-auto">No credit card or setup required. Choose a role profile and log in instantly to view the active workspace dashboard.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {accounts.map((acc, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border ${acc.color} flex flex-col justify-between`}>
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 border border-white/5">{acc.label} ACCOUNT</span>
                <h4 className="text-lg font-bold text-white mt-3 mb-4">{acc.role} Sandbox Access</h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2 bg-slate-950/80 rounded-lg border border-white/5">
                    <span className="font-mono text-gray-300 truncate max-w-[140px]">{acc.email}</span>
                    <button onClick={() => handleCopy(acc.email)} className="text-gray-500 hover:text-white cursor-pointer transition-colors p-1">
                      {copiedKey === acc.email ? <Check size={12} className="text-emerald-400" /> : <Clipboard size={12} />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-950/80 rounded-lg border border-white/5">
                    <span className="font-mono text-gray-300 truncate">{acc.password}</span>
                    <button onClick={() => handleCopy(acc.password)} className="text-gray-500 hover:text-white cursor-pointer transition-colors p-1">
                      {copiedKey === acc.password ? <Check size={12} className="text-emerald-400" /> : <Clipboard size={12} />}
                    </button>
                  </div>
                </div>
              </div>

              <Link href="/login" className="mt-6 w-full text-center py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/5 transition-all">
                Login with Role
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{ background: "#04050d", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2">
            <Logo />
            <p className="text-xs text-gray-400 mt-4 max-w-sm leading-relaxed">
              Enterprise inventory management platform built for factory owners, warehouse managers, distributors, and industrial businesses looking to digitize stock tracking.
            </p>
            <div className="flex gap-4 mt-6">
              {["Twitter", "LinkedIn", "WhatsApp", "GitHub"].map((soc) => (
                <a key={soc} href="#" className="text-xs text-gray-500 hover:text-white transition-colors">{soc}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Solutions</h4>
            <div className="space-y-3.5 text-xs text-gray-400">
              {["Manufacturing Lines", "Multi-Warehouse Coordinates", "Industrial Supply Chains", "Wholesale Invoicing"].map((s) => (
                <div key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Features</h4>
            <div className="space-y-3.5 text-xs text-gray-400">
              {["Real-Time Tracking", "Barcode & QR scanning", "PDF & CSV Exporting", "Secure Audit Logs"].map((s) => (
                <div key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Pricing</h4>
            <div className="space-y-3.5 text-xs text-gray-400">
              {["Starter Tier", "Professional Tier", "Enterprise Quotations", "Terms of Service", "Privacy Statement"].map((s) => (
                <div key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 IndusTrack Pvt. Ltd. All rights reserved. Built for modern industrial enterprises.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational (Uptime: 99.99%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const scrollDemoForm = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#05060b] text-gray-200 antialiased min-h-screen">
      <Navbar onDemoScroll={scrollDemoForm} />
      <Hero onDemoScroll={scrollDemoForm} />
      <TrustSignals />
      <Showcase />
      <IndustrySolutions />
      <Features />
      <WhyChooseUs />
      <Testimonials />
      <VideoDemo />
      <Pricing />
      <FAQ />
      <Contact formRef={formRef} />
      <DemoLoginsSection />
      <Footer />
    </main>
  );
}
