import React, { useState } from "react";
import styled from "styled-components";
import { FaCirclePlay } from "react-icons/fa6"
import { usePlayerContext } from "./PlayerContext";
import Toast from "./Toast";
import Login from "./Login";
const SongCard = ({ album, artist, title, _id, index }) => {
  const { state, dispatch } = usePlayerContext();
  const [flag, setFlag] = useState(false);
  const token = localStorage.getItem("AuthToken");

  const clickCancle = () => {
    setFlag(false);
  }

  const handlePlayPauseClick = () => {
    if (token) {
      setFlag(false)
      dispatch({ type: "SET_CURRENT_SONG_INDEX", payload: index });
    }
    else {
      setFlag(true);
    }
  }
  return (
    <Container>
      <ImageContainer>
        <Image src={album} alt={`${title} Album Cover`} />
        <FaCirclePlayIcon>
          <FaCirclePlay className="play-icon" onClick={handlePlayPauseClick} />
        </FaCirclePlayIcon>
      </ImageContainer>
      <Artist>{artist}</Artist>
      <Title>{title}</Title>
      {flag && <Login clickCancle={clickCancle} />}
    </Container>
  );
};

const Container = styled.div`
  background-color: #333;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 200px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;

  &:hover {
    .play-icon {
      display: block;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;

  &:hover{

  }
`;

const Artist = styled.h3`
  color: #fff;
  margin: 5px 0;
`;

const Title = styled.p`
  color: #ccc;
  margin: 5px 0;
`;

const FaCirclePlayIcon = styled.div`
  .play-icon{
    display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: #fff;
  }
`;

export default SongCard;