
import React from 'react';
import StaticPage from './StaticPage';

const Privacy: React.FC = () => {
    return (
        <StaticPage title="Privacy Policy">
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            <p>Optivus Protocol ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.</p>

            <h2>1. Information We Collect</h2>
            <p>We may collect personal information from you in a variety of ways, including:</p>
            <ul>
                <li><strong>Personal Data:</strong> When you register for an account, we may collect your name, email address, and username.</li>
                <li><strong>Financial Data:</strong> For withdrawals, we may collect bank account details or cryptocurrency wallet addresses. This information is handled securely.</li>
                <li><strong>Usage Data:</strong> We may automatically collect information about your device and how you interact with our Service, such as your IP address, browser type, and pages visited.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide, operate, and maintain our Service.</li>
                <li>Process your transactions and commission payouts.</li>
                <li>Improve, personalize, and expand our Service.</li>
                <li>Communicate with you, including for customer service and to provide you with updates.</li>
                <li>Prevent fraudulent activity and enhance the security of our Service.</li>
            </ul>
            
            <h2>3. Sharing Your Information</h2>
            <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information except in the following situations:</p>
            <ul>
                <li>With service providers who assist us in operating our business, so long as those parties agree to keep this information confidential.</li>
                <li>To comply with legal obligations or to protect our rights.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

            <h2>5. Your Rights</h2>
            <p>You have the right to access, update, or delete the information we have on you. You can update your account settings directly within the dashboard or by contacting support for assistance.</p>
            
            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through the form on our Contact page.</p>
        </StaticPage>
    );
};

export default Privacy;
