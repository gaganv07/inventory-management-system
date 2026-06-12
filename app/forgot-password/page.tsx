"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Factory, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #060812 0%, #0a0d1e 100%)" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <Factory size={22} color="white" />
          </div>
          <span className="font-bold text-white text-xl">industrial<span style={{ color: "#6366f1" }}>visit</span></span>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(99,102,241,0.15)" }}>
                  <Mail size={26} color="#6366f1" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "block" }}>
                <div style={{ display: "block", marginBottom: "24px" }}>
                  <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>Email Address</label>
                  <div className="relative" style={{ position: "relative" }}>
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                      style={{ width: "100%", paddingLeft: "40px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px", borderRadius: "12px", fontSize: "14px", color: "white", outline: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  style={{ width: "100%", paddingTop: "14px", paddingBottom: "14px", borderRadius: "12px", fontSize: "16px", fontWeight: "600", color: "white", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 30px rgba(99,102,241,0.35)", cursor: "pointer", border: "none" }}>
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : "Send Reset Link →"}
                </button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <CheckCircle size={56} color="#22c55e" className="mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Email Sent!</h2>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                We&apos;ve sent a password reset link to <strong className="text-white">{email}</strong>. Check your inbox.
              </p>
            </motion.div>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
