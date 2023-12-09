export const addToCart = (productId) => ({
    type: "ADD_TO_CART",
    payload: { id: productId },
});


export const removeFromCart = (productData) => ({
    type: "REMOVE_FROM_CART",
    payload: productData,
});