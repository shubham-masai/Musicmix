import React, { useState } from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx"
import axios from "axios"
function PlayListModel({clickCancle}) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const token = localStorage.getItem("AuthToken");
    const submitPlaylist = async () => {
        const payload = {
            name, description: desc
        }
        console.log(payload);
        try {
            if (token) {
                await axios.post("https://loud-weight1875-production.up.railway.app/playlists/create", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            <Form onSubmit={submitPlaylist}>
                <div className="cancleBtn">
                    <RxCross2 onClick={clickCancle} style={{ fontSize: "30px" }} />
                </div>
                <Title>Create PlayList</Title>
                <FormGroup>
                    <Label>PlayList Name</Label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </FormGroup>
                <ButtonHover >Create</ButtonHover>
            </Form>
        </Container>
    );
}
export default PlayListModel;
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