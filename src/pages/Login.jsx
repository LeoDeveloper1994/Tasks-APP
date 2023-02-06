import React, { useState } from 'react'
import { CreateUserForm, LoginForm } from "../components/forms";

const Login = () => {

  const [account, setAccount] = useState(false);

  const hasAccount = () => {
    setAccount(!account)
  }

  return (
    <div className='login-container'>
      <div className="login-content-container">
        <div className='app-title-container'>
          <h1>NOTEBOOK</h1>
        </div>
        <div className="login-form-container">
          { account? <LoginForm hasAccount={hasAccount}/> : <CreateUserForm hasAccount={hasAccount}/> }
        </div>
      </div>
    </div>
  )
}

export default Login
