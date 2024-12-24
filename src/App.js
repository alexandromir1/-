import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import DishPage from './components/DishPage';
import { CartProvider } from './components/CartContext';
import CartPage from './components/CartPage'
import { dishesData } from './components/Main';

import './fonts.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main dishes={dishesData} />} />
          <Route path="/dish/:id" element={<DishPage dishes={dishesData} />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;