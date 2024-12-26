import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import BackArrow from './../backArrow.svg'

const Cart = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, removeFromCart, changeQuantity } = useCart();

    const totalPrice = Object.entries(cart).reduce((total, [dishId, dish]) => {
        const price = parseFloat(dish.price);
        const count = parseInt(dish.count);
        if (!isNaN(price) && !isNaN(count)) {
            return total + (price * count);
        }
        return total;
    }, 0);

    return (
        <div className='w-full h-screen bg-[#FFF7EA] flex flex-col justify-items-center font-raleway overflow-hidden'>
            <div className="max-w-5xl flex mt-4 mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="text-[#E32C0B] text-base mb-8 absolute left-4 top-6"
                >
                    Меню
                </button>
                <h1 className="text-[#E32C0B] mb-4 text-[40px] font-medium font-asia">ЧайХаНа14</h1>
            </div>
            <div className='mx-auto h-screen'>
                <h2 className='text-[#E32C0B] font-semibold text-xl mb-5 mt-5'>Корзина</h2>
                <div className='text-[#E32C0B] h-screen overflow-scroll hidden-scroll'>
                    {Object.keys(cart).length === 0 ? (
                        <p>Корзина пуста</p>
                    ) : (
                        <ul className='mb-64'>
                            {Object.entries(cart).map(([dishId, dish]) => (
                                <div className='my-5' key={dishId}>
                                    <li className='flex'>
                                        <div className="items-center px-2.5 py-3 bg-[#FAEFDD] rounded-[9px]">
                                            <img src={dish.image} alt={dish.title} className="w-[73px] h-[70px] rounded-3xl" />
                                        </div>
                                        <div className='flex flex-col justify-between bg-[#FFF7EA] ml-3'>
                                            <div>
                                                <span>{dish.title}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>{parseFloat(dish.price) * dish.count} руб</span>
                                                <div className='flex bg-[#FAEFDD] w-[102px] h-[30px] justify-around px-3 ml-11'>
                                                    <button className='text-xl' onClick={() => changeQuantity(dishId, -1)}>-</button>
                                                    <button className='text-xs mx-5'>{dish.count}</button>
                                                    <button className='text-xl' onClick={() => changeQuantity(dishId, 1)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
                {Object.keys(cart).length > 0 && (
                    <div className='flex sticky bottom-5'>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-[#E32C0B] p-2 justify-center bg-[#FAEFDD] rounded-[5px] mr-1"
                        >
                            <img src={BackArrow} alt="Назад" className='w-[24px] h-[24px]'/>
                        </button>
                        <button  onClick={() => navigate('/payment', { state: { totalPrice } })} className='bg-[#E32C0B] px-7 py-3 rounded-[5px]'>
                            <h3 className='text-[#FFF7EA] font-semibold text-railway'>Оформить заказ на {totalPrice} руб.</h3>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;