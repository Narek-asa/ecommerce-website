import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            const response = await axios.get(
                '/api/delivery-options?expand=estimatedDeliveryTime'
            );
            setDeliveryOptions(response.data);
        };

        fetchCheckoutData();
    }, []);

    useEffect(() => {
        const fetchPaymentSummaryData = async () => {
            const response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        };

        fetchPaymentSummaryData();
    }, [cart]);

    return (
        <>
            <title>Checkout</title>

            <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary
                        cart={cart}
                        deliveryOptions={deliveryOptions}
                        loadCart={loadCart}
                    />

                    <PaymentSummary
                        paymentSummary={paymentSummary}
                        loadCart={loadCart}
                    />
                </div>
            </div>
        </>
    );
}
