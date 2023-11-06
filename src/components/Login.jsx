import React, { useState } from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx"
import Toast from "./Toast";
import axios from "axios"
function Login({ clickCancle, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setShowToast(false);
    const payload = {
      email,
      password
    }
    try {
      const res = await axios.post("https://loud-weight1875-production.up.railway.app/auth/login", payload);
      if (res.status === 200) {
        localStorage.setItem("AuthToken", res.data.token);
        console.log("token", res.data.token);
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        setShowToast(true);
        setTimeout(() => {
          setIsLoggedIn(true);
          clickCancle();
        }, 1000);
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        setSuccessMessage("");
        setShowToast(true);
      }
    }
  };
  return (
    <Container>
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="cancleBtn">
          <RxCross2 onClick={clickCancle} style={{ fontSize: "28px" }} />
        </div>
        <Title>Login</Title>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <ButtonHover onClick={handleLogin}>Log In</ButtonHover>
        {showToast && (
          <Toast message={successMessage || errorMessage} type={successMessage ? "success" : "error"} />
        )}
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #111; 
    position: fixed;
  z-index: 1000;
    top: 30%;
left:40%;

.cancleBtn{
position: absolute;
right: 20px;
color:white;
top: 10px;
right: 10px;
}
`;

const Form = styled.form`
  background-color: #333;  
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Title = styled.h2`
  color: #fff; 
`;

const FormGroup = styled.div`
  margin: 10px 0;
  text-align: left;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #fff;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: #222; 
  color: #fff; 
  border-radius: 4px;
  outline: none;
`;

const Button = styled.button`
  background-color: #007bff; 
  color: #fff; 
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
`;

const ButtonHover = styled(Button)`
  background-color: #0056b3; 
`;

export default Login;