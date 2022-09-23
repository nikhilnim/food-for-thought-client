import './App.scss';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader/SiteHeader';
import RecipePage from './pages/RecipePage/RecipePage';
import TestPage from './pages/Testpage/TestPage';

function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<TestPage/>}></Route>
        <Route path="/:id" element={<RecipePage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
