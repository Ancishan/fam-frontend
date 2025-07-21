import { useRouter } from "next/router";

const CheckoutButton = ({ orderId, amount }) => {
  const router = useRouter();

  const bkashBaseLink =
    "https://shop.bkash.com/tansir-telecom01318962340/paymentlink/default-payment/pay/default-payment";

  const bkashPaymentLink = `${bkashBaseLink}?orderId=${orderId}&amount=${amount}`;

  const whatsappMessage = `https://wa.me/8801318962340?text=I want to place an order. My Order ID: ${orderId}, Amount: ${amount}৳`;

  return (
    <div className="flex flex-col gap-4 mt-6">
      <a
        href={bkashPaymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-600 text-white px-4 py-2 rounded-md text-center"
      >
        Pay with bKash
      </a>
      <a
        href={whatsappMessage}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-4 py-2 rounded-md text-center"
      >
        Message on WhatsApp
      </a>
    </div>
  );
};

export default CheckoutButton;
