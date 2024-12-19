import React from "react";

import Plov from '../plov.png';
import '../index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "./Categories";

const Main = () => {
    return (
        <div className="w-full h-full bg-[#FFF7EA]">
            <div className="max-w-5xl flex flex-col items-center mx-auto p-4">
                <h1 className="text-[#E32C0B] mb-4 text-4xl font-medium">Кафе восточной кухни</h1>
                <div className="relative w-full h-full items-center">
                    <img src={Plov} alt="Plov" className="mx-auto w-full h-full rounded-3xl" />
                </div>
                <Routes className='w-full h-full'>
                    <Route path="/" element={<Categories />}/>
                </Routes>
            </div>
        </div>
    );
}

export default Main;