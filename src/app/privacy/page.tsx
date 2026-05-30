import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <PageBanner title="Privacy Policy" subtitle="How we handle your data" />
      
      <section className="py-24 bg-bg-base">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-bg-surface p-10 lg:p-16 rounded-[3rem] border border-border-main shadow-sm prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-black text-text-main mb-8">Introduction</h2>
            <p className="text-text-muted font-medium leading-relaxed mb-8">
              At Volunteer Medical Corps (VMC), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
            </p>

            <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-widest">Information We Collect</h3>
            <p className="text-text-muted font-medium leading-relaxed mb-8">
              We may collect personal information such as your name, email address, phone number, and professional details when you register as a volunteer or student. We also collect non-personal information like your IP address and browsing behavior.
            </p>

            <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-widest">How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-4 text-text-muted font-medium mb-8">
              <li>To provide and manage our services, including e-learning and volunteer registration.</li>
              <li>To communicate with you about updates, news, and opportunities.</li>
              <li>To improve our website and user experience.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-widest">Data Security</h3>
            <p className="text-text-muted font-medium leading-relaxed">
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
