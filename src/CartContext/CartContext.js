import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
    // State to hold cart items
    const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Provide the state and functions to the context
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
export default CartProvider