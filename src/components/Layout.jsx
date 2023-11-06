import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Body from "./Body";

export default function Layout() {
  return (
    <Container>
      <div className="layout_body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div >
            <Body />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .layout_body {
    display: grid;
    grid-template-columns: 22vw 80vw;
    height: 100%;
    width: 100%;
    background-color: rgb(18,18,18);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
