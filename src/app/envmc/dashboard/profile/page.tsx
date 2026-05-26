import EnvmcProfileContent from "@/components/EnvmcProfileContent";

export const metadata = {
  title: "Admin Profile | VMC Admin",
  description: "Manage your admin profile and security settings.",
};

export default function AdminProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Profile Settings</h1>
        <p className="text-text-muted text-sm font-bold uppercase mt-1">Manage your account information and security</p>
      </div>
      
      <EnvmcProfileContent />
    </div>
  );
}
