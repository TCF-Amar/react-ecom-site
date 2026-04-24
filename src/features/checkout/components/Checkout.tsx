import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "../../cart/useCart";
import toast from "react-hot-toast";
import SuccDialog from "./SuccDialog";

export function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { cartClearCheckout } = useCart();
  const [success, setSuccess] = useState<boolean>(false);

  const [clientSecret, setClientSecret] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    if (!clientSecret) {
      toast.error("Client secret missing");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      toast.error("Card details fill karo");
      return;
    }

    try {
      setLoading(true);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful");
        setSuccess(!success);
        cartClearCheckout();
        console.log(success);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      //   setSuccess(false);
    }
  };

  if (success) {
    return <SuccDialog />;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10">
        <h2 className="text-3xl font-serif text-slate-900 mb-8 text-center">
          CheckOut
        </h2>

        <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Client Secret
          </label>
          <input
            type="text"
            placeholder="Paste your client_secret here..."
            onChange={(e) => setClientSecret(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
          />
          <div className="mt-3 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-sm text-indigo-800 flex flex-col gap-1">
            <p className="font-semibold">Test Card Details:</p>
            <p className="font-mono text-xs opacity-90">Number: 4242 4242 4242 4242</p>
            <p className="font-mono text-xs opacity-90">CVC: 123 | Exp: Any future date</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Credit Card Information
            </label>
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#334155',
                      '::placeholder': {
                        color: '#94a3b8',
                      },
                    },
                    invalid: {
                      color: '#ef4444',
                      iconColor: '#ef4444',
                    },
                  },
                }}
              />
            </div>
          </div>

          <button
            className={`w-full py-4 rounded-xl text-white font-semibold text-lg flex justify-center items-center transition-all duration-300 ${
              loading 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            }`}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
