import React, { useState } from "react";
import styled from "styled-components";
import { FiMail, FiLock } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx"

function Login({ clickCancle }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
    };
    return (
        <Container>
            <Form onSubmit={(e) => e.preventDefault()}>
                <div className="cancleBtn">
                    <RxCross2 onClick={clickCancle} style={{ fontSize: "30px" }} />
                </div>
                <Title>Login</Title>
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
                <ButtonHover onClick={handleLogin}>Log In</ButtonHover>
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
top: -21px;
right: -23px;
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