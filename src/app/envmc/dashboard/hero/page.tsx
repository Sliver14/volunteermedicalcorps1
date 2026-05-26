"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, ToggleLeft, ToggleRight } from "lucide-react";
import Image from "next/image";

interface Slide {
  id: string;
  title: string;
  subTitle: string | null;
  description: string | null;
  image: string;
  link: string | null;
  btnText: string | null;
  order: number;
  isActive: boolean;
}

export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditData] = useState<Partial<Slide>>({});
  const [loading, setLoading] = useState(true);

  const fetchSlides = async () => {
    setLoading(true);
    const res = await fetch("/api/hero-slides");
    const data = await res.json();
    setSlides(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleEdit = (slide: Slide) => {
    setIsEditing(slide.id);
    setEditData(slide);
  };

  const handleSave = async () => {
    const method = editForm.id ? "PUT" : "POST";
    const res = await fetch("/api/hero-slides/admin", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setIsEditing(null);
      setEditData({});
      fetchSlides();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    const res = await fetch(`/api/hero-slides/admin?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchSlides();
  };

  const toggleStatus = async (slide: Slide) => {
    await fetch("/api/hero-slides/admin", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...slide, isActive: !slide.isActive }),
    });
    fetchSlides();
  };

  if (loading) return <p className="text-brand-primary dark:text-brand-secondary font-bold animate-pulse">Loading Hero Slides...</p>;

  return (
    <div className="space-y-8 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Manage Hero Slides</h2>
        <button 
          onClick={() => { setIsEditing("new"); setEditData({ title: "", image: "", order: 0, isActive: true }); }}
          className="bg-brand-secondary text-brand-primary px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-primary hover:text-white transition-all shadow-md"
        >
          <Plus size={16} /> Add New Slide
        </button>
      </div>

      {/* Editor Modal/Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-bg-surface w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in duration-300 transition-colors duration-300">
            <div className="bg-brand-primary p-6 flex justify-between items-center">
              <h3 className="text-white font-black uppercase tracking-widest">{isEditing === "new" ? "New Slide" : "Edit Slide"}</h3>
              <button onClick={() => setIsEditing(null)} className="text-white/60 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Title</label>
                <input 
                  className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                  value={editForm.title || ""}
                  onChange={(e) => setEditData({ ...editForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Sub Title</label>
                <input 
                  className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                  value={editForm.subTitle || ""}
                  onChange={(e) => setEditData({ ...editForm, subTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Image URL</label>
                <input 
                  className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                  value={editForm.image || ""}
                  onChange={(e) => setEditData({ ...editForm, image: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Button Text</label>
                <input 
                  className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                  value={editForm.btnText || ""}
                  onChange={(e) => setEditData({ ...editForm, btnText: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Link</label>
                <input 
                  className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                  value={editForm.link || ""}
                  onChange={(e) => setEditData({ ...editForm, link: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Order</label>
                <input 
                  type="number"
                  className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                  value={editForm.order ?? 0}
                  onChange={(e) => setEditData({ ...editForm, order: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex items-center gap-4 pt-6">
                <button 
                  onClick={() => setEditData({ ...editForm, isActive: !editForm.isActive })}
                  className={`flex items-center gap-2 font-bold text-xs uppercase ${editForm.isActive ? 'text-green-600' : 'text-text-muted'}`}
                >
                  {editForm.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  {editForm.isActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
            <div className="p-6 bg-bg-base border-t border-border-main flex justify-end gap-3 transition-colors duration-300">
              <button onClick={() => setIsEditing(null)} className="px-6 py-2 text-xs font-black uppercase text-text-muted hover:text-text-main transition-colors">Cancel</button>
              <button onClick={handleSave} className="bg-brand-primary text-white px-8 py-2 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-brand-secondary hover:text-brand-primary transition-all shadow-md">Save Slide</button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-bg-surface border border-border-main rounded-sm overflow-hidden shadow-sm group transition-colors duration-300">
            <div className="relative h-48 bg-bg-base">
              {slide.image ? (
                <Image src={slide.image} alt={slide.title} fill className="object-cover" unoptimized />
              ) : (
                <div className="flex items-center justify-center h-full text-text-muted italic text-xs">No image provided</div>
              )}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(slide)} className="p-2 bg-bg-surface text-brand-primary dark:text-brand-secondary rounded-full shadow-lg hover:bg-brand-secondary hover:text-brand-primary transition-all"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(slide.id)} className="p-2 bg-bg-surface text-red-600 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /></button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full shadow-sm ${slide.isActive ? 'bg-green-500 text-white' : 'bg-text-muted text-white'}`}>
                  {slide.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-1">Slide #{slide.order}</p>
              <h4 className="text-brand-primary dark:text-brand-secondary font-bold uppercase truncate">{slide.title}</h4>
              <p className="text-text-muted text-xs mt-2 truncate">{slide.subTitle || "No subtitle"}</p>
              <div className="mt-6 flex justify-between items-center border-t border-border-main pt-4 transition-colors duration-300">
                <button 
                  onClick={() => toggleStatus(slide)}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-primary/60 dark:text-brand-secondary/60 hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors"
                >
                  Toggle Visibility
                </button>
                <div className="text-[10px] font-bold text-text-muted/40 tracking-tighter">ID: {slide.id.slice(0,8)}...</div>
              </div>
            </div>
          </div>
        ))}
        {slides.length === 0 && !loading && (
          <div className="md:col-span-2 lg:col-span-3 border-2 border-dashed border-border-main rounded-sm p-20 text-center">
            <p className="text-text-muted font-bold uppercase tracking-widest">No slides found. Create your first slide!</p>
          </div>
        )}
      </div>
    </div>
  );
}
