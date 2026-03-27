declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface SubscriptionOptions {
  subscriptionId: string;
  razorpayKeyId: string;
  userName: string;
  userEmail: string;
  onSuccess: (response: any) => void;
  onError: () => void;
}

export const openSubscriptionCheckout = async (options: SubscriptionOptions) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const rzpOptions = {
    key: options.razorpayKeyId,
    subscription_id: options.subscriptionId,
    name: 'GreenDraw',
    description: 'Golf Charity Subscription',
    image: '/logo-circle.png',
    prefill: {
      name: options.userName,
      email: options.userEmail,
    },
    theme: {
      color: '#E8381A', // signal red
    },
    handler: options.onSuccess,
    modal: {
      ondismiss: options.onError,
    },
  };

  const rzp = new window.Razorpay(rzpOptions);
  rzp.open();
};

interface DonationOptions {
  orderId: string;
  amount: number;
  razorpayKeyId: string;
  charityName: string;
  userName: string;
  userEmail: string;
  onSuccess: (response: any) => void;
  onError: () => void;
}

export const openDonationCheckout = async (options: DonationOptions) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) return;

  const rzpOptions = {
    key: options.razorpayKeyId,
    amount: options.amount * 100, // in paise
    currency: 'INR',
    name: 'GreenDraw',
    description: `Donation to ${options.charityName}`,
    order_id: options.orderId,
    prefill: {
      name: options.userName,
      email: options.userEmail,
    },
    theme: {
      color: '#E8381A',
    },
    handler: options.onSuccess,
    modal: {
      ondismiss: options.onError,
    },
  };

  const rzp = new window.Razorpay(rzpOptions);
  rzp.open();
};
