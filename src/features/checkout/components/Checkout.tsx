import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "../../cart/useCart";
import toast from "react-hot-toast";
import SuccDialog from "./SuccDialog";


export function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const { cartClearCheckout } = useCart();
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    try {
      setLoading(true);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/success",
        },
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful");
        setSuccess(true);
        cartClearCheckout();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) return <SuccDialog />;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

        <PaymentElement />

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}