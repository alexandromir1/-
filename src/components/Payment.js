import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalPrice } = location.state || {};

    return (
        <div className='w-full h-screen bg-[#FFF7EA] flex flex-col items-center'>
            <div className="max-w-5xl flex mt-4 mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="text-[#E32C0B] text-base mb-8 absolute left-4 top-6"
                >
                    Меню
                </button>
                <h1 className="text-[#E32C0B] mb-4 text-[40px] font-medium font-asia">ЧайХаНа14</h1>
            </div>
            <h1 className='text-[#E32C0B] text-3xl mb-4'>Оплата</h1>
            <p className='text-[#E32C0B] text-xl'>Сумма к оплате: {totalPrice} руб.</p>
            {/* Здесь можно добавить форму для введения платежных данных */}
        </div>
    );
};

export default Payment;