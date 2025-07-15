
import React from 'react';
import StaticPage from './StaticPage';

const Terms: React.FC = () => {
    return (
        <StaticPage title="Terms of Service">
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            <p>Welcome to Optivus Protocol. These Terms of Service ("Terms") govern your use of our website, services, and platform (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>
            
            <h2>1. Account Registration</h2>
            <p>To use Optivus Protocol, you must register for an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your password and for any activities or actions under your account.</p>
            
            <h2>2. Membership Fee</h2>
            <p>Access to the Service requires a one-time, non-refundable membership fee of £50 (or its equivalent in supported cryptocurrencies). This fee grants you lifetime access to the platform and eligibility for the commission program, subject to these Terms.</p>

            <h2>3. Commission and Payouts</h2>
            <p>You may earn commissions by referring new members to the Service using your unique referral code. Commission structures are outlined on our platform. Payouts are subject to our withdrawal policies, which may include minimum withdrawal amounts and processing times. We reserve the right to investigate any suspicious or fraudulent activity and withhold payments accordingly.</p>
            
            <h2>4. Prohibited Activities</h2>
            <p>You agree not to engage in any of the following prohibited activities:</p>
            <ul>
                <li>Spamming or sending unsolicited communications with your referral link.</li>
                <li>Misrepresenting the Service or making false income claims.</li>
                <li>Using automated systems to create accounts or generate referrals.</li>
                <li>Violating any applicable laws or regulations.</li>
            </ul>
            
            <h2>5. Termination</h2>
            <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            
            <h2>6. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.</p>
            
            <h2>7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us through the form on our Contact page.</p>
        </StaticPage>
    );
};

export default Terms;
