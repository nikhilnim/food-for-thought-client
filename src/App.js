import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import RecipePage from "./pages/RecipePage/RecipePage";
import HomePage from "./pages/HomePage/HomePage";
import { useState, createContext } from "react";
export const UserContext = createContext(null);

function App() {
  const userState = useState({
    firstName: "James",
    lastName: "Jameson",
    suffix: 1,
    email: "jamesjameson@example.com",
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={userState}>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:id" element={<RecipePage />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
