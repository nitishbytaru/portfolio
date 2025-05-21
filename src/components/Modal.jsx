import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, onContinue }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full shadow-xl border-t-4 border-blue-500">
        <div className="border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            Explore <span className="text-blue-400">Echo</span>
            <span className="text-amber-400">Realm</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-300 mb-4">
            You can create an account, or use the sample credentials to explore
            the website:
          </p>

          <div className="bg-gray-800 p-3 rounded mb-4 border border-gray-600">
            <div className="mb-2">
              <span className="font-medium text-amber-300">Username: </span>
              <span className="text-gray-200">Kevin</span>
            </div>
            <div>
              <span className="font-medium text-amber-300">Password: </span>
              <span className="text-gray-200">1234</span>
            </div>
          </div>

          <div className="text-sm text-amber-200 bg-gray-800 p-3 rounded mb-4">
            <p>
              Note: Demo account has limited functionality. Create your own
              account for full features.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 p-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Continue to Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
