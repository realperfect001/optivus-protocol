
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Footer, { AppView } from './components/Footer';
import Modal from './components/Modal';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Payment from './components/Payment';
// Import new page components
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Contact from './components/Contact';
import Vision from './components/Vision';


type View = 'landing' | 'payment' | 'dashboard' | 'terms' | 'privacy' | 'contact' | 'vision';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | null>(null);
  const [view, setView] = useState<View>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const openModal = (modalName: 'login' | 'signup') => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);
  const switchToModal = (modalName: 'login' | 'signup') => setActiveModal(modalName);
  
  const handleNavigate = (newView: View) => {
      setView(newView);
      window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleLogin = () => {
    // Simulate logging in an existing user who hasn't paid yet
    setIsLoggedIn(true);
    setIsPaid(false);
    handleNavigate('dashboard');
    closeModal();
  };
  
  const handleSignupSuccess = () => {
    setIsLoggedIn(true);
    setIsPaid(false);
    handleNavigate('payment');
    closeModal();
  }

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    handleNavigate('dashboard');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsPaid(false);
    handleNavigate('landing');
  };

  const renderContent = () => {
      switch (view) {
          case 'landing':
              return (
                  <>
                      <Hero onGetStartedClick={() => openModal('signup')} />
                      <HowItWorks />
                  </>
              );
          case 'payment':
              return <Payment onPaymentSuccess={handlePaymentSuccess} />;
          case 'dashboard':
              return <Dashboard onLogoutClick={handleLogout} isPaid={isPaid} navigateToPayment={() => handleNavigate('payment')} />;
          case 'terms':
              return <Terms />;
          case 'privacy':
              return <Privacy />;
          case 'contact':
              return <Contact />;
          case 'vision':
              return <Vision />;
          default:
              return (
                  <>
                      <Hero onGetStartedClick={() => openModal('signup')} />
                      <HowItWorks />
                  </>
              );
      }
  };

  return (
    <div className="min-h-screen bg-[#10032A] text-indigo-100 font-sans antialiased overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-900/50 via-transparent to-transparent -z-0 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-900/50 via-transparent to-transparent -z-0 blur-3xl opacity-50" />
      
      <div className="relative z-10 container mx-auto px-6 flex flex-col min-h-screen">
        <Header 
          isLoggedIn={isLoggedIn}
          onLoginClick={() => openModal('login')}
          onSignupClick={() => openModal('signup')}
          onLogoutClick={handleLogout}
          onHomeClick={() => handleNavigate('landing')}
          onDashboardClick={() => handleNavigate('dashboard')}
        />
        <main className="flex-grow">
          {renderContent()}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>

      <Modal isOpen={activeModal === 'login'} onClose={closeModal}>
        <Login 
          switchToSignup={() => switchToModal('signup')}
          onLoginSuccess={handleLogin}
        />
      </Modal>

      <Modal isOpen={activeModal === 'signup'} onClose={closeModal}>
        <Signup 
            switchToLogin={() => switchToModal('login')} 
            onSignupSuccess={handleSignupSuccess}
        />
      </Modal>
    </div>
  );
};

export default App;
