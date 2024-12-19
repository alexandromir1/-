import React from 'react';
import { useParams } from 'react-router-dom';
import FoodImage from './../foodImage.png';

const dishesData = [
  { id: 1, title: 'Борщ', description: 'Свекла, сметана, мясо и овощи', price: '300 рублей', image: FoodImage },
  { id: 2, title: 'Уха', description: 'Рыба, картофель, специи', price: '350 рублей', image: FoodImage },
  { id: 3, title: 'Котлета по-киевски', description: 'Куриное филе, сливочное масло, панировка', price: '400 рублей', image: FoodImage },
  { id: 4, title: 'Жаркое из баранины', description: 'Баранина, картофель, морковь', price: '600 рублей', image: FoodImage },
  { id: 5, title: 'Духовая самса', description: 'Мясное ассорти, сливочное масло, домашнее тесто', price: '400 рублей', image: FoodImage },
  { id: 6, title: 'Брусничный морс', description: 'Брусника, вода', price: '150 рублей', image: FoodImage },
  { id: 7, title: 'Шаурма', description: 'Мясо на выбор, сыр, овощи и фирменный соус', price: '370 рублей', image: FoodImage },
];

const Dish = () => {
  const params = useParams();

  if (!params.id) {
    return <div>Загрузка...</div>;
  }

  const dish = dishesData.find(d => d.id.toString() === params.id);

  if (!dish) {
    return <div>Блюдо не найдено!</div>;
  }

  return (
    <div className="w-full h-full bg-[#FFF7EA] pt-4 px-4">
      <div className="max-w-5xl flex flex-col items-center mx-auto mt-14 p-4 rounded-t-full bg-[#FAEFDD]">
        <div className="relative w-full h-full items-center">
          <img src={dish.image} alt={dish.title} className="mx-auto w-full h-full" />
        </div>
      </div>
      <div className='max-w-5xl flex flex-col items-start mx-auto'>
        <p className="mt-2 text-base font-semibold">{dish.title}</p>
        <p className="mt-2 text-base font-semibold text-[#E32C0B]">{dish.price}</p>
        <p className="mt-2 text-xs">{dish.description}</p>
      </div>
      <button className='bg-[#E32C0B] text-[#FFF7EA] rounded-md py-2 px-8 sticky bottom-0 z-50'>
        Добавить в корзину
      </button>
    </div>
  );
};

export default Dish;