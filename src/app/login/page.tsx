import PageBanner from "@/components/PageBanner";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full bg-gray-50 font-roboto min-h-screen">
      <PageBanner title="Login to VMC" />
      
      <section className="py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-[#002866] rounded-sm">
            <h3 className="text-2xl font-poppins font-bold mb-8 uppercase text-[#002866] text-center">Member Login</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" 
                  placeholder="name@example.com"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" 
                  placeholder="••••••••"
                  required 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#002866] focus:ring-[#002866] border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-600">Remember me</label>
                </div>
                <Link href="#" className="text-sm text-[#002866] font-bold hover:underline">Forgot Password?</Link>
              </div>

              <button type="button" className="w-full bg-[#002866] text-white py-5 font-bold uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm">
                Login Now
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-gray-600">
              Don&apos;t have an account yet? <Link href="/register" className="text-[#002866] font-bold hover:underline">Sign up for free</Link>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
