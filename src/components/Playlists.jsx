import React from "react";
import styled from "styled-components";

export default function Playlists() {
  return (
    <Container>
      <ul>
        {/* Mapping through playlists */}
        <li>Playlist 1</li>
        <li>Playlist 2</li>
        <li>Playlist 3</li>
        {/* End of mapping */}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;