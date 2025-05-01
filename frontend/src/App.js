import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./components/Signup/signup";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
