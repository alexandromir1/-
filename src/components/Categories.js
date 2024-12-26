import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Categories = ({ categories, dishes }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const refs = useRef({});
    const { addToCart, cartItemCount, changeQuantity, removeFromCart } = useCart();
    const [dishQuantities, setDishQuantities] = useState({});
    const [showAddToCartButton, setShowAddToCartButton] = useState({});

    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedCategory(selected);
        if (refs.current[selected]) {
            refs.current[selected].scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        const categoryPositions = categories.map(category => {
            const ref = refs.current[category.name];
            return ref ? { name: category.name, top: ref.getBoundingClientRect().top } : { name: '', top: Infinity };
        });

        const topCategories = categoryPositions.filter(cat => cat.top <= 0);
        if (topCategories.length > 0) {
            const lastTopCategory = topCategories[topCategories.length - 1];
            if (lastTopCategory.name !== selectedCategory) {
                setSelectedCategory(lastTopCategory.name);
            }
        }
    };
    // const handleQuantityChange = (id, change) => {
    //     console.log(`handleQuantityChange вызвана для ID: ${id}, Изменение: ${change}`);
    //     setDishQuantities(prev => {
    //         const newQuantity = Math.max((prev[id] || 0) + change, 0);
    //         console.log(`Dish ID: ${id}, Change: ${change}, New Quantity: ${newQuantity}`);
    //         return {
    //             ...prev,
    //             [id]: newQuantity,
    //         };
    //     });
    // };


    useEffect(() => {
        if (!categories || !dishes) return;

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [categories, selectedCategory]);

    if (!categories || !dishes) {
        return <div>Нет доступных категорий или блюд.</div>;
    }

    return (
        <div className='w-full mx-auto px-4 font-raleway max-[385px]:px-2'>
            <div className="mt-10 flex flex-col justify-center sticky top-0 z-50">
                <select
                    value={selectedCategory}
                    onChange={handleChange}
                    className='h-14 rounded-md border-[#F5E6CC] border-2 bg-[#FFF7EA] text-[#E32C0B] font-medium text-xl'>
                    <option value="">Выберите категорию</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div>
                {categories.map(category => (
                    <div key={category.id} ref={el => (refs.current[category.name] = el)}>
                        <h2 className="text-2xl font-bold mt-7">{category.name}</h2>
                        <div className='flex flex-wrap'>
                            {dishes
                                .filter(dish => dish.categoryId === category.id)
                                .map(dish => (
                                    <div key={dish.id} className='flex flex-col mr-5 mt-12 w-[140px]'>
                                        <Link to={`/dish/${dish.id}`} className='flex flex-col cursor-pointer'>
                                            <div className='rounded-t-full bg-[#FAEFDD]'>
                                                <img src={dish.image} alt={dish.title} width={243} height={230} className="relative object-cover p-5" />
                                            </div>
                                            <div className='my-5'>
                                                <p className="text-sm font-semibold mt-2.5">{dish.price}</p>
                                                <h3 className="text-xs font-regular mt-1.5">{dish.title}</h3>
                                            </div>
                                        </Link>
                                        <div className='flex items-center'>
                                            {showAddToCartButton[dish.id] ? (
                                                <div className='flex justify-between bg-[#E32C0B] text-[#FFF7EA] text-xs rounded-md py-2 px-8 w-[140px]'>
                                                    <button onClick={() => {
                                                        const currentQuantity = dishQuantities[dish.id] || 0;
                                                        if (currentQuantity > 1) {
                                                            const newQuantity = currentQuantity - 1;
                                                            changeQuantity(dish.id, -1);
                                                            setDishQuantities(prev => ({ ...prev, [dish.id]: newQuantity }));
                                                        } else if (currentQuantity === 1) {
                                                            removeFromCart(dish.id);
                                                            setDishQuantities(prev => {
                                                                const updatedQuantities = { ...prev, [dish.id]: 0 };
                                                                setShowAddToCartButton(prev => ({ ...prev, [dish.id]: false }));
                                                                return updatedQuantities;
                                                            });
                                                        }
                                                    }} disabled={(dishQuantities[dish.id] || 0) <= 0}>-</button>
                                                    <span>
                                                        {dishQuantities[dish.id] || 0}
                                                    </span>

                                                    <button onClick={() => {
                                                        const currentQuantity = (dishQuantities[dish.id] || 0);
                                                        const newQuantity = currentQuantity + 1;
                                                        addToCart({ ...dish, count: 1 });
                                                        setDishQuantities(prev => ({ ...prev, [dish.id]: newQuantity }));
                                                    }}>+</button>
                                                </div>
                                            ) : (
                                                <button onClick={() => {
                                                    setShowAddToCartButton(prev => ({ ...prev, [dish.id]: true }));
                                                    addToCart({ ...dish, count: 1 });
                                                    setDishQuantities(prev => ({ ...prev, [dish.id]: 1 }));
                                                }} className='bg-[#E32C0B] text-[#FFF7EA] text-xs rounded-md py-2 px-8 w-[140px]'>
                                                    В корзину
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <Link
                to="/cart"
                className="fixed bottom-4 right-4 bg-[#E32C0B] text-white rounded-full h-12 w-12 flex items-center justify-center"
            >
                {cartItemCount}
            </Link>
        </div>
    );
};

export default Categories;