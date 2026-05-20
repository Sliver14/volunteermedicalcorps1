"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="w-full bg-gray-50 font-roboto">
      <PageBanner title="Join Volunteer Medical Corps" />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 text-center lg:text-left">

            {/* LEFT SIDE (unchanged) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-poppins font-bold text-[#002866] mb-6 uppercase">
                Become a Volunteer
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Whether you are a Christian health care worker, para-medic, or student, your skills can change lives.
                Join us in providing medical care, relief assistance, and sustainable health care solutions to communities in dire need.
              </p>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-[#ff9f22] text-[#002866] p-3 rounded-full md:mr-4 mb-4 md:mb-0">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Make a Global Impact</h4>
                    <p className="text-gray-600 text-sm">
                      Contribute to medical outreaches and humanitarian projects worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-[#ff9f22] text-[#002866] p-3 rounded-full md:mr-4 mb-4 md:mb-0">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Earn VMC Rewards</h4>
                    <p className="text-gray-600 text-sm">
                      Gain volunteer credits and be recognized for your active participation.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-[#ff9f22] text-[#002866] p-3 rounded-full md:mr-4 mb-4 md:mb-0">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Join a Network</h4>
                    <p className="text-gray-600 text-sm">
                      Connect with thousands of Christian health professionals globally.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE FORM (UPDATED TO MATCH YOUR SCHEMA) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 bg-white p-6 md:p-12 shadow-xl border-t-4 border-[#002866] rounded-sm text-left"
            >
              <h3 className="text-2xl font-poppins font-bold mb-8 uppercase text-[#002866]">
                Registration Form
              </h3>

              <form className="space-y-6">

                {/* Title */}
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Title *</label>
                  <select className="w-full bg-gray-50 border p-4 rounded-sm">
                    <option value="">Select Title</option>
                    <option>Pastor</option>
                    <option>Deacon</option>
                    <option>Deaconess</option>
                    <option>Brother</option>
                    <option>Sister</option>
                  </select>
                </div>

                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="p-4 bg-gray-50 border rounded-sm" placeholder="First Name *" />
                  <input className="p-4 bg-gray-50 border rounded-sm" placeholder="Last Name *" />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="p-4 bg-gray-50 border rounded-sm" placeholder="Email Address *" />
                  <input className="p-4 bg-gray-50 border rounded-sm" placeholder="Phone Number *" />
                </div>

                {/* Profession */}
                <div>
                  <select className="w-full p-4 bg-gray-50 border rounded-sm">
                    <option>Profession *</option>
                    {[
                      "Doctor",
                      "Nurse",
                      "Pharmacist",
                      "Laboratory Technician",
                      "Laboratory Scientist",
                      "Public Health Practitioner",
                      "Paramedic",
                      "Information Technology",
                      "Physiotherapist",
                      "Dentist",
                      "Aid Worker",
                      "Hospice Worker",
                      "Emergency Medical Technician",
                      "Ophthalmologist",
                      "Optometrist",
                      "Medical and Health Services Manager",
                      "Social Worker",
                      "Psychologist",
                      "Dietician",
                      "Pathologist",
                      "Media Practitioner",
                      "Nutritionist",
                      "Psychiatrist",
                      "Pharmacy Technician",
                      "Student",
                      "Others",
                    ].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Qualification */}
                <div>
                  <select className="w-full p-4 bg-gray-50 border rounded-sm">
                    <option>Qualification *</option>
                    {[
                      "School Leaver",
                      "Pre-Med",
                      "Undergraduate",
                      "Medical Student",
                      "Intern",
                      "Medical Officer",
                      "Nurse Practitioner",
                      "Resident",
                      "Chief Resident",
                      "Specialist Surgeons",
                      "MSc",
                      "PhD",
                      "CNO",
                      "Fellow",
                      "Attending Physician",
                      "Health Care Administrator",
                      "Medical Director",
                      "Professor",
                      "Dean",
                      "Others",
                    ].map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred Opportunity */}
                <div>
                  <select className="w-full p-4 bg-gray-50 border rounded-sm">
                    <option>Preferred Opportunity *</option>
                    {[
                      "Volunteer Support Services",
                      "Medical, Hospital and Surgical Outreaches",
                      "Community Volunteering Projects",
                      "VMC Disaster Response Team",
                      "VMC Academy Instructor",
                      "Blood Donor Recruiter",
                      "Online Support",
                      "Media Advocacy",
                      "Social Media Support",
                      "Media (Graphics and Video Editing)",
                      "Fundraising",
                      "Administrative Support",
                      "Translator",
                      "Script Writer",
                      "Social Media Ambassador",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <input
                  className="w-full p-4 bg-gray-50 border rounded-sm"
                  placeholder="Phone *"
                />

                {/* Country */}
                <div>
                  <select className="w-full p-4 bg-gray-50 border rounded-sm">
                    <option>Choose Country *</option>
                    {[
                      "Afghanistan",
                      "Albania",
                      "Algeria",
                      "Andorra",
                      "Angola",
                      "Argentina",
                      "Australia",
                      "Austria",
                      "Bangladesh",
                      "Belgium",
                      "Benin",
                      "Botswana",
                      "Brazil",
                      "Burkina Faso",
                      "Burundi",
                      "Cameroon",
                      "Canada",
                      "Chad",
                      "China",
                      "Congo",
                      "Democratic Republic of the Congo",
                      "Egypt",
                      "Ethiopia",
                      "France",
                      "Germany",
                      "Ghana",
                      "India",
                      "Ireland",
                      "Italy",
                      "Japan",
                      "Kenya",
                      "Liberia",
                      "Malaysia",
                      "Morocco",
                      "Mozambique",
                      "Namibia",
                      "Nepal",
                      "Netherlands",
                      "New Zealand",
                      "Niger",
                      "Nigeria",
                      "Norway",
                      "Pakistan",
                      "Philippines",
                      "Portugal",
                      "Rwanda",
                      "Saudi Arabia",
                      "Senegal",
                      "Sierra Leone",
                      "Singapore",
                      "Somalia",
                      "South Africa",
                      "South Korea",
                      "Spain",
                      "Sudan",
                      "Sweden",
                      "Switzerland",
                      "Tanzania",
                      "Thailand",
                      "Turkey",
                      "Uganda",
                      "United Arab Emirates",
                      "United Kingdom",
                      "United States",
                      "Zambia",
                      "Zimbabwe",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <input
                  className="w-full p-4 bg-gray-50 border rounded-sm"
                  placeholder="City *"
                />

                {/* Zonal Church */}
                <select className="w-full p-4 bg-gray-50 border rounded-sm">
                  <option value="">Select Zonal Church...</option>
                  <option value="">(To be added later)</option>
                </select>

                {/* Bio */}
                <textarea
                  className="w-full p-4 bg-gray-50 border rounded-sm"
                  rows={5}
                  placeholder="Enter Brief Info About You Here..."
                />

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" required />
                  <p className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  className="w-full bg-[#002866] text-white py-5 font-bold uppercase hover:bg-[#ff9f22] transition"
                >
                  Complete Registration
                </button>

              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-[#002866] font-bold">
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