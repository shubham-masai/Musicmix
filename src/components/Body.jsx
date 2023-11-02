import React from "react";
import styled from "styled-components";

export default function Body({ headerBackground, selectedPlaylist }) {
  if (!selectedPlaylist) {
    return <div>Loading...</div>;
  }

  function msToMinutesAndSeconds(duration) {
    // Implement your conversion logic here...
  }
  return (
    <Container headerBackground={headerBackground}>
      <div className="playlist">
        <div className="image">
          <img src={selectedPlaylist.image} alt="selected playlist" />
        </div>
        <div className="details">
          <span className="type">PLAYLIST</span>
          <h1 className="title">{selectedPlaylist.name}</h1>
          <p className="description">{selectedPlaylist.description}</p>
        </div>
      </div>
      <div className="list">
        <div className="header-row">
          <div className="col">
            <span>#</span>
          </div>
          <div className="col">
            <span>TITLE</span>
          </div>
          <div className="col">
            <span>ALBUM</span>
          </div>
          <div className="col">
            {/* <span>
              <AiFillClockCircle />
            </span> */}
          </div>
        </div>
        <div className="tracks">
          {selectedPlaylist.tracks.map(
            (
              {
                id,
                name,
                artists,
                image,
                duration,
                album,
                context_uri,
                track_number,
              },
              index
            ) => {
              return (
                <div className="row" key={id}>
                  <div className="col">
                    <span>{index + 1}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={image} alt="track" />
                    </div>
                    <div className="info">
                      <span className="name">{name}</span>
                      <span>{artists}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span>{album}</span>
                  </div>
                  <div className="col">
                    <span>{msToMinutesAndSeconds(duration)}</span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;