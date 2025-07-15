
import React from 'react';
import GlowingWrapper from './GlowingWrapper';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
  onHomeClick: () => void;
  onDashboardClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onSignupClick, onLogoutClick, onHomeClick, onDashboardClick }) => {
  return (
    <header className="flex justify-between items-center py-6">
      <button onClick={onHomeClick} className="text-xl font-bold tracking-[0.2em] text-white uppercase focus:outline-none">
        Optivus Protocol
      </button>
      <nav className="flex items-center space-x-4 sm:space-x-6">
        {isLoggedIn ? (
          <>
            <button 
              onClick={onDashboardClick}
              className="text-sm font-semibold text-indigo-200 hover:text-white transition-colors uppercase"
            >
              Dashboard
            </button>
            <GlowingWrapper borderRadius="rounded-md">
              <button 
                onClick={onLogoutClick}
                className="bg-[#1a1130] w-full h-full px-5 py-2 text-sm font-semibold text-white uppercase rounded-[5px] hover:bg-[#241649] transition-colors"
              >
                Log Out
              </button>
            </GlowingWrapper>
          </>
        ) : (
          <>
            <button 
              onClick={onLoginClick}
              className="text-sm font-semibold text-indigo-200 hover:text-white transition-colors uppercase"
            >
              Log In
            </button>
            <GlowingWrapper borderRadius="rounded-md" className="hidden sm:block">
              <button 
                onClick={onSignupClick}
                className="bg-[#1a1130] w-full h-full px-5 py-2 text-sm font-semibold text-white uppercase rounded-[5px] hover:bg-[#241649] transition-colors"
              >
                Sign Up
              </button>
            </GlowingWrapper>
            <button onClick={onSignupClick} className="sm:hidden text-sm font-semibold text-indigo-200 hover:text-white transition-colors uppercase">
                Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
