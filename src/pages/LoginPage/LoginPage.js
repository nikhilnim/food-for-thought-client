
import axios from "axios";
import { useState } from "react";
import Profile from "../ProfilePage/ProfilePage";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
const {REACT_APP_API_SERVER_URL} = process.env;
function LoginPage() {

  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  async function handleSignup(e){
    e.preventDefault();
    const formObj = e.target
    const {data} =  await axios.post('http://localhost:8080/signup',{
      username:formObj.username.value,
      password:formObj.password.value,
      name:formObj.name.value
    })  
    if(data.success==="true"){
      setIsSignedUp(true)
    }
    console.log(data)
    // Here send a POST request to signupUrl with username, name and password data
  };

  async function handleLogin(e) {
    e.preventDefault();
    let reqbody = {
      email:"abdul@gmail.com",
      password:"xyz"
    }
    try{
      const {data} = await axios.post(`${REACT_APP_API_SERVER_URL}/users/login`,reqbody)
      console.log(data)
      sessionStorage.setItem("token",data.token)
      setIsLoggedIn(true)
      navigate("/profile")
    }catch(err){
      setIsLoginError(true)
      setErrorMessage("user name or password wrong")
      console.log(err)
    }
   
    // Here send a POST request to loginUrl with username and password data
  };

  const renderSignUp = () => (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Name: <input type="text" name="name" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );

 

  // Handle the Signup/Login
  // if (!isSignedUp) return renderSignUp();
  if (!user) return <LoginForm></LoginForm>;

}

export default LoginPage;