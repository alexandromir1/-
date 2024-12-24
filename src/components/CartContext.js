import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [cartItemCount, setCartItemCount] = useState(0);

    const addToCart = (dish) => {
        setCart(prev => {
            const currentCount = prev[dish.id] ? prev[dish.id].count : 0;
            const newCount = currentCount + dish.count;

            setCartItemCount(prevCount => prevCount + dish.count);

            return {
                ...prev,
                [dish.id]: { ...dish, count: newCount },
            };
        });
    };

    const removeFromCart = (dishId) => {
        setCart(prev => {
            const { [dishId]: _, ...rest } = prev;
            return rest;
        });
        setCartItemCount(count => count >= 0 ? count - 1 : 0);
    };

    const changeQuantity = (dishId, change) => {
        setCart(prev => {
            const currentCount = prev[dishId]?.count || 0;
            const newCount = Math.max(currentCount + change, 0);

            if (newCount === 0) {
                const { [dishId]: _, ...rest } = prev;
                setCartItemCount(count => count - currentCount);
                return rest;
            }

            setCartItemCount(count => count + change);
            return {
                ...prev,
                [dishId]: { ...prev[dishId], count: newCount },
            };
        });
    };

    return (
        <CartContext.Provider value={{ cart, cartItemCount, addToCart, removeFromCart, changeQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};