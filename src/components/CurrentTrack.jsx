import styled from "styled-components";
import { usePlayerContext } from "./PlayerContext";

export default function CurrentTrack() {
  const { state, dispatch } = usePlayerContext();
  const currentSong = state.songs[state.currentSongIndex];

  return (
    <Container>
      <div className="track">
        <div >
          <img className="track-image" src={currentSong?.album} alt="currentPlaying" />
        </div>
        <div className="track-info">
          <h4 className="track-name">{currentSong?.title}</h4>
          <h6 className="track-artists"></h6>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .track-image {
    width: 40x;
    height: 40px;
  }

  .track-info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    .track-name {
      color: white;
    }
    .track-artists {
      color: #b3b3b3;
    }
  }
`;

