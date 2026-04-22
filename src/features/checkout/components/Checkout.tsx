import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "../../cart/hooks/useCart";
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
    <div>
      <div className="flex flex-col">
        <label htmlFor="">Test ke liye yaha client kye dalo</label>
        <input
          type="text"
          placeholder="key"
          onChange={(e) => setClientSecret(e.target.value)}
          className="border px-2 text-xl"
        />
        <p>
          Card no: 4242 4242 4242 4242 , CVC : any 3 number, EXPIRE aaj se aage
          ka koi v din{" "}
        </p>
      </div>
      <br />
      <br />
      <div className="bg-gray-400  p-4 text-white">
        <CardElement className="text-white text-xl" />
      </div>
      <br />
      <br />
      <button
        className="bg-slate-900 p-3 min-w-25 text-white"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </div>
  );
}
