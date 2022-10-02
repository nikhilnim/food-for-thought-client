import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const {REACT_APP_API_SERVER_URL} = process.env;

function LoginForm() {
  const [,setUser] = useContext(UserContext);
  console.log("setuser",setUser)
  const [isLoginError,setIsLoginError] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const location = useLocation()

  async function onSubmit(formData){
    try{
      const {data} = await axios.post(`${REACT_APP_API_SERVER_URL}/users/login`,formData)
      sessionStorage.setItem("token",data.token)
      const {data:profile} = await axios.get(`${REACT_APP_API_SERVER_URL}/users/profile`,{
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      setUser(profile)
      console.log("profile",profile)
      setIsLoginError(false)
      setErrorMessage("")
      if(location.state){
        navigate(`/${location.state.id}`)
      }else{
        navigate("/profile")
      }
      // 
    }catch(err){
      setIsLoginError(true)
      setErrorMessage("user name or password wrong")
      console.log(err)
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                {...register('email',{required:true})}
              />
              {errors.email &&<p className="text-danger fs-6 fw-lighter">Please enter email</p>}
              <label for="exampleFormControlInput2" className="form-label mt-3">
                Password
              </label>
              <input
                type="password"
                className="form-control "
                id="exampleFormControlInput2"
                {...register('password',{required:true})}
              />
              {errors.password &&<p className="text-danger fs-6 fw-lighter">Please enter password</p>}
              <button type="sumbit" class="btn mt-3 me-3 btn-outline-primary" >Login</button>
              <button type="button" onClick={()=>navigate("/signup")} class="btn btn-outline-success mt-3 " >Sign Up</button>
            </div>
            {isLoginError && <p className="text-danger fs-6 fw-lighter">{`${errorMessage}`}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
