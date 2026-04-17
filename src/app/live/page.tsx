import PageBanner from "@/components/PageBanner";

export default function LiveStreamPage() {
  return (
    <div className="w-full bg-gray-50">
      <PageBanner title="VMC Live Stream" />
      
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#002866] p-4 text-center rounded-t-sm shadow-md">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-white font-bold uppercase tracking-widest text-sm">Live Broadcast</span>
          </div>
          
          {/* Video Player Placeholder */}
          <div className="relative pt-[56.25%] bg-black shadow-2xl rounded-b-sm overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
              <svg className="w-24 h-24 mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-poppins tracking-wider">The live stream has not started yet.</h3>
              <p className="mt-2 text-sm">Please check back later during scheduled broadcast times.</p>
            </div>
          </div>

          <div className="mt-12 bg-white p-8 border border-gray-100 shadow-sm rounded-sm text-center md:text-left">
            <h2 className="text-2xl font-poppins font-bold text-[#002866] mb-4">Upcoming Broadcasts</h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center py-4 border-b border-gray-100 gap-4 md:gap-0">
                <div>
                  <h4 className="font-bold text-gray-900">Global Hospital Outreach Kick-off</h4>
                  <p className="text-sm text-gray-500">Join our leadership as we officially launch the GHOC.</p>
                </div>
                <div className="md:text-right">
                  <span className="block text-[#002866] font-bold">Oct 15, 2026</span>
                  <span className="text-sm text-gray-500">14:00 GMT</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center py-4 border-b border-gray-100 gap-4 md:gap-0">
                <div>
                  <h4 className="font-bold text-gray-900">VMC Academy Live Webinar</h4>
                  <p className="text-sm text-gray-500">Training session for medical volunteers.</p>
                </div>
                <div className="md:text-right">
                  <span className="block text-[#002866] font-bold">Oct 22, 2026</span>
                  <span className="text-sm text-gray-500">10:00 GMT</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
