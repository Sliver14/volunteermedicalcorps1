"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import Image from "next/image";

interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  isActive: boolean;
}

export default function NewsManager() {
  const [items, setItems] = useState<News[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditData] = useState<Partial<News>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/envmc/news");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: News) => {
    setIsEditing(item.id);
    setEditData(item);
  };

  const handleSave = async () => {
    const method = editForm.id ? "PUT" : "POST";
    const res = await fetch("/api/envmc/news", {
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
    if (!confirm("Delete this news item?")) return;
    const res = await fetch(`/api/envmc/news?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      setEditData({ ...editForm, image: data.url });
    }
    setUploading(false);
  };

  if (loading) return <p className="text-[#002866] font-bold animate-pulse">Loading News...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-[#002866] uppercase tracking-tight">Manage News</h2>
        <button 
          onClick={() => { 
            setIsEditing("new"); 
            setEditData({ 
              title: "", 
              content: "", 
              category: "News", 
              isActive: true,
              author: "VMC Admin",
              date: new Date().toISOString()
            }); 
          }}
          className="bg-[#ff9f22] text-[#002866] px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#002866] hover:text-white transition-all shadow-md"
        >
          <Plus size={16} /> New News Item
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="bg-[#002866] p-6 flex justify-between items-center shrink-0">
              <h3 className="text-white font-black uppercase tracking-widest">{isEditing === "new" ? "New News" : "Edit News"}</h3>
              <button onClick={() => setIsEditing(null)} className="text-white/60 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto">
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
                  <label className="text-[10px] font-black uppercase text-gray-400">Category</label>
                  <input 
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.category || ""}
                    onChange={(e) => setEditData({ ...editForm, category: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Content</label>
                <textarea 
                  rows={10}
                  className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                  value={editForm.content || ""}
                  onChange={(e) => setEditData({ ...editForm, content: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Author</label>
                  <input 
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.author || ""}
                    onChange={(e) => setEditData({ ...editForm, author: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400">Date</label>
                  <input 
                    type="date"
                    className="w-full border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#ff9f22]"
                    value={editForm.date ? new Date(editForm.date).toISOString().split('T')[0] : ""}
                    onChange={(e) => setEditData({ ...editForm, date: new Date(e.target.value).toISOString() })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400">Image</label>
                <div className="flex gap-4 items-center">
                  <div className="relative w-32 h-20 bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {editForm.image ? (
                      <Image src={editForm.image} alt="Preview" fill className="object-cover" unoptimized />
                    ) : (
                      <Upload className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input 
                      className="w-full border border-gray-100 bg-gray-50 p-2 text-xs focus:outline-none focus:border-[#ff9f22]"
                      value={editForm.image || ""}
                      onChange={(e) => setEditData({ ...editForm, image: e.target.value })}
                      placeholder="Image URL or upload"
                    />
                    <label className="inline-block bg-[#002866] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-[#ff9f22] hover:text-[#002866] transition-all">
                      {uploading ? "Uploading..." : "Upload New Image"}
                      <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsEditing(null)} className="px-6 py-2 text-xs font-black uppercase text-gray-400 hover:text-gray-600">Cancel</button>
              <button onClick={handleSave} className="bg-[#002866] text-white px-8 py-2 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-all">Save News</button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm flex flex-col group">
            <div className="relative h-48">
              {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] text-[9px] font-black uppercase px-2 py-1">
                {item.category}
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(item)} className="p-2 bg-white text-[#002866] rounded-full shadow-lg hover:bg-[#ff9f22] transition-colors"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white text-red-600 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h4 className="text-[#002866] font-bold uppercase text-sm mb-3 line-clamp-1">{item.title}</h4>
              <p className="text-gray-400 text-xs line-clamp-2 italic mb-4" dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + "..." }} />
              <div className="mt-auto flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>By {item.author}</span>
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
