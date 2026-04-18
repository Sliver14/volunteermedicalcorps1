import PageBanner from "@/components/PageBanner";

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
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-4xl font-poppins font-bold text-[#002866] leading-tight uppercase">
                Transparency & Impact
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our annual reports provide a comprehensive overview of our activities, financial performance, and the global impact of our medical and humanitarian missions.
              </p>
              <div className="bg-[#ff9f22]/10 p-8 border-l-4 border-[#ff9f22]">
                <h4 className="font-bold text-[#002866] mb-2 uppercase">Looking for something specific?</h4>
                <p className="text-sm text-gray-500">Contact our administrative office for archived reports prior to 2020.</p>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {reports.map((report, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all group rounded-sm shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-6 mb-4 md:mb-0">
                      <div className="w-16 h-16 bg-[#002866] text-[#ff9f22] flex items-center justify-center text-xl font-black rounded-sm group-hover:scale-110 transition-transform">
                        {report.year}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors">{report.title}</h3>
                        <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Released: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-bold text-gray-400">{report.size}</span>
                      <button className="bg-[#002866] text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all">
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
