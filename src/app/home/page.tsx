'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import PrizePool from '@/components/home/PrizePool';
import FeaturedCharity from '@/components/home/FeaturedCharity';
import SocialProof from '@/components/home/SocialProof';
import Pricing from '@/components/home/Pricing';
import Footer from '@/components/layout/Footer';

const HomePageContent = () => {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams?.get('session_id')) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#F43F5E', '#FFFFFF']
      });
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <PrizePool />
      <FeaturedCharity />
      {/* Social Proof Stats */}
      <SocialProof />
      <Pricing />
      <Footer />
    </main>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomePageContent />
    </Suspense>
  );
}
