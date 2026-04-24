import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "../../config/env";
import { Checkout } from "./components/Checkout";

const stripePromise = loadStripe(env.StripePublishableKey);
function CheckOutPage() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </div>
  );
}

export default CheckOutPage;
