import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, confirmText = 'Confirmar', cancelText = 'Cancelar' }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full text-center transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

// Adicionando a animação no CSS global (ou em um arquivo CSS importado)
/* Em seu arquivo CSS principal (ex: tailwind.css), adicione:
@layer utilities {
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fade-in-scale {
    animation: fadeInScale 0.2s ease-out forwards;
  }
}
*/ 