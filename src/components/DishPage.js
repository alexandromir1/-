import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DishPage = ({ dishes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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

      <div className='flex justify-center mb-6'>
        <button className='bg-[#E32C0B] text-[#FFF7EA] rounded-md py-2 px-8'>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default DishPage;