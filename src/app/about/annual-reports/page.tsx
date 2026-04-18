"use client";

import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";

export default function AnnualReportsPage() {
  const reports = [
    { year: "2023", title: "Impact Report 2023", size: "4.2 MB", date: "Jan 15, 2024" },
    { year: "2022", title: "Global Outreach Report 2022", size: "3.8 MB", date: "Jan 20, 2023" },
    { year: "2021", title: "Humanitarian Response 2021", size: "5.1 MB", date: "Feb 05, 2022" },
    { year: "2020", title: "VMC Annual Review 2020", size: "4.5 MB", date: "Jan 12, 2021" }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="Annual Reports" parent={{ label: "About Us", href: "#" }} />
      
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-6 md:space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#002866] leading-tight uppercase">
                Transparency & Impact
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Our annual reports provide a comprehensive overview of our activities, financial performance, and the global impact of our medical and humanitarian missions.
              </p>
              <div className="bg-[#ff9f22]/10 p-6 md:p-8 border-l-4 border-[#ff9f22]">
                <h4 className="font-bold text-[#002866] mb-2 uppercase text-sm md:text-base">Looking for something specific?</h4>
                <p className="text-xs md:text-sm text-gray-500">Contact our administrative office for archived reports prior to 2020.</p>
              </div>
            </motion.div>
            
            <div className="lg:col-span-2">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                  hidden: {}
                }}
                className="space-y-4 md:space-y-6"
              >
                {reports.map((report, index) => (
                  <motion.div 
                    key={index} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all group rounded-sm shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6 mb-6 md:mb-0 w-full md:w-auto">
                      <div className="w-16 h-16 bg-[#002866] text-[#ff9f22] flex items-center justify-center text-xl font-black rounded-sm group-hover:scale-110 transition-transform shrink-0">
                        {report.year}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors">{report.title}</h3>
                        <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mt-1">Released: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                      <span className="text-xs md:text-sm font-bold text-gray-400">{report.size}</span>
                      <button className="bg-[#002866] text-white px-6 md:px-8 py-3 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all w-full sm:w-auto">
                        Download PDF
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
