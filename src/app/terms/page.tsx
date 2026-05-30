import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export default function TermsPage() {
  return (
    <main>
      <Header />
      <PageBanner title="Terms of Service" subtitle="Rules and guidelines for using our platform" />
      
      <section className="py-24 bg-bg-base">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-bg-surface p-10 lg:p-16 rounded-[3rem] border border-border-main shadow-sm prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-black text-text-main mb-8">Acceptance of Terms</h2>
            <p className="text-text-muted font-medium leading-relaxed mb-8">
              By accessing or using the Volunteer Medical Corps (VMC) platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-widest">User Responsibilities</h3>
            <p className="text-text-muted font-medium leading-relaxed mb-8">
              You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information.
            </p>

            <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-widest">Prohibited Conduct</h3>
            <ul className="list-disc pl-6 space-y-4 text-text-muted font-medium mb-8">
              <li>Using the platform for any illegal or unauthorized purpose.</li>
              <li>Interfering with or disrupting the integrity or performance of the platform.</li>
              <li>Attempting to gain unauthorized access to the platform or its related systems.</li>
            </ul>

            <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-widest">Intellectual Property</h3>
            <p className="text-text-muted font-medium leading-relaxed">
              All content on the VMC platform, including text, graphics, logos, and images, is the property of VMC or its content suppliers and is protected by intellectual property laws.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
