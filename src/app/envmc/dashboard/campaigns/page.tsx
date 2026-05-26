"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, MapPin, Globe, Upload, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  region: string;
  country: string;
  category: string;
  date: Date | string | null;
  isActive: boolean;
  ctaType: string;
  ctaText: string;
  ctaLink: string;
  target: number;
  raised: number;
}

const regions = ["Africa", "Middle East/Asia", "America/Caribbean", "Nigeria", "Europe", "Australia", "Global"];
const categories = ["Good Deeds Campaigns", "Medical Projects", "Humanitarian Projects", "VMC Academy", "VMC Praying Medics", "1 Million Smiles", "Global Hospital Outreach"];
const ctaTypes = ["DONATE", "REGISTER", "LINK", "SHARE", "JOIN"];

export default function CampaignsManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditData] = useState<Partial<Campaign>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchCampaigns = async () => {
    setLoading(true);
    const res = await fetch("/api/envmc/campaign");
    const data = await res.json();
    setCampaigns(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleEdit = (camp: Campaign) => {
    setIsEditing(camp.id);
    setEditData(camp);
  };

  const handleSave = async () => {
    const method = editForm.id ? "PUT" : "POST";
    const res = await fetch("/api/envmc/campaign", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setIsEditing(null);
      setEditData({});
      fetchCampaigns();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    const res = await fetch(`/api/envmc/campaign?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchCampaigns();
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

  if (loading) return <p className="text-brand-primary dark:text-brand-secondary font-bold animate-pulse">Loading Campaigns...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-text-main uppercase tracking-tight">Manage Campaigns</h2>
        <button 
          onClick={() => { 
            setIsEditing("new"); 
            setEditData({ 
              title: "", 
              description: "", 
              region: "Global", 
              category: "Medical Projects", 
              isActive: true,
              ctaType: "DONATE",
              ctaText: "Give Now",
              target: 0,
              raised: 0
            }); 
          }}
          className="bg-brand-secondary text-brand-primary px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-primary hover:text-white transition-all shadow-md"
        >
          <Plus size={16} /> New Campaign
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-bg-surface w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh] border border-border-main">
            <div className="bg-brand-primary p-6 flex justify-between items-center shrink-0">
              <h3 className="text-white font-black uppercase tracking-widest">{isEditing === "new" ? "New Campaign" : "Edit Campaign"}</h3>
              <button onClick={() => setIsEditing(null)} className="text-white/60 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Campaign Title</label>
                  <input 
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.title || ""}
                    onChange={(e) => setEditData({ ...editForm, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Category</label>
                  <select 
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.category || ""}
                    onChange={(e) => setEditData({ ...editForm, category: e.target.value })}
                  >
                    {categories.map(c => <option key={c} value={c} className="bg-bg-surface">{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Description</label>
                <textarea 
                  rows={3}
                  className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                  value={editForm.description || ""}
                  onChange={(e) => setEditData({ ...editForm, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Region</label>
                  <select 
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.region || ""}
                    onChange={(e) => setEditData({ ...editForm, region: e.target.value })}
                  >
                    {regions.map(r => <option key={r} value={r} className="bg-bg-surface">{r}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Target Amount ($)</label>
                  <input 
                    type="number"
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.target || 0}
                    onChange={(e) => setEditData({ ...editForm, target: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">Raised Amount ($)</label>
                  <input 
                    type="number"
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.raised || 0}
                    onChange={(e) => setEditData({ ...editForm, raised: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border-main">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">CTA Type</label>
                  <select 
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.ctaType || ""}
                    onChange={(e) => setEditData({ ...editForm, ctaType: e.target.value })}
                  >
                    {ctaTypes.map(t => <option key={t} value={t} className="bg-bg-surface">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">CTA Button Text</label>
                  <input 
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.ctaText || ""}
                    onChange={(e) => setEditData({ ...editForm, ctaText: e.target.value })}
                    placeholder="e.g. Give Now"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted">CTA Link (External)</label>
                  <input 
                    className="w-full border border-border-main bg-bg-base p-3 text-sm text-text-main focus:outline-none focus:border-brand-secondary"
                    value={editForm.ctaLink || ""}
                    onChange={(e) => setEditData({ ...editForm, ctaLink: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-muted">Campaign Image</label>
                <div className="flex gap-4 items-center">
                  <div className="relative w-32 h-20 bg-bg-base border border-dashed border-border-main flex items-center justify-center overflow-hidden">
                    {editForm.image ? (
                      <Image src={editForm.image} alt="Preview" fill className="object-cover" unoptimized />
                    ) : (
                      <Upload className="text-text-muted" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input 
                      className="w-full border border-border-main bg-bg-base p-2 text-xs text-text-main focus:outline-none focus:border-brand-secondary"
                      value={editForm.image || ""}
                      onChange={(e) => setEditData({ ...editForm, image: e.target.value })}
                      placeholder="Image URL or upload"
                    />
                    <label className="inline-block bg-brand-primary text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-brand-secondary hover:text-brand-primary transition-all">
                      {uploading ? "Uploading..." : "Upload New Image"}
                      <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-bg-base border-t border-border-main flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsEditing(null)} className="px-6 py-2 text-xs font-black uppercase text-text-muted hover:text-text-main">Cancel</button>
              <button onClick={handleSave} className="bg-brand-primary text-white px-8 py-2 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-brand-secondary hover:text-brand-primary transition-all">Save Campaign</button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-bg-surface border border-border-main rounded-sm overflow-hidden shadow-sm flex flex-col group">
            <div className="relative h-48">
              {camp.image && <Image src={camp.image} alt={camp.title} fill className="object-cover" unoptimized />}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary text-[9px] font-black uppercase px-2 py-1">
                {camp.category}
              </div>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(camp)} className="p-2 bg-bg-surface text-brand-primary rounded-full shadow-lg hover:bg-brand-secondary transition-colors"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(camp.id)} className="p-2 bg-bg-surface text-red-600 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={14} /></button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-secondary" 
                    style={{ width: `${Math.min(100, (camp.raised / (camp.target || 1)) * 100)}%` }} 
                  />
                </div>
                <div className="flex justify-between mt-1 text-[9px] text-white font-bold uppercase">
                  <span>${camp.raised.toLocaleString()} raised</span>
                  <span>Goal: ${camp.target?.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h4 className="text-brand-primary dark:text-brand-secondary font-bold uppercase text-sm mb-3 line-clamp-1">{camp.title}</h4>
              <p className="text-text-muted text-xs line-clamp-2 italic mb-4">&quot;{camp.description}&quot;</p>
              
              <div className="mt-auto space-y-2 border-t border-border-main pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    <Globe size={12} className="text-brand-secondary" /> {camp.region}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-widest bg-bg-base px-2 py-1">
                    <LinkIcon size={10} /> {camp.ctaType}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
