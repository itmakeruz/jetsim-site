import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

interface MaskedPhoneInputProps {
  value?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  divClassname?: string;
  disabled?: boolean;
}

const MaskedPhoneInput = ({
  value = "",
  onChange,
  name,
  placeholder = "Enter phone number",
  label,
  className = "",
  required = false,
  divClassname = "",
  disabled = false,
}: MaskedPhoneInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (inputRef.current && !isInitialized) {
      // Initialize intl-tel-input
      itiRef.current = intlTelInput(inputRef.current, {
        initialCountry: "uz", // Default to Uzbekistan
        separateDialCode: true,
        nationalMode: false,
        autoPlaceholder: "aggressive",
        formatOnDisplay: true,
        geoIpLookup: (callback) => {
          // You can implement IP-based country detection here
          // For now, we'll use the default country
          callback("uz");
        },
        customPlaceholder: (selectedCountryPlaceholder) => {
          return selectedCountryPlaceholder;
        },
      });

      // Add event listeners
      inputRef.current.addEventListener("countrychange", handleCountryChange);
      inputRef.current.addEventListener("input", handleInputChange);
      inputRef.current.addEventListener("blur", handleBlur);

      setIsInitialized(true);
    }

    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
        itiRef.current = null;
      }
    };
  }, [isInitialized]);

  useEffect(() => {
    if (itiRef.current && value) {
      // Set the phone number if value is provided
      itiRef.current.setNumber(value);
    }
  }, [value]);

  const handleCountryChange = () => {
    if (itiRef.current && inputRef.current) {
      const fullNumber = itiRef.current.getNumber();
      createSyntheticEvent(fullNumber);
    }
  };

  const handleInputChange = () => {
    if (itiRef.current && inputRef.current) {
      const fullNumber = itiRef.current.getNumber();
      createSyntheticEvent(fullNumber);
    }
  };

  const handleBlur = () => {
    if (itiRef.current && inputRef.current) {
      // Validate the number on blur
      const isValid = itiRef.current.isValidNumber();
      if (!isValid) {
        // You can add error styling here if needed
        console.log("Invalid phone number");
      }
    }
  };

  const createSyntheticEvent = (fullNumber: string) => {
    const syntheticEvent = {
      target: {
        name,
        value: fullNumber,
      },
      currentTarget: {
        name,
        value: fullNumber,
      },
      nativeEvent: new Event("change"),
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      preventDefault: () => {},
      isDefaultPrevented: () => false,
      stopPropagation: () => {},
      isPropagationStopped: () => false,
      persist: () => {},
      timeStamp: Date.now(),
      type: "change",
    } as ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  return (
    <div className={`flex flex-col gap-2 ${divClassname}`}>
      {label && (
        <label className="text-sm md:text-sm sm:text-xs xs:text-[10px] font-normal text-[#637381] mb-0.5">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="tel"
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-3 border border-[#919EAB33] rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${className}`}
        />
      </div>

      {/* Custom styles for intl-tel-input */}
      <style>{`
        .iti {
          width: 100%;
        }
        
        .iti__country-list {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        }
        
        .iti__country {
          padding: 8px 12px;
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s ease;
        }
        
        .iti__country:hover {
          background-color: #f8fafc;
        }
        
        .iti__country.iti__highlight {
          background-color: #dbeafe;
        }
        
        .iti__country-name {
          font-size: 14px;
          color: #374151;
        }
        
        .iti__dial-code {
          font-size: 14px;
          color: #6b7280;
        }
        
        .iti__flag {
          margin-right: 8px;
        }
        
        .iti__selected-flag {
          border: 1px solid #d1d5db;
          border-radius: 12px 0 0 12px;
          padding: 12px 8px;
          background-color: white;
          border-right: none;
          transition: all 0.2s ease;
        }
        
        .iti__selected-flag:hover {
          background-color: #f9fafb;
        }
        
        .iti__selected-flag:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .iti__arrow {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid #6b7280;
          margin-left: 4px;
        }
        
        .iti__arrow--up {
          border-top: none;
          border-bottom: 4px solid #6b7280;
        }
        
        .iti input[type="tel"] {
          border: 1px solid rgba(145, 158, 171, 0.2);
          border-radius: 0 12px 12px 0;
          padding: 12px 16px;
          font-size: 14px;
          color: #374151;
          background-color: white;
          transition: all 0.2s ease;
          outline: none;
          width: 100%;
        }
        
        .iti input[type="tel"]:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .iti input[type="tel"]:disabled {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }
        
        .iti__error-msg {
          color: #ef4444;
          font-size: 12px;
          margin-top: 4px;
        }
        
        .iti--allow-dropdown .iti__flag-container:hover .iti__selected-flag {
          background-color: #f9fafb;
        }
        
        .iti--allow-dropdown .iti__flag-container:focus .iti__selected-flag {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        @media (max-width: 768px) {
          .iti input[type="tel"] {
            padding: 10px 12px;
            font-size: 12px;
          }
          
          .iti__selected-flag {
            padding: 10px 6px;
          }
        }
        
        @media (max-width: 480px) {
          .iti input[type="tel"] {
            padding: 8px 10px;
            font-size: 10px;
          }
          
          .iti__selected-flag {
            padding: 8px 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default MaskedPhoneInput;
