const initialState = {
    products: [],
};

const findProductIndex = (products, productId) =>
    products.findIndex((p) => p.id === productId);

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const productId = action.payload.id;
            const existingProductIndex = findProductIndex(state.products, productId);

            if (existingProductIndex !== -1) {
                // Product already in the cart, increase quantity
                const updatedProducts = [...state.products];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    quantity: updatedProducts[existingProductIndex].quantity + 1,
                };

                console.log(`Increased quantity for product ${productId}: ${updatedProducts[existingProductIndex].quantity}`);

                return {
                    ...state,
                    products: updatedProducts,
                };
            } else {
                // Product not in the cart, add it with quantity 1
                console.log(`Added product to cart: ${productId}`);

                return {
                    ...state,
                    products: [...state.products, { ...action.payload, quantity: 1 }],
                };
            }

        case "REMOVE_FROM_CART":
            const productIdToRemove = action.payload;
            const productIndexToRemove = findProductIndex(
                state.products,
                productIdToRemove
            );

            if (productIndexToRemove !== -1) {
                // Remove the product from the cart
                const updatedProducts = [...state.products];
                console.log(`Removed product from cart: ${productIdToRemove}`);

                updatedProducts.splice(productIndexToRemove, 1);

                return {
                    ...state,
                    products: updatedProducts,
                };
            } else {
                // Product not found in the cart, no changes
                console.log(`Product not found in the cart: ${productIdToRemove}`);
                return state;
            }

        default:
            return state;
    }
};


export default cartReducer;
