import React from "react";
import Plov from '../plov.png';
import '../index.css';
import Categories from "./Categories";
import FoodImage from './../foodImage.png';

export const dishesData = [
    { id: 1, title: 'Борщ', description: 'Свекла, сметана, мясо и овощи', price: '300 рублей', image: FoodImage, categoryId: 1 },
    { id: 2, title: 'Уха', description: 'Рыба, картофель, специи', price: '350 рублей', image: FoodImage, categoryId: 1 },
    { id: 8, title: 'Борщ', description: 'Свекла, сметана, мясо и овощи', price: '300 рублей', image: FoodImage, categoryId: 1 },
    { id: 9, title: 'Уха', description: 'Рыба, картофель, специи', price: '350 рублей', image: FoodImage, categoryId: 1 },
    { id: 3, title: 'Котлета по-киевски', description: 'Куриное филе, сливочное масло, панировка', price: '400 рублей', image: FoodImage, categoryId: 2 },
    { id: 4, title: 'Жаркое из баранины', description: 'Баранина, картофель, морковь', price: '600 рублей', image: FoodImage, categoryId: 2 },
    { id: 5, title: 'Духовая самса', description: 'Мясное ассорти, сливочное масло, домашнее тесто', price: '400 рублей', image: FoodImage, categoryId: 3 },
    { id: 6, title: 'Брусничный морс', description: 'Брусника, вода', price: '150 рублей', image: FoodImage, categoryId: 4 },
    { id: 7, title: 'Шаурма', description: 'Мясо на выбор, сыр, овощи и фирменный соус', price: '370 рублей', image: FoodImage, categoryId: 5 },
];


const Main = () => {

    const categories = [
        { id: 1, name: 'Первые блюда' },
        { id: 2, name: 'Вторые блюда' },
        { id: 3, name: 'Духовая самса' },
        { id: 4, name: 'Напитки' },
        { id: 5, name: 'Турецкая кухня' },
    ];

    return (
        <div className="w-full h-full bg-[#FFF7EA] font-raleway">
            <div className="max-w-5xl flex mx-auto justify-center xl:pt-8">
                <h1 className="text-[#E32C0B] mb-4 text-[40px] font-medium font-asia xl:text-8xl">ЧайХаНа14</h1>
            </div>
            <div className="max-w-5xl flex flex-col items-center mx-auto p-4">
                <h1 className="text-[#E32C0B] mb-4 text-4xl font-medium">Кафе восточной кухни</h1>
                <div className="relative w-full h-full items-center">
                    <img src={Plov} alt="Plov" className="mx-auto w-full h-full rounded-3xl" />
                </div>
                <Categories categories={categories} dishes={dishesData} />
            </div>
        </div>
    );
}

export default Main;