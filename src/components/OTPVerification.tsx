import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface OTPVerificationProps {
  mobile: string;
  onVerified: (otp: string) => Promise<boolean>;
  onBack: () => void;
  onResend: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  mobile,
  onVerified,
  onBack,
  onResend
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      setError('');
      
      try {
        const isValid = await onVerified(otp);
        
        if (!isValid) {
          setError('Invalid OTP. Please try again.');
          setOtp('');
        }
      } catch (error) {
        setError('Error verifying OTP. Please try again.');
        setOtp('');
        console.error('OTP verification error:', error);
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setOtp('');
    setError('');
    
    try {
      await onResend();
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
      successMsg.textContent = 'OTP sent successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 3000);
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
      console.error('Resend OTP error:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="animate-slide-up p-4 sm:p-6 md:p-8 w-full max-w-full overflow-hidden">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="heading-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-4">
          Verify your mobile number
        </h2>
        <p className="text-elegant text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          We've sent a 6-digit code to <span className="font-semibold text-amber-600">+91{mobile}</span>
        </p>
      </div>
      
      <div className="max-w-md mx-auto space-y-6 sm:space-y-8 mb-8 sm:mb-12">
        <div className="flex justify-center animate-scale-in" style={{animationDelay: '0.2s'}}>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError('');
            }}
          >
            <InputOTPGroup className="gap-2 sm:gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot 
                  key={index}
                  index={index} 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-lg sm:text-xl border-2 border-stone-200 focus:border-amber-400 rounded-xl bg-white/90 transition-all duration-300"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        {error && (
          <div className="animate-slide-up">
            <p className="text-center text-red-600 text-sm sm:text-base bg-red-50 p-3 rounded-xl border border-red-200">{error}</p>
          </div>
        )}
        
        <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
          <p className="text-sm sm:text-base text-stone-600 mb-4">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-amber-600 text-sm sm:text-base font-medium hover:text-amber-700 disabled:opacity-50 transition-colors duration-300 underline"
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>
      </div>

      <div className="flex justify-between space-x-4 animate-scale-in" style={{animationDelay: '0.6s'}}>
        <button
          onClick={onBack}
          className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-white text-stone-800 font-medium hover:bg-stone-50 transition-all duration-300 rounded-xl text-base sm:text-lg border border-stone-300 elegant-hover"
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className={`px-8 sm:px-10 md:px-12 py-3 sm:py-4 font-medium transition-all duration-300 rounded-xl text-base sm:text-lg elegant-hover ${
            otp.length === 6 && !isVerifying
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-800 hover:from-amber-300 hover:to-amber-400 shadow-lg'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
