"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function RegisterPage() {
  const isMobile = useIsMobile();

  // Full Country List
  const countries = [
    { value: "AF", label: "Afghanistan" }, { value: "AX", label: "Aland Islands" },
    { value: "AL", label: "Albania" }, { value: "DZ", label: "Algeria" },
    { value: "AS", label: "American Samoa" }, { value: "AD", label: "Andorra" },
    { value: "AO", label: "Angola" }, { value: "AI", label: "Anguilla" },
    { value: "AQ", label: "Antarctica" }, { value: "AG", label: "Antigua And Barbuda" },
    { value: "AR", label: "Argentina" }, { value: "AM", label: "Armenia" },
    { value: "AW", label: "Aruba" }, { value: "AU", label: "Australia" },
    { value: "AT", label: "Austria" }, { value: "AZ", label: "Azerbaijan" },
    { value: "BS", label: "The Bahamas" }, { value: "BH", label: "Bahrain" },
    { value: "BD", label: "Bangladesh" }, { value: "BB", label: "Barbados" },
    { value: "BY", label: "Belarus" }, { value: "BE", label: "Belgium" },
    { value: "BZ", label: "Belize" }, { value: "BJ", label: "Benin" },
    { value: "BM", label: "Bermuda" }, { value: "BT", label: "Bhutan" },
    { value: "BO", label: "Bolivia" }, { value: "BA", label: "Bosnia and Herzegovina" },
    { value: "BW", label: "Botswana" }, { value: "BV", label: "Bouvet Island" },
    { value: "BR", label: "Brazil" }, { value: "IO", label: "British Indian Ocean Territory" },
    { value: "BN", label: "Brunei" }, { value: "BG", label: "Bulgaria" },
    { value: "BF", label: "Burkina Faso" }, { value: "BI", label: "Burundi" },
    { value: "KH", label: "Cambodia" }, { value: "CM", label: "Cameroon" },
    { value: "CA", label: "Canada" }, { value: "CV", label: "Cape Verde" },
    { value: "KY", label: "Cayman Islands" }, { value: "CF", label: "Central African Republic" },
    { value: "TD", label: "Chad" }, { value: "CL", label: "Chile" },
    { value: "CN", label: "China" }, { value: "CX", label: "Christmas Island" },
    { value: "CC", label: "Cocos (Keeling) Islands" }, { value: "CO", label: "Colombia" },
    { value: "KM", label: "Comoros" }, { value: "CG", label: "Congo" },
    { value: "CD", label: "Democratic Republic of the Congo" }, { value: "CK", label: "Cook Islands" },
    { value: "CR", label: "Costa Rica" }, { value: "CI", label: "Cote D'Ivoire (Ivory Coast)" },
    { value: "HR", label: "Croatia" }, { value: "CU", label: "Cuba" },
    { value: "CY", label: "Cyprus" }, { value: "CZ", label: "Czech Republic" },
    { value: "DK", label: "Denmark" }, { value: "DJ", label: "Djibouti" },
    { value: "DM", label: "Dominica" }, { value: "DO", label: "Dominican Republic" },
    { value: "TL", label: "East Timor" }, { value: "EC", label: "Ecuador" },
    { value: "EG", label: "Egypt" }, { value: "SV", label: "El Salvador" },
    { value: "GQ", label: "Equatorial Guinea" }, { value: "ER", label: "Eritrea" },
    { value: "EE", label: "Estonia" }, { value: "ET", label: "Ethiopia" },
    { value: "FK", label: "Falkland Islands" }, { value: "FO", label: "Faroe Islands" },
    { value: "FJ", label: "Fiji Islands" }, { value: "FI", label: "Finland" },
    { value: "FR", label: "France" }, { value: "GF", label: "French Guiana" },
    { value: "PF", label: "French Polynesia" }, { value: "TF", label: "French Southern Territories" },
    { value: "GA", label: "Gabon" }, { value: "GM", label: "The Gambia" },
    { value: "GE", label: "Georgia" }, { value: "DE", label: "Germany" },
    { value: "GH", label: "Ghana" }, { value: "GI", label: "Gibraltar" },
    { value: "GR", label: "Greece" }, { value: "GL", label: "Greenland" },
    { value: "GD", label: "Grenada" }, { value: "GP", label: "Guadeloupe" },
    { value: "GU", label: "Guam" }, { value: "GT", label: "Guatemala" },
    { value: "GG", label: "Guernsey and Alderney" }, { value: "GN", label: "Guinea" },
    { value: "GW", label: "Guinea-Bissau" }, { value: "GY", label: "Guyana" },
    { value: "HT", label: "Haiti" }, { value: "HM", label: "Heard Island and McDonald Islands" },
    { value: "HN", label: "Honduras" }, { value: "HK", label: "Hong Kong S.A.R." },
    { value: "HU", label: "Hungary" }, { value: "IS", label: "Iceland" },
    { value: "IN", label: "India" }, { value: "ID", label: "Indonesia" },
    { value: "IR", label: "Iran" }, { value: "IQ", label: "Iraq" },
    { value: "IE", label: "Ireland" }, { value: "IL", label: "Israel" },
    { value: "IT", label: "Italy" }, { value: "JM", label: "Jamaica" },
    { value: "JP", label: "Japan" }, { value: "JE", label: "Jersey" },
    { value: "JO", label: "Jordan" }, { value: "KZ", label: "Kazakhstan" },
    { value: "KE", label: "Kenya" }, { value: "KI", label: "Kiribati" },
    { value: "KP", label: "North Korea" }, { value: "KR", label: "South Korea" },
    { value: "KW", label: "Kuwait" }, { value: "KG", label: "Kyrgyzstan" },
    { value: "LA", label: "Laos" }, { value: "LV", label: "Latvia" },
    { value: "LB", label: "Lebanon" }, { value: "LS", label: "Lesotho" },
    { value: "LR", label: "Liberia" }, { value: "LY", label: "Libya" },
    { value: "LI", label: "Liechtenstein" }, { value: "LT", label: "Lithuania" },
    { value: "LU", label: "Luxembourg" }, { value: "MO", label: "Macau S.A.R." },
    { value: "MK", label: "Macedonia" }, { value: "MG", label: "Madagascar" },
    { value: "MW", label: "Malawi" }, { value: "MY", label: "Malaysia" },
    { value: "MV", label: "Maldives" }, { value: "ML", label: "Mali" },
    { value: "MT", label: "Malta" }, { value: "IM", label: "Man (Isle of)" },
    { value: "MH", label: "Marshall Islands" }, { value: "MQ", label: "Martinique" },
    { value: "MR", label: "Mauritania" }, { value: "MU", label: "Mauritius" },
    { value: "YT", label: "Mayotte" }, { value: "MX", label: "Mexico" },
    { value: "FM", label: "Micronesia" }, { value: "MD", label: "Moldova" },
    { value: "MC", label: "Monaco" }, { value: "MN", label: "Mongolia" },
    { value: "ME", label: "Montenegro" }, { value: "MS", label: "Montserrat" },
    { value: "MA", label: "Morocco" }, { value: "MZ", label: "Mozambique" },
    { value: "MM", label: "Myanmar" }, { value: "NA", label: "Namibia" },
    { value: "NR", label: "Nauru" }, { value: "NP", label: "Nepal" },
    { value: "BQ", label: "Bonaire, Sint Eustatius and Saba" }, { value: "NL", label: "Netherlands" },
    { value: "NC", label: "New Caledonia" }, { value: "NZ", label: "New Zealand" },
    { value: "NI", label: "Nicaragua" }, { value: "NE", label: "Niger" },
    { value: "NG", label: "Nigeria" }, { value: "NU", label: "Niue" },
    { value: "NF", label: "Norfolk Island" }, { value: "MP", label: "Northern Mariana Islands" },
    { value: "NO", label: "Norway" }, { value: "OM", label: "Oman" },
    { value: "PK", label: "Pakistan" }, { value: "PW", label: "Palau" },
    { value: "PS", label: "Palestinian Territory Occupied" }, { value: "PA", label: "Panama" },
    { value: "PG", label: "Papua new Guinea" }, { value: "PY", label: "Paraguay" },
    { value: "PE", label: "Peru" }, { value: "PH", label: "Philippines" },
    { value: "PN", label: "Pitcairn Island" }, { value: "PL", label: "Poland" },
    { value: "PT", label: "Portugal" }, { value: "PR", label: "Puerto Rico" },
    { value: "QA", label: "Qatar" }, { value: "RE", label: "Reunion" },
    { value: "RO", label: "Romania" }, { value: "RU", label: "Russia" },
    { value: "RW", label: "Rwanda" }, { value: "SH", label: "Saint Helena" },
    { value: "KN", label: "Saint Kitts And Nevis" }, { value: "LC", label: "Saint Lucia" },
    { value: "PM", label: "Saint Pierre and Miquelon" }, { value: "VC", label: "Saint Vincent And The Grenadines" },
    { value: "BL", label: "Saint-Barthelemy" }, { value: "MF", label: "Saint-Martin (French part)" },
    { value: "WS", label: "Samoa" }, { value: "SM", label: "San Marino" },
    { value: "ST", label: "Sao Tome and Principe" }, { value: "SA", label: "Saudi Arabia" },
    { value: "SN", label: "Senegal" }, { value: "RS", label: "Serbia" },
    { value: "SC", label: "Seychelles" }, { value: "SL", label: "Sierra Leone" },
    { value: "SG", label: "Singapore" }, { value: "SK", label: "Slovakia" },
    { value: "SI", label: "Slovenia" }, { value: "SB", label: "Solomon Islands" },
    { value: "SO", label: "Somalia" }, { value: "ZA", label: "South Africa" },
    { value: "GS", label: "South Georgia" }, { value: "SS", label: "South Sudan" },
    { value: "ES", label: "Spain" }, { value: "LK", label: "Sri Lanka" },
    { value: "SD", label: "Sudan" }, { value: "SR", label: "Suriname" },
    { value: "SJ", label: "Svalbard And Jan Mayen Islands" }, { value: "SZ", label: "Swaziland" },
    { value: "SE", label: "Sweden" }, { value: "CH", label: "Switzerland" },
    { value: "SY", label: "Syria" }, { value: "TW", label: "Taiwan" },
    { value: "TJ", label: "Tajikistan" }, { value: "TZ", label: "Tanzania" },
    { value: "TH", label: "Thailand" }, { value: "TG", label: "Togo" },
    { value: "TK", label: "Tokelau" }, { value: "TO", label: "Tonga" },
    { value: "TT", label: "Trinidad And Tobago" }, { value: "TN", label: "Tunisia" },
    { value: "TR", label: "Turkey" }, { value: "TM", label: "Turkmenistan" },
    { value: "TC", label: "Turks And Caicos Islands" }, { value: "TV", label: "Tuvalu" },
    { value: "UG", label: "Uganda" }, { value: "UA", label: "Ukraine" },
    { value: "AE", label: "United Arab Emirates" }, { value: "GB", label: "United Kingdom" },
    { value: "US", label: "United States" }, { value: "UM", label: "United States Minor Outlying Islands" },
    { value: "UY", label: "Uruguay" }, { value: "UZ", label: "Uzbekistan" },
    { value: "VU", label: "Vanuatu" }, { value: "VA", label: "Vatican City State (Holy See)" },
    { value: "VE", label: "Venezuela" }, { value: "VN", label: "Vietnam" },
    { value: "VG", label: "Virgin Islands (British)" }, { value: "VI", label: "Virgin Islands (US)" },
    { value: "WF", label: "Wallis And Futuna Islands" }, { value: "EH", label: "Western Sahara" },
    { value: "YE", label: "Yemen" }, { value: "ZM", label: "Zambia" },
    { value: "ZW", label: "Zimbabwe" }, { value: "XK", label: "Kosovo" },
    { value: "CW", label: "Curaçao" }, { value: "SX", label: "Sint Maarten (Dutch part)" },
  ];

  // Church Zones (sorted alphabetically)
  const churchZones = [
    "Aba Zone", "Abeokuta Ministry Centre", "Abuja Ministry Centre", "Abuja Zone 1", "Abuja Zone 2",
    "Accra Ghana Zone", "Australia Region", "Benin Zone 1", "Benin Zone 2", "BLW Benin Republic Zone A",
    "BLW Benin Republic Zone B", "BLW Burkina Faso Zone", "BLW Cameroon Zone A", "BLW Cameroon Zone B",
    "BLW Congo Zone", "BLW Cyprus Group", "BLW Democratic Republic of Congo Zone", "BLW Ethiopia Group 1",
    "BLW Ethiopia Group 2", "BLW Europe Zone 1 DSP", "BLW Ghana Zone A", "BLW Ghana Zone B",
    "BLW Ghana Zone C", "BLW Ghana Zone D", "BLW International Chapters", "BLW Ireland Group",
    "BLW Kenya Zone", "BLW Kenya Zone B", "BLW Middle East & North Africa", "BLW Namibia Group",
    "BLW South Africa Zone A", "BLW South Africa Zone B", "BLW South Africa Zone C", "BLW South Africa Zone D",
    "BLW South Africa Zone E", "BLW South Africa Zone F", "BLW South Africa Zone G DSP", "BLW South Africa Zone H",
    "BLW South Africa Zone I", "BLW Tanzania Zone", "BLW Uganda Zone B", "BLW UK Zone A", "BLW UK Zone B",
    "BLW UK Zone C", "BLW UK Wales", "BLW USA Region 1", "BLW USA Region 2", "BLW Zone A", "BLW Zone B",
    "BLW Zone C", "BLW Zone D", "BLW Zone E", "BLW Zone F", "BLW Zone G", "BLW Zone H", "BLW Zone I",
    "BLW Zone J", "BLW Zone K", "BLW Zone L", "BLW Zone M", "BLW Zone N", "Calabar Ministry Centre",
    "Campus Ministry", "Cape Town Zone 1", "Cape Town Zone 2", "CE Kenya Sub Zone A", "CE Kenya Sub Zone B",
    "Chad Zone", "Durban South Africa", "East Asia Region", "Eastern Europe Region", "Edo North & Central Zone",
    "EWCA Zone 1", "EWCA Zone 2", "EWCA Zone 3", "EWCA Zone 4", "EWCA Zone 5", "EWCA Zone 6",
    "Ibadan Zone 1", "Ibadan Zone 2", "India Zone", "Kenya Zone", "Lagos Sub Zone A", "Lagos Sub Zone B",
    "Lagos Sub Zone C", "Lagos Virtual Zone", "Lagos Zone 1", "Lagos Zone 2", "Lagos Zone 3", "Lagos Zone 4",
    "Lagos Zone 5", "Lagos Zone 6", "Loveworld Church Zone", "Loveworld Global Fellowship",
    "Middle East & South East Asia Region", "Midwest Zone", "Ministry Center Ibadan", "Nigeria South West Zone 4",
    "Nigeria South West Zone 5", "NNE Zone 1", "NNW Zone 1", "NNW Zone 2", "North Central Zone 1 Nigeria",
    "North Central Zone 2 Nigeria", "NSE Zone 1", "NSE Zone 2", "NSE Zone 3", "NSS Zone 1", "NSS Zone 2",
    "NSS Zone 3", "NSW Zone 1", "NSW Zone 2", "NSW Zone 3", "Onitsha Zone", "Ottawa Zone Canada",
    "Port Harcourt Zone 1", "Port Harcourt Zone 2", "Port Harcourt Zone 3", "Quebec Zone", "South America Region",
    "Southern Africa Zone 1", "Southern Africa Zone 2", "Southern Africa Zone 3", "Southern Africa Zone 4",
    "Southern Africa Zone 5", "Toronto Zone", "Uganda Group", "UK Zone 1 DSP Region", "UK Zone 2 DSP Region",
    "UK Zone 3 DSP Region", "UK Zone 4 DSP Region", "UK Zone 1 Region 2", "UK Zone 3 Region 2",
    "UK Zone 4 Region 2", "USA Dallas Zone", "USA Region 2", "USA Region 3", "USA Zone 1 Region 1",
    "USA Zone 2 Region 1", "Warri Ministry Centre", "Western Europe Zone 1", "Western Europe Zone 2",
    "Western Europe Zone 3", "Western Europe Zone 4", "UK Zone 1, DSP Region", "UK Zone 2, DSP Region",
    "UK Zone 3, DSP Region", "UK Zone 4, DSP Region", "Lagos Sub Zone D", "Port Harcourt Ministry Centre",
    "Durban Zone, South Africa", "USA Zone 1, Region 1", "USA Zone 2, Region 1", "USA Zone 3", "EWCA Zone 7",
    "C.E Amsterdam", "Nigeria North Central Zone 1", "Nigeria North Central Zone 2", "Katsina Sub Zone",
    "Niger Sub Zone, Nigeria", "Abakaliki Zone", "Taraba Sub Zone", "Lafia Sub Zone", "Kogi Sub Zone",
    "Maiduguri Sub Zone", "Gombe Sub Zone", "Bauchi Sub Zone", "West Cameroon Zone", "Christ Embassy Barking DSP",
    "Warri DSC Sub Zone", "Ottawa Zone, Canada", "India Zone 2", "Ministry Center, Abuja", "Ministry Center, Calabar",
    "Ministry Center, Warri", "Ministry Center, Ibadan", "International Missions for South East Asia",
    "South East Asia International", "UK International Office", "Canada International Office",
    "SA Regional Office", "Canada International Office (HS)", "BLW Ghana Subzone C", "BLW Ghana Subzone D",
    "BLW Ghana Subzone E", "BLW Ghana Subzone F", "BLW UK Sub Zone C", "BLW UK Subzone C", "BLW Wales",
    "BLW Ireland Zone", "Ireland Sub Zone 2, Region 2", "BLW Uganda Zone", "BLW USA Region 1 Zone B",
    "BLW USA Region 1 Updated", "BLW USA Region 2 Zone B", "BLW USA Group 1", "BLW USA Group 2",
    "USA Group 4", "BLW Canada Zone", "Cameroon Group 1", "BLW Cameroon Group 3", "BLW DRC Zone",
    "BLW Benin Republic Zone", "BLW Asia Zone", "BLW International Groups", "Youths to the Nations",
    "MVP Australia & Oceania", "MVP Portuguese Nations", "MVP Russia, Ukraine & Stan Countries",
    "MVP South America", "MVP USA, Canada & Caribbean", "MVP Middle East & North Africa", "MVP UK & Europe",
    "MVP Nigeria", "MVP Southern Africa", "MVP EWCA", "MVP Eastern Europe", "MVP South Asia",
    "MVP South East Asia", "MVP East Asia", "MVP Mexico & Central America", "MVP French Speaking Countries",
    "International School of Ministry", "ISM Europe Region", "ISM Southern Africa Region", "ISM East Africa Region",
    "ISM Online School", "ISM MENA Region", "ISM Central Africa Region", "ISM Asia Region",
    "ISM North America Region", "ISM SOW Regions", "ISM United Kingdom Region", "ISM Central America Region",
    "ISM Europe EW", "ISM Women Ministry", "ISM Francophone West Africa", "ISM Middle East Region",
    "ISM Facum Region", "ISM Facum Cell Ministry Dept", "ISM Asia 2 Region", "ISM North Africa Region",
    "ISM Oceania", "ISM French", "ISM Lagos Region 2", "ISM Lagos Region", "ISM Greater Glory Ministry Zimbabwe",
    "The Word Life Truth Ministry Germany", "NESAH", "ISM Inspire TV", "GYLF", "Loveworld Medical Missions",
    "Future Africa Leaders Foundation", "Volunteers Network", "Healing School Cyber Church", "Healing School Prayer Network",
    "Healing School Ambassadors Network", "Healing School Translators", "Healing Streams Ambassadors Network",
    "Healing Centre Managers", "Volunteer Medical Corps", "HS Global Response Centre UK/Europe/Canada",
    "HS Global Response Centre US Regions", "HS Global Response Centre Africa Region", "Global Response Center",
    "HSLHS Student Groups", "Healing School", "Healing School Digital Evangelists", "Healing School Digital Marketing",
    "Healing School Southern Africa Office", "Healing School Partnership Managers", "Online Publicity & Engagement",
    "Web & Mobile Notification", "Christ Embassy.org", "Pastorchrisonline", "Loveworld Sat", "Loveworld XP",
    "Loveworld TV UK", "Loveworld USA", "Loveworld Canada", "Loveworld Persia", "Loveworld India",
    "Loveworld Arabic", "Loveworld Radio", "Loveworld Next", "Loveworld Graduate Network", "Loveworld Schools",
    "Loveworld Staff Community", "Loveworld Teens Ministry", "Loveworld Teens & Youth Ministry",
    "Loveworld Children Ministry", "Loveworld Cell Ministry", "Loveworld Impressions", "Loveworld Institute of Innovation & Tech",
    "Loveworld Publishing Ministry", "Loveworld Ladies Network", "Rhapsody", "Innercity Missions", "LTM & Radio",
    "Translators Network International", "REON", "LN247", "VGSS Loveworld", "Lovetoons", "Strategic Services Management",
    "Special Ministers Team", "SSM Advance", "Netshift Digital", "Sons of Ministry", "Pastoral & Deaconry Nominees Training",
    "Office of the President", "Network for Medical missions", "Loveworld Community Clinics"
  ].sort((a, b) => a.localeCompare(b));

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="Join Volunteer Medical Corps" />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 text-center lg:text-left items-start">

            {/* LEFT SIDE - Unchanged */}
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
                  <select className="w-full bg-bg-base border border-border-main p-4 focus:outline-none focus:border-brand-secondary text-text-main font-medium" required>
                    <option value="">Select Title</option>
                    <option value="Pastor">Pastor</option>
                    <option value="Deacon">Deacon</option>
                    <option value="Deaconess">Deaconess</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                  </select>
                </div>

                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">First Name *</label>
                    <input className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="First Name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Last Name *</label>
                    <input className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="Last Name" required />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Email Address *</label>
                    <input type="email" className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="Email Address" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Phone Number *</label>
                    <input type="tel" className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" placeholder="Phone Number" required />
                  </div>
                </div>

                {/* Password Fields - NEW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Password *</label>
                    <input 
                      type="password" 
                      className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" 
                      placeholder="Create Password" 
                      required 
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Confirm Password *</label>
                    <input 
                      type="password" 
                      className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" 
                      placeholder="Confirm Password" 
                      required 
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Profession */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Profession *</label>
                  <select className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" required>
                    <option value="">Select Profession</option>
                    {["Doctor", "Nurse", "Pharmacist", "Laboratory Technician", "Laboratory Scientist", "Public Health Practitioner", "Paramedic", "Information Technology", "Physiotherapist", "Dentist", "Aid Worker", "Hospice Worker", "Emergency Medical Technician", "Ophthalmologist", "Optometrist", "Medical and Health Services Manager", "Social Worker", "Psychologist", "Dietician", "Pathologist", "Media Practitioner", "Nutritionist", "Psychiatrist", "Pharmacy Technician", "Student", "Others"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Qualification */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Qualification *</label>
                  <select className="w-full p-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary text-text-main font-medium" required>
                    <option value="">Select Qualification</option>
                    {["School Leaver", "Pre-Med", "Undergraduate", "Medical Student", "Intern", "Medical Officer", "Nurse Practitioner", "Resident", "Chief Resident", "Specialist Surgeons", "MSc", "PhD", "CNO", "Fellow", "Attending Physician", "Health Care Administrator", "Medical Director", "Professor", "Dean", "Others"].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Country *</label>
                  <select name="country" required className="w-full bg-bg-base border border-border-main p-4 focus:outline-none focus:border-brand-secondary text-text-main font-medium">
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Church Zone */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted">Church Zone / Group *</label>
                  <select name="churchZone" required className="w-full bg-bg-base border border-border-main p-4 focus:outline-none focus:border-brand-secondary text-text-main font-medium">
                    <option value="">Select Church Zone</option>
                    {churchZones.map((zone) => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>

                {/* Brief Bio */}
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
                  type="submit"
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