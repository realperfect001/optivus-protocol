
import React from 'react';

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ title, children }) => {
  return (
    <section className="py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-10 text-white uppercase">{title}</h1>
        <div className="bg-[#191036]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 sm:p-12">
            <div className="static-content text-indigo-200 leading-relaxed space-y-6">
                {children}
            </div>
        </div>
      </div>
      <style>{`
        .static-content h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid rgba(167, 139, 250, 0.2);
            padding-bottom: 0.5rem;
        }
        .static-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: white;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
        }
        .static-content p {
            margin-bottom: 1rem;
        }
        .static-content a {
            color: #60a5fa; /* text-blue-400 */
            text-decoration: underline;
        }
        .static-content a:hover {
            color: #93c5fd; /* text-blue-300 */
        }
        .static-content ul {
            list-style-position: inside;
            list-style-type: disc;
            padding-left: 1rem;
        }
        .static-content li {
            margin-bottom: 0.5rem;
        }
        .static-content strong {
            color: white;
            font-weight: 600;
        }
      `}</style>
    </section>
  );
};

export default StaticPage;
