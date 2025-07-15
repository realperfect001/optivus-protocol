
import React, { SetStateAction } from 'react';
import GlowingWrapper from './GlowingWrapper';

// --- SVG Icons for Sidebar ---
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const LayoutDashboardIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const ArrowRightLeftIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 3L4 7l4 4"></path><path d="M4 7h16"></path><path d="M16 21l4-4-4-4"></path><path d="M20 17H4"></path></svg>;
const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0 2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const XIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

interface DashboardSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    onLogoutClick: () => void;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    isPaid: boolean;
}

interface NavLinkProps {
    icon: React.ReactElement;
    label: string;
    view: string;
    activeView: string;
    setActiveView: (v:string)=>void;
    setOpen: (isOpen: boolean) => void;
    disabled?: boolean;
}

const NavLink = ({ icon, label, view, activeView, setActiveView, setOpen, disabled = false }: NavLinkProps) => {
    const isActive = activeView === view && !disabled;
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                if (disabled) return;
                setActiveView(view);
                setOpen(false); // Close sidebar on mobile after navigation
            }}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group relative ${
                isActive ? 'text-white' : 'text-indigo-200 hover:text-white hover:bg-white/5'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
             aria-disabled={disabled}
        >
            {isActive && <div className="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>}
            {React.cloneElement(icon, { className: `h-5 w-5 mr-3 transition-colors ${isActive ? 'text-blue-400' : 'text-indigo-300 group-hover:text-white'}`})}
            <span>{label}</span>
        </a>
    )
};


const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeView, setActiveView, onLogoutClick, isOpen, setOpen, isPaid }) => {
    
    const navItems = [
        { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon /> },
        { view: 'transactions', label: 'Transactions', icon: <ArrowRightLeftIcon />, disabled: !isPaid },
        { view: 'payment', label: isPaid ? 'Payment History' : 'Complete Payment', icon: <CreditCardIcon /> },
        { view: 'withdraw', label: 'Withdraw', icon: <DollarSignIcon />, disabled: !isPaid },
        { view: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
                <h1 className="text-lg font-bold tracking-widest text-white uppercase">Optivus</h1>
                <button onClick={() => setOpen(false)} className="md:hidden text-indigo-200 hover:text-white" aria-label="Close menu">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            
            <div className="flex items-center p-4 mt-2">
                <div className="p-px bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                    <div className="bg-[#1a1130] rounded-full p-2">
                        <UserIcon className="h-6 w-6 text-indigo-300" />
                    </div>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-semibold text-white">User Name</p>
                    <p className="text-xs text-indigo-300">user@example.com</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.view}
                        view={item.view}
                        label={item.label}
                        icon={item.icon}
                        disabled={item.disabled}
                        activeView={activeView}
                        setActiveView={setActiveView}
                        setOpen={setOpen}
                    />
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-purple-500/20">
                <a href="#" onClick={(e) => { e.preventDefault(); onLogoutClick(); }} className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-indigo-200 hover:text-white hover:bg-white/5 transition-colors group">
                     <LogOutIcon className="h-5 w-5 mr-3 text-indigo-300 group-hover:text-white" />
                     <span>Log Out</span>
                </a>
            </div>
        </div>
    );
    
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setOpen(false)}></div>}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 w-64 h-full bg-[#10032A]/80 backdrop-blur-lg border-r border-purple-500/20 z-40 transform transition-transform md:relative md:translate-x-0 md:w-64 md:flex-shrink-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
               <SidebarContent />
            </aside>
        </>
    );
};

export default DashboardSidebar;
