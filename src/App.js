import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import RecipePage from "./pages/RecipePage/RecipePage";
import HomePage from "./pages/HomePage/HomePage";
import { useState, createContext } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import Profile from "./pages/ProfilePage/ProfilePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import {UserContext}   from "./context/UserContext";

function App() {
  const userState = useState(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={userState}>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:id" element={<RecipePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
