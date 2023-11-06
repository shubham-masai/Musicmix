import React,{useState} from "react";
import styled from "styled-components";

export default function Volume({volumeRef}) {
  const [vol,setVol]=useState(volumeRef.current);
  volumeRef.current=vol;
  
  return (
    <Container>
      <input type="range" min="0"
        max="1"
        step="0.01" value={vol} onChange={(e)=>{
        setVol(+e.target.value);
      }}/>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;