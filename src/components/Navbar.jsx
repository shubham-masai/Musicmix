
import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Login from "./Login";
import SignUp from "./SignUp";
import { useEffect } from "react";
import axios from "axios"
export default function Navbar() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken) {
      const setProfile = async () => {
        try {
          const res = await axios.get("https://loud-weight1875-production.up.railway.app/auth/profile", {
            headers: {
              Authorization: `bearer ${authToken}`
            }
          });

          if (res.status === 200) {
            setName(res.data.username);
          }
        } catch (error) {
          console.log(error);
        }
      };
      setProfile();
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const clickLogin = () => {
    setLoginPopup(true);
    setSignupPopup(false);
  }
  const clickSignup = () => {
    setSignupPopup(true);
    setLoginPopup(false);
  }

  const clickCancle = () => {
    setLoginPopup(false);
    setSignupPopup(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("AuthToken");
    setIsLoggedIn(false);
  };
  return (
    <div>
      <Container>

        <div className="searchbar">
          <div className="logo" >
            <FaSearch />
          </div>
          <input type="text" placeholder="What do you want to listen to?" />
        </div>
        <div className="avatar">

          <div>
            {isLoggedIn? (
              <>
                <a href="/">
                  <CgProfile />
                  <span>{name}</span>
                </a>
                <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
              </>
            ) : (
              <>
                <Buttonsignup onClick={clickSignup}>Sign up</Buttonsignup>
                <ButtonLogin onClick={clickLogin}>Log in</ButtonLogin>
              </>
            )}
          </div>
        </div>
      </Container>
      {
        loginPopup && <div className="loginDiv"><Login clickCancle={clickCancle} setIsLoggedIn={setIsLoggedIn} /></div>
      }
      {
        signupPopup && <div className="loginDiv"><SignUp clickCancle={clickCancle} setIsLoggedIn={setIsLoggedIn} /></div>
      }
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 10vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: black;

  .searchbar{
    display: flex;
    align-items:center;
  }
  .searchbar input{
    width: 400px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background-color: rgb(36,36,36);
    padding-left:50px;
  }
  .searchbar .logo {
    margin-right: -10px;
    margin-bottom: 15px;
    color: white;
  }

  .searchbar .logo svg {
    position: absolute; 
    margin-left: 10px;
  }
`;

const ButtonLogin = styled.button`
  background-color: rgb(255,255,255);
  color: black;
  border: none;
  border-radius: 20px;
 width: 90px;
 height: 35px;
  margin-right: 20px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    scale: calc(1.1);
  }
`;
const Buttonsignup = styled.button`
  background-color: black;
  color: rgb(167,167,167);;
  border: none;
  border-radius: 20px;
  width: 90px;
 height: 35px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    scale: calc(1.1);
    color: white;
  }
`;

const ButtonLogout = styled.button`
  background-color: rgb(255, 255, 255);
  color: black;
  border: none;
  border-radius: 20px;
  width: 90px;
  height: 35px;
  margin-right: 20px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    scale: calc(1.1);
  }
`;
// const Avatar = styled.div`
//   background-color: black;
//   padding: 0.3rem 0.4rem;
//   padding-right: 1rem;
//   border-radius: 2rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const AvatarLink = styled.a`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 0.5rem;
//   text-decoration: none;
//   color: white;
//   font-weight: bold;
// `;

// const AvatarIcon = styled(CgProfile)`
//   font-size: 1.3rem;
//   background-color: #282828;
//   padding: 0.2rem;
//   border-radius: 1rem;
//   color: #c7c5c5;
// `;



