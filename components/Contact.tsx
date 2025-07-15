
import React, { useState } from 'react';
import StaticPage from './StaticPage';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');
        console.log({ name, email, subject, message });
        // Simulate API call
        setTimeout(() => {
            setFormStatus('sent');
        }, 1500);
    };

    return (
        <StaticPage title="Contact Support">
            {formStatus === 'sent' ? (
                <div className="text-center py-16 animate-fade-in">
                    <svg className="h-16 w-16 text-green-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                    <p className="text-indigo-200 mt-2">Thank you for contacting us. Our team will get back to you shortly.</p>
                </div>
            ) : (
                <>
                    <p className="text-center mb-10">Have a question or need assistance? Fill out the form below or email us directly at <a href="mailto:support@optivus.protocol">support@optivus.protocol</a>. We aim to respond to all inquiries within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="contact-name" className="block text-indigo-200 text-sm font-bold mb-2">Full Name</label>
                                <input id="contact-name" type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-indigo-200 text-sm font-bold mb-2">Email Address</label>
                                <input id="contact-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="contact-subject" className="block text-indigo-200 text-sm font-bold mb-2">Subject</label>
                            <input id="contact-subject" type="text" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="block text-indigo-200 text-sm font-bold mb-2">Message</label>
                            <textarea id="contact-message" value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="w-full bg-[#1a1130] border border-purple-700/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                        </div>
                        <div className="text-right">
                             <button
                                type="submit"
                                disabled={formStatus === 'sending'}
                                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/20 disabled:opacity-50"
                            >
                                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </StaticPage>
    );
};

export default Contact;
