
import React from 'react';
import GlowingWrapper from './GlowingWrapper';

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  return (
    <section className="text-center py-16 sm:py-20 md:py-24">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 leading-tight">
        <span className="text-white">
          EARN TIERED COMMISSIONS
        </span>
        <br />
        <span className="text-white">
          SHARING OPTIVUS PROTOCOL
        </span>
      </h1>
      <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
        Join with a one-time £50 fee, get your referral code, earn commissions in fiat or crypto.
      </p>
      <GlowingWrapper borderRadius="rounded-lg" className="inline-block shadow-lg shadow-blue-500/30">
        <button 
          onClick={onGetStartedClick}
          className="bg-[#191036] text-white font-bold text-base uppercase tracking-wider px-8 py-3 rounded-[7px] transition-colors hover:bg-[#241649]">
          * GET STARTED – £50 ONE-TIME FEE
        </button>
      </GlowingWrapper>
    </section>
  );
};

export default Hero;