import React, { useRef, useState } from 'react';

const OtpInput = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Foco no próximo input
    if (element.value !== '' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.join('').length === length) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    // Foco no input anterior ao pressionar backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 md:gap-4">
      {otp.map((data, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-semibold border-2 border-[#03a650] rounded-lg focus:border-[#04bf45] focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInput; 