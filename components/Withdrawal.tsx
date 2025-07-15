import React, { useState, useEffect } from 'react';
import Modal from './Modal';

// --- Helper Components & Data ---

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;


const mockWithdrawals = [
    { id: '1', date: '2024-07-28', method: 'Crypto (USDC)', amount: '£100.00', status: 'Completed', ref: 'Tx...a1b2c3' },
    { id: '2', date: '2024-07-29', method: 'Bank Transfer', amount: '£250.00', status: 'Processing', ref: 'REF789123' },
    { id: '3', date: '2024-07-30', method: 'Crypto (SOL)', amount: '£50.00', status: 'Pending', ref: '-' },
];

const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses: { [key: string]: string } = {
        Completed: 'bg-green-500/20 text-green-400',
        Processing: 'bg-yellow-500/20 text-yellow-400',
        Pending: 'bg-blue-500/20 text-blue-400',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-500/20 text-gray-300'}`}>
            {status}
        </span>
    );
};

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string, id: string }) => (
    <div>
        <label htmlFor={props.id} className="block text-indigo-200 text-sm font-bold mb-2">{props.label}</label>
        <input {...props} className="w-full bg-[#10032A] border border-purple-700/50 rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50" />
    </div>
);


// --- Main Component ---
interface WithdrawalProps {
  onBackToDashboard: () => void;
}

