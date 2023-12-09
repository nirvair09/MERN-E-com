import StripeCheckout from 'react-stripe-checkout';

const BuyNowButton = ({ amount, handleToken }) => {

    const onToken = (token) => {
        // Pass the received token to the handleToken function
        handleToken(token);
    };

    return (
        <StripeCheckout
            token={onToken}
            stripeKey="pk_test_51OKMAySIZxszc4Ur9ZtbDG3e2aRaYe178bahzhYOzzJdIuNZOhFovqsqpNwHaMA9E2RcHjC2ktoSw5aTiEc3HN3g00thXzI7hK"
            amount={amount * 100}
            name="My Awesome Product"
            currency="INR"
        >
            <button>Buy Now</button>
        </StripeCheckout>
    );
};

export default BuyNowButton;