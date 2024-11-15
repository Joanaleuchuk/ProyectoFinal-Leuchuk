import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ItemListContainer from './components/ItemListContainer/ListContainer.jsx';
import ProductDetail from './components/Product/ProductDetail.jsx';
import NotFound from './components/Product/ProcuctNotFound.jsx'; 
import { ShoppingCartProvider } from './Context/ShoppingCartContext.jsx';
import { ShoppingCart } from './components/Cart/ShoppingCart.jsx';
import Checkout from './components/Checkout/Checkout';


createRoot(document.getElementById('root')).render(
  <ShoppingCartProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/shop" element={<ItemListContainer />} />
            <Route path="/shop/:productId" element={<ProductDetail />}/>
            <Route path="/cart" element={<ShoppingCart />} /> 
            <Route path="/Checkout" element={<Checkout />} /> 
            <Route path="/*" element={<NotFound />} /> 
            </Routes>
      </BrowserRouter>
    </StrictMode>
  </ShoppingCartProvider>
);
