import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const {REACT_APP_API_SERVER_URL} = process.env;
function LoginForm() {
  const [isLoginError,setIsLoginError] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  async function onSubmit(formData){
    try{
      const {data} = await axios.post(`${REACT_APP_API_SERVER_URL}/users/login`,formData)
      sessionStorage.setItem("token",data.token)
      setIsLoginError(false)
      setErrorMessage("")
      navigate("/profile")
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
              <button type="sumbit" class="btn btn-primary mt-3 me-3" >Login</button>
              <button type="button" onClick={()=>navigate("/signup")} class="btn btn-primary mt-3 " >Sign Up</button>
            </div>
            {isLoginError && <p className="text-danger fs-6 fw-lighter">{`${errorMessage}`}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
