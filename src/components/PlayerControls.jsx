import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { usePlayerContext } from "./PlayerContext";

export default function PlayerControls({volumeRef}) {
  const { state, dispatch } = usePlayerContext();
  const [isPlaying, setIsPlaying] = useState(true);
  const audio = new Audio();
  audio.volume=volumeRef.current;
  console.log(audio.volume);
  const songNumber = state.currentSongIndex || 0;
  const currentSong = state.songs[songNumber];
  useEffect(() => {
    if (currentSong && isPlaying) {
      audio.src = `https://loud-weight1875-production.up.railway.app/tracks/stream/${currentSong._id}`;
      audio.play();
    } else {
      audio.pause();
    }
    
    return () => {
      audio.pause(); // Make sure to pause the audio when the component unmounts
    };
  }, [currentSong, isPlaying]);

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const previousSongIndex = songNumber === 0 ? state.songs.length - 1 : songNumber - 1;
    dispatch({ type: "SET_CURRENT_SONG_INDEX", payload: previousSongIndex });
  };

  const handleNext = () => {
    const nextSongIndex = songNumber === state.songs.length - 1 ? 0 : songNumber + 1;
    dispatch({ type: "SET_CURRENT_SONG_INDEX", payload: nextSongIndex });
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={handlePrevious} />
      </div>
      <div className="state">
        <BsFillPauseCircleFill onClick={handlePlayPauseClick} />
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={handleNext} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
