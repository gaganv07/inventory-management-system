"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, Camera, Save, Key, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Admin User", email: "admin@abcindustries.com", phone: "+91 98765 43210",
    company: "ABC Industries Pvt. Ltd.", role: "ADMIN", bio: "System administrator managing the complete inventory platform.",
  });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [tab, setTab] = useState<"profile" | "security">("profile");

  const inputStyle = { background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--text-primary))", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", width: "100%", outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "12px", fontWeight: "600" as const, color: "hsl(var(--text-secondary))", textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: "6px" };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      toast.error("New passwords don't match!");
      return;
    }
    if (passwords.newPass.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>My Profile</h2>
        <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>Manage your account settings and preferences</p>
      </div>

      {/* Avatar section */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              AU
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#6366f1" }}
              onClick={() => toast.info("Avatar upload coming soon")}>
              <Camera size={13} color="white" />
            </button>
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: "hsl(var(--text-primary))" }}>{profile.name}</h3>
            <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{profile.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
              <Shield size={11} /> Administrator
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", width: "fit-content" }}>
        {(["profile", "security"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
            style={{
              background: tab === t ? "#6366f1" : "transparent",
              color: tab === t ? "white" : "hsl(var(--text-secondary))",
            }}>
            {t === "profile" ? "Profile Info" : "Security"}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleProfileSave} className="card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" style={inputStyle} value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Company</label>
              <input style={inputStyle} value={profile.company} onChange={e => setProfile({ ...profile, company: e.target.value })} />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label style={labelStyle}>Bio</label>
              <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <Save size={15} /> Save Changes
          </button>
        </motion.form>
      )}

      {tab === "security" && (
        <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handlePasswordSave} className="card p-6 space-y-5">
          <h3 className="font-semibold" style={{ color: "hsl(var(--text-primary))" }}>Change Password</h3>
          {[
            { key: "current", label: "Current Password", val: passwords.current, show: showPw.current, toggle: () => setShowPw(p => ({ ...p, current: !p.current })) },
            { key: "newPass", label: "New Password", val: passwords.newPass, show: showPw.new, toggle: () => setShowPw(p => ({ ...p, new: !p.new })) },
            { key: "confirm", label: "Confirm New Password", val: passwords.confirm, show: showPw.confirm, toggle: () => setShowPw(p => ({ ...p, confirm: !p.confirm })) },
          ].map(field => (
            <div key={field.key}>
              <label style={labelStyle}>{field.label}</label>
              <div className="relative">
                <input type={field.show ? "text" : "password"} style={{ ...inputStyle, paddingRight: "44px" }} required value={field.val}
                  onChange={e => setPasswords({ ...passwords, [field.key]: e.target.value })} placeholder="••••••••" />
                <button type="button" onClick={field.toggle} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--text-muted))" }}>
                  {field.show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
          <div className="p-3 rounded-xl text-xs" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", color: "hsl(var(--text-secondary))" }}>
            Password must be at least 8 characters with uppercase, number, and special character.
          </div>
          <button type="submit" className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <Key size={15} /> Update Password
          </button>
        </motion.form>
      )}
    </div>
  );
}
