import { useEffect, useState } from "react";
import { SiYoutubemusic } from "react-icons/si";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { OAuth } from "../components/Oauth";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    console.log("google button is not clicked only")
    e.preventDefault();
    signInUser(dispatch, { email, password });
  };
  const handleGuestSignIn = (e) => {
    e.preventDefault();
    signInUser(dispatch, { email: "guest@gmail.com", password: "1234" });
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
    if (localStorage.getItem("musicmixtoken")) {
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
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6">
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
            {/* <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div> */}
            {isError && <p className="text-white">Error : {errorMessage}</p>}
            <button
              type="submit"
              className="w-full text-white bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-900"
              onClick={handleSignIn}
            >
              Sign in
            </button>
            <OAuth />

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
            <button
              className="w-full text-white bg-primary-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-900"
              onClick={handleGuestSignIn}
            >
              Guest Login
            </button>
           
          </form>
        </div>
      </div>
    </section>
  );
};
