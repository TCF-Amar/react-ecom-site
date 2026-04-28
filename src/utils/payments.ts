import axios from "axios";
import { env } from "../config/env";

interface PaymentIntentResponse {
    success: boolean;
    clientSecret: string;
    paymentIntentId: string;
}

export const createPaymentIntent = async (
    amount: number
): Promise<PaymentIntentResponse> => {
    if (!amount || amount < 50) {
        throw new Error("Amount must be at least 50 paisas");
    }

    try {
        const response = await axios.post<PaymentIntentResponse>(
            `${env.paymentMethodsUrl}/payments/create-intent`,
            {
                amount,
                currency: "inr",
               
            }
        );
console.log(response);

        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message;
            throw new Error(`Payment Intent failed: ${message}`);
        }
        throw error;
    }
};