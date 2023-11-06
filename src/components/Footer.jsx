import React,{useRef} from "react";
import styled from "styled-components";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
import CurrentTrack from "./CurrentTrack"
export default function Footer() {
  const volumeRef = useRef(0.5);
  return (
    <Container>
      <PlayerControls volumeRef={volumeRef}/>
      <CurrentTrack />
      <Volume volumeRef={volumeRef}/>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 1rem;
`;