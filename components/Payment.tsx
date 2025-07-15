
import React, { useState } from 'react';

// --- Helper Icons ---
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const QrCodeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';
type PaymentMethod = 'card' | 'crypto';
const CRYPTOS = {
    'USDC': { name: 'USDC (Solana)', amount: '55.00', address: 'SoL1a...USDC...94a1b2' },
    'SOL': { name: 'Solana', amount: '0.35', address: 'SoL...SOL...c3d4e5' },
    'ETH': { name: 'Ethereum', amount: '0.015', address: '0x...ETH...f6a7b8' },
};
type CryptoType = keyof typeof CRYPTOS;

const Payment: React.FC<{ onPaymentSuccess: () => void }> = ({ onPaymentSuccess }) => {
    const [status, setStatus] = useState<PaymentStatus>('idle');
    const [method, setMethod] = useState<PaymentMethod>('card');
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>('USDC');
    const [copyText, setCopyText] = useState('Copy');
    
    const handlePay = () => {
        setStatus('processing');
        setTimeout(() => {
            setStatus('success');
        }, 2500);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy'), 2000);
    }
    
    const PaymentWindow = () => (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Payment Method Selection */}
            <div className="lg:col-span-3">
                 <div className="p-px bg-gradient-to-br from-blue-500/50 to-purple-500/50 rounded-xl">
                    <div className="bg-[#191036]/80 backdrop-blur-sm rounded-[11px] p-6 sm:p-8">
                        {/* Tabs */}
                        <div className="flex border-b border-purple-500/20 mb-6">
                           <button onClick={() => setMethod('card')} className={`px-4 py-2 text-sm font-medium transition-colors ${method === 'card' ? 'text-white border-b-2 border-blue-400' : 'text-indigo-300 hover:text-white'}`}>Pay with Card</button>
                           <button onClick={() => setMethod('crypto')} className={`px-4 py-2 text-sm font-medium transition-colors ${method === 'crypto' ? 'text-white border-b-2 border-blue-400' : 'text-indigo-300 hover:text-white'}`}>Pay with Crypto</button>
                        </div>

                        {/* Card Form */}
                        {method === 'card' && (
                            <form onSubmit={(e) => { e.preventDefault(); handlePay(); }} className="space-y-4 animate-fade-in">
                                <div>
                                    <label htmlFor="card-number" className="block text-indigo-200 text-sm font-bold mb-2">Card Number</label>
                                    <input id="card-number" type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-[#10032A] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="expiry" className="block text-indigo-200 text-sm font-bold mb-2">Expiration</label>
                                        <input id="expiry" type="text" placeholder="MM / YY" className="w-full bg-[#10032A] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="cvv" className="block text-indigo-200 text-sm font-bold mb-2">CVV</label>
                                        <input id="cvv" type="text" placeholder="•••" className="w-full bg-[#10032A] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                                    </div>
                                </div>
                                <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none transition-all shadow-lg shadow-purple-500/20">
                                    Pay £50 Securely
                                </button>
                            </form>
                        )}
                        
                        {/* Crypto Form */}
                        {method === 'crypto' && (
                            <div className="animate-fade-in">
                                <label htmlFor="crypto-select" className="block text-indigo-200 text-sm font-bold mb-2">Select Cryptocurrency</label>
                                <select id="crypto-select" value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value as CryptoType)} className="w-full bg-[#10032A] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    {Object.keys(CRYPTOS).map(key => <option key={key} value={key}>{CRYPTOS[key as CryptoType].name}</option>)}
                                </select>
                                <div className="text-center my-4 p-4 bg-[#10032A] rounded-lg border border-purple-700/50">
                                    <p className="text-indigo-200 text-sm">Send exactly</p>
                                    <p className="text-white text-2xl font-bold my-1">{CRYPTOS[selectedCrypto].amount} {selectedCrypto}</p>
                                    <p className="text-indigo-300 text-xs">(≈ £50.00 + fees)</p>
                                </div>
                                <div className="flex justify-center my-4">
                                     <div className="p-2 bg-white rounded-lg"><QrCodeIcon className="h-32 w-32 text-black"/></div>
                                </div>
                                <div>
                                    <p className="text-indigo-200 text-sm font-bold mb-2">To this address:</p>
                                    <div className="flex">
                                        <input type="text" value={CRYPTOS[selectedCrypto].address} readOnly className="w-full truncate bg-[#10032A] border border-purple-700/50 rounded-l-md py-2 px-3 text-white focus:outline-none"/>
                                        <button onClick={() => handleCopy(CRYPTOS[selectedCrypto].address)} className="flex-shrink-0 flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 rounded-r-md text-sm"><ClipboardIcon className="h-4 w-4 mr-2"/> {copyText}</button>
                                    </div>
                                </div>
                                <button onClick={handlePay} className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none transition-all shadow-lg shadow-purple-500/20">I Have Sent The Crypto</button>
                            </div>
                        )}
                    </div>
                 </div>
                 <div className="text-center mt-4 text-xs text-indigo-300 space-y-1">
                    <p>Crypto payments may take up to 5 minutes to confirm on the blockchain.</p>
                    <p>All payments are final and non-refundable.</p>
                 </div>
            </div>

            {/* Right: Payment Summary */}
            <div className="lg:col-span-2">
                <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full">
                     <h3 className="font-bold text-white text-lg mb-4">Payment Summary</h3>
                     <div className="space-y-3 text-sm border-b border-purple-500/20 pb-4 mb-4">
                         <div className="flex justify-between"><span className="text-indigo-200">Membership Fee:</span><span className="text-white">£50.00</span></div>
                         <div className="flex justify-between"><span className="text-indigo-200">Taxes & Fees:</span><span className="text-white">£0.00</span></div>
                     </div>
                     <div className="flex justify-between font-bold text-lg mb-6">
                        <span className="text-white">Amount to Pay:</span>
                        <span className="text-white">£50.00</span>
                     </div>
                     <ul className="text-sm text-indigo-200 space-y-2 mb-6">
                        <li className="flex items-start"><CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0"/> Optivus Lifetime Access</li>
                        <li className="flex items-start"><CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0"/> Personal Referral Code</li>
                        <li className="flex items-start"><CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0"/> Tiered Commission Earnings</li>
                        <li className="flex items-start"><CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0"/> Fiat & Crypto Withdrawals</li>
                     </ul>
                     <div className="flex items-center justify-center text-xs text-green-400 bg-green-500/10 border border-green-400/20 rounded-lg p-2">
                         <LockIcon className="h-4 w-4 mr-2"/>
                         <span>SSL Secure Payment</span>
                     </div>
                </div>
            </div>
        </div>
    );

    const StatusView = ({ status }: { status: 'processing' | 'success' | 'error' }) => {
        const messages = {
            processing: { icon: <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>, title: 'Processing Payment...', text: 'Please wait while we confirm your transaction. Do not close this window.' },
            success: { icon: <CheckCircleIcon className="h-16 w-16 text-green-400"/>, title: 'Payment Successful!', text: 'Welcome to Optivus Protocol! Your dashboard is now unlocked.' },
            error: { icon: <CheckCircleIcon className="h-16 w-16 text-red-400"/>, title: 'Payment Failed', text: 'Something went wrong. Please try again or contact support.' },
        };
        const current = messages[status];

        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-fade-in p-6">
                <div className="mb-6">{current.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-2">{current.title}</h2>
                <p className="text-indigo-200 max-w-sm">{current.text}</p>
                {status === 'success' && (
                     <button onClick={onPaymentSuccess} className="w-full max-w-xs mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none transition-all shadow-lg shadow-purple-500/20">
                        Go to Dashboard
                    </button>
                )}
            </div>
        )
    };
    
    return (
        <section className="py-12 animate-fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight text-center mb-2 text-white uppercase">Complete Your Membership</h1>
            <p className="text-lg text-indigo-200 text-center mb-10">Just one more step to unlock your earning potential.</p>
            
            {status === 'idle' && <PaymentWindow />}
            {(status === 'processing' || status === 'success' || status === 'error') && <StatusView status={status}/>}

            <div className="text-center mt-8">
                 <a href="#" className="text-sm text-indigo-300 hover:text-white transition-colors">Need Help? Contact Support</a>
            </div>
        </section>
    );
};

export default Payment;
