import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main>
      <Header />
      <PageBanner title="Contact Us" subtitle="Get in touch with the Volunteer Medical Corps" />
      
      <section className="py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-black text-text-main mb-6 uppercase tracking-tight">Reach Out To Us</h2>
                <p className="text-text-muted text-lg font-medium leading-relaxed">
                  Have questions about our missions or want to become a volunteer? 
                  Our team is here to support you and provide all the information you need.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main uppercase tracking-widest text-xs mb-2">Our Office</h4>
                    <p className="text-text-muted font-medium">29, Unity Road, Off Obafemi Awolowo Road, Ikeja, Lagos Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main uppercase tracking-widest text-xs mb-2">Call Us</h4>
                    <p className="text-text-muted font-medium">+234 708 9267 186</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main uppercase tracking-widest text-xs mb-2">Email Us</h4>
                    <p className="text-text-muted font-medium">info@volunteermedicalcorps.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-bg-surface p-10 lg:p-16 rounded-[3rem] border border-border-main shadow-2xl">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Full Name</label>
                    <input type="text" className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-primary text-text-main font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Email Address</label>
                    <input type="email" className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-primary text-text-main font-medium" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Subject</label>
                  <input type="text" className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-primary text-text-main font-medium" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Message</label>
                  <textarea rows={6} className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-primary text-text-main font-medium" placeholder="Your message here..."></textarea>
                </div>
                <button className="w-full bg-brand-primary text-white py-5 font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:opacity-90 transition-all shadow-xl">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
