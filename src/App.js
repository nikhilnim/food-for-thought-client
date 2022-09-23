import './App.scss';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import { Navbar } from 'react-bootstrap';
import SiteHeader from './components/SiteHeader/SiteHeader';
import RecipePage from './pages/RecipePage/RecipePage';

function App() {
  return (
  
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/:id" element={<RecipePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