const Withdrawal: React.FC<WithdrawalProps> = ({ onBackToDashboard }) => {
    const [method, setMethod] = useState<'crypto' | 'bank'>('crypto');
    const [balance, setBalance] = useState(1250.75);
    const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
    
    // Form States
    const [amount, setAmount] = useState('');
    const [cryptoType, setCryptoType] = useState('USDC');
    const [walletAddress, setWalletAddress] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [sortCode, setSortCode] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState<'confirm' | 'success'>('confirm');
    const [twoFaCode, setTwoFaCode] = useState('');

    useEffect(() => {
        const numAmount = parseFloat(amount);
        const isAmountValid = !isNaN(numAmount) && numAmount >= 10 && numAmount <= balance;
        if (method === 'crypto') {
            setIsFormValid(isAmountValid && walletAddress.length > 20); // Simple validation
        } else {
            const isAccountNumValid = accountNumber.length >= 8 && accountNumber === confirmAccountNumber;
            setIsFormValid(isAmountValid && bankName.length > 2 && isAccountNumValid && sortCode.length >= 6);
        }
    }, [amount, balance, method, walletAddress, bankName, accountNumber, confirmAccountNumber, sortCode]);

    const handleRequestWithdrawal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        setModalStep('confirm');
        setIsModalOpen(true);
    };
    
    const handleConfirmWithdrawal = () => {
        // Simulate 2FA check and API call
        if (twoFaCode === '123456') { // Simulate correct code
            setModalStep('success');
            // Add to history, reset forms, etc.
            const newWithdrawal = {
                 id: String(withdrawals.length + 1),
                 date: new Date().toISOString().split('T')[0],
                 method: method === 'crypto' ? `Crypto (${cryptoType})` : 'Bank Transfer',
                 amount: `£${parseFloat(amount).toFixed(2)}`,
                 status: 'Pending',
                 ref: '-'
            };
            setWithdrawals([newWithdrawal, ...withdrawals]);
            setBalance(prev => prev - parseFloat(amount));
            // Reset fields
            setAmount('');
            setWalletAddress('');
            setBankName('');
            setAccountNumber('');
            setConfirmAccountNumber('');
            setSortCode('');
            setTwoFaCode('');

        } else {
            alert('Incorrect 2FA code.');
        }
    };
    
    const closeModalAndReset = () => {
        setIsModalOpen(false);
        setTwoFaCode('');
    };

    const renderCryptoForm = () => (
        <form onSubmit={handleRequestWithdrawal} className="space-y-4">
            <FormInput label="Amount (£)" id="crypto-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" max={balance} min="10" required />
            <div>
                 <label htmlFor="crypto-type" className="block text-indigo-200 text-sm font-bold mb-2">Select Crypto Type</label>
                 <select id="crypto-type" value={cryptoType} onChange={(e) => setCryptoType(e.target.value)} className="w-full bg-[#10032A] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                     <option>USDC</option>
                     <option>SOL</option>
                     <option>ETH</option>
                 </select>
            </div>
            <FormInput label="Wallet Address" id="wallet-address" type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="Paste your wallet address" required />
            <div className="text-xs text-indigo-300 space-y-1">
                <p>Minimum withdrawal: £10.00</p>
                <p>Network fees may apply and will be deducted from the final amount.</p>
            </div>
            <button type="submit" disabled={!isFormValid} className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                Request Withdrawal
            </button>
        </form>
    );

     const renderBankForm = () => (
        <form onSubmit={handleRequestWithdrawal} className="space-y-4">
             <FormInput label="Amount (£)" id="bank-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" max={balance} min="10" required />
             <FormInput label="Bank Name" id="bank-name" type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g., Starling Bank" required />
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Account Number" id="account-number" type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="8 digits" required />
                <FormInput label="Sort Code / SWIFT" id="sort-code" type="text" value={sortCode} onChange={(e) => setSortCode(e.target.value)} placeholder="6 digits or SWIFT" required />
             </div>
             <FormInput label="Confirm Account Number" id="confirm-account-number" type="text" value={confirmAccountNumber} onChange={(e) => setConfirmAccountNumber(e.target.value)} placeholder="Re-enter your account number" required />

            <div className="text-xs text-indigo-300 space-y-1">
                <p>Minimum withdrawal: £10.00</p>
                <p>Payouts are typically processed within 1-3 working days.</p>
            </div>
             <button type="submit" disabled={!isFormValid} className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                 Request Bank Transfer
            </button>
        </form>
    );

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="flex items-center mb-4 sm:mb-0">
                    <button onClick={onBackToDashboard} className="p-2 mr-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Back to dashboard">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase">Request Withdrawal</h1>
                </div>
                <div className="bg-[#191036]/80 border border-purple-500/20 rounded-lg p-3 text-right">
                    <p className="text-sm text-indigo-200">Current Balance</p>
                    <p className="text-2xl font-bold text-white">£{balance.toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2">
                     <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                        <div className="flex border-b border-purple-500/20 mb-6">
                           <button onClick={() => setMethod('crypto')} className={`px-4 py-2 text-sm font-medium transition-colors ${method === 'crypto' ? 'text-white border-b-2 border-blue-400' : 'text-indigo-300 hover:text-white'}`}>Crypto</button>
                           <button onClick={() => setMethod('bank')} className={`px-4 py-2 text-sm font-medium transition-colors ${method === 'bank' ? 'text-white border-b-2 border-blue-400' : 'text-indigo-300 hover:text-white'}`}>Bank Transfer</button>
                        </div>
                        {method === 'crypto' ? renderCryptoForm() : renderBankForm()}
                     </div>
                </div>

                {/* Status Tracking Section */}
                <div className="lg:col-span-3">
                     <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full">
                        <h2 className="text-white text-xl font-bold mb-4">Withdrawal Status</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-indigo-200 uppercase border-b border-purple-500/20">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Date</th>
                                        <th scope="col" className="px-4 py-3">Method</th>
                                        <th scope="col" className="px-4 py-3">Amount</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3">Reference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {withdrawals.map(w => (
                                        <tr key={w.id} className="border-b border-purple-500/10 hover:bg-white/5">
                                            <td className="px-4 py-3 text-indigo-300">{w.date}</td>
                                            <td className="px-4 py-3 text-white font-medium">{w.method}</td>
                                            <td className="px-4 py-3 text-white font-medium">{w.amount}</td>
                                            <td className="px-4 py-3"><StatusBadge status={w.status} /></td>
                                            <td className="px-4 py-3 font-mono text-xs text-indigo-300">{w.ref}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModalAndReset}>
                {modalStep === 'confirm' ? (
                     <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Confirm Withdrawal</h2>
                        <p className="text-indigo-200 mb-4">Please enter your 2FA code to proceed.</p>
                        <div className="bg-[#10032A] p-4 rounded-lg border border-purple-700/50 text-left mb-4">
                            <div className="flex justify-between text-sm mb-1"><span className="text-indigo-200">Amount:</span> <span className="text-white font-bold">£{parseFloat(amount || '0').toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-indigo-200">Method:</span> <span className="text-white font-bold">{method === 'crypto' ? `Crypto (${cryptoType})` : 'Bank Transfer'}</span></div>
                        </div>
                        <FormInput label="Authenticator Code" id="2fa-confirm" type="text" value={twoFaCode} onChange={(e) => setTwoFaCode(e.target.value)} placeholder="Enter 6-digit code" required />
                        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                            <button onClick={handleConfirmWithdrawal} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md">Confirm & Withdraw</button>
                            <button onClick={closeModalAndReset} className="w-full bg-gray-600/50 hover:bg-gray-500/50 text-white font-bold py-2 px-4 rounded-md">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-4">
                        <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold text-white mb-2">Request Submitted</h2>
                        <p className="text-indigo-200 mb-6">Your withdrawal request has been received and is now pending. You can track its status on this page.</p>
                        <button onClick={closeModalAndReset} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md">Done</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Withdrawal;
