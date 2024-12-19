import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Categories, { categories } from "./components/Categories";
import DishDetails from './components/DishDetails';
import Main from "./components/Main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dish/:id" element={<DishDetails dishes={categories.flatMap(cat => cat.dishes)} />} />
      </Routes>
    </Router>
  );
}

export default App;