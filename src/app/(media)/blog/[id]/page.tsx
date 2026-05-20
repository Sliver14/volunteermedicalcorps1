import PageBanner from "@/components/PageBanner";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser, FaChevronLeft } from "react-icons/fa";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blogId = params.id;
  
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog || !blog.isActive) {
    return notFound();
  }

  const recentBlogs = await prisma.blog.findMany({
    where: { isActive: true, id: { not: blogId } },
    orderBy: { date: 'desc' },
    take: 3
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title={blog.title} parent={{ label: "Blog", href: "/blog" }} />

      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <div className="lg:w-2/3">
              <Link href="/blog" className="inline-flex items-center text-[#002866] font-bold text-sm mb-8 hover:text-[#ff9f22] transition-colors">
                <FaChevronLeft className="mr-2" /> Back to Blog
              </Link>

              <div className="mb-10 rounded-sm overflow-hidden shadow-xl">
                <Image 
                  src={blog.image || "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg"} 
                  alt={blog.title} 
                  width={1000} 
                  height={600} 
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <FaUser className="text-[#ff9f22]" /> {blog.author || "Admin"}
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#ff9f22]" /> {formatDate(blog.date)}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-[#002866] mb-8 leading-tight uppercase">
                {blog.title}
              </h1>

              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
              </div>

              <div className="bg-gray-50 p-8 rounded-sm border border-gray-100 mt-16">
                <h3 className="text-xl font-bold text-[#002866] mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                    <Image src="https://volunteermedicalcorps.org/admin/images/users/default-avatar.jpg" alt="Author" width={64} height={64} unoptimized />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002866]">{blog.author || "VMC Administrator"}</h4>
                    <p className="text-sm text-gray-500">Dedicated to bringing hope and healing to the world through humanitarian and medical service.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h3 className="text-xl font-poppins font-bold text-[#002866] mb-6 pb-3 border-b-2 border-[#ff9f22] inline-block">More Stories</h3>
                <ul className="space-y-6">
                  {recentBlogs.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm">
                        <Image src={item.image || "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg"} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#002866] text-sm group-hover:text-[#ff9f22] transition-colors leading-tight mb-2">
                          <Link href={`/blog/${item.id}`}>{item.title}</Link>
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 font-bold">
                          <FaCalendarAlt className="mr-1.5 text-[#ff9f22]" /> {formatDate(item.date)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative bg-[#ff9f22] p-8 text-center rounded-sm overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black text-[#002866] mb-6 uppercase">Join the Corps</h2>
                  <p className="mb-8 text-[#002866] font-medium">Your skills and passion can save lives. Become a part of our global volunteer network today.</p>
                  <Link href="/register" className="inline-block bg-[#002866] text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg">
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
