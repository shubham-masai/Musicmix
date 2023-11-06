import React, { useState } from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai"
import { SiYoutubemusic } from "react-icons/si"
import PlayListModel from "./PlaylistModel"
export default function Sidebar() {
  const [flag, setFlag] = useState(false);
  const clickCancle = () => {
    setFlag(false);
  }
  return (
    <Container>
      <TopLinks className="top-links">

        <LinksList>
          <LinkItem>
            {/* <Logo className="logo"> */}
            <SiYoutubemusic style={{ color: "white", fontSize: "30px" }} />
            <span style={{ color: "white" }}> Music<span style={{ color: "white" }}>Mix</span></span>
            {/* </Logo> */}
          </LinkItem>

          <LinkItem>
            <MdHomeFilled style={{ fontSize: "30px" }} />
            <span >Home</span>
          </LinkItem>
          <LinkItem>
            <MdSearch style={{ fontSize: "30px" }} />
            <span>Search</span>
          </LinkItem>
        </LinksList>


        <LinksList>
          <LinkItem>
            <IoLibrary style={{ fontSize: "30px" }} />
            <div>Your Library</div>
            <AiOutlinePlus style={{ fontSize: "30px", marginLeft: "22%" }} />
          </LinkItem>
          <div className="playlistDiv">
            <h4>Create your first playlist</h4>
            <p>It's easy, we'll help you</p>
            <div>
              <button className="playlistBtn" onClick={(e) => { setFlag(!flag) }}>Create playlist</button>
              {
                flag && <PlayListModel  clickCancle={clickCancle}/>
              }
            </div>
          </div>
        </LinksList>
      </TopLinks>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const LinksList = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: rgb(18,18,18);
  margin-top: 10px;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;

const LinkItem = styled.li`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  font-size: 18px;
  transition: 0.3s ease-in-out;

  &:hover {
    color: white;
  }
`;

const TopLinks = styled.div`
  display: flex;
  flex-direction: column;
  .logo {
    text-align: center;
    margin: 1rem 0;
  }

  .playlistDiv{
    width: 100%;
    background-color: rgb(36,36,36);
    padding: 5%;
    border-radius: 10px;
    padding-top: 0%;
    margin: auto;
    color: white;
 
  }
  .playlistDiv h4{
    line-height: 2;
  }
  .playlistDiv p{
    line-height: 2;
  }

  .playlistBtn{
    height: 28px;
    width: 60%;
    margin-top: 10px;
    border-radius: 30px;
    border: none;
  }
`;
