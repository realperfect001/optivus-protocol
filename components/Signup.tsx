
import React, { useState, useEffect } from 'react';
import PasswordInput from './PasswordInput';

// --- Helper Icons for Validation ---
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const CrossIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
const LoadingSpinner = () => <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-400"></div>;


interface SignupProps {
    switchToLogin: () => void;
    onSignupSuccess: () => void;
}

// Simulate a database of taken usernames
const TAKEN_USERNAMES = ['admin', 'test', 'user', 'root', 'optivus', 'support'];

const Signup: React.FC<SignupProps> = ({ switchToLogin, onSignupSuccess }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    
    // State for username validation
    const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
    const [usernameSuggestion, setUsernameSuggestion] = useState<string | null>(null);
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    // Debounced check for username availability
    useEffect(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        if (username.trim() === '') {
            setUsernameStatus('idle');
            setUsernameSuggestion(null);
            return;
        }

        setUsernameStatus('checking');
        setUsernameSuggestion(null);

        const timeoutId = setTimeout(() => {
            if (TAKEN_USERNAMES.includes(username.toLowerCase())) {
                setUsernameStatus('invalid');
                const suggestion = `${username}${Math.floor(Math.random() * 900) + 100}`;
                setUsernameSuggestion(suggestion);
            } else {
                setUsernameStatus('valid');
            }
        }, 800); // Simulate network latency

        setDebounceTimeout(timeoutId);

        // Cleanup on unmount or before next run
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [username]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        if (usernameStatus !== 'valid') {
            alert("Please choose an available username.");
            return;
        }
        // Handle signup logic
        console.log({ email, username, password, referralCode });
        onSignupSuccess();
    };

    const renderUsernameFeedback = () => {
        switch (usernameStatus) {
            case 'checking':
                return <div className="flex items-center text-xs text-indigo-300 mt-2"><LoadingSpinner /> <span className="ml-2">Checking availability...</span></div>;
            case 'valid':
                return <div className="flex items-center text-xs text-green-400 mt-2"><CheckIcon /> <span className="ml-2">Username is available!</span></div>;
            case 'invalid':
                return (
                    <div className="text-xs text-red-400 mt-2">
                        <div className="flex items-center"><CrossIcon /> <span className="ml-2">Username is already taken.</span></div>
                        {usernameSuggestion && (
                            <div className="mt-1">
                                Suggestion: <button
                                    type="button"
                                    onClick={() => { setUsername(usernameSuggestion); }}
                                    className="font-bold underline hover:text-white transition-colors"
                                >
                                    {usernameSuggestion}
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'idle':
            default:
                return null;
        }
    };

    const isSubmitDisabled = !agreedToTerms || password !== confirmPassword || password === '' || usernameStatus !== 'valid';

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-6 text-white">Create Account</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                    <label htmlFor="signup-email" className="block text-indigo-200 text-sm font-bold mb-2">
                        Email Address
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="signup-username" className="block text-indigo-200 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        id="signup-username"
                        type="text"
                        placeholder="your_username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                        aria-invalid={usernameStatus === 'invalid'}
                        aria-describedby="username-feedback"
                    />
                    <div id="username-feedback" className="h-9">
                         {renderUsernameFeedback()}
                    </div>
                </div>
                
                <PasswordInput
                    id="signup-password"
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <PasswordInput
                    id="confirm-password"
                    label="Confirm Password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <div className="mb-4">
                    <label htmlFor="referral-code" className="block text-indigo-200 text-sm font-bold mb-2">
                        Referral Code (Optional)
                    </label>
                    <input
                        id="referral-code"
                        type="text"
                        placeholder="Enter referral code"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="mt-6 mb-4">
                    <label className="flex items-center text-sm text-indigo-200 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="h-4 w-4 bg-[#1a1130] border-purple-700/50 rounded-sm text-purple-500 focus:ring-purple-500 transition"
                        />
                        <span className="ml-2">
                            I agree to the 
                            <a href="#" className="font-bold text-white hover:text-purple-400 focus:outline-none transition-colors"> Terms of Service </a> 
                            and 
                            <a href="#" className="font-bold text-white hover:text-purple-400 focus:outline-none transition-colors"> Privacy Policy</a>.
                        </span>
                    </label>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitDisabled}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-purple-600"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <p className="text-center text-indigo-200 text-sm mt-6">
                Already have an account?{' '}
                <button onClick={switchToLogin} className="font-bold text-white hover:text-purple-400 focus:outline-none transition-colors">
                    Log In
                </button>
            </p>
        </div>
    );
};

export default Signup;
