
import React from 'react';
import GlowingWrapper from './GlowingWrapper';

interface FeatureCardProps {
  title: React.ReactNode;
}

// Defined outside the main component to prevent re-creation on re-renders
const FeatureCard: React.FC<FeatureCardProps> = ({ title }) => (
  <GlowingWrapper borderRadius="rounded-xl" className="h-full">
    <div className="bg-[#191036] h-40 w-full rounded-lg flex items-center justify-center p-8 text-center transition-colors hover:bg-[#241649]">
      <h3 className="text-xl font-bold uppercase text-white tracking-wider leading-relaxed">{title}</h3>
    </div>
  </GlowingWrapper>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 sm:py-20">
      <h2 className="text-3xl font-bold text-center uppercase tracking-widest mb-12 text-white">
        How it Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <FeatureCard title={<>Pay<br/>Once</>} />
        <FeatureCard title={<>Get<br/>Referral Code</>} />
        <FeatureCard title={<>Earn<br/>Commission</>} />
      </div>
      <div className="max-w-4xl mx-auto mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"></div>
      </div>
    </section>
  );
};

export default HowItWorks;
