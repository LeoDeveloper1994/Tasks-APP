import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";




const CreateUserForm = ({ hasAccount }) => {


  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const [userExist, setUserExist] = useState(false);

  const submit = data => {

    axios.post("https://tasks-crud.up.railway.app/api/v1/users", data)
    .then(res => {

      const body = {
        email: data.email,
        password: data.password
      }

      axios.post("https://tasks-crud.up.railway.app/api/v1/users/login", body)
      .then(res => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", res.data.data.user);
        navigate("/dashboard");
      })
      .catch(err => console.log(err.response));
    })
    .catch(err => {
      console.log(err.response)
      if(err.response.data.error.name === "SequelizeUniqueConstraintError"){
        setUserExist(true);
      }
    });

    reset({
      user_name: "",
      email: "",
      password: ""
    });
  };

  useEffect(() => {

    if(localStorage.getItem("token")){
      navigate("/dashboard");
    }

  }, []);

  return (
    <div>
      {userExist && <Modal message={"User credentials already exist"} setUserExist={setUserExist}/>}
      <form className='login-user-container' onSubmit={handleSubmit(submit)}>
        <h3>Register:</h3>
        <div className='name-input-container'>
          <input type="text" id='username' required placeholder=" " {...register("user_name")}/>
          <label htmlFor="username">Type your name</label>
        </div>
        <div className='email-input-container'>
          <input type="email" id='email' required placeholder=" " {...register("email")}/>
          <label htmlFor="email">Type your email</label>
        </div>
        <div className='password-input-container'>
          <input type="password" id="password" required placeholder=" " {...register("password")}/>
          <label htmlFor="password">Type your password</label>
        </div>
        <button type="submit">Submit</button>
        <p onClick={hasAccount}>Do you already have an account?</p>
      </form>
    </div>
  )
}

export default CreateUserForm
