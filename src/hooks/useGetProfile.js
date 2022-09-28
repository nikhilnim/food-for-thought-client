import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const { REACT_APP_API_SERVER_URL } = process.env;
const token = sessionStorage.getItem("token");

function useGetProfile() {
  const [user,setUser] = useContext(UserContext)
  const [isLoading,setIsLoading] = useState(true)
  async function getProfile() {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API_SERVER_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setUser(data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  return [user,isLoading,getProfile];
}

export default useGetProfile;