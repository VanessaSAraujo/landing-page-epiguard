import React from 'react';

const Switch = ({ checked, onChange, id }) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        ${checked ? 'bg-green-500' : 'bg-gray-300'}`
      }
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-6' : 'translate-x-1'}`
        }
      />
    </button>
  );
};

export default Switch; 