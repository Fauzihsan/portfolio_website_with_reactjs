import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GetUser } from "../apollo-client/gql";

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
    <div className="mainLogin justify-center items-center flex ">
      <Link to="/">
        <FaHome style={{ fontSize: "30px", color: "#fffafa", opacity: "0.5" }} className="absolute left-5 top-5" />
      </Link>
      <div className="box lg:p-10 p-3 ">
        <h1 className="title text-center text-3xl">I's Journey</h1>
        <div className="flex lg:flex-row flex-col items-center justify-center p-5 gap-x-10">
          <div className="profilePictureLogin ">
            <img className="" src={require("../assets/img/me.jpg")} alt="" />
          </div>
          <form action="" onSubmit={handleLogin}>
            <div className="p-5">
              <input type="email" value={email} onChange={handleChangeEmail} className="inputEmail bg-transparent border-b-2 outline-none w-full " required placeholder="Email" />
            </div>
            <div className="p-5">
              <input type="password" value={password} onChange={handleChangePassword} className="bg-transparent border-b-2 outline-none w-full" required placeholder="Password" />
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
