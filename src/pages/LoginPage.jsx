import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GetUser } from "../graphql/query";

import "../assets/css/loginPageStyle.css";
import LoadingAnimation from "../components/LoadingAnimation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getUser, { data, loading, error }] = useLazyQuery(GetUser);

  let navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    getUser({
      variables: { email, password },
    });
  };

  useEffect(() => {
    if (data?.users.length === 1) {
      return navigate("/admin");
    }
  }, [data]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="mainLogin flex justify-center items-center">
      <Link to="/">
        <FaHome style={{ fontSize: "30px", color: "#fffafa", opacity: "0.5" }} className="absolute left-5 top-5" />
      </Link>
      <div className="box lg:p-10 p-3 w-3/4 h-3/4">
        <h1 className="title text-center text-3xl">I's Journey</h1>
        <div className="flex lg:flex-row flex-col items-center justify-center lg:p-5 py-5 gap-x-10">
          <div className="profilePictureLogin lg:w-60 lg:h-60 w-32 h-32 rounded-full">
            <img className="" src={require("../assets/img/me.jpg")} alt="" />
          </div>
          <form action="" onSubmit={handleLogin} className="lg:w-1/2 w-full">
            <div className="p-5">
              <input type="email" value={email} onChange={handleChangeEmail} className="inputField w-full bg-transparent outline-none border-none placeholder:text-white" required placeholder="Email" />
            </div>
            <div className="p-5">
              <input type="password" value={password} onChange={handleChangePassword} className="inputField w-full bg-transparent outline-none border-none placeholder:text-white focus:outline-dotted " required placeholder="Password" />
            </div>
            <div className="text-center p-3">
              <button type="submit" className="btn-login text-center px-10 py-2">
                Login
              </button>
            </div>
            {data && <h2 className="text-center text-red-300 font-bold">Username or Password is Wrong!</h2>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
