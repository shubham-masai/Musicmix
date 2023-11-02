import React from "react";
import styled from "styled-components";

export default function Volume() {
  return (
    <Container>
      <input type="range" />
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