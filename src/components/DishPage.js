import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useCart } from './CartContext';

const DishPage = ({ dishes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItemCount, changeQuantity, removeFromCart } = useCart();
  const [dishQuantities, setDishQuantities] = useState({});
  const [showAddToCartButton, setShowAddToCartButton] = useState({});

  const dish = dishes.find(dish => dish.id === parseInt(id));

  if (!dish) {
    return <div>Блюдо не найдено.</div>;
  }

  return (
    <div className="w-full h-screen bg-[#FFF7EA] flex flex-col justify-between px-auto font-raleway">
      <div className="max-w-5xl flex mx-auto mt-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[#E32C0B] text-base mb-8 absolute left-4 top-6"
        >
          Меню
        </button>
        <h1 className="text-[#E32C0B] mb-4 text-[40px] font-medium font-asia">ЧайХаНа14</h1>
      </div>

      <div className='flex flex-col flex-grow'>
        <div className='rounded-t-full bg-[#FAEFDD] w-[288px] h-[292px] py-8 px-6 mx-auto'>
          <img src={dish.image} alt={dish.title} width={243} height={230} />
        </div>
        <div className='w-[288px] mt-4 flex flex-col items-start mx-auto'>
          <h1 className='font-semibold text-base'>{dish.title}</h1>
          <p className='font-semibold text-base text-[#E32C0B] my-1.5'>Цена: {dish.price}</p>
          <p className='font-normal text-xs'>{dish.description}</p>
        </div>
      </div>

      <div className='flex justify-center mb-10'>
        {showAddToCartButton[dish.id] ? (
          <div className='flex justify-between bg-[#E32C0B] text-[#FFF7EA] text-xs rounded-md py-2 px-8 w-[138px]'>
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
          }} className='bg-[#E32C0B] text-[#FFF7EA] text-xs rounded-md py-2 px-8'>
            В корзину
          </button>
        )}
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

export default DishPage;