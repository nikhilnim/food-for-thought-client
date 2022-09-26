import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const {REACT_APP_API_SERVER_URL} = process.env;

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate()
  async function getProfile(token){
    try{
      const {data} = await axios.get(`${REACT_APP_API_SERVER_URL}/users/profile`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(data)
      setIsLoading(false)
      setUserInfo(data)
      setUser(data)
    }catch(err){
      console.log(err)
      navigate("/login")
    }
  }

  function handleLogOut(){
    sessionStorage.removeItem("token")
    setUser(null)
    navigate("/")
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    getProfile(token)
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    // Remember to include the token in Authorization header
  }, []);

  return (
    
    isLoading ? <h1>Loading...</h1> : <>
    <h1>Welcome {userInfo.name}!</h1>
    <button type="button" onClick={handleLogOut}>Logout</button>
    </>);
}

export default Profile;
