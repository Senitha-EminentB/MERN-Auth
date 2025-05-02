import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/Signup/signup";
import LoginForm from "./components/Login/login";
import Main from "./components/Main/main";
import EmailVerify from "./components/EmailVerify";



function App() {
  const user = localStorage.getItem("token")
  return (
    <div className="App">
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/login" exact element={<LoginForm />} />
        <Route path="/signup" exact element={<SignupForm />} />
        <Route path="/" exact element={<Navigate replace to="/login"/>}/>
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
     
      </Routes>
    </div>
  );
}

export default App;
