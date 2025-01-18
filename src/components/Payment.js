import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalPrice } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Corrected this line to update the specific form field
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, totalPrice }), // Including totalPrice in body
            });
            const result = await response.json();
            if (result.success) {
                alert('Сообщение успешно отправлено!');
                navigate('/'); // Redirecting to home after successful submission
            } else {
                alert('Ошибка при отправке сообщения.');
            }
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    };

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
            <div>
                <h1 className='text-[#E32C0B] text-3xl mb-4'>Оплата</h1>
                <p className='text-[#E32C0B] text-xl'>Сумма к оплате: {totalPrice} руб.</p>
                <form className='flex flex-col w-full mt-4' onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='ваше имя'
                        className='bg-[#FAEFDD] border-none focus:outline-none focus:border focus:border-sky-500 text-black'
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='введите почту'
                        className='my-3 bg-[#FAEFDD] border-none focus:outline-none focus:border focus:border-sky-500 text-black'
                    />
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='номер телефона'
                        className='bg-[#FAEFDD] border-none focus:outline-none focus:border focus:border-sky-500 text-black'
                    />
                    <input
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder='комментарии к заказу'
                        className='mt-3 bg-[#FAEFDD] border-none focus:outline-none focus:border focus:border-sky-500 text-black h-20'
                    />
                    <button type="submit" className='bg-[#E32C0B] text-white mt-4 p-2 rounded'>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;