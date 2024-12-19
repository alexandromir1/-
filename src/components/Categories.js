import React, { useState, useRef, useEffect } from 'react';
import FoodImage from './../foodImage.png'

export const categories = [
    {
        id: 1, name: 'Первые блюда', dishes: [
            { id: 1, title: 'Борщ', description: 'Свекла, сметана, мясо и овощи', price: '300 рублей', image: FoodImage },
            { id: 2, title: 'Уха', description: 'Рыба, картофель, специи', price: '350 рублей', image: FoodImage },
        ]
    },
    {
        id: 2, name: 'Вторые блюда', dishes: [
            { id: 3, title: 'Котлета по-киевски', description: 'Куриное филе, сливочное масло, панировка', price: '400 рублей', image: FoodImage },
            { id: 4, title: 'Жаркое из баранины', description: 'Баранина, картофель, морковь', price: '600 рублей', image: FoodImage },
        ]
    },
    {
        id: 3, name: 'Духовая самса', dishes: [
            { id: 5, title: 'Духовая самса', description: 'Мясное ассорти, сливочное масло, домашнее тесто', price: '400 рублей', image: FoodImage },
        ]
    },
    {
        id: 4, name: 'Напитки', dishes: [
            { id: 6, title: 'Брусничный морс', description: 'брусника, вода', price: '150 рублей', image: FoodImage },
        ]
    },
    {
        id: 5, name: 'Турецкая кухня', dishes: [
            { id: 7, title: 'Шаурма', description: 'Мясо на выбор, сыр, овощи и фирменный соус', price: '370 рублей', image: FoodImage },
        ]
    },
];

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const refs = useRef({});

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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className='w-full mx-auto px-4'>
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
                    <div
                        key={category.id}
                        ref={el => refs.current[category.name] = el}
                    >
                        <h2 className="text-2xl font-bold mt-7">{category.name}</h2>
                        <div className='flex'>
                            {category.dishes.map(dish => (
                                <div key={dish.id} className='flex flex-col mr-5 mt-12 w-[140px] cursor-pointer' onClick={() => window.location.href = `/dish/${dish.id}`}>
                                    <div className='rounded-t-full bg-[#FAEFDD]'>
                                        <img src={dish.image} alt={dish.title} width={243} height={230} className="relative object-cover p-5" />
                                    </div>
                                    <div className='my-5'>
                                        <p className="text-sm font-semibold mt-2.5">{dish.price}</p>
                                        <h3 className="text-xs font-regular mt-1.5">{dish.title}</h3>
                                    </div>
                                    <button className='bg-[#E32C0B] text-[#FFF7EA] rounded-md py-2 px-8'>
                                        В корзину
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;