import toast from "react-hot-toast";

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../auth/hooks/useAuth";
import {
  fetchCartData,
  addToCart,
  incrementCartItem,
  decrementCartItem,
  // updateCartItemQty,
  removeItemFromCart,
  clearCart,
} from "./cartSlices";
import type { Product } from "../product/productTypes";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { useDebounce } from "../../shared/hooks/useDebounce";
import type { AddToCartData, CartUpdateData } from "./cartTypes";
import {
  clearCartAllItems,
  removeProductFromCart,
  updateQty,
} from "./firebaseCartServices";

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
  const [updData, setUpdData] = useState<CartUpdateData>();

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
    const data: AddToCartData = {
      uid: user!.uid,
      product,
      quantity,
      sizes,
    };
    if (product.category.slug === "clothes" && sizes === "") {
      console.log("Size Must be required");
      toast.error("Please select a size before adding to cart.");

      return;
    } else {
      setTimeStart(true);
      await dispatch(addToCart(data));
      toast.success("Item added to cart");
      setQuantity(1);
      setTimeout(() => {
        setTimeStart(false);
      }, 1000 * 30);
    }
  };

  const incQty = () => {
    setQuantity((prev) => prev + 1);
    setTimeStart(false);
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
    if (item) {
      setActiveItem({ slug, sizes, quantity: item.quantity + 1 });
      setUpdData({ uid: user!.uid, slug: slug, sizes, qty: item.quantity + 1 });
    }
  };

  const handleDecrement = (slug: string, sizes: string) => {
    const item = items.find(
      (i) => i.product.slug === slug && i.sizes === sizes,
    );
    if (!item || item.quantity <= 1) {
      const confirmation = confirm("Are you sure you want to delete this item from the cart?");
      if (confirmation) {
        dispatch(removeItemFromCart({ slug, sizes }));
        toast.success("Item removed from cart");
      }

      return;
    }

    dispatch(decrementCartItem({ slug, sizes }));

    setActiveItem({ slug, sizes, quantity: item.quantity - 1 });
    setUpdData({
      uid: user!.uid,
      slug: slug,
      sizes,
      qty: item.quantity - 1,
    });
  };
  const [activeItem, setActiveItem] = useState<{
    slug: string;
    sizes: string;
    quantity: number;
  } | null>(null);

  const debouncedQty = useDebounce(activeItem?.quantity, 500);

  const update = async () => {
    await updateQty(updData as CartUpdateData);
  };
  useEffect(() => {
    if (!user?.uid || !activeItem) return;
    update();
    console.log("updated");
    
  }, [debouncedQty]);

  const removeItemFromCartFn = async (slug: string, sizes: string) => {
    const confirmation = confirm("Are you sure you want to delete this item from the cart?");
    if (confirmation) {
      dispatch(removeItemFromCart({ slug, sizes }));
      await removeProductFromCart({ uid: user!.uid, slug, sizes });
      toast.success("Item removed from cart");
    }
  };

  const cartClear = async () => {
    const confirmation = confirm("Are you sure you want to clear the entire cart?");
    if (confirmation) {
      dispatch(clearCart());
      await clearCartAllItems(items, user!.uid);
      toast.success("Cart cleared");
    } else {
      toast.error("Cart not cleared");
    }
  };
  const cartClearCheckout = async () => {
    dispatch(clearCart());
    await clearCartAllItems(items, user!.uid);
  };

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
    removeItemFromCartFn,
    cartClear,
    setTimeStart,
    cartClearCheckout,
  };
};
