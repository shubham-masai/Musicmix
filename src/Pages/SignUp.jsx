import { useEffect, useState } from "react";
import { SiYoutubemusic } from "react-icons/si";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { signUpuser } from "../redux/action";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isError, errorMessage } = useSelector((store) => {
    return {
      isAuth: store.isAuth,
      isError: store.isError,
      errorMessage: store.errorMessage,
    };
  }, shallowEqual);
  const handleSignIn = (e) => {
    e.preventDefault();
    signUpuser(dispatch, { username, email, password });
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);
  return (
    <section className="flex flex-col md:flex-col h-screen items-center justify-center gap-8 bg-primary-950">
      <div className=" text-white text-4xl flex gap-2 items-center">
        <SiYoutubemusic style={{ color: "white", fontSize: "35px" }} />
        MusicMix
      </div>
      <div className="w-full bg-primary-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign Up
          </h1>
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                className="bg-primary-800 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 "
                placeholder="username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className="bg-primary-800 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 "
                placeholder="name@company.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="••••••••"
                className="bg-primary-800 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 "
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>
            </div>
            {isError && <p className="text-white">Error : {errorMessage}</p>}
            <button
              type="submit"
              className="w-full text-white bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-900"
              onClick={handleSignIn}
            >
              Sign Up
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an Account?{" "}
              <a
                href="/"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
