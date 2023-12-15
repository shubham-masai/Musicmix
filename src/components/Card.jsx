/* eslint-disable react/prop-types */
import { FaCirclePlay } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { SET_CURRENT_PLAYING } from "../redux/actionTypes";

export const Card = ({ _id, title, artist, album }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: SET_CURRENT_PLAYING, payload: _id });
  };

  return (
    <div
      className=" w-48 bg-primary-950 p-2 h-fit rounded-lg flex flex-col items-center hover:cursor-pointer group hover:bg-primary-700"
      onClick={handleClick}
    >
      <div className="w-full position: relative">
        <FaCirclePlay
          className="hidden group-hover:block position: absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ color: "white", fontSize: "35px" }}
        />
        <img src={album} />
      </div>
      <h1 className="">{title}</h1>
      <p>{artist}</p>
    </div>
  );
};
