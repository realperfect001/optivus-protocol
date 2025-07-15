
import React, { useState } from 'react';

// --- SVG Icons ---
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);

const TwitterIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
)

const FacebookIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
)

const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.17.91-.494 1.208-.822 1.23-.696.047-1.225-.46-1.89-1.056-1.026-.913-1.597-1.46-2.593-2.333-.995-.872-.35-1.348.22-2.145.15-.21.27-.39.41-.565.447-.55 1.488-1.53.53-2.22l-.234.14c-1.245.748-2.13 1.144-2.986 1.05-.85-.093-1.485-.24-2.003-.433-1.026-.38-1.722-.574-1.68-.96.027-.245.39-.49.99-.735 2.16-1.163 3.56-1.745 4.608-2.13l.24-.09c.66-.24 1.13-.4 1.5-.4z"></path></svg>
)

const WhatsappIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.91-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24-0 4.54-3.7 8.24-8.24 8.24zm4.52-6.14c-.25-.12-1.47-.72-1.7-.82s-.39-.12-.55.12c-.16.25-.64.82-.79.98s-.29.18-.55.06c-.25-.12-1.07-.39-2.04-1.26s-1.47-1.8-1.64-2.1c-.18-.3-.02-.46.1-.61s.25-.29.37-.43.16-.25.25-.41.02-.3-.04-.43c-.06-.12-.55-1.31-.75-1.8s-.4-.4-.55-.4h-.53c-.18 0-.46.06-.7.31s-.95.93-1.16 2.2c-.21 1.26.25 2.54.49 2.81.25.27 1.48 2.23 3.59 3.18 2.1 1 2.1 1 2.47 1 .53.01 1.48-.18 1.69-.84s.21-1.22.15-1.34c-.06-.12-.22-.18-.47-.31z"></path></svg>
)

// --- Component ---
const ReferralSection: React.FC = () => {
    const [copyButtonText, setCopyButtonText] = useState('Copy');
    const referralCode = 'OP45X1';
    const referralLink = `https://optivus.protocol/join?ref=${referralCode}`;
    const shareText = `Join Optivus Protocol and earn tiered commissions! Use my referral code: ${referralCode}`;

    const handleCopy = (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy);
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
    };

    const socialLinks = [
        { name: 'Twitter', icon: <TwitterIcon />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}` },
        { name: 'Facebook', icon: <FacebookIcon />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareText)}` },
        { name: 'Telegram', icon: <TelegramIcon />, url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}` },
        { name: 'WhatsApp', icon: <WhatsappIcon />, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + referralLink)}` },
    ];

    return (
        <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">Referral Program</h2>
            <p className="text-indigo-200 mb-4 text-sm">Share your code or link to earn commissions when new members join.</p>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-indigo-200 text-xs font-bold mb-1 uppercase" htmlFor="referral-code">
                        Your Referral Code
                    </label>
                    <div className="flex">
                        <input
                            id="referral-code"
                            type="text"
                            value={referralCode}
                            readOnly
                            className="w-full bg-[#10032A] border border-purple-700/50 rounded-l-md py-2 px-3 text-white leading-tight focus:outline-none"
                        />
                         <button
                            onClick={() => handleCopy(referralCode)}
                            className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 rounded-r-md transition-all text-sm"
                        >
                            <CopyIcon /> {copyButtonText}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-indigo-200 text-xs font-bold mb-1 uppercase" htmlFor="referral-link">
                        Your Referral Link
                    </label>
                    <div className="flex">
                        <input
                            id="referral-link"
                            type="text"
                            value={referralLink}
                            readOnly
                            className="w-full bg-[#10032A] border border-purple-700/50 rounded-l-md py-2 px-3 text-white leading-tight focus:outline-none"
                        />
                         <button
                            onClick={() => handleCopy(referralLink)}
                            className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 rounded-r-md transition-all text-sm"
                        >
                           <CopyIcon /> {copyButtonText}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-indigo-200 text-sm font-bold mb-3 text-center sm:text-left">Share on social media:</p>
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                    {socialLinks.map(social => (
                        <a 
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Share on ${social.name}`}
                            className="text-indigo-200 hover:text-white transition-colors p-2 bg-[#10032A]/50 rounded-full border border-purple-700/30 hover:border-purple-500"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReferralSection;
