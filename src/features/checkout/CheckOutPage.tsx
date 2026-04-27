import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "../../config/env";
import { Checkout } from "./components/Checkout";

const stripePromise = loadStripe(env.StripePublishableKey);
function CheckOutPage() {
  const clientSecret =
    "pi_3TPJQBHeb7dnN6Nj1y6dRrb6_secret_lVUMmS4HL6I1i4CEQns3PdBTH";

  return (
    <div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Checkout />
      </Elements>
    </div>
  );
}

export default CheckOutPage;
