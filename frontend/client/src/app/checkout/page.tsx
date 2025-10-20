import { Suspense } from "react";
import Checkout from "../pages/payment/Checkout";

const CheckoutPage = () => {
  return (
    <Suspense fallback={null}>
      <Checkout />
    </Suspense>
  );
};

export default CheckoutPage;
