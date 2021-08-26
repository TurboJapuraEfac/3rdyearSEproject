import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
//https://dashboard.stripe.com/test/apikeys


//we used cartTotal in CartTotal component and in context, thats why we put that here
const StripeCheckoutButton = ({ totalPrice }) => {
    //this is because stripe wants to see the total in cents, thats why we multiply it by 100
    const priceForStripe = totalPrice;
    //publishable key from stripe website
    const publishableKey = 'pk_test_51HjXEELddYRtujRzwk1tysWSEWcYOYyv5L65GLEA1h2uBv6e0fGiS1oDMwKhVrvQw1a5GE9shrA3vFazii34rmSJ006EogMATI';

    //this is for payment process/being successful
    const onToken = (token) => {
		console.log(token);
	};


    return (
        //https://github.com/azmenak/react-stripe-checkout
        //source for what we can put inside stripe checkout
        <StripeCheckout
			label="Pay Online"
			name="DrDel Ltd."
			billingAddress
			shippingAddress
			image={require("../../assets/images/delivery.jpg")}
			amount={priceForStripe/182}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
    )
}

export default StripeCheckoutButton;