import { useState, useMemo, useEffect } from "react";
import { useTariffStore } from "@/store/tariffStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { APP_ROUTES } from "@/router/path";
import CartItem from "../Profile/components/CartItem";
import EmailInputForm from "./components/EmailInputForm";
import OTPVerificationForm from "./components/OTPVerificationForm";
import PaymentForm from "./components/PaymentForm";
import BackButtonWithTitle from "@/components/BackButtonWithTitle";

type PaymentStep = "email" | "otp" | "payment";

const PaymentPage = () => {
  const { selectedTariffs } = useTariffStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (selectedTariffs.length === 0) {
      navigate(APP_ROUTES.CART);
    }
  }, [selectedTariffs.length, navigate]);

  // Email step state
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Determine current step
  const currentStep: PaymentStep = useMemo(() => {
    if (isAuthenticated) return "payment";
    if (emailSubmitted) return "otp";
    return "email";
  }, [isAuthenticated, emailSubmitted]);

  // Calculate total price
  const totalPrice = useMemo(
    () => selectedTariffs.reduce((acc, tariff) => acc + tariff.total_amount, 0),
    [selectedTariffs]
  );

  const handleEmailSubmitted = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setEmailSubmitted(true);
  };

  const handleTimerReset = () => {
    // Timer will be reset in OTPVerificationForm component
  };

  // Don't render if cart is empty (will redirect)
  if (selectedTariffs.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <div className="py-4 flex flex-col">
        <BackButtonWithTitle className="mb-[20px]" title="Оплата" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
          <div className="flex flex-col gap-3">
            {selectedTariffs.map((tariff) => (
              <CartItem key={tariff.id} tariff={tariff} />
            ))}
          </div>
          <div className="sticky top-4 h-max">
            <div className="flex flex-col gap-[20px]">
              {/* Email Input Step */}
              {(currentStep === "email" || currentStep === "otp") && (
                <EmailInputForm
                  onEmailSubmitted={handleEmailSubmitted}
                  onTimerReset={handleTimerReset}
                />
              )}

              {/* OTP Verification Step */}
              {currentStep === "otp" && email && (
                <OTPVerificationForm email={email} />
              )}

              {/* Payment Step */}
              <PaymentForm totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
