import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { env } from "../../config/env";
import { Checkout } from "./components/Checkout";
import { createPaymentIntent } from "../../utils/payments";
import { useCart } from "../cart/useCart";
import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CartProductCard from "../cart/components/CartProductCard";

const stripePromise = loadStripe(env.stripePublishableKey);

function CheckOutPage() {
  const navigate = useNavigate();
  const { cartData, subTotal } = useCart();
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        setLoading(true);
        const data = await createPaymentIntent(subTotal * 100);
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError("Payment initialize failed.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getClientSecret();
  }, []);

  if (loading) return <div>Loading payment...</div>;
  if (error) return <div>{error}</div>;

  if (!clientSecret) return null;

  return (
    <div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        { (
          <>
            <div>
              {cartData.map((item, i) => (
                <CartProductCard key={i} product={item} />
              ))}
              <div>
                <p>Items price + Shipping Charge(100)</p>
                <p className="text-xl font-bold text-slate-900 mt-4">
                  Total: ${subTotal}
                </p>
              </div>
            </div>

            <Checkout />
          </>
        )}
        {/* <Checkout /> */}
      </Elements>
    </div>
  );
}

export default CheckOutPage;
