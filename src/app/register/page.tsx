"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function RegisterPage() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="Join Volunteer Medical Corps" />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 text-center lg:text-left items-start">

            {/* LEFT SIDE */}
            <motion.div
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary mb-6 uppercase">
                Become a Volunteer
              </h2>

              <p className="text-text-muted text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Whether you are a Christian health care worker, para-medic, or student, your skills can change lives.
                Join us in providing medical care, relief assistance, and sustainable health care solutions to communities in dire need.
              </p>

              <div className="space-y-8">
                {[
                  { title: "Make a Global Impact", desc: "Contribute to medical outreaches and humanitarian projects worldwide." },
                  { title: "Earn VMC Rewards", desc: "Gain volunteer credits and be recognized for your active participation." },
                  { title: "Join a Network", desc: "Connect with thousands of Christian health professionals globally." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center md:items-start group">
                    <div className="bg-brand-secondary text-brand-primary w-10 h-10 flex items-center justify-center font-bold md:mr-5 mb-4 md:mb-0 shadow-lg transition-transform group-hover:scale-110">✓</div>
                    <div className="text-center md:text-left">
                      <h4 className="font-bold text-brand-primary dark:text-brand-secondary mb-1 uppercase text-sm tracking-tight">{item.title}</h4>
                      <p className="text-text-muted text-sm font-medium opacity-80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE FORM */}
            <motion.div
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-3 bg-bg-surface p-8 md:p-12 shadow-2xl border border-border-main text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-primary"></div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-10 uppercase text-brand-primary dark:text-brand-secondary tracking-tight">
                Registration Form
              </h3>

              <form className="space-y-8">

                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Title *</label>
                  <select className="w-full bg-bg-base border border-border-main p-4 focus:outline-none focus:border-brand-secondary text-text-main font-medium">
                    <option value="">Select Title</option>
                    <option>Pastor</option>
                    <option>Deacon</option>
                    <option>Deaconess</option>
                    <option>Brother</option>
                    <option>Sister</option>
                  </select>
                </div>

                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">First Name *</label>
                    <input className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="First Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Last Name *</label>
                    <input className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="Last Name" />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Email Address *</label>
                    <input className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="Email Address" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Phone Number *</label>
                    <input className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="Phone Number" />
                  </div>
                </div>

                {/* Profession */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Profession *</label>
                  <select className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium">
                    <option>Select Profession</option>
                    {[
                      "Doctor", "Nurse", "Pharmacist", "Laboratory Technician", "Laboratory Scientist",
                      "Public Health Practitioner", "Paramedic", "Information Technology", "Physiotherapist",
                      "Dentist", "Aid Worker", "Hospice Worker", "Emergency Medical Technician", "Ophthalmologist",
                      "Optometrist", "Medical and Health Services Manager", "Social Worker", "Psychologist",
                      "Dietician", "Pathologist", "Media Practitioner", "Nutritionist", "Psychiatrist",
                      "Pharmacy Technician", "Student", "Others",
                    ].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Qualification */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Qualification *</label>
                  <select className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium">
                    <option>Select Qualification</option>
                    {[
                      "School Leaver", "Pre-Med", "Undergraduate", "Medical Student", "Intern",
                      "Medical Officer", "Nurse Practitioner", "Resident", "Chief Resident",
                      "Specialist Surgeons", "MSc", "PhD", "CNO", "Fellow", "Attending Physician",
                      "Health Care Administrator", "Medical Director", "Professor", "Dean", "Others",
                    ].map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Country *</label>
                  <select className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium">
                    <option>Choose Country</option>
                    {[
                      "Nigeria", "USA", "United Kingdom", "Canada", "South Africa", "Others"
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Brief Bio</label>
                  <textarea
                    className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium"
                    rows={4}
                    placeholder="Enter Brief Info About You Here..."
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-4 p-4 bg-bg-base border border-border-main">
                  <input type="checkbox" className="mt-1 accent-brand-primary" required />
                  <p className="text-xs text-text-muted font-medium leading-relaxed">
                    I agree to the <Link href="/terms" className="text-brand-secondary underline">Terms of Service</Link> and <Link href="/privacy" className="text-brand-secondary underline">Privacy Policy</Link>.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  className="group relative overflow-hidden w-full bg-brand-primary text-white py-5 font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-xl"
                >
                   <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-brand-primary transition-colors">Complete Registration</span>
                </button>

              </form>

              <p className="mt-10 text-center text-xs font-bold uppercase tracking-widest text-text-muted">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-secondary hover:underline ml-1">
                  Login here
                </Link>
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}