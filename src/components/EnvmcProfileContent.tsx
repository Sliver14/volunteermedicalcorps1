"use client";

import { useState } from "react";
import { 
  User, 
  Mail, 
  Shield, 
  Lock, 
  Key,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function EnvmcProfileContent() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters long" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Password changed successfully" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to change password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* User Details Card */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-black text-[#002866] uppercase tracking-tight flex items-center gap-3">
            <User className="text-[#ff9f22]" size={24} />
            Account Details
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase mt-1">Basic information about your admin account</p>
        </div>
        
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <User size={12} /> Full Name
            </label>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-sm font-bold text-[#002866]">
              {session?.user?.name}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Mail size={12} /> Email Address
            </label>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-sm font-bold text-[#002866]">
              {session?.user?.email}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Shield size={12} /> Account Role
            </label>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-sm font-bold text-[#002866]">
              {session?.user?.role}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-black text-[#002866] uppercase tracking-tight flex items-center gap-3">
            <Lock className="text-[#ff9f22]" size={24} />
            Security Settings
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase mt-1">Update your password to keep your account secure</p>
        </div>

        <form onSubmit={handleChangePassword} className="p-6 md:p-8 space-y-6">
          {message.text && (
            <div className={`p-4 rounded-sm flex items-center gap-3 ${
              message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <p className="text-sm font-bold uppercase tracking-tight">{message.text}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#ff9f22] transition-colors font-bold text-[#002866]"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002866]"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#ff9f22] transition-colors font-bold text-[#002866]"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002866]"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-[#ff9f22] transition-colors font-bold text-[#002866]"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002866]"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-[#002866] text-white rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#ff9f22] hover:text-[#002866] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#002866]/10"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Key size={16} />
              )}
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
