import React, { useState, useEffect } from "react";
import { usePlayerContext } from "./PlayerContext";
import styled from "styled-components";
import axios from "axios";
import SongCard from "./SongCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Body = () => {
  const { state, dispatch } = usePlayerContext();
  // const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const songsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://loud-weight1875-production.up.railway.app/tracks/list");
        // setSongs(res.data);
        dispatch({ type: "SET_SONGS", payload: res.data });
        // console.log(res.data);
        setTotalPages(Math.ceil(res.data.length / songsPerPage));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getPaginatedSongs = () => {
    const startIndex = (currentPage - 1) * songsPerPage;
    const endIndex = startIndex + songsPerPage;
    // let newarr=songs.slice(startIndex, endIndex);
    // dispatch({ type: "SET_SONGS", payload: newarr })
    return state.songs;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <SongList>
        {getPaginatedSongs().map((song, index) => (
          <SongCard key={index} {...song} index={index} />
        ))}
      </SongList>
      <Pagination>
        <FiChevronLeft onClick={handlePreviousPage} disabled={currentPage === 1} style={{ fontSize: "30px" }} />
        <FiChevronRight onClick={handleNextPage} disabled={currentPage === totalPages} style={{ fontSize: "30px" }} />
      </Pagination>
     </Container> 
  );
};

export default Body;

const Container = styled.div`
  width: 95%;
  padding: 20px;

`;

const SongList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  color: white;
`;