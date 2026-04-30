"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Megaphone } from "lucide-react";

interface MarqueeItem {
  id: string;
  content: string;
  link: string | null;
  color: string | null;
  isActive: boolean;
}

export default function MarqueeManager() {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditData] = useState<Partial<MarqueeItem>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/marquee");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const handleEdit = (item: MarqueeItem) => {
    setIsEditing(item.id);
    setEditData(item);
  };

  const handleSave = async () => {
    const method = editForm.id ? "PUT" : "POST";
    const res = await fetch("/api/marquee/admin", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setIsEditing(null);
      setEditData({});
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this marquee item?")) return;
    const res = await fetch(`/api/marquee/admin?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  };

  if (loading) return <p className="text-[#002866] font-bold animate-pulse">Loading Marquee...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-[#002866] uppercase tracking-tight">Manage Marquee</h2>
        <button 
          onClick={() => { setIsEditing("new"); setEditData({ content: "", color: "red", isActive: true }); }}
          className="bg-[#ff9f22] text-[#002866] px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#002866] hover:text-white transition-all shadow-md"
        >
          <Plus size={16} /> New Item
        </button>
      </div>

      {/* Editor */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#002866] p-6 flex justify-between items-center">
              <h3 className="text-white font-black uppercase tracking-widest">{isEditing === "new" ? "New Item" : "Edit Item"}</h3>
              <button onClick={() => setIsEditing(null)} className="text-white/60 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Content</label>
                <textarea 
                  rows={3}
                  className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                  value={editForm.content || ""}
                  onChange={(e) => setEditData({ ...editForm, content: e.target.value })}
                  placeholder="e.g. Enroll for our 14-Day Online Healing Program..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Link URL</label>
                  <input 
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.link || ""}
                    onChange={(e) => setEditData({ ...editForm, link: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Text Color</label>
                  <select 
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.color || "red"}
                    onChange={(e) => setEditData({ ...editForm, color: e.target.value })}
                  >
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsEditing(null)} className="px-6 py-2 text-xs font-black uppercase text-gray-400 hover:text-gray-600">Cancel</button>
              <button onClick={handleSave} className="bg-[#002866] text-white px-8 py-2 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-all">Save Item</button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Megaphone size={20} />
              </div>
              <div>
                <p className={`text-sm font-bold truncate max-w-2xl ${item.color === 'red' ? 'text-red-600' : 'text-[#002866]'}`}>
                  {item.content}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Link: {item.link || "None"}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(item)} className="p-2 text-[#002866] hover:bg-gray-100 rounded-full"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
