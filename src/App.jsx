import NavBar from "./components/NavBar/NavBar.jsx"; 
import './App.css';
import Banner from './components/Banner/Banner.jsx';
import ItemListContainer from './components/ItemListContainer/ListContainer.jsx'; // Importa el componente
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideBanner = location.pathname === '/cart';

  return (
    <div>
      <NavBar /> 
      {!hideBanner && <Banner />} 
      <div style={{ marginTop: '100px' }}>
        <ItemListContainer /> 
      </div>
    </div>
  );
}

export default App;
