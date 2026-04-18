"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function GoodDeedsCampaignsPage() {
  const activities = [
    "Fund Raise for VMC",
    "Health Education Trainings",
    "Community Blood Drive Campaign"
  ];

  const campaigns = [
    { title: "Administer First Aid at public events", image: "/give-15-768x512.jpg" },
    { title: "Praying for the Sick.", image: "/give-17-300x200.jpg" },
    { title: "Teach a First Aid Course", image: "/give-20-768x512.jpg" },
    { title: "Health Education Trainings", image: "/sw-post-1-min-768x512.jpg" },
    { title: "Recruiting New VMC Volunteers", image: "/sw-post-3-min-300x200.jpg" },
    { title: "Preach the Gospel", image: "/vcn-post-7-min-768x512.jpg" },
    { title: "Healthcare Support for Female Teenagers", image: "/give-15-768x512.jpg" },
    { title: "Organize a VMC Fundraising Campaign", image: "/give-17-300x200.jpg" },
    { title: "Volunteer as a Kitchen Help", image: "/give-20-768x512.jpg" },
    { title: "Volunteer Health Worker", image: "/sw-post-1-min-768x512.jpg" },
    { title: "Eye Healthcare Campaign", image: "/sw-post-3-min-300x200.jpg" },
    { title: "Provision of Support Kits", image: "/vcn-post-7-min-768x512.jpg" },
    { title: "Fund Raise for VMC", image: "/give-15-768x512.jpg" },
    { title: "Community Blood Drive Campaign", image: "/give-17-300x200.jpg" },
    { title: "Support for the poor", image: "/give-20-768x512.jpg" }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="GOOD DEEDS CAMPAIGNS" parent={{ label: "What We Do", href: "#" }} />
      
      {/* Introduction Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] md:h-[500px]"
            >
              <Image 
                src="/give-17-300x200.jpg" 
                alt="Good Deeds Campaigns" 
                fill 
                className="object-cover rounded-sm shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#ff9f22] p-8 hidden md:block">
                <span className="text-[#002866] font-black text-2xl">#vmcgooddeeds</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h6 className="text-[#ff9f22] font-bold tracking-widest uppercase mb-4">VMC Campaigns</h6>
                <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#002866] leading-tight">
                  We Save Lives Through Good Deeds
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Volunteer Medical Corps Projects provide a platform to meet the needs of those who require our aid and support in line with the Gospel of Jesus Christ.
                </p>
                <p>
                  Find volunteer opportunities that fit your time and skill, earn volunteer credits and make impact with us.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#002866] mb-6">Some activities we have under this Campaign:</h4>
                <ul className="space-y-4">
                  {activities.map((activity, index) => (
                    <li key={index} className="flex items-center text-gray-700 font-semibold">
                      <span className="w-2 h-2 bg-[#ff9f22] rounded-full mr-3"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h6 className="text-[#ff9f22] font-bold tracking-widest uppercase mb-4">Get Involved</h6>
            <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase">Good Deeds Campaigns</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {campaigns.map((campaign, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={campaign.image} 
                    alt={campaign.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#002866]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-[#002866] px-6 py-2 font-bold uppercase tracking-wider">Learn More</button>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-sm font-roboto text-gray-400 uppercase tracking-widest mb-2 block">Good Deeds Campaigns</span>
                  <h3 className="text-xl font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors line-clamp-2">
                    {campaign.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
