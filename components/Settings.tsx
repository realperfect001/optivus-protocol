import React, { useState } from 'react';

interface SettingsInputProps {
    label: string;
    id: string;
    type: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
}

const SettingsInput: React.FC<SettingsInputProps> = ({ label, id, type, value, onChange, disabled = false, placeholder = '' }) => (
    <div>
        <label htmlFor={id} className="block text-indigo-200 text-sm font-bold mb-2">
            {label}
        </label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        />
    </div>
);

const QrCodePlaceholder = () => (
    <svg width="128" height="128" viewBox="0 0 100 100" className="bg-white p-1 rounded-lg">
        <path d="M10 10 H 40 V 40 H 10 Z M 15 15 V 35 H 35 V 15 Z M 22.5 22.5 H 27.5 V 27.5 H 22.5 Z M 60 10 H 90 V 40 H 60 Z M 65 15 V 35 H 85 V 15 Z M 72.5 22.5 H 77.5 V 27.5 H 72.5 Z M 10 60 H 40 V 90 H 10 Z M 15 65 V 85 H 35 V 65 Z M 22.5 72.5 H 27.5 V 77.5 H 22.5 Z M 60 45 H 65 V 50 H 60 Z M 65 50 H 70 V 55 H 65 Z M 45 60 H 50 V 65 H 45 Z M 50 65 H 55 V 70 H 50 Z M 55 70 H 60 V 75 H 55 Z M 60 75 H 65 V 80 H 60 Z M 65 80 H 70 V 85 H 65 Z M 70 85 H 75 V 90 H 70 Z M 75 90 H 80 V 95 H 75 Z M 80 95 H 85 V 99 H 80 Z M 85 45 H 90 V 50 H 85 Z M 90 50 H 95 V 55 H 90 Z M 45 90 H 50 V 95 H 45 Z M 50 95 H 55 V 99 H 50 Z M 75 60 H 80 V 65 H 75 Z M 80 65 H 85 V 70 H 80 Z M 85 70 H 90 V 75 H 85 Z M 90 75 H 95 V 80 H 90 Z" fill="#000" />
    </svg>
);


const Settings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [is2faEnabled, setIs2faEnabled] = useState(false);
    const [show2faSetup, setShow2faSetup] = useState(false);
    const [twoFaCode, setTwoFaCode] = useState('');

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password update submitted!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleEnable2fa = () => {
        // In a real app, you'd generate a secret and QR code here
        setShow2faSetup(true);
    };

    const handleVerify2fa = () => {
        // In a real app, you'd verify the code
        if (twoFaCode === '123456') { // Simulate correct code
            setIs2faEnabled(true);
            setShow2faSetup(false);
            setTwoFaCode('');
            alert('2FA has been enabled successfully!');
        } else {
            alert('Invalid 2FA code. Please try again.');
        }
    };

    const handleDisable2fa = () => {
        if (window.confirm('Are you sure you want to disable 2FA? This will reduce your account security.')) {
            setIs2faEnabled(false);
            alert('2FA has been disabled.');
        }
    };


    return (
        <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-white uppercase">Settings</h1>
            
            {/* Profile Information Card */}
            <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8">
                <h2 className="text-white text-xl font-bold mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 gap-6">
                    <SettingsInput label="Full Name" id="full-name" type="text" value="User Name" disabled />
                    <SettingsInput label="Username" id="username" type="text" value="user_name_123" disabled />
                    <SettingsInput label="Email Address" id="email" type="email" value="user@example.com" disabled />
                </div>
                <p className="text-xs text-indigo-300 mt-4">To change your details, please contact support.</p>
            </div>

            {/* 2FA Card */}
            <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8">
                <h2 className="text-white text-xl font-bold mb-4">Two-Factor Authentication (2FA)</h2>
                {show2faSetup ? (
                    <div className="animate-fade-in space-y-4">
                        <p className="text-indigo-200 text-sm">Scan the QR code with Google Authenticator or a similar app, then enter the code below.</p>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <QrCodePlaceholder />
                            <div className="flex-grow w-full">
                                <p className="text-sm font-bold text-indigo-200 mb-2">Or enter this key manually:</p>
                                <div className="bg-[#10032A] p-2 rounded-md border border-purple-700/50 font-mono text-center text-white tracking-widest">
                                    ABCD EFGH IJKL MNOP
                                </div>
                            </div>
                        </div>
                        <div>
                             <SettingsInput 
                                label="Verification Code" 
                                id="2fa-code" 
                                type="text" 
                                placeholder="Enter 6-digit code"
                                value={twoFaCode}
                                onChange={(e) => setTwoFaCode(e.target.value)}
                             />
                        </div>
                        <div className="flex justify-end space-x-3 mt-4">
                             <button onClick={() => setShow2faSetup(false)} className="bg-gray-600/50 hover:bg-gray-500/50 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition-all">
                                Cancel
                             </button>
                             <button onClick={handleVerify2fa} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition-all">
                                Verify & Enable
                             </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-indigo-200 text-sm mb-4">Enhance your account security by requiring a second verification step on login and withdrawals.</p>
                        <div className="flex items-center justify-between bg-[#10032A] p-4 rounded-lg border border-purple-700/50">
                            <div>
                                <p className="font-semibold text-white">Status</p>
                                <p className={`text-sm ${is2faEnabled ? 'text-green-400' : 'text-red-400'}`}>
                                    {is2faEnabled ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                            {is2faEnabled ? (
                                <button onClick={handleDisable2fa} className="bg-red-600/80 hover:bg-red-700/80 text-white font-bold py-2 px-4 rounded-md focus:outline-none transition-all text-sm uppercase">Disable</button>
                            ) : (
                                <button onClick={handleEnable2fa} className="bg-blue-600/80 hover:bg-blue-700/80 text-white font-bold py-2 px-4 rounded-md focus:outline-none transition-all text-sm uppercase">Enable</button>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Update Password Card */}
            <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                 <h2 className="text-white text-xl font-bold mb-6">Update Password</h2>
                 <form onSubmit={handlePasswordSubmit}>
                     <div className="space-y-4">
                         <SettingsInput 
                             label="Current Password" 
                             id="current-password" 
                             type="password" 
                             placeholder="••••••••" 
                             value={currentPassword}
                             onChange={(e) => setCurrentPassword(e.target.value)}
                         />
                         <SettingsInput 
                             label="New Password" 
                             id="new-password" 
                             type="password" 
                             placeholder="••••••••"
                             value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                         />
                         <SettingsInput 
                             label="Confirm New Password" 
                             id="confirm-password" 
                             type="password" 
                             placeholder="••••••••"
                             value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}
                         />
                     </div>
                     <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/20 uppercase text-sm tracking-wider"
                        >
                            Save Changes
                        </button>
                     </div>
                 </form>
            </div>
        </div>
    );
};

export default Settings;