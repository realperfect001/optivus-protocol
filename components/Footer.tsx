
import React from 'react';

export type AppView = 'landing' | 'payment' | 'dashboard' | 'terms' | 'privacy' | 'contact' | 'vision';

interface FooterProps {
    onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  // Helper to create links
  const NavLink = ({ view, label }: { view: AppView, label: string }) => (
      <button onClick={() => onNavigate(view)} className="hover:text-white transition-colors">
          {label}
      </button>
  );
  
  return (
    <footer className="border-t border-purple-500/20 mt-16 sm:mt-20">
      <div className="container mx-auto px-6 py-8 text-sm text-indigo-200">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          <p className="order-2 sm:order-1 text-center sm:text-left">&copy; {new Date().getFullYear()} Optivus Protocol. All rights reserved.</p>
          
          <div className="flex space-x-6 order-1 sm:order-2">
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.398c0-2.022 1.825-3.612 3.992-3.612 2.167 0 2.998 1.582 2.998 3.612v8.398h5v-9.5c0-5.225-2.225-7.5-6.225-7.5-3.005 0-4.775 1.562-5.775 3.062v-2.562z" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-3">
            <NavLink view="vision" label="Our Vision" />
            <NavLink view="terms" label="Terms of Service" />
            <NavLink view="privacy" label="Privacy Policy" />
            <NavLink view="contact" label="Contact Support" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
