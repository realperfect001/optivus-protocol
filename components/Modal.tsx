import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 transition-opacity duration-300 overflow-y-auto pt-10 pb-20 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="p-px bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#10032A] rounded-[11px] p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-indigo-200 hover:text-white transition-colors z-10"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;