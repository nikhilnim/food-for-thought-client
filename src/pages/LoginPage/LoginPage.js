import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useLocation } from "react-router-dom";

// function LoginPage() {
//   const [user] = useContext(UserContext);
//   if (!user) return <LoginForm></LoginForm>;
// }
function LoginPage() {
 
 return <LoginForm></LoginForm>;
}
export default LoginPage;