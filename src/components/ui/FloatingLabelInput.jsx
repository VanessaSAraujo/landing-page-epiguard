import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const FloatingLabelInput = ({ type, label, error, helperText, ...props }) => {
  const id = React.useId();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  const borderColor = error ? 'border-red-500' : 'border-[#03a650]';
  const focusBorderColor = error ? 'focus:border-red-600' : 'focus:border-[#04bf45]';
  const labelColor = error ? 'text-red-500' : 'text-gray-500';
  const focusLabelColor = error ? 'peer-focus:text-red-600' : 'peer-focus:text-[#04bf45]';


  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`block w-full px-4 py-3 text-lg text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 peer ${borderColor} ${focusBorderColor} ${isPassword ? "pr-12" : ""}`}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className={`absolute text-lg duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${labelColor} ${focusLabelColor}`}
        >
          {label}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOffIcon className="w-6 h-6" />
            ) : (
              <EyeIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      {error && helperText && (
        <p className="mt-1 ml-1 text-sm text-red-500">{helperText}</p>
      )}
    </div>
  );
};

export default FloatingLabelInput; 