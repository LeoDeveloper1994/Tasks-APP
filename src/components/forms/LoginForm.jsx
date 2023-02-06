import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from './Modal';

const LoginForm = ({ hasAccount }) => {

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const [userExist, setUserExist] = useState(false);

  const submit = data => {
    axios.post("https://tasks-crud.up.railway.app/api/v1/users/login", data)
          .then(res => {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", res.data.data.user);
            setTimeout(() => navigate("/dashboard"), 3000);
          })
          .catch(err => {
            console.log(err.response);
            if(err.response.data.message === "Invalid credentials"){
              setUserExist(true)
            }
          });

    reset({
      email: "",
      password: ""
    });
  }

  return (
    <div>
      {userExist && <Modal message={"Invalid credentials"} setUserExist={setUserExist}/>}
      <form className='login-user-container' onSubmit={handleSubmit(submit)}>
        <h3>Log In:</h3>
        <div className='email-input-container'>
          <input type="email" id='email' required placeholder=" " {...register("email")}/>
          <label htmlFor="email">Type your email</label>
        </div>
        <div className='password-input-container'>
          <input type="password" id="password" required placeholder=" " {...register("password")}/>
          <label htmlFor="password">Type your password</label>
        </div>
        <button type="submit">Submit</button>
        <p onClick={hasAccount}>Don't have an account yet?</p>
      </form>
    </div>
  )
}

export default LoginForm
