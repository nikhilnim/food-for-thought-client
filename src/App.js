import './App.scss';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader/SiteHeader';
import RecipePage from './pages/RecipePage/RecipePage';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/:id" element={<RecipePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
