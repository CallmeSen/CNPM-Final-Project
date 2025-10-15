"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./pages/contexts/CartContext";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
