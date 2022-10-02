import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const { REACT_APP_API_SERVER_URL } = process.env;
function SignUpForm() {
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const navigate = useNavigate();

  async function onSubmit(formData) {
    console.log(formData);
    try{
      const {data} = await axios.post(`${REACT_APP_API_SERVER_URL}/users/signup`,formData)
      console.log(data)
      navigate("/login")
    }catch(err){
      console.log(err)
      setIsSignUpError(true)
      setErrorMessage("Email id is already registered")
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label for="exampleFormControlInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput"
                placeholder="Jonh Doe"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-danger fs-6 fw-lighter">
                  Please enter your name
                </p>
              )}
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-danger fs-6 fw-lighter">
                  Please enter email
                </p>
              )}
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput2" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control "
                id="exampleFormControlInput2"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-danger fs-6 fw-lighter">
                  Please enter password
                </p>
              )}
            </div>
            <div className="mb-3">
              <button type="sumbit" class="btn btn-primary mt-3">
                Sign Up
              </button>
            </div>
            {isSignUpError && <p className="text-danger fs-6 fw-lighter">{`${errorMessage}`}</p>}
          </form>
        </div>

      </div>
    </div>
  );
}

export default SignUpForm;
