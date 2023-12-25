import { MainBody } from "../components/MainBody";
import { Navbar } from "../components/Navbar";
import { Player } from "../components/Player";
import { SideBar } from "../components/SideBar";

export const Home = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-primary-950 gap-2 p-2">
      <div className="flex w-[99vw] h-5/6 gap-2">
        <SideBar />
        <div className="flex flex-col w-full gap-2">
          <Navbar />
          <MainBody />
        </div>
      </div>
      <Player />
    </div>
  );
};
