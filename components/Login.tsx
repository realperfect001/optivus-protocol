
import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

interface LoginProps {
    switchToSignup: () => void;
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ switchToSignup, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form validation and API calls
        console.log({ email, password });
        onLoginSuccess();
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-6 text-white">Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="login-email" className="block text-indigo-200 text-sm font-bold mb-2">
                        Email Address
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                
                <PasswordInput
                    id="login-password"
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/20"
                    >
                        Log In
                    </button>
                </div>
            </form>
            <p className="text-center text-indigo-200 text-sm mt-6">
                Don't have an account?{' '}
                <button onClick={switchToSignup} className="font-bold text-white hover:text-purple-400 focus:outline-none transition-colors">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default Login;