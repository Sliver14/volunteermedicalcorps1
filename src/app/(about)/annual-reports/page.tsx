"use client";

import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function AnnualReportsPage() {
  const isMobile = useIsMobile();
  const reports = [
    { year: "2023", title: "Impact Report 2023", size: "4.2 MB", date: "Jan 15, 2024" },
    { year: "2022", title: "Global Outreach Report 2022", size: "3.8 MB", date: "Jan 20, 2023" },
    { year: "2021", title: "Humanitarian Response 2021", size: "5.1 MB", date: "Feb 05, 2022" },
    { year: "2020", title: "VMC Annual Review 2020", size: "4.5 MB", date: "Jan 12, 2021" }
  ];

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="Annual Reports" parent={{ label: "About Us", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:col-span-1 space-y-6 md:space-y-8"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary dark:text-brand-secondary leading-tight uppercase tracking-tight">
                Transparency & <br className="hidden lg:block" /> Global Impact
              </h2>
              <p className="text-text-muted text-base md:text-lg leading-relaxed font-medium opacity-90">
                Our annual reports provide a comprehensive overview of our activities, financial performance, and the global impact of our medical and humanitarian missions.
              </p>
              <div className="bg-brand-primary/5 dark:bg-white/5 p-8 md:p-10 border-l-8 border-brand-secondary">
                <h4 className="font-bold text-brand-primary dark:text-brand-secondary mb-3 uppercase text-xs md:text-sm tracking-tight">Archived Reports</h4>
                <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-widest opacity-70 leading-relaxed">Contact our administrative office for reports prior to 2020.</p>
              </div>
            </motion.div>
            
            <div className="lg:col-span-2">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                  hidden: {}
                }}
                className="space-y-6 md:space-y-8"
              >
                {reports.map((report, index) => (
                  <motion.div 
                    key={index} 
                    variants={{
                      hidden: { opacity: 0, y: isMobile ? 30 : 50 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                    className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 bg-bg-surface border border-border-main hover:border-brand-secondary transition-all group shadow-sm hover:shadow-xl"
                  >
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-10 mb-8 md:mb-0 w-full md:w-auto">
                      <div className="w-20 h-20 bg-brand-primary text-brand-secondary flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform shrink-0 shadow-inner">
                        {report.year}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-brand-primary dark:text-text-main group-hover:text-brand-secondary transition-colors uppercase tracking-tight">{report.title}</h3>
                        <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-widest mt-2 font-bold opacity-60">Released: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 w-full md:w-auto">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{report.size}</span>
                      <button className="group relative overflow-hidden bg-brand-primary text-white px-8 md:px-10 py-4 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all w-full sm:w-auto shadow-lg">
                         <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                         <span className="relative z-10 group-hover:text-brand-primary transition-colors">Download PDF</span>
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
