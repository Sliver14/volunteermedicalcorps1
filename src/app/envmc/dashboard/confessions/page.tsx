"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Calendar } from "lucide-react";

interface Confession {
  id: string;
  date: string;
  title: string;
  text: string;
  audioUrl: string | null;
  link: string | null;
  isActive: boolean;
}

export default function ConfessionsManager() {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditData] = useState<Partial<Confession>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    setLoading(true);
    // We need an endpoint that fetches ALL confessions for admin, not just the latest
    const res = await fetch("/api/daily-confession/all");
    const data = await res.json();
    setConfessions(data);
    setLoading(false);
  };

  const handleEdit = (conf: Confession) => {
    setIsEditing(conf.id);
    setEditData({ ...conf, date: new Date(conf.date).toISOString().split('T')[0] });
  };

  const handleSave = async () => {
    const method = editForm.id ? "PUT" : "POST";
    const res = await fetch("/api/daily-confession/admin", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setIsEditing(null);
      setEditData({});
      fetchConfessions();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this confession?")) return;
    const res = await fetch(`/api/daily-confession/admin?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchConfessions();
  };

  if (loading) return <p className="text-[#002866] font-bold animate-pulse">Loading Confessions...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-[#002866] uppercase tracking-tight">Daily Confessions</h2>
        <button 
          onClick={() => { setIsEditing("new"); setEditData({ title: "", text: "", date: new Date().toISOString().split('T')[0], isActive: true }); }}
          className="bg-[#ff9f22] text-[#002866] px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#002866] hover:text-white transition-all shadow-md"
        >
          <Plus size={16} /> New Confession
        </button>
      </div>

      {/* Editor */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#002866] p-6 flex justify-between items-center">
              <h3 className="text-white font-black uppercase tracking-widest">{isEditing === "new" ? "New Confession" : "Edit Confession"}</h3>
              <button onClick={() => setIsEditing(null)} className="text-white/60 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Title</label>
                  <input 
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.title || ""}
                    onChange={(e) => setEditData({ ...editForm, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Date</label>
                  <input 
                    type="date"
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.date || ""}
                    onChange={(e) => setEditData({ ...editForm, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Confession Text</label>
                <textarea 
                  rows={6}
                  className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                  value={editForm.text || ""}
                  onChange={(e) => setEditData({ ...editForm, text: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Audio URL</label>
                  <input 
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.audioUrl || ""}
                    onChange={(e) => setEditData({ ...editForm, audioUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">External Link</label>
                  <input 
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.link || ""}
                    onChange={(e) => setEditData({ ...editForm, link: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsEditing(null)} className="px-6 py-2 text-xs font-black uppercase text-gray-400 hover:text-gray-600">Cancel</button>
              <button onClick={handleSave} className="bg-[#002866] text-white px-8 py-2 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Title</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {confessions.map((conf) => (
              <tr key={conf.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#ff9f22]" />
                    <span className="text-sm font-bold text-[#002866]">{new Date(conf.date).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 font-medium truncate max-w-xs">{conf.title}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full ${conf.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {conf.isActive ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(conf)} className="p-2 text-gray-400 hover:text-[#002866] hover:bg-white rounded-full transition-all shadow-none hover:shadow-sm"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(conf.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-full transition-all shadow-none hover:shadow-sm"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
