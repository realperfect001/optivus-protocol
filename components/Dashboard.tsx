import React, { useState } from 'react';
import GlowingWrapper from './GlowingWrapper';
import DashboardSidebar from './DashboardSidebar';
import ReferralSection from './ReferralSection';
import Settings from './Settings';
import Withdrawal from './Withdrawal';
import Transactions from './Transactions';

// --- Reusable Components from original Dashboard ---
const DashboardCard = ({ label, value, className = '' }: { label: string, value: string, className?: string }) => (
    <div className={`bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 ${className}`}>
        <p className="text-indigo-200 text-sm mb-2">{label}</p>
        <p className="text-white text-3xl font-bold">{value}</p>
    </div>
);

// --- Main Views ---
const DashboardView: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-white uppercase">Dashboard</h1>
             {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <DashboardCard label="Total Balance" value="£1,250.75" />
                <DashboardCard label="Rewards" value="£345.20" />
            </div>
            
            {/* Referral Section */}
            <ReferralSection />

            {/* Overview Section */}
            <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mt-6 min-h-[200px] flex flex-col">
                <h2 className="text-white text-xl font-bold mb-4">Overview</h2>
                <div className="text-indigo-200 flex-grow flex items-center justify-center h-full">
                    <p>Chart data will be displayed here.</p>
                </div>
            </div>
        </div>
    )
}

const PlaceholderView = ({ title }: { title: string }) => (
    <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-white uppercase">{title}</h1>
        <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 min-h-[300px] flex flex-col items-center justify-center">
            <p className="text-indigo-200">Content for {title} will be available soon.</p>
        </div>
    </div>
);


// --- Dashboard Component ---
interface DashboardProps {
    onLogoutClick: () => void;
    isPaid: boolean;
    navigateToPayment: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogoutClick, isPaid, navigateToPayment }) => {
    const [activeView, setActiveView] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleViewChange = (view: string) => {
        if (view === 'payment' && !isPaid) {
            navigateToPayment();
        } else {
            setActiveView(view);
        }
    };

    const renderContent = () => {
        // If not paid, disable access to most views by showing a placeholder.
        if (!isPaid && (activeView === 'transactions' || activeView === 'withdraw')) {
             return <PlaceholderView title={activeView.charAt(0).toUpperCase() + activeView.slice(1)} />;
        }
        
        switch (activeView) {
            case 'dashboard':
                return <DashboardView />;
            case 'transactions':
                return <Transactions />;
            case 'payment':
                 return <PlaceholderView title="Payment History" />;
            case 'withdraw':
                return <Withdrawal onBackToDashboard={() => setActiveView('dashboard')} />;
            case 'settings':
                return <Settings />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="flex animate-fade-in min-h-[calc(100vh-150px)]">
            <DashboardSidebar 
                activeView={activeView}
                setActiveView={handleViewChange}
                onLogoutClick={onLogoutClick}
                isOpen={isSidebarOpen}
                setOpen={setSidebarOpen}
                isPaid={isPaid}
            />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                 {/* Mobile Header */}
                 <div className="md:hidden flex items-center mb-4">
                     <button onClick={() => setSidebarOpen(true)} className="text-white p-2" aria-label="Open menu">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                         </svg>
                     </button>
                     <h1 className="text-xl font-bold text-white uppercase ml-4">{activeView}</h1>
                 </div>
                 
                {!isPaid && (
                    <div className="p-4 mb-6 text-center text-yellow-200 bg-yellow-900/50 border border-yellow-500/50 rounded-lg animate-fade-in">
                        <p className="font-semibold">Your account is inactive. Please complete the payment to unlock all features.</p>
                         <button onClick={navigateToPayment} className="font-bold underline mt-1 hover:text-white transition-colors">
                            Pay Membership Fee Now
                        </button>
                    </div>
                 )}

                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;