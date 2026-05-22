"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import Link from "next/link";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [message, setMessage] = useState("Verifying your donation...");

  const reference = searchParams.get('ref') || searchParams.get('reference'); // Handle both provider formats

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      setMessage("Invalid donation reference.");
      return;
    }

    const verifyDonation = async () => {
      try {
        const response = await fetch(`/api/donations/verify?ref=${reference}`);
        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage("Thank you! Your donation was successful.");
        } else {
          // If still pending, wait and retry once
          if (data.status === 'PENDING') {
            setTimeout(async () => {
               const retryResponse = await fetch(`/api/donations/verify?ref=${reference}`);
               const retryData = await retryResponse.json();
               if (retryData.success) {
                 setStatus('success');
                 setMessage("Thank you! Your donation was successful.");
               } else {
                 setStatus('failed');
                 setMessage("We couldn't verify your donation yet. If you were charged, it will be updated soon.");
               }
            }, 3000);
          } else {
            setStatus('failed');
            setMessage("Donation verification failed or was declined.");
          }
        }
      } catch (error) {
        setStatus('failed');
        setMessage("An error occurred during verification.");
      }
    };

    verifyDonation();
  }, [reference]);

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-bg-surface border border-border-main p-12 shadow-2xl rounded-[2rem]"
      >
        {status === 'verifying' && (
          <div className="space-y-6">
            <FaSpinner className="w-16 h-16 text-brand-secondary animate-spin mx-auto" />
            <h2 className="text-2xl font-black text-brand-primary dark:text-brand-secondary uppercase tracking-widest">{message}</h2>
            <p className="text-text-muted italic">Please do not refresh this page.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-3xl font-black text-brand-primary dark:text-brand-secondary uppercase tracking-widest">Success!</h2>
            <p className="text-lg text-text-main font-medium">{message}</p>
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal/donations" className="bg-brand-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:bg-brand-secondary hover:text-brand-primary transition-all">
                View History
              </Link>
              <Link href="/" className="border-2 border-brand-primary text-brand-primary dark:text-brand-secondary px-8 py-4 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-primary hover:text-white transition-all">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-6">
            <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="text-3xl font-black text-brand-primary dark:text-brand-secondary uppercase tracking-widest">Failed</h2>
            <p className="text-lg text-text-main font-medium">{message}</p>
            <div className="pt-8">
              <Link href="/give" className="bg-brand-secondary text-brand-primary px-10 py-4 font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:bg-black hover:text-brand-secondary transition-all">
                Try Again
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="w-full bg-bg-base min-h-screen">
      <PageBanner title="Verify Donation" />
      <Suspense fallback={
        <div className="flex items-center justify-center py-40">
          <FaSpinner className="w-12 h-12 text-brand-secondary animate-spin" />
        </div>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
