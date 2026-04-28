import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FiCheck } from "react-icons/fi";

interface SuccDialogProps {
  amount?: number;
  orderId?: string;
  onClose?: () => void;
}

function SuccDialog({ amount = 0, orderId, onClose }: SuccDialogProps) {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-95 bg-[#000000] border border-[#2a2a2a] rounded-3xl px-10 py-12 text-center overflow-hidden animate-slideUp">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-28 bg-green-500/10 blur-2xl rounded-full pointer-events-none" />

        <div className="w-18 h-18 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
          <FiCheck className=" text-green-700 text-2xl"/>
        </div>

        <h2 className="font-serif text-[22px] text-[#f5f5f5] tracking-tight mb-2">
          Payment Successful
        </h2>
       

        {amount > 0 && (
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-[13px] text-[#a3a3a3] mb-8">
            Amount paid &nbsp;·&nbsp;
            <span className="text-[#f5f5f5] font-semibold">
              ₹{(amount / 100).toFixed(2)}
            </span>
          </div>
        )}

        <div className="h-px bg-[#1f1f1f] mb-7" />

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => navigate("/products")}
            className="w-full py-3.5 rounded-xl bg-green-500 text-[#0a0a0a] text-sm font-medium hover:bg-green-600  transition-all duration-200 hover:shadow-[0_8px_24px_rgba(34,197,94,0.2)]"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3.5 rounded-xl bg-transparent border border-[#2a2a2a] text-[#6b6b6b] text-sm font-medium hover:bg-[#1a1a1a] hover:text-[#a3a3a3] transition-all duration-200"
          >
            View My Orders
          </button>
        </div>

        {orderId && (
          <p className="text-[11px] text-[#404040] mt-5 font-mono tracking-wide">
            Order #{orderId}
          </p>
        )}
      </div>
    </div>
  );
}

export default SuccDialog;
