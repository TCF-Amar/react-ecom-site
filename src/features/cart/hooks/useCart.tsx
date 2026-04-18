import { useCallback, useEffect, useState } from "react";
import { getProductPromCart } from "../services/firebaseCartServices";
import type { Product } from "../../product/types";

interface CartData {
  cid: string;
  product: Product;
  sizes: string;
  quantity: number;
  total: number;
}
interface CartState {
  cartProducts: CartData[] | [];
  // quantity: number;
  loading: boolean;
  error: string | null;
}

export const useCart = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isTimeStart, setTimerStart] = useState(false);
  const [cartState, setState] = useState<CartState>({
    cartProducts: [],
    loading: false,
    error: null,
  });

  const myFun = useCallback(async (fn: () => Promise<void>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await fn();
    } catch (error: any) {
      setState((prev) => ({ ...prev, error }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const fetchCartData = () => {
    myFun(() => getProductPromCart());
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const incQty = () => {
    setQuantity(quantity + 1);
  };
  const decQty = () => {
    if (quantity == 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const addToCartBtn = () => {
    setTimerStart(true);

    setTimeout(() => {
      setTimerStart(false);
    }, 1000 * 10);
  };

  return {
    cartData: cartState.cartProducts,
    loading: cartState.loading,
    error: cartState.error,
    isTimeStart,
    addToCartBtn,
    incQty,
    decQty,
    quantity,
    setQuantity,
  };
};
