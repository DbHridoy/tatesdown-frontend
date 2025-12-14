// src/pages/auth/VerifyOtp.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import brandLogo from "../../assets/Logo.svg";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { useVerifyOtpMutation } from "../../redux/api/authApi";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, ""); // Only digits

    if (pastedData.length > 0) {
      const newOtp = [...otp];

      // Fill input fields with pasted digits
      for (let i = 0; i < Math.min(pastedData.length, 4); i++) {
        newOtp[i] = pastedData[i];
      }

      setOtp(newOtp);

      // Focus the next empty field or the last field if all are filled
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      if (nextEmptyIndex !== -1) {
        document.getElementById(`otp-${nextEmptyIndex}`).focus();
      } else {
        document.getElementById("otp-3").focus(); // Focus last field (4th input)
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }

    try {
      await verifyOtp({ email, otp: otpValue }).unwrap();
      navigate("/set-password", { state: { email, resetCode: otpValue } });
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      setError("Invalid OTP code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <img src={brandLogo} alt="Brand Logo" className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              Verify Code
            </h2>
            <p className="text-center text-gray-600">
              Enter the verification code sent to {email}
            </p>
          </div>

          {/* OTP Inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="flex flex-row gap-2 items-center justify-center"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="w-12 h-12 text-center text-lg px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FFD1E8] focus:border-[#FFD1E8]"
                  required
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Next Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#007CCD] text-white px-4 rounded-lg cursor-pointer font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-2 cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} />
              <span className="font-medium">Back to Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
