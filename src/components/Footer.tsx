import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-brand-primary text-white pt-24 pb-8 overflow-hidden border-t border-brand-primary/20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-brand-primary bg-cover bg-center" 
        style={{ backgroundImage: "url('/pmr-bg-footer.jpg')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-brand-secondary text-lg font-bold uppercase mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Medical Projects", href: "/medical-projects" },
                { name: "Good Deeds Campaigns", href: "/good-deeds-campaigns" },
                { name: "Contact Us", href: "/contact" },
                { name: "Become a Volunteer", href: "/volunteer" }
              ].map((link) => (
                <li key={link.name} className="flex items-center group">
                  <span className="text-brand-secondary mr-2 transition-transform group-hover:translate-x-1">›</span>
                  <Link href={link.href} className="text-gray-200 hover:text-white transition-colors font-normal text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Center About & Socials */}
          <div className="md:col-span-5 flex flex-col items-start">
            <p className="text-base leading-relaxed text-gray-200 mb-10 max-w-md">
              The Volunteer Medical Corps is the fastest growing global Christian medical outreach, committed to making a positive impact across communities and countries.
            </p>
            
            <h4 className="text-brand-secondary text-[11px] font-bold uppercase tracking-widest mb-6">Connect With Us:</h4>
            
            <div className="flex flex-wrap gap-3">
              {/* KingsChat */}
              <a href="https://web.kingsch.at/superusers/vmcorps" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary border border-white/10 text-white hover:scale-110 transition-transform shadow-lg" title="KingsChat">
                <img src="https://res.cloudinary.com/dfi8bpolg/image/upload/v1779922223/ibszdnow3ji4mtgsgvoi.png" alt="KingsChat" width={30} height={30} />
              </a>

              {/* Facebook */}
              <a href="https://facebook.com/vmcorps.intl" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3B5998] text-white hover:scale-110 transition-transform shadow-lg" title="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>

              {/* Twitter/X */}
              <a href="https://twitter.com/vmedcorps" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white hover:scale-110 transition-transform shadow-lg" title="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/vmcorps" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white hover:scale-110 transition-transform shadow-lg" title="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>

              {/* Youtube */}
              <a href="https://youtube.com/channel/UCQsqixtIBuYnsAM48Kigb4w" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:scale-110 transition-transform shadow-lg" title="Youtube">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-brand-secondary text-xl font-black uppercase mb-8">Join The Newsletter</h3>
            <div className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="Your email here..." 
                className="w-full px-6 py-4 bg-white dark:bg-bg-base text-brand-primary dark:text-text-main outline-none border-none focus:ring-2 focus:ring-brand-secondary transition-all"
              />
              <button className="group relative overflow-hidden w-full bg-brand-secondary text-brand-primary font-black uppercase py-4 tracking-widest transition-colors">
                <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10">Subscribe Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © All right reserved {new Date().getFullYear()} <span className="text-white font-bold">Volunteer Medical Corps</span>
          </p>
          <div className="flex space-x-8 text-sm font-medium">
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}