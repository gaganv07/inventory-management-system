"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Factory, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const demoCredentials = [
    { label: "Admin", email: "admin@demo.com", password: "Admin@123", color: "#6366f1" },
    { label: "Manager", email: "manager@demo.com", password: "Manager@123", color: "#8b5cf6" },
    { label: "Employee", email: "employee@demo.com", password: "Employee@123", color: "#22c55e" },
  ];

  const [copiedText, setCopiedText] = useState("");
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo authentication
    await new Promise((r) => setTimeout(r, 1200));
    const validEmails = demoCredentials.map((c) => c.email);
    if (validEmails.includes(form.email)) {
      toast.success("Login successful! Welcome back.", { description: "Redirecting to dashboard..." });
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setError("Invalid email or password. Try a demo account below.");
      setLoading(false);
    }
  };

  const fillDemo = (cred: typeof demoCredentials[0]) => {
    setForm({ ...form, email: cred.email, password: cred.password });
    setError("");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #060812 0%, #0a0d1e 100%)", minHeight: "100vh" }}>
      {/* Left — Brand panel (Vertically Centered) */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-col justify-center p-16 w-[45%]" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))", borderRight: "1px solid rgba(255,255,255,0.06)", gap: "40px" }}>
        <div className="flex items-center gap-3" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <Factory size={22} color="white" />
          </div>
          <span className="font-bold text-white text-xl">Indus<span style={{ color: "#6366f1" }}>Track</span></span>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight" style={{ fontSize: "32px", fontWeight: "700", color: "white", marginBottom: "16px", lineHeight: "1.4" }}>
            The smarter way to manage your factory inventory
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", marginBottom: "32px", lineHeight: "1.6" }}>
            Real-time tracking, smart alerts, and powerful reports — all in one platform.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: "📦", title: "Track 10,000+ SKUs", desc: "Manage unlimited products with categories, suppliers, and pricing" },
              { icon: "📊", title: "Live Analytics", desc: "Make data-driven decisions with beautiful real-time charts" },
              { icon: "🔔", title: "Smart Alerts", desc: "Never run out of stock with automated reorder notifications" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-2xl" style={{ fontSize: "24px", lineHeight: "1" }}>{item.icon}</div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1" style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>{item.title}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", lineHeight: "1.5" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
          <ShieldCheck size={14} />
          <span>Secured with AES-256 encryption & role-based access control</span>
        </div>
      </motion.div>

      {/* Right — Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12" style={{ display: "flex", flex: "1 1 0%", alignItems: "center", justifyContent: "center", padding: "48px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="w-full max-w-md" style={{ width: "100%", maxWidth: "400px" }}>
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <Factory size={22} color="white" />
            </div>
            <span className="font-bold text-white text-xl">Indus<span style={{ color: "#6366f1" }}>Track</span></span>
          </div>

          <div style={{ display: "block", marginBottom: "32px" }}>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontSize: "28px", fontWeight: "700", color: "white", marginBottom: "8px" }}>Welcome back</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Sign in to your account to continue</p>
          </div>

          {/* Demo credentials (Spacing Protected) */}
          <div style={{ display: "block", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "12px", padding: "16px", marginBottom: "32px" }}>
            <p style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.7)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>🔑 Try Live Demo (Click Role to Autofill):</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {demoCredentials.map((cred) => (
                <div key={cred.label} className="p-2.5 rounded-lg transition-all" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <button type="button" onClick={() => fillDemo(cred)} className="px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider transition-all"
                      style={{ background: `${cred.color}15`, border: `1px solid ${cred.color}30`, color: cred.color, cursor: "pointer" }}>
                      {cred.label} (Autofill)
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <div className="flex items-center justify-between">
                      <span>Email: <span className="text-white font-mono">{cred.email}</span></span>
                      <button type="button" onClick={() => handleCopy(cred.email, "Email")} className="text-gray-400 hover:text-white transition-colors p-1" style={{ background: "none", border: "none", cursor: "pointer" }}>
                        {copiedText === cred.email ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Password: <span className="text-white font-mono">{cred.password}</span></span>
                      <button type="button" onClick={() => handleCopy(cred.password, "Password")} className="text-gray-400 hover:text-white transition-colors p-1" style={{ background: "none", border: "none", cursor: "pointer" }}>
                        {copiedText === cred.password ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "block" }}>
            {/* Email */}
            <div style={{ display: "block", marginBottom: "24px" }}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>Email Address</label>
              <div className="relative" style={{ position: "relative" }}>
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{ width: "100%", paddingLeft: "40px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px", borderRadius: "12px", fontSize: "14px", color: "white", outline: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = error ? "#ef4444" : "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "block", marginBottom: "24px" }}>
              <div className="flex items-center justify-between mb-2" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: "500" }}>Password</label>
                <Link href="/forgot-password" className="text-xs transition-colors" style={{ color: "#6366f1", fontSize: "12px" }}>Forgot password?</Link>
              </div>
              <div className="relative" style={{ position: "relative" }}>
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
                <input type={showPw ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{ width: "100%", paddingLeft: "40px", paddingRight: "44px", paddingTop: "12px", paddingBottom: "12px", borderRadius: "12px", fontSize: "14px", color: "white", outline: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <input type="checkbox" id="remember" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="w-4 h-4 rounded" style={{ width: "16px", height: "16px", accentColor: "#6366f1", cursor: "pointer" }} />
              <label htmlFor="remember" className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", cursor: "pointer" }}>Remember me for 30 days</label>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: "block", marginBottom: "24px" }}>
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm px-4 py-3 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}>
                  {error}
                </motion.div>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              style={{ width: "100%", paddingTop: "14px", paddingBottom: "14px", borderRadius: "12px", fontSize: "16px", fontWeight: "600", color: "white", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 30px rgba(99,102,241,0.35)", cursor: "pointer", border: "none" }}>
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign In →"}
            </button>
          </form>

          <div style={{ display: "block", marginTop: "40px", textAlign: "center" }}>
            <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none" }}>
              <ArrowLeft size={14} /> Back to homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
