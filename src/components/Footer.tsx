import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#002866] text-white pt-24 pb-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-cover bg-center" 
        style={{ backgroundImage: "url('/pmr-bg-footer.jpg')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-[#ff9f22] text-xl font-black uppercase mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Medical Projects", href: "/projects" },
                { name: "Good Deeds Campaigns", href: "/campaigns" },
                { name: "Contact Us", href: "/contact" },
                { name: "Become a Volunteer", href: "/volunteer" }
              ].map((link) => (
                <li key={link.name} className="flex items-center group">
                  <span className="text-[#ff9f22] mr-2 transition-transform group-hover:translate-x-1">›</span>
                  <Link href={link.href} className="text-gray-200 hover:text-white transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Center About & Restored Socials */}
          <div className="md:col-span-5 flex flex-col items-start">
            <p className="text-lg leading-relaxed text-gray-200 mb-10 max-w-md">
              The Volunteer Medical Corps is the fastest growing global Christian medical outreach, committed to making a positive impact across communities and countries.
            </p>
            
            <h4 className="text-[#ff9f22] text-sm font-black uppercase tracking-widest mb-6">Connect With Us:</h4>
            
            {/* Restored Social Media Icons with Image-style background blocks */}
            <div className="flex flex-wrap gap-3">
              {/* KingsChat (Custom SVG Restored) */}
              <a href="https://web.kingsch.at/superusers/vmcorps" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#004a99] text-white hover:scale-110 transition-transform" title="KingsChat">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.97 1.3 5.64 3.36 7.44l-1.3 3.25c-.18.45.28.87.7.7l3.43-1.38C9.37 22.63 10.65 22.9 12 22.9c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4.5h-2c0-2.5 3-2.5 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 3.33-3 3.5-3 5z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com/vmcorps.intl" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#3B5998] text-white hover:scale-110 transition-transform" title="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>

              {/* Twitter/X */}
              <a href="https://twitter.com/vmedcorps" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-sm bg-black text-white hover:scale-110 transition-transform" title="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/vmcorps" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#E1306C] text-white hover:scale-110 transition-transform" title="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>

              {/* Youtube */}
              <a href="https://youtube.com/channel/UCQsqixtIBuYnsAM48Kigb4w" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#FF0000] text-white hover:scale-110 transition-transform" title="Youtube">
                <FaYoutube className="w-5 h-5" />
              </a>            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-[#ff9f22] text-xl font-black uppercase mb-8">Join The Newsletter</h3>
            <div className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="Your email here..." 
                className="w-full px-6 py-4 bg-white text-[#002866] outline-none"
              />
              <button className="w-full bg-[#ff9f22] text-[#002866] font-black uppercase py-4 tracking-widest hover:bg-white transition-colors">
                Subscribe Now
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