import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import RecipePage from "./pages/RecipePage/RecipePage";
import HomePage from "./pages/HomePage/HomePage";
import { useState,useEffect } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import Profile from "./pages/ProfilePage/ProfilePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import {UserContext}   from "./context/UserContext";
import axios from "axios";

function App() {
  // const userState = useState(null);
  const [user, setUser]= useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const { REACT_APP_API_SERVER_URL } = process.env;
    if(token){
      getProfile();
    }
    async function getProfile() {
      console.log("run")
      try {
        const { data } = await axios.get(
          `${REACT_APP_API_SERVER_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data);
      } catch (err) {
        console.log(err); 
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={ [user, setUser]}>
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
