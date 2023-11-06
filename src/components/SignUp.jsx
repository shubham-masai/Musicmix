import React, { useState } from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx"
import Toast from "./Toast";
import axios from "axios"
function SignUp({ clickCancle,setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setShowToast(false);
    const payload = {
      username,
      email,
      password
    }
    try {
      const res = await axios.post("https://loud-weight1875-production.up.railway.app/auth/register", payload);
      if (res.status === 201) {
        localStorage.setItem("AuthToken", res.data.token);
        console.log("token", res.data.token);
        setSuccessMessage("Registration successful!");
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
      <Form onSubmit={handleSignUp}>
        <div className="cancleBtn">
          <RxCross2 onClick={clickCancle} style={{ fontSize: "30px" }} />
        </div>
        <Title>Sign up</Title>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <ButtonHover>Register</ButtonHover>
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

export default SignUp;