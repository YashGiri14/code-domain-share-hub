
import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

interface ContactStepProps {
  onSubmit: (formData: any) => void;
  onPrevious: () => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ onSubmit, onPrevious }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    mobile: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phoneRegex.test(phone);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('Recaptcha verified');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
        }
      });
    }
  };

  const sendOTP = async (mobile: string) => {
    try {
      setLoading(true);
      
      // COMMENTED OUT FOR DEMO - UNCOMMENT WHEN BILLING IS ENABLED
      /*
      setupRecaptcha();
      
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${mobile}`;
      
      console.log('Sending OTP to:', formattedPhone);
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      window.confirmationResult = confirmation;
      
      console.log('OTP sent successfully');
      */
      
      // FOR DEMO: Just show OTP screen without sending actual OTP
      console.log('Demo mode: Showing OTP screen without sending SMS');
      setShowOTP(true);
      
      // Show demo message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50';
      successMsg.textContent = 'Demo mode: Use 123456 as OTP';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/billing-not-enabled') {
        alert('Firebase billing not enabled. Please upgrade your Firebase project to use phone authentication.');
      } else if (error.code === 'auth/invalid-phone-number') {
        alert('Invalid phone number format');
      } else {
        alert(`Failed to send OTP: ${error.message}`);
      }
      
      // For demo purposes, show OTP screen anyway
      setShowOTP(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user starts typing
    if (name === 'email' && errors.email) {
      setErrors({ ...errors, email: '' });
    }
    if (name === 'mobile' && errors.mobile) {
      setErrors({ ...errors, mobile: '' });
    }
  };

  const handleMobileSubmit = async () => {
    // Validate phone number
    if (!validatePhone(formData.mobile)) {
      setErrors({ ...errors, mobile: 'Please enter a valid 10-digit mobile number starting with 6-9' });
      return;
    }
    
    if (formData.mobile.length >= 10) {
      await sendOTP(formData.mobile);
    }
  };

  const handleOTPVerified = async (enteredOtp: string) => {
    try {
      // COMMENTED OUT FOR DEMO - UNCOMMENT WHEN BILLING IS ENABLED
      /*
      if (window.confirmationResult) {
        const result = await window.confirmationResult.confirm(enteredOtp);
        console.log('Phone number verified successfully:', result.user);
        setIsVerified(true);
        setShowOTP(false);
        return true;
      } else {
      */
        // For demo purposes when Firebase billing is not enabled
        if (enteredOtp === '123456') {
          console.log('Demo OTP verified');
          setIsVerified(true);
          setShowOTP(false);
          return true;
        }
        return false;
      /*
      }
      */
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const handleResendOTP = async () => {
    await sendOTP(formData.mobile);
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
  };

  const handleSubmit = () => {
    // Validate email
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }

    if (isFormValid) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.name && 
                     formData.email && 
                     validateEmail(formData.email) &&
                     formData.mobile && 
                     validatePhone(formData.mobile) &&
                     formData.address && 
                     isVerified;

  return showOTP ? (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl"></div>
      <div className="relative">
        <OTPVerification
          mobile={formData.mobile}
          onVerified={handleOTPVerified}
          onBack={handleBackFromOTP}
          onResend={handleResendOTP}
        />
      </div>
      <div id="recaptcha-container"></div>
    </div>
  ) : (
    <div className="animate-slide-up">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="heading-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-4">
          Your estimate is almost ready
        </h2>
        <p className="text-elegant text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Complete your details to receive your personalized quote
        </p>
      </div>
      
      <div className="max-w-lg mx-auto space-y-6 mb-8 sm:mb-12">
        <div className="animate-slide-in-left" style={{animationDelay: '0.1s'}}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-stone-200 focus:border-amber-400 focus:outline-none transition-all duration-300 rounded-xl text-base sm:text-lg bg-white/90 placeholder-stone-500"
          />
        </div>
        
        <div className="animate-slide-in-left" style={{animationDelay: '0.2s'}}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 sm:px-6 py-4 sm:py-5 border-2 ${errors.email ? 'border-red-400' : 'border-stone-200'} focus:border-amber-400 focus:outline-none transition-all duration-300 rounded-xl text-base sm:text-lg bg-white/90 placeholder-stone-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 px-2">{errors.email}</p>
          )}
        </div>
        
        <div className="animate-slide-in-left" style={{animationDelay: '0.3s'}}>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number (10 digits)"
                value={formData.mobile}
                onChange={handleInputChange}
                maxLength={10}
                className={`w-full px-4 sm:px-6 py-4 sm:py-5 border-2 ${errors.mobile ? 'border-red-400' : 'border-stone-200'} focus:border-amber-400 focus:outline-none transition-all duration-300 rounded-xl text-base sm:text-lg bg-white/90 placeholder-stone-500`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-2 px-2">{errors.mobile}</p>
              )}
            </div>
            {formData.mobile.length >= 10 && validatePhone(formData.mobile) && !isVerified && (
              <button
                onClick={handleMobileSubmit}
                disabled={loading}
                className="px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm sm:text-base font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-300 rounded-xl whitespace-nowrap shadow-lg elegant-hover disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Verify'}
              </button>
            )}
            {isVerified && (
              <div className="px-6 py-4 sm:py-5 bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-sm sm:text-base font-medium rounded-xl flex items-center whitespace-nowrap shadow-md">
                ✓ Verified
              </div>
            )}
          </div>
        </div>
        
        <div className="animate-slide-in-left" style={{animationDelay: '0.4s'}}>
          <textarea
            name="address"
            placeholder="Complete Address"
            value={formData.address}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-stone-200 focus:border-amber-400 focus:outline-none transition-all duration-300 resize-none rounded-xl text-base sm:text-lg bg-white/90 placeholder-stone-500"
          />
        </div>
      </div>

      <div className="animate-scale-in mb-8" style={{animationDelay: '0.5s'}}>
        <p className="text-center text-sm text-stone-600 px-4">
          By submitting this form, you agree to our{' '}
          <a href="#" className="text-amber-600 underline hover:text-amber-700 transition-colors">privacy policy</a>
        </p>
      </div>

      <div className="flex justify-between space-x-4 animate-scale-in" style={{animationDelay: '0.6s'}}>
        <button
          onClick={onPrevious}
          className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-white text-stone-800 font-medium hover:bg-stone-50 transition-all duration-300 rounded-xl text-base sm:text-lg border border-stone-300 elegant-hover"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-8 sm:px-10 md:px-12 py-3 sm:py-4 font-medium transition-all duration-300 rounded-xl text-base sm:text-lg elegant-hover ${
            isFormValid
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-800 hover:from-amber-300 hover:to-amber-400 shadow-lg'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
        >
          Get Your Estimate
        </button>
      </div>
      
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default ContactStep;
