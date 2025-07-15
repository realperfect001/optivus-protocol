import React, { useState, useMemo } from 'react';

// --- ICONS ---
const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
const ArrowDownLeftIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline></svg>;
const AwardIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline></svg>;
const FileMinusIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>;
const ListFilterIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M7 12h10M10 18h4" /></svg>;
const ArrowDownUpIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16"/></svg>;

// --- MOCK DATA ---
const mockTransactions = [
    { id: 't1', date: '2024-07-31', type: 'Commission', description: 'Tier 1 commission from user_x', amount: 25.00, status: 'Completed' },
    { id: 't2', date: '2024-07-30', type: 'Withdrawal', description: 'Withdrawal to Bank **** 1234', amount: -150.00, status: 'Completed' },
    { id: 't3', date: '2024-07-29', type: 'Referral Bonus', description: 'Bonus for 5 successful referrals', amount: 50.00, status: 'Completed' },
    { id: 't4', date: '2024-07-28', type: 'Commission', description: 'Tier 2 commission from user_y', amount: 10.00, status: 'Completed' },
    { id: 't5', date: '2024-07-27', type: 'Withdrawal', description: 'Withdrawal to SOL Wallet', amount: -75.00, status: 'Processing' },
    { id: 't6', date: '2024-07-26', type: 'Commission', description: 'Tier 1 commission from user_z', amount: 25.00, status: 'Completed' },
    { id: 't7', date: '2024-07-25', type: 'Fee', description: 'Membership Fee', amount: -50.00, status: 'Completed' },
    { id: 't8', date: '2024-07-24', type: 'Commission', description: 'Tier 1 commission from user_a', amount: 25.00, status: 'Completed' },
    { id: 't9', date: '2024-07-23', type: 'Withdrawal', description: 'Withdrawal to Bank **** 5678', amount: -200.00, status: 'Failed' },
    { id: 't10', date: '2024-07-22', type: 'Commission', description: 'Tier 3 commission from user_b', amount: 5.00, status: 'Completed' },
    { id: 't11', date: '2024-07-21', type: 'Commission', description: 'Tier 1 commission from user_c', amount: 25.00, status: 'Completed' },
    { id: 't12', date: '2024-07-20', type: 'Referral Bonus', description: 'Early sign-up bonus', amount: 10.00, status: 'Completed' },
];

const ITEMS_PER_PAGE = 5;

// --- HELPER COMPONENTS ---
const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 flex items-center">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-indigo-200 text-sm">{label}</p>
            <p className="text-white text-xl font-bold">{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses: { [key: string]: string } = {
        Completed: 'bg-green-500/20 text-green-400',
        Processing: 'bg-yellow-500/20 text-yellow-400',
        Failed: 'bg-red-500/20 text-red-400',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-500/20 text-gray-300'}`}>
            {status}
        </span>
    );
};

const getTransactionIcon = (type: string) => {
    const iconProps = { className:"h-5 w-5" };
    switch (type) {
        case 'Commission': return <ArrowUpRightIcon {...iconProps} />;
        case 'Referral Bonus': return <AwardIcon {...iconProps} />;
        case 'Withdrawal': return <ArrowDownLeftIcon {...iconProps} />;
        case 'Fee': return <FileMinusIcon {...iconProps} />;
        default: return null;
    }
};

const Transactions: React.FC = () => {
    const [filterType, setFilterType] = useState('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);

    const { totalEarnings, totalWithdrawn } = useMemo(() => {
        return mockTransactions.reduce((acc, t) => {
            if (t.amount > 0) acc.totalEarnings += t.amount;
            if (t.type === 'Withdrawal' && t.status !== 'Failed') acc.totalWithdrawn += Math.abs(t.amount);
            return acc;
        }, { totalEarnings: 0, totalWithdrawn: 0 });
    }, []);

    const filteredTransactions = useMemo(() => {
        return mockTransactions
            .filter(t => {
                if (filterType === 'all') return true;
                if (filterType === 'earnings') return t.amount > 0;
                if (filterType === 'spending') return t.amount < 0;
                return true;
            })
            .sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            });
    }, [filterType, sortOrder]);
    
    const pageCount = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSortToggle = () => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');

    return (
        <div className="animate-fade-in space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase">Transactions</h1>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard label="Total Earnings" value={`£${totalEarnings.toFixed(2)}`} icon={<ArrowUpRightIcon className="h-6 w-6 text-green-400" />} />
                <StatCard label="Total Withdrawn" value={`£${totalWithdrawn.toFixed(2)}`} icon={<ArrowDownLeftIcon className="h-6 w-6 text-red-400" />} />
            </div>

            {/* Controls and List */}
            <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl">
                 {/* Header with Filters */}
                <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b border-purple-500/20">
                    <h2 className="text-white text-xl font-bold mb-4 sm:mb-0">History</h2>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-[#10032A] border border-purple-700/50 rounded-md p-1">
                            {['all', 'earnings', 'spending'].map(filter => (
                                <button key={filter} onClick={() => setFilterType(filter)} className={`px-3 py-1 text-sm rounded capitalize transition-colors ${filterType === filter ? 'bg-purple-600 text-white' : 'text-indigo-200 hover:bg-white/10'}`}>
                                    {filter}
                                </button>
                            ))}
                        </div>
                         <button onClick={handleSortToggle} className="p-2 bg-[#10032A] border border-purple-700/50 rounded-md text-indigo-200 hover:bg-white/10 hover:text-white transition-colors" aria-label="Toggle sort order">
                            <ArrowDownUpIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                
                {/* Transaction List */}
                <div className="space-y-2 p-4">
                    {paginatedTransactions.length > 0 ? paginatedTransactions.map(t => (
                        <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="flex items-center">
                                <div className={`mr-4 p-2 rounded-full ${t.amount > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {getTransactionIcon(t.type)}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{t.description}</p>
                                    <p className="text-sm text-indigo-300">{t.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold text-lg ${t.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                                    {t.amount > 0 ? '+' : ''}£{Math.abs(t.amount).toFixed(2)}
                                </p>
                                <StatusBadge status={t.status} />
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12">
                            <p className="text-indigo-200">No transactions found for this filter.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="p-4 flex justify-between items-center border-t border-purple-500/20">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium rounded-md bg-[#10032A] border border-purple-700/50 text-indigo-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-indigo-300">
                            Page {currentPage} of {pageCount}
                        </span>
                        <button
                             onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
                             disabled={currentPage === pageCount}
                             className="px-4 py-2 text-sm font-medium rounded-md bg-[#10032A] border border-purple-700/50 text-indigo-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;
