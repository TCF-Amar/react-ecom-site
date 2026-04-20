import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  fetchCartData,
  addToCart,
  type AddToCartData,
  incrementCartItem,
  decrementCartItem,
} from "../slices/cartSlices";
import type { Product } from "../../product/types";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const selectTotalItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.reduce((total, item) => total + item.quantity, 0),
);

export const useCart = ({ autoFetch = true }: { autoFetch?: boolean } = {}) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { items, error, loading } = useAppSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState<string>("");
  const [isTimeStart, setTimeStart] = useState(false);
  const totalItems = useAppSelector(selectTotalItems);

  const userId = user?.uid;

  const fetchCart = useCallback(async () => {
    if (!userId) return;
    await dispatch(fetchCartData(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!autoFetch) return;
    fetchCart();
  }, [autoFetch, fetchCart]);

  const addCartFn = async (product: Product) => {
    setTimeStart(true);
    const data: AddToCartData = {
      uid: user!.uid,
      product,
      quantity,
      sizes,
    };
    await dispatch(addToCart(data));

    setQuantity(1);
    setTimeout(() => {
      setTimeStart(false);
    }, 1000 * 3);
  };

  const incQty = () => {
    setQuantity((prev) => prev + 1);
  };
  const decQty = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const handleIncrement = (slug: string, sizes: string) => {
    dispatch(incrementCartItem({ slug, sizes }));
    const item = items.find(
      (i) => i.product.slug === slug && i.sizes === sizes,
    );
    if (item) setActiveItem({ slug, sizes, quantity: item.quantity + 1 });
  };

  const handleDecrement = (slug: string, sizes: string) => {
    const item = items.find(
      (i) => i.product.slug === slug && i.sizes === sizes,
    );
    if (!item || item.quantity <= 1) return;

    dispatch(decrementCartItem({ slug, sizes }));
    setActiveItem({ slug, sizes, quantity: item.quantity - 1 });
  };
  const [activeItem, setActiveItem] = useState<{
    slug: string;
    sizes: string;
    quantity: number;
  } | null>(null);
  const debouncedQty = useDebounce(activeItem?.quantity, 500);

  useEffect(() => {
    if (!user?.uid || !activeItem) return;
    console.log("API CAll");
  }, [debouncedQty]);

  return {
    dispatch,
    cartData: items,
    error,
    loading,
    quantity,
    setQuantity,
    fetchCart,
    incQty,
    decQty,
    addCartFn,
    sizes,
    setSizes,
    isTimeStart,
    totalItems,
    handleIncrement,
    handleDecrement,
  };
};
